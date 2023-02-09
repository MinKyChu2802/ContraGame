'use client';
import { NextPage } from "next";
import React,{useEffect} from "react";
import * as THREE from "three";

const Map: NextPage = () => {
  // return <button onClick={()=>console.log('A')}>A</button>
  const loader = new THREE.TextureLoader();
  const scene = new THREE.Scene();
  const texture = loader.load("/assets/img/l1.png");
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const geometry = new THREE.PlaneGeometry(
    texture.image?.width,
    texture.image?.height
  );
  const mesh = new THREE.Mesh(geometry, material);

  useEffect(() => {
    scene.add(mesh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Map;
