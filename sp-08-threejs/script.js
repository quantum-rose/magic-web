import * as THREE from '../libs/three.module.js';
import OrbitControls from '../libs/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(2, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);

const ambient = new THREE.AmbientLight(0x333333);
scene.add(ambient);

const pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(200, 200, 200);
scene.add(pointLight1);

// const pointLight2 = new THREE.PointLight(0x888888);
// pointLight2.position.set(-200, -200, -200);
// scene.add(pointLight2);

const line = (function () {
    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0), new THREE.Vector3(0, 10, 0), new THREE.Vector3(10, 0, 0));
    const material = new THREE.LineBasicMaterial({ color: 0x00ffff });
    const geomerty = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geomerty, material);
})();
scene.add(line);

const cube = (function () {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    return new THREE.Mesh(geometry, material);
})();
scene.add(cube);

const earth = (function () {
    const geometry = new THREE.SphereGeometry(1, 40, 40);
    const material = new THREE.MeshStandardMaterial({ color: 0x0000ff, opacity: 1, transparent: true });
    return new THREE.Mesh(geometry, material);
})();
earth.position.set(10, 0, 0);
scene.add(earth);

const moon = (function () {
    const geometry = new THREE.SphereGeometry(0.4, 40, 40);
    const material = new THREE.MeshPhongMaterial({ color: 0xcccccc });
    return new THREE.Mesh(geometry, material);
})();
moon.position.set(12, 0, 0);
scene.add(moon);

const cylinder = (function () {
    const geometry = new THREE.CylinderGeometry(1, 2, 2, 40);
    const material = new THREE.MeshLambertMaterial({
        color: 0x00ff00,
        opacity: 0.7,
        transparent: true,
        wireframe: false,
    });
    return new THREE.Mesh(geometry, material);
})();
cylinder.position.set(5, 0, 0);
scene.add(cylinder);

const foo = (function () {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([0, 0, 0, 5, 0, 0, 0, 10, 0, 0, 0, 1, 0, 0, 10, 5, 0, 1]);
    const attribute = new THREE.BufferAttribute(vertices, 3);
    geometry.attributes.position = attribute;
    const material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide,
    });
    return new THREE.Mesh(geometry, material);
})();
scene.add(foo);

const render = function () {
    const t = Date.now() - render.lastTime;
    render.lastTime = Date.now();
    render.earthRad += 0.02;
    render.moonRad += 0.1;

    const earthX = Math.cos(render.earthRad) * 10;
    const earthZ = Math.sin(render.earthRad) * 10;
    earth.position.set(earthX, 0, earthZ);
    const moonX = Math.cos(render.moonRad) * 2 + earthX;
    const moonZ = Math.sin(render.moonRad) * 2 + earthZ;
    moon.position.set(moonX, 0, moonZ);

    cube.rotation.x += 0.015625;
    cube.rotation.y += 0.015625;
    cube.rotation.z += 0.015625;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
};
render.lastTime = Date.now();
render.earthRad = 0;
render.moonRad = 0;

render();

new OrbitControls(camera, renderer.domElement);
