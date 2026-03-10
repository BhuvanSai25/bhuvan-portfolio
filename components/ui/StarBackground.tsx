import React, { useEffect, useRef } from 'react';

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    const starCount = 150;

    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2;
        this.opacity = Math.random();
        this.speed = Math.random() * 0.05;
      }

      update() {
        this.opacity += this.speed;
        if (this.opacity > 1 || this.opacity < 0) {
          this.speed = -this.speed;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;

      constructor() {
        this.reset();
        this.opacity = 0; 
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.5;
        this.length = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 5;
        this.angle = Math.PI / 4;
        this.opacity = 1;
      }

      update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.opacity -= 0.02;

        if (this.opacity <= 0 || this.x > width || this.y > height) {
          if (Math.random() < 0.02) { 
             this.reset();
             this.x = Math.random() * width;
             this.y = -50;
          } else {
             this.opacity = 0;
          }
        }
      }

      draw() {
        if (!ctx || this.opacity <= 0) return;
        const endX = this.x - this.length * Math.cos(this.angle);
        const endY = this.y - this.length * Math.sin(this.angle);

        const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
        gradient.addColorStop(0, `rgba(16, 185, 129, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(16, 185, 129, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    }

    const initStars = () => {
      stars = [];
      shootingStars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
      for (let i = 0; i < 3; i++) {
        shootingStars.push(new ShootingStar());
      }
    };

    initStars();

    const animate = () => {
      // Paint background opaque black
      ctx.fillStyle = '#09090b'; 
      ctx.fillRect(0, 0, width, height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      shootingStars.forEach(s => {
          s.update();
          s.draw();
      });

      if (Math.random() < 0.01 && shootingStars.every(s => s.opacity <= 0)) {
         shootingStars.find(s => s.opacity <= 0)?.reset();
      }

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars(); // Re-initialize stars to fill new dimensions
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full pointer-events-none"
    />
  );
};

export default StarBackground;