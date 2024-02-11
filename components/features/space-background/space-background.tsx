"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { IStar, Star } from "components/features/space-background/Class/Star";

import { TSpaceBackground } from "./space-background.types";

const colors = [
  [0, 255, 228],
  [51, 60, 145],
  [255, 144, 0],
  [174, 0, 255],
];
const sizeRange = [0.1, 3];
const density = 500;

export function SpaceBackground({ children }: TSpaceBackground.Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.width);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const createStars = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, frameCount: number) => {
    const array = [...Array(density).keys()];
    array.forEach((_, i) => {
      console.log("III", i);
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shinyAnimation = Math.sin(frameCount * 0.05) ** 2;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.fillStyle = `rgba(${color.join(",")}, ${shinyAnimation})`;
      ctx.fill();
    });
  };

  const scaleCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    let frameCount = 0;
    let animationFrameId: any;
    const stars: IStar[] = [];
    let boost1 = -1;
    const boost = {
      1: -1,
      2: -1,
      3: -1,
      4: -1,
    };
    if (canvas && context) {
      //Our draw came here
      scaleCanvas(canvas, context);
      [...Array(density).keys()].forEach((_, i) => {
        const star = new Star(canvas, context);
        stars.push(star);
        star.draw();
      });

      const render = () => {
        frameCount++;
        if (context && canvas) {
          context.clearRect(0, 0, context.canvas.width, context.canvas.width);
          if (frameCount % 100 === 0) {
            boost["1"] = Math.floor(Math.random() * stars.length);
            boost["2"] = Math.floor(Math.random() * stars.length);
            boost["3"] = Math.floor(Math.random() * stars.length);
            boost["4"] = Math.floor(Math.random() * stars.length);
          }
          stars.forEach((star, i) => {
            const isBoosted = i === boost["1"] || i === boost["2"] || i === boost["3"] || i === boost["4"];
            star.animate(isBoosted);
          });
          // draw(context, frameCount);
          animationFrameId = window.requestAnimationFrame(render);
        }
      };
      render();
      // const render = () => {
      //   frameCount++;
      //   if (context && canvas) {
      //     context.clearRect(0, 0, context.canvas.width, context.canvas.width);
      //     createStars(canvas, context, frameCount);
      //     // draw(context, frameCount);
      //     animationFrameId = window.requestAnimationFrame(render);
      //   }
      // };
      // render();
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="fixed left-0 top-0 -z-[1] h-full w-full bg-space-gradient" />;
  // return createPortal(
  //   <canvas ref={canvasRef} className="fixed left-0 top-0 z-[9999] h-full w-full bg-space-gradient" />,
  //   document.body
  // );
}
