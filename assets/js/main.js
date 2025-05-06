import * as THREE from 'https://cdn.skypack.dev/three@0.164.1';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.164.1/examples/jsm/controls/OrbitControls.js';
// This one still fails:
import { Water } from 'https://cdn.skypack.dev/three@0.164.1/examples/jsm/objects/Water2.js';




const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('pond'),
  antialias:true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
resize();
window.addEventListener('resize', resize);

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 1, 1000);
camera.position.set(0, 0, 4);  // make sure it’s centered on the plane

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableDamping = true;

const geometry = new THREE.PlaneGeometry(8, 4, 256, 256);
const loader   = new THREE.TextureLoader();
const normalURL = new URL('../assets/images/waternormals.jpg', import.meta.url).href;

const water = new Water(geometry, {
  color: '#44c4ff',
  scale: 4,
  flowDirection: new THREE.Vector2(1, 1),
  textureWidth: 1024,
  textureHeight: 1024,
  normalMap0: loader.load(normalURL, t => { t.wrapS = t.wrapT = THREE.RepeatWrapping }),
  normalMap1: loader.load(normalURL, t => { t.wrapS = t.wrapT = THREE.RepeatWrapping })
});
water.rotation.x = -Math.PI / 2;
scene.add(water);

scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.8));

renderer.setAnimationLoop(time => {
  water.material.uniforms.time.value = time * 0.0003;
  controls.update();
  renderer.render(scene, camera);
});

function resize(){
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}
