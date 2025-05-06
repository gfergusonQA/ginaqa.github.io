/* Gina – Water‑colour hero  |  assets/js/main.js  */
import * as THREE          from 'https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js';
import { Water }           from 'https://cdn.jsdelivr.net/npm/three@0.164/examples/jsm/objects/Water2.js';
import { OrbitControls }   from 'https://cdn.jsdelivr.net/npm/three@0.164/examples/jsm/controls/OrbitControls.js';

/* ---------- Renderer ---------- */
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('pond'),
  antialias:true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
resize();
window.addEventListener('resize', resize);

/* ---------- Scene / Camera ---------- */
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 1, 1000);
camera.position.set(0,1.5,4);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableDamping = true;

/* ---------- Water plane ---------- */
const geometry = new THREE.PlaneGeometry(8,4,256,256);
const loader   = new THREE.TextureLoader();

/* correct relative URL to texture */
const normalURL = new URL('../assets/images/waternormals.jpg', import.meta.url).href;

const water = new Water(geometry,{
  color:'#44c4ff',
  scale:4,
  flowDirection:new THREE.Vector2(1,1),
  textureWidth:1024,
  textureHeight:1024,
  normalMap0:loader.load(normalURL, t=>{t.wrapS=t.wrapT=THREE.RepeatWrapping;}),
  normalMap1:loader.load(normalURL, t=>{t.wrapS=t.wrapT=THREE.RepeatWrapping;})
});
water.rotation.x = -Math.PI/2;
scene.add(water);

/* ---------- Lighting ---------- */
scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.8));

/* ---------- Loop ---------- */
renderer.setAnimationLoop(time=>{
  water.material.uniforms.time.value = time*0.0003;  // wave speed
  controls.update();
  renderer.render(scene, camera);
});

/* ---------- Resize handler ---------- */
function resize(){
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}
