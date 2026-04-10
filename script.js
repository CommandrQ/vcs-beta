let scene, camera, renderer, lightVCS, lightKnights;
let mouse = { x: 0, y: 0 };

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // THE GOLD GLOW (Behind Shield Text)
    lightVCS = new THREE.PointLight(0xD4AF37, 0, 12);
    lightVCS.position.set(-3, 0, -1); // Positioned slightly behind text
    scene.add(lightVCS);

    // THE PURPLE GLOW (Behind Knight Text)
    lightKnights = new THREE.PointLight(0xBF94FF, 0, 12);
    lightKnights.position.set(3, 0, -1); // Positioned slightly behind text
    scene.add(lightKnights);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('forge-container').appendChild(renderer.domElement);

    document.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        // TARGET TEXT FOR SNAPPY TILT
        const nodes = document.querySelectorAll('.node');
        nodes.forEach(node => {
            const xRotation = mouse.y * 10;
            const yRotation = mouse.x * 10;
            node.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        });

        // DYNAMIC LIGHT INTENSITY
        if (mouse.x < -0.2) {
            lightVCS.intensity = 4;
            lightKnights.intensity = 0.2;
        } else if (mouse.x > 0.2) {
            lightKnights.intensity = 4;
            lightVCS.intensity = 0.2;
        } else {
            lightVCS.intensity = 1;
            lightKnights.intensity = 1;
        }
    });
}

function animate() {
    requestAnimationFrame(animate);
    // Smoothly drift the lights based on mouse
    lightVCS.position.x = -3 + (mouse.x * 0.5);
    lightVCS.position.y = (mouse.y * 0.5);
    
    lightKnights.position.x = 3 + (mouse.x * 0.5);
    lightKnights.position.y = (mouse.y * 0.5);

    renderer.render(scene, camera);
}
