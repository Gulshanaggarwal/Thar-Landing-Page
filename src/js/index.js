// Option 2: Import just the parts you need.
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PointLight,
  GridHelper,
  MeshPhongMaterial,
  SphereGeometry,
  Mesh,
  TextureLoader,
  Color,
  MathUtils,
  MeshBasicMaterial,
  OrthographicCamera,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
//geometry
const planet = new SphereGeometry(10, 50, 50);

//material
const texture = new MeshPhongMaterial();
texture.map = new TextureLoader().load(imageMarsColor);
texture.bumpMap = new TextureLoader().load(imageMarsTexture);
texture.specularMap = new TextureLoader().load(imageMarsTexture);
texture.specular = new Color("gray");
texture.bumpScale = 1;

//mesh
const mars = new Mesh(planet, texture);
planet.scale(1.5, 1.5, 1.5);
mars.position.x = -20;

//stars

function addStar() {
  const geometry = new SphereGeometry(0.1, 24, 24);
  const material = new MeshBasicMaterial({
    color: 0xffffff,
  });
  const star = new Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => MathUtils.randFloatSpread(50));
  star.position.set(x, y, z);
  // star.position.set(50, 50, 50);
  scene.add(star);
}

const pointLight = new PointLight(0xffffff);
pointLight.position.set(0, 0, -10);

//scene
scene.add(pointLight, mars);

for (let i = 1; i < 200; i++) {
  addStar();
}

function animate() {
  requestAnimationFrame(animate);

  // mars.rotation.y += 0.001;
  // mars.rotation.x += 0.001;

  // scene.rotation.y += 0.001;
  mars.rotation.y -= 0.001;

  renderer.render(scene, orthoCamera);
}
animate();
