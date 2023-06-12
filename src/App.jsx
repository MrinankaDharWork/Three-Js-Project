import { BrowserRouter } from "react-router-dom";
import { Navbar, Hero, About, Contact } from "./components";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

const App = () => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const cameraa = new THREE.PerspectiveCamera(25, 0.7, 1, 1000);
  cameraa.position.set(20, 3, 5);
  cameraa.lookAt(new THREE.Vector3(1, 1, 1));
  // useEffect(() => {
  //   cameraa.position.set(20, 3, 5);
  //   cameraa.lookAt(new THREE.Vector3(1, 1, 1));

  //   const pointer = new THREE.Vector2();
  //   const raycaster = new THREE.Raycaster();

  //   const onMouseMove = (event) => {
  //     //console.log("mouserover");
  //     // calculate pointer position in normalized device coordinates
  //     // (-1 to +1) for both components
  //     console.log("onMouseMove");
  //     pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  //     pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //     raycaster.setFromCamera(pointer, cameraa);
  //     const intersects = raycaster.intersectObjects(computer.scene.children);

  //     // for (let i = 0; i < intersects.length; i++) {
  //     //   console.log(intersects);
  //     // }

  //     // change color of objects intersecting the raycaster
  //     // for (let i = 0; i < intersects.length; i++) {
  //     //   intersects[i].object.material.color.set(0xff0000);
  //     // }

  //     // change color of the closest object intersecting the raycaster
  //     if (intersects.length > 0) {
  //       intersects[0].object.material.color.set(0xff0000);
  //     }
  //   };
  //   window.addEventListener("mousemove", onMouseMove);
  // }, []);
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero camera={cameraa} comp={computer} />
          <About />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

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
