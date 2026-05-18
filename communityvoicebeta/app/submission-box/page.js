'use client';
import { useState } from 'react';

export default function SubmissionBox() {
  const [formData, setFormData] = useState({
    category: 'Budget/Infrastructure',
    user_location: '',
    municipality: 'Radcliff',
    description: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/submit-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus({ type: 'error', message: result.error || 'Submission failed.' });
      } else {
        setStatus({ type: 'success', message: 'Thank you! Your feedback has been safely logged.' });
        setFormData({ ...formData, user_location: '', description: '' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Could not connect to the server right now.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', color: '#fff' }}>
      <h1 style={{ color: '#D4AF37', marginBottom: '10px', textTransform: 'uppercase' }}>Community Box</h1>
      <p style={{ opacity: 0.7, marginBottom: '25px' }}>Share your feedback anonymously to help improve our local community.</p>

      <form onSubmit={handleSubmit} style={{ background: 'rgba(15,15,20,0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '30px' }}>
        
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Topic Category</label>
        <select 
          value={formData.category} 
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '12px', background: '#000', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <option>School Transparency</option>
          <option>Resource Access</option>
          <option>Budget/Infrastructure</option>
        </select>

        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Your Town / Area</label>
        <select 
          value={formData.municipality} 
          onChange={(e) => setFormData({...formData, municipality: e.target.value})}
          style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '12px', background: '#000', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <option>Radcliff</option>
          <option>Elizabethtown</option>
          <option>Vine Grove</option>
          <option>Other Hardin County</option>
        </select>

        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Nearest Street or Neighborhood Name</label>
        <input 
          type="text" 
          placeholder="e.g., Dixie Highway or Lincoln Trail"
          value={formData.user_location}
          onChange={(e) => setFormData({...formData, user_location: e.target.value})}
          style={{ width: '100%', padding: '14px', marginBottom: '20px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
        />

        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>What needs attention?</label>
        <textarea 
          rows="5" 
          placeholder="Describe the community need or issue here..."
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          style={{ width: '100%', padding: '14px', marginBottom: '25px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', resize: 'none' }}
        />

        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: '#fff', color: '#000', fontWeight: '700', cursor: 'pointer' }}
        >
          {loading ? 'Sending Request...' : 'Submit Feedback'}
        </button>

        {status.message && (
          <div style={{ marginTop: '20px', padding: '12px', borderRadius: '8px', textAlign: 'center', background: status.type === 'success' ? 'rgba(46,204,113,0.15)' : 'rgba(231,76,60,0.15)', color: status.type === 'success' ? '#2ecc71' : '#e74c3c' }}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}
