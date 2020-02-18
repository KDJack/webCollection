/*
Most of the stuff in here is just bootstrapping. Essentially it's just
setting ThreeJS up so that it renders a flat surface upon which to draw 
the shader. The only thing to see here really is the uniforms sent to 
the shader. Apart from that all of the magic happens in the HTML view
under the fragment shader.
*/

let container;
let camera, scene, renderer;
let uniforms;

let loader = new THREE.TextureLoader();
let texture;
loader.setCrossOrigin("anonymous");
loader.load(
'http://sources.yijialaobao.com/sources/goods/img/719_75b62ecdda9f4fdd9da4ebe75cfbe5c5_256X256_big.png-c',
function do_something_with_texture(tex) {
  texture = tex;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  init();
  animate();
});

// let texture = new THREE.Texture();
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.minFilter = THREE.LinearFilter;
// texture.magFilter = THREE.NearestFilter;

function init() {
  container = document.getElementById('container');

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  var geometry = new THREE.PlaneBufferGeometry(2, 2);

  uniforms = {
    u_time: { type: "f", value: -10009.5 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() },
    u_noise: { type: "t", value: texture },
    u_mousemoved: { type: "b", value: false } };


  let alpha = null;
  let beta = null;
  let gamma = null;
  let i_alpha = null;
  let i_beta = null;
  let i_gamma = null;
  let give = 30;

  let clamp = function (number, min, max) {
    return Math.min(Math.max(number, min), max);
  };

  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent });


  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(1);
  // renderer.setPixelRatio( window.devicePixelRatio );

  container.appendChild(renderer.domElement);

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  document.addEventListener('pointermove', e => {
    let ratio = window.innerHeight / window.innerWidth;
    uniforms.u_mouse.value.x = (e.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
    uniforms.u_mouse.value.y = (e.pageY - window.innerHeight / 2) / window.innerHeight * -1;
    uniforms.u_mousemoved.value = true;

    e.preventDefault();
  });
}

function onWindowResize(event) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  uniforms.u_time.value += 0.01;
  uniforms.u_time.value = uniforms.u_time.value % 1000000;
  renderer.render(scene, camera);
}