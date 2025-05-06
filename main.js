/* -------- 1.  Import Three + Water2 from a CDN  -------- */
import * as THREE              from 'https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js';
import { Water }               from 'https://cdn.jsdelivr.net/npm/three@0.164/examples/jsm/objects/Water2.js';
import { OrbitControls }       from 'https://cdn.jsdelivr.net/npm/three@0.164/examples/jsm/controls/OrbitControls.js';

/* -------- 2.  Basic scene / camera / renderer setup  -------- */
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('pond'), antialias:true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));   // mobile‑friendly
resize();
window.addEventListener('resize', resize);

const scene   = new THREE.Scene();
const camera  = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 1, 1000);
camera.position.set(0, 1.5, 4);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false; controls.enableDamping = true;

/* -------- 3.  The Water2 plane -------- */
const geometry = new THREE.PlaneGeometry(8, 4, 256, 256); // ↑ segments control wave detail
const textureLoader = new THREE.TextureLoader();

const water = new Water(geometry, {
  color:           '#44c4ff',     // base pigment
  scale:           4,             // larger = finer ripples
  flowDirection:   new THREE.Vector2(1, 1), // diagonal drift
  textureWidth:    1024,          // off‑screen render target sizes
  textureHeight:   1024,
  // custom bump map gives softer “ink bleed”
  normalMap0: textureLoader.load('./textures/waternormals.jpg', t=>{
             t.wrapS = t.wrapT = THREE.RepeatWrapping; }),
  normalMap1: textureLoader.load('./textures/waternormals.jpg', t=>{
             t.wrapS = t.wrapT = THREE.RepeatWrapping; })
});

water.rotation.x = -Math.PI/2;     // lie it flat
scene.add(water);

/* -------- 4.  Ambient lighting so colours pop -------- */
scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.8));

/* -------- 5.  Animation loop -------- */
renderer.setAnimationLoop( (time)=>{
  water.material.uniforms.time.value = time * 0.0003;  // slower = calmer
  controls.update();
  renderer.render(scene, camera);
});

/* -------- 6.  Resize handler -------- */
function resize(){
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}
