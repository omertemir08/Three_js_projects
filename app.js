// app.js
import * as THREE from '/../../src/three.js'; // Adjust the path as needed


const canvas= document.getElementById("canvas")

const canvassize = {
    width: window.innerWidth,
    hegiht: window.innerHeight,
}

const scene = new THREE.Scene();

const cameraParams ={
    fov : 45,
    AspectRatio: canvassize.width / canvassize.hegiht,
   near : 0.001,
   far : 100 

}
const camera = new THREE.PerspectiveCamera(
    cameraParams.fov,
    cameraParams.AspectRatio,
    cameraParams.near,
    cameraParams.far
  );
  
camera.position.set(1,1.2,5)



scene.add(camera)

const geomtry = new THREE.BoxGeometry(1,1,1);

const matreial = new THREE.MeshBasicMaterial({
    wireframe: true
});

const mesh = new THREE.Mesh(geomtry,matreial)

scene.add(mesh);

const renderer = new THREE.WebGLRenderer({
    canvas:canvas

})
 renderer.setSize(canvassize.width, canvassize.hegiht)
 renderer.render(scene,camera);