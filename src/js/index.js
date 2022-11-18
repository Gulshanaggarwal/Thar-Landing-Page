// Option 2: Import just the parts you need.
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PointLight,
  MeshPhongMaterial,
  SphereGeometry,
  Mesh,
  TextureLoader,
  Color,
  MathUtils,
  MeshBasicMaterial,
  OrthographicCamera,
} from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import imageMarsColor from "../assets/marsColor.jpg";
import imageMarsTexture from "../assets/marsBump.jpg";

const canvasContainer = document.querySelector(".threeContainer");
const canvas = document.querySelector("#threeCanvas");

const scene = new Scene();
//camera
const camera = new PerspectiveCamera(
  75,
  canvasContainer.clientWidth / canvasContainer.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 20, 60);

const orthoCamera = new OrthographicCamera(
  canvasContainer.clientWidth / -85,
  canvasContainer.clientWidth / 85,
  canvasContainer.clientHeight / -85,
  canvasContainer.clientHeight / 85,
  1,
  1000
);

//renderer
const renderer = new WebGLRenderer({
  canvas: document.getElementById("threeCanvas"),
});
canvas.style.height = canvasContainer.clientHeight;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
renderer.setClearColor(0x000000, 0);
// -----------objects----------------

//mesh
const mars = new Mesh(
  new SphereGeometry(Math.max(canvasContainer.clientWidth * 0.004, 4), 50, 50),
  new MeshPhongMaterial({
    color: 0xffffff,
    map: new TextureLoader().load(imageMarsColor),
    bumpMap: new TextureLoader().load(imageMarsTexture),
    bumpScale: 1,
    specularMap: new TextureLoader().load(imageMarsTexture),
    specular: new Color("gray"),
    displacementMap: new TextureLoader().load(imageMarsTexture),
    displacementScale: 1,
  })
);

//stars

function addStar() {
  const geometry = new SphereGeometry(0.02, 24, 24);
  const material = new MeshBasicMaterial({
    color: 0xffffff,
  });
  const star = new Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => MathUtils.randFloatSpread(40));
  star.position.set(x, y, z);
  // star.position.set(50, 50, 50);
  scene.add(star);
}

const pointLight = new PointLight(0xffffff);
pointLight.position.set(50, 0, -50);

//scene
scene.add(pointLight, mars);

for (let i = 1; i < 500; i++) {
  addStar();
}

function animate() {
  requestAnimationFrame(animate);
  mars.rotation.y -= 0.005;
  renderer.render(scene, orthoCamera);
}
animate();

function animateMars() {
  let height = canvasContainer.clientHeight / 2;
  // mars.position.lerp(targetPosition, smoothness);
  let num = requestAnimationFrame(animateMars);
  mars.translateY(0.05);
  console.log(num);
  cancelAnimationFrame(height);
}

document
  .querySelector(".navigationContainer")
  .addEventListener("click", animateMars);
