// import React, { useRef, useEffect } from "react";
// import * as THREE from "three";

// const Earth = () => {
//   const earthRef = useRef(null);

//   useEffect(() => {
//     // Création de la scène, de la caméra et du rendu
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xffffff);
//     //scene.background.setAlpha(0); // Définir la couleur de fond sur blanc

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 5;
//     const renderer = new THREE.WebGLRenderer({ alpha: true }); // Définissez alpha sur true pour un fond transparent
//     renderer.setClearColor(0xffffff, 0); // Définissez la couleur de fond sur blanc et l'opacité sur 0 pour un fond transparent
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     earthRef.current.appendChild(renderer.domElement);

//     // Création de la Terre avec texture
//     const geometry = new THREE.SphereGeometry(2, 32, 32);
//     const texture = new THREE.TextureLoader().load(
//       "megalith-react/src/assets/Earth.jpg"
//     ); // Charger votre texture de Terre ici
//     const material = new THREE.MeshBasicMaterial({ map: texture });
//     const earth = new THREE.Mesh(geometry, material);
//     scene.add(earth);

//     // Animation de la Terre
//     const animate = () => {
//       requestAnimationFrame(animate);
//       earth.rotation.y += 0.005;
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Mise à jour de la taille du rendu lors du redimensionnement de la fenêtre
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener("resize", handleResize);

//     // Nettoyage de la scène lors du démontage du composant
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       renderer.domElement.remove();
//     };
//   }, []);

//   return <div ref={earthRef} className="earth-container" />;
// };

// export default Earth;
