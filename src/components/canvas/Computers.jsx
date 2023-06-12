import React from "react";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import CanvasLoader from "../loader";
import * as THREE from "three";

const cameraa = new THREE.PerspectiveCamera(25, 0.7, 1, 1000);
cameraa.position.set(20, 3, 5);
cameraa.lookAt(new THREE.Vector3(1, 1, 1));

let container, stats;
let camera, scene, raycaster, renderer;

let INTERSECTED;
let theta = 0;

const pointer = new THREE.Vector2();
const radius = 100;

const Computers = ({ cameraR, comp }) => {
  //const computer = useGLTF("./desktop_pc/scene.gltf");

  camera = cameraR;
  scene = comp.scene;
  useEffect(() => {
    //const pointer = new THREE.Vector2();
    raycaster = new THREE.Raycaster();

    const onMouseMove = (event) => {
      //console.log("mouserover");
      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components
      console.log("onMouseMove");
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, cameraa);
      const intersects = raycaster.intersectObjects(comp.scene.children);

      // for (let i = 0; i < intersects.length; i++) {
      //   console.log(intersects);
      // }

      // change color of objects intersecting the raycaster
      // for (let i = 0; i < intersects.length; i++) {
      //   intersects[i].object.material.color.set(0xff0000);
      // }

      // change color of the closest object intersecting the raycaster
      if (intersects.length > 0) {
        intersects[0].object.material.color.set(0xff0000);
      }
    };
    window.addEventListener("mousemove", onMouseMove);
  }, []);
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={comp.scene}
        scale={0.75}
        position={[0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = ({ camera, comp }) => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={cameraa}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers cameraR={camera} comp={comp} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};
//{ position: [20, 3, 5], fov: 25 }
export default ComputersCanvas;

function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();
}

function render() {
  theta += 0.1;

  camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(theta));
  camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta));
  camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(theta));
  camera.lookAt(scene.position);

  camera.updateMatrixWorld();

  // find intersections

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(scene.children, false);

  if (intersects.length > 0) {
    if (INTERSECTED != intersects[0].object) {
      if (INTERSECTED)
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

      INTERSECTED = intersects[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex(0xff0000);
    }
  } else {
    if (INTERSECTED)
      INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

    INTERSECTED = null;
  }

  renderer.render(scene, camera);
}
