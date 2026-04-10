/* VANGUARD FORGE ENGINE (3D WebGL) */

let scene, camera, renderer, shield, sword;
let mouse = { x: 0, y: 0 };
let INTERSECTED = null;

init();
animate();

function init() {
    // 1. SETUP THE VOID (Scene & Camera)
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.05); // Adds environmental depth

    camera = new THREE.Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // 2. SETUP THE OBJECTS (The 'Quantum' Geometries)
    // The Crystalline Shield (A multifaceted glass body)
    const shieldGeometry = new THREE.OctahedronGeometry(1.2, 1);
    const shieldMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x86868B, // VCS Gray base
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.7,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
    });
    shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shield.position.x = -2.5; // Left Path
    scene.add(shield);

    // The Plasma Sword (A focused energy cylinder)
    const swordGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3, 32);
    const swordMaterial = new THREE.MeshPhongMaterial({
        color: 0xBF94FF, // Knight Purple base
        emissive: 0xBF94FF, // It glows
        emissiveIntensity: 1.0,
        shininess: 100
    });
    sword = new THREE.Mesh(swordGeometry, swordMaterial);
    sword.position.x = 2.5; // Right Path
    sword.rotation.z = -0.5; // Slanted posture
    scene.add(sword);

    // 3. SETUP THE LIGHT (Dynamic Auras)
    const ambientLight = new THREE.AmbientLight(0x1a1a1a);
    scene.add(ambientLight);

    const auraVCS = new THREE.PointLight(0xD4AF37, 0, 10); // Gold, intensity 0 initially
    auraVCS.position.set(-2.5, 0, 1);
    scene.add(auraVCS);

    const auraKnights = new THREE.PointLight(0xBF94FF, 0, 10); // Purple, intensity 0 initially
    auraKnights.position.set(2.5, 0, 1);
    scene.add(auraKnights);

    // 4. SETUP THE RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('forge-container').appendChild(renderer.domElement);

    // 5. INTERACTION LOGIC
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('click', onClick);

    function onMouseMove(event) {
        // Normalize mouse coordinates for Three.js
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Dynamic UI Logic (Apple Exclusion Blend)
        const vcsLabel = document.getElementById('label-vcs');
        const knightLabel = document.getElementById('label-knights');

        // Logic to fade labels based on mouse proximity
        if (mouse.x < -0.3) { // Mouse near Shield
            vcsLabel.style.opacity = '1';
            knightLabel.style.opacity = '0.1';
            auraVCS.intensity = 2; // Power up the Gold aura
        } else if (mouse.x > 0.3) { // Mouse near Sword
            knightLabel.style.opacity = '1';
            vcsLabel.style.opacity = '0.1';
            auraKnights.intensity = 2; // Power up the Purple aura
        } else {
            vcsLabel.style.opacity = '0.3';
            knightLabel.style.opacity = '0.3';
            auraVCS.intensity = 0.5; // Return to soft glow
            auraKnights.intensity = 0.5;
        }
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onClick() {
        if (mouse.x < -0.3) { // Click on Shield
            window.location.href = 'table.html'; // VCS Path
        } else if (mouse.x > 0.3) { // Click on Sword
            window.location.href = 'https://your-future-site.com'; // Knights Path
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    // 1. SPATIAL TILT (Follow the mouse weightlessly)
    shield.rotation.y = (mouse.x * 0.5);
    shield.rotation.x = (mouse.y * -0.5);

    sword.rotation.y = (mouse.x * 0.3);
    sword.rotation.x = (mouse.y * -0.3);

    // 2. IDLE ROTATION
    shield.rotation.y += 0.005;
    sword.rotation.y -= 0.002;

    renderer.render(scene, camera);
}
