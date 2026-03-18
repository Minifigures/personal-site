"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Water } from "three/examples/jsm/objects/Water.js";
import {
  PlaneGeometry,
  TextureLoader,
  RepeatWrapping,
  Vector3,
  type Mesh,
} from "three";

export function Ocean() {
  const ref = useRef<Mesh>(null);
  const { scene } = useThree();

  const waterNormals = useMemo(() => {
    const loader = new TextureLoader();
    const texture = loader.load("/textures/waternormals.jpg");
    texture.wrapS = texture.wrapT = RepeatWrapping;
    return texture;
  }, []);

  const water = useMemo(() => {
    const geometry = new PlaneGeometry(10000, 10000);
    const w = new Water(geometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new Vector3(100, 5, -100).normalize(),
      sunColor: 0xff8c42,
      waterColor: 0x1a6b6b,
      distortionScale: 3.7,
      fog: scene.fog !== undefined,
    });
    w.rotation.x = -Math.PI / 2;
    w.position.y = -0.5;
    return w;
  }, [waterNormals, scene.fog]);

  useFrame((_state, delta) => {
    if (water.material.uniforms["time"]) {
      water.material.uniforms["time"].value += delta * 0.5;
    }
  });

  return <primitive ref={ref} object={water} />;
}
