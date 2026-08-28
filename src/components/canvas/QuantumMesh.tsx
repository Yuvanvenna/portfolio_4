'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface QuantumMeshProps {
  isHovered?: boolean;
}

export default function QuantumMesh({ isHovered = false }: QuantumMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverSpeedRef = useRef(0.008);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    if (!container) return;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    
    // Position camera to fit the torus knot nicely
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    
    // Fit canvas to parent container
    const resizeCanvas = () => {
      const width = container.clientWidth;
      const height = container.clientHeight || 260; // fallback height
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create low-poly torus knot geometry to represent quantum state space
    const geometry = new THREE.TorusKnotGeometry(1.3, 0.38, 50, 6, 2, 3);
    
    // Gradient coloring for the wireframe
    const material = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan primary
      wireframe: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add a secondary inner wireframe sphere with indigo tint to symbolize the bloch sphere
    const sphereGeometry = new THREE.SphereGeometry(0.8, 12, 12);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1, // Indigo secondary
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphereMesh);

    // Scroll suspension using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      // Lerp rotation speed based on hover state
      const targetSpeed = isHovered ? 0.032 : 0.008;
      hoverSpeedRef.current += (targetSpeed - hoverSpeedRef.current) * 0.1;

      // Update rotation angles
      mesh.rotation.x += hoverSpeedRef.current * 0.8;
      mesh.rotation.y += hoverSpeedRef.current;
      
      sphereMesh.rotation.x -= hoverSpeedRef.current * 0.4;
      sphereMesh.rotation.y -= hoverSpeedRef.current * 0.5;

      // Pulse opacity slightly based on time
      const time = Date.now() * 0.001;
      material.opacity = 0.65 + Math.sin(time * 2) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full max-h-[280px] pointer-events-none z-10"
      style={{ display: 'block' }}
    />
  );
}
