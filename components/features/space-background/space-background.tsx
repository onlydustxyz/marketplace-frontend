"use client";

import { useEffect, useRef } from "react";
import { useWindowSize } from "react-use";
import { useMediaQuery } from "usehooks-ts";

import { viewportConfig } from "src/config";

import { IStar, Star } from "components/features/space-background/Class/Star";

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const size = useWindowSize();
  const scaleCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const dpr = window.devicePixelRatio;
    const rect = { width: window.innerWidth, height: window.innerHeight };
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    canvas.getContext("2d", { alpha: false });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    let animationFrameId: number;
    let frameCount = 0;
    const stars: IStar[] = [];
    const boost = {
      1: -1,
      2: -1,
      3: -1,
      4: -1,
    };
    if (canvas && context) {
      const numberOfStars = window.innerWidth / 5;
      //Our draw came here
      scaleCanvas(canvas, context);
      window.addEventListener("resize", () => scaleCanvas(canvas, context));
      [...Array(Math.round(numberOfStars)).keys()].forEach(() => {
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
          }
          stars.forEach((star, i) => {
            const isBoosted = i === boost["1"] || i === boost["2"];
            star.animate(isBoosted);
          });
          animationFrameId = window.requestAnimationFrame(render);
        }
      };
      render();
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [size]);

  if (!isXl) {
    return <div className="od-space-background fixed left-0 top-0 -z-[1] h-full w-full" />;
  }

  return <canvas ref={canvasRef} className="fixed left-0 top-0 -z-[1] h-full w-full bg-space-gradient" />;
}
