import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Server-side initialization using your private service role key
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { category, user_location, municipality, description } = body;

    // Check that no text fields were left completely blank
    if (!category || !user_location || !municipality || !description) {
      return NextResponse.json({ error: 'Please fill out all required fields.' }, { status: 400 });
    }

    // Identify the user's connection point safely
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Scramble the IP address so we don't save raw identity data permanently
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

    // Spam Protection Check: See how many posts this signature made in the last day
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    
    const { count, error: countError } = await supabaseAdmin
      .from('suggestionbox')
      .select('*', { count: 'exact', head: true })
      .eq('user_ip_hash', ipHash)
      .gte('created_at', oneDayAgo);

    if (countError) throw countError;

    // Put on the brakes if they submit more than 2 entries in 24 hours
    if (count && count >= 2) {
      return NextResponse.json({ 
        error: 'To keep things fair, we limit submissions to 2 entries every 24 hours.' 
      }, { status: 429 });
    }

    // Invisible Location Verification
    const detectedCountry = request.headers.get('x-vercel-ip-country') || 'US';
    let trustScoreFlag = false;

    // If the browser connection is coming from overseas, flag it for administrative review
    if (detectedCountry !== 'US') {
      trustScoreFlag = true; 
    }

    // Securely insert the verified entry into your private table
    const { error: insertError } = await supabaseAdmin
      .from('suggestionbox')
      .insert([
        {
          category,
          user_location,
          municipality,
          description,
          browser_ip_country: detectedCountry,
          user_ip_hash: ipHash,
          trust_score_flag: trustScoreFlag,
          status: 'Pending Verification',
          is_public: false
        }
      ]);

    if (insertError) throw insertError;

    return NextResponse.json({ success: true, message: 'Thank you! Submitted successfully.' });

  } catch (error) {
    console.error('Submission box error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again soon.' }, { status: 500 });
  }
}
