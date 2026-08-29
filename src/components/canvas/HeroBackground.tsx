'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 14, 26);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Grid size configuration
    const countX = 40;
    const countZ = 40;
    const numParticles = countX * countZ;
    const separation = 1.35;

    const positions = new Float32Array(numParticles * 3);
    const initialPositions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    // Theme color palettes (Midnight Indigo & Electric Cyan)
    const colorIndigo = new THREE.Color('#6366F1');
    const colorCyan = new THREE.Color('#06B6D4');

    let idx = 0;
    for (let x = 0; x < countX; x++) {
      for (let z = 0; z < countZ; z++) {
        // Shift grid so the origin (0,0) lies in the center
        const posX = (x - countX / 2) * separation;
        const posZ = (z - countZ / 2) * separation;
        
        positions[idx * 3] = posX;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = posZ;

        initialPositions[idx * 3] = posX;
        initialPositions[idx * 3 + 1] = 0;
        initialPositions[idx * 3 + 2] = posZ;

        // Gradient from Indigo to Cyan
        const t = x / countX;
        const mixedColor = new THREE.Color().lerpColors(colorIndigo, colorCyan, t);
        colors[idx * 3] = mixedColor.r;
        colors[idx * 3 + 1] = mixedColor.g;
        colors[idx * 3 + 2] = mixedColor.b;

        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite using standard circle shader material
    const material = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse movement listener
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Screen resize listener
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Window visibility listener to optimize performance when tab is inactive
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation Loop variables
    const startTime = Date.now();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const time = (Date.now() - startTime) * 0.001;

      // Lerp mouse variables
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const posAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
      const posArray = posAttribute.array as Float32Array;

      // Project standard coordinates to approximate 3D grid area
      const mouse3DX = mouseRef.current.x * 24;
      const mouse3DZ = -mouseRef.current.y * 14;

      let index = 0;
      for (let x = 0; x < countX; x++) {
        for (let z = 0; z < countZ; z++) {
          const posX = initialPositions[index * 3];
          const posZ = initialPositions[index * 3 + 2];

          // Complex layered sine wave formula
          const waveA = Math.sin(posX * 0.25 + time * 1.1) * 0.9;
          const waveB = Math.cos(posZ * 0.25 + time * 0.8) * 0.7;
          const waveC = Math.sin((posX + posZ) * 0.12 + time * 1.4) * 0.4;
          let y = waveA + waveB + waveC;

          // Mouse push ripple logic
          const dx = posX - mouse3DX;
          const dz = posZ - mouse3DZ;
          const dist = Math.sqrt(dx * dx + dz * dz);
          
          if (dist < 7) {
            const influence = 1 - dist / 7;
            const ripple = Math.sin(dist * 1.5 - time * 6.0) * 0.9 * influence;
            y += ripple;
          }

          posArray[index * 3 + 1] = y;
          index++;
        }
      }

      posAttribute.needsUpdate = true;
      particles.rotation.y = time * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: 'block', width: '100vw', height: '100vh' }}
    />
  );
}
