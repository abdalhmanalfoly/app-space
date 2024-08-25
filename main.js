import '/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './src/stars.jpg'; // background
import './src/sun.jpg'; // sun texture
import './src/mercury.jpg'; // mercury texture
import './src/earth.jpg';
import  './src/jupiter.jpg';
import './src/mars.jpg';
import  './src/neptune.jpg';
import './src/saturn ring.png';
import './src/saturn.jpg';
import './src/uranus.jpg';
import  './src/uranus ring.png';
import './src/venus.jpg';

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 100;

// Background of scene from stars
const loader = new THREE.CubeTextureLoader();
const texture = loader.load(
  ['./src/stars.jpg', './src/stars.jpg', './src/stars.jpg', './src/stars.jpg'],
  (loadedTexture) => {
    scene.background = loadedTexture;
  },
  undefined,
  (error) => {
    console.error('An error happened:', error);
  }
);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Add directional light for the sun
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(50, 50, 50).normalize();
scene.add(directionalLight);

// Ambient light
const ambient = new THREE.AmbientLight(0x333333);
scene.add(ambient);

// Sun light and mesh
const textureLoader = new THREE.TextureLoader();
const sunTexture = textureLoader.load('./src/sun.jpg');
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sunGeometry = new THREE.SphereGeometry(15, 30, 25);
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sunMesh);

// Function to create planet
function createPlanet(size, texture, position, ringData, moonData) {
  const geometry = new THREE.SphereGeometry(size, 25, 20);
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(texture)
  });

  const planet = new THREE.Mesh(geometry, material);
  const planetObj = new THREE.Object3D();
  planetObj.add(planet);
  scene.add(planetObj);

  planet.position.x = position;

  if (ringData) {
    const ringGeometry = new THREE.RingGeometry(
      ringData.innerRadius,
      ringData.outerRadius,
      30
    );
    const ringMaterial = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ringData.texture),
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    planetObj.add(ringMesh);
    ringMesh.position.set(position, 0, 0);
    ringMesh.rotation.x = -0.5 * Math.PI;
  }

  if (moonData) {
    
    const sphereGeometry = new THREE.SphereGeometry(
      moonData.size, 
      32, 
      32 
    );
    
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: textureLoader.load(moonData.texture),
      side: THREE.DoubleSide
    });
    
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
  
    planetObj.add(sphereMesh);
    

    sphereMesh.position.set(moonData.distance, 10, -10); 
    
    
  }
  
  
  return { planet, planetObj };
}

// Add planets
const mercuryTexture = './src/mercury.jpg'; 
const saturnTexture = './src/saturn.jpg'; 
const venusTexture = './src/venus.jpg';
const earthTexture = './src/earth.jpg';
const marsTexture = './src/mars.jpg';
const jupiterTexture = './src/jupiter.jpg';
const uranusTexture = './src/uranus.jpg';
const neptuneTexture = './src/neptune.jpg';
const moonTexture = './src/moon.jpeg'
const mercury = createPlanet(5, mercuryTexture, 25, {});
const saturn = createPlanet(9, saturnTexture, 250, {
  innerRadius: 10,
  outerRadius: 20,
  texture: './src/saturn ring.png'
}, {});
const uranus = createPlanet(8, uranusTexture, 300, {
  innerRadius: 10,
  outerRadius: 20,
  texture: './src/uranus ring.png'
}, {});
const venus = createPlanet(7, venusTexture, 50, {});
const earth = createPlanet(8, earthTexture, 100, {}, {
  size: 2,
  texture: moonTexture,
  distance: 100,
  rotationSpeed: 0.1
});
const mars = createPlanet(9, marsTexture, 150, {}, {});
const jupiter = createPlanet(10, jupiterTexture, 200, {}, {});
const neptune = createPlanet(7, neptuneTexture, 350, {}, {});

// Animation

function animate() {
  requestAnimationFrame(animate);

  
  controls.update();

  sunMesh.rotateY(0.000001);

  
  mercury.planet.rotateY(0.000006);
  mercury.planetObj.rotateY(0.000006);

  saturn.planet.rotateY(0.000003);
  saturn.planetObj.rotateY(0.000003);

  venus.planet.rotateY(0.000006);
  venus.planetObj.rotateY(0.000006);

  earth.planet.rotateY(0.000005);
  earth.planetObj.rotateY(0.000005);

  mars.planet.rotateY(0.000007);
  mars.planetObj.rotateY(0.000007);

  jupiter.planet.rotateY(0.000004);
  jupiter.planetObj.rotateY(0.000004);

  uranus.planet.rotateY(0.000002);
  uranus.planetObj.rotateY(0.000002);

  neptune.planet.rotateY(0.000001);
  neptune.planetObj.rotateY(0.000001);

  

  renderer.render(scene, camera);
}


renderer.setAnimationLoop(animate);

// Resize window
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
