import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  Sticky,
  MoveOut,
  StickyIn,
  FadeIn,
  ZoomIn,
  Move,
  MoveIn,
} from "react-scroll-motion";
import { useEffect } from "react";
import SceneInit from "../lib/SceneInit";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
// import asset from '../../public/assets/mountain_king'
export const HomePage = () => {
  const zoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
  const fadeUp = batch(Fade(), Sticky(), Move());
  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initialize();
    test.animate();

    // const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    let loadedModel;
    const glftLoader = new GLTFLoader();
    glftLoader.load("assets/mountain_king/scene.gltf", (gltfScene) => {
      loadedModel = gltfScene.scene;
      gltfScene.scene.add(gltfScene);
      console.log(loadedModel);

      //   gltfScene.scene.rotation.y = Math.PI / 126;
      //   gltfScene.scene.position.y = 30;
      gltfScene.scene.position.z = Math.PI / 126;
      gltfScene.scene.scale.set(40, 40, 40);

      test.scene.add(gltfScene.scene);
    });

    const animate = () => {
      if (loadedModel) {
        loadedModel.rotation.x -= 0.1;
        loadedModel.rotation.y += 0.0;

        loadedModel.scene.rotation.x += 0.01;

        // loadedModel.scene.rotation.x -= 0.0002;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <ScrollContainer snap="mandatory">
        <ScrollPage>
          <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
            <h2>Let me show you scroll animation 😀</h2>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator animation={zoomInScrollOut}>
            <h2>Fade scroll out 😀</h2>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator animation={fadeUp}>
            <h2>Fade up 😀</h2>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <div className="section-3">
            <h2>
              <Animator animation={MoveIn(-1000, 0)}>Hi</Animator>
              <Animator animation={MoveIn(1000, 0)}>My name</Animator>
              <Animator animation={MoveIn(-1000, 0)}>is</Animator>
              <Animator animation={MoveIn(1000, 0)}>Temuujin</Animator>
            </h2>
          </div>
        </ScrollPage>
        <ScrollPage>
          <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
            <canvas id="myThreeJsCanvas" />
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </>
  );
};
