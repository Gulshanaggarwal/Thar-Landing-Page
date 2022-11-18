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
  Vector3,
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
  canvasContainer.clientWidth * -1,
  canvasContainer.clientWidth,
  canvasContainer.clientHeight * -1,
  canvasContainer.clientHeight,
  1,
  1000
);

const isLandscape = window.innerWidth > window.innerHeight ? true : false;

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
  new SphereGeometry(isLandscape ? window.innerWidth * 0.32 : 600, 100, 100),
  new MeshPhongMaterial({
    // wireframe: true,
    color: 0xffffff,
    map: new TextureLoader().load(imageMarsColor),
    bumpMap: new TextureLoader().load(imageMarsTexture),
    bumpScale: 20,
    specularMap: new TextureLoader().load(imageMarsTexture),
    specular: new Color("gray"),
    displacementMap: new TextureLoader().load(imageMarsTexture),
    displacementScale: 20,
  })
);

//stars

function addStar() {
  const geometry = new SphereGeometry(0.1, 24, 24);
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
pointLight.position.set(window.innerWidth * 0.5, 0, -3.5 * window.innerWidth);

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

let camTop = orthoCamera.top;
let camBottom = orthoCamera.bottom;

window.addEventListener("scroll", (e) => {
  let height = document.body.getBoundingClientRect().y * -1;
  let heightPercent = (height / window.innerHeight) * 100;
  // console.log(heightPercent + "%");
  // let marsAngle = mars;
  if (heightPercent <= 100) {
    scene.rotation.z = -0.012 * heightPercent;

    orthoCamera.position.y = -1 * height * heightPercent * 0.007;
    // orthoCamera.position.y = ;
    pointLight.position.set(
      window.innerWidth * 0.5,
      -0.1 * height * heightPercent,
      -3.5 * window.innerWidth
    );

    orthoCamera.scale.x = 1 - 0.0085 * heightPercent;
    orthoCamera.scale.y = 1 - 0.0085 * heightPercent;
    // mars.geometry.bumpScale = 1000 * heightPercent;
  }
});
