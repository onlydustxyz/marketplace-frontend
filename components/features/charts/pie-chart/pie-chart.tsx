"use client";

import { animate, motion, useAnimate, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Cell, Legend, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import { CustomLegend } from "../custom-legend/custom-legend";
import { CustomTooltip } from "../custom-tooltip/custom-tooltip";
import { TPieChart } from "./pie-chart.types";

function ActiveShape({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }: PieSectorDataItem) {
  const [animationInnerRadius, setAnimationInnerRadius] = useState(innerRadius);
  const [animationOuterRadius, setAnimationOuterRadius] = useState(outerRadius);

  const animation = useRef(
    animate(0, 3, {
      duration: 0.3,
      autoplay: false,
      onUpdate: latest => {
        setAnimationInnerRadius(Number(innerRadius) - latest);
        setAnimationOuterRadius(Number(outerRadius) + latest);
      },
    })
  );

  useEffect(() => {
    animation.current.play();
  }, []);

  return (
    <motion.g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={animationInnerRadius}
        outerRadius={animationOuterRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </motion.g>
  );
}

function CustomizedLabel({
  cx,
  cy,
  innerRadius = 0,
  outerRadius = 0,
  startAngle,
  endAngle,
  fill,
  ...props
}: PieSectorDataItem) {
  const range: { base: [number, number]; reverse: [number, number] } = {
    base: [0, 3],
    reverse: [3, 0],
  };
  const [animationRange, setAnimationRange] = useState<{ range: [number, number]; initial: boolean }>({
    range: range.base,
    initial: true,
  });
  const [animationState, setAnimationState] = useState(0);

  const [animationInnerRadius, setAnimationInnerRadius] = useState(innerRadius);
  const [animationOuterRadius, setAnimationOuterRadius] = useState(outerRadius);

  useEffect(() => {
    const _animate = animate(animationRange.range[0], animationRange.range[1], {
      duration: 0.3,
      autoplay: false,
      onUpdate: latest => {
        setAnimationState(latest);
        setAnimationInnerRadius(Number(innerRadius) - latest);
        setAnimationOuterRadius(Number(outerRadius) + latest);
      },
    });

    if (!animationRange.initial) {
      _animate.pause();
      _animate.time = 0;
      _animate.play();
    }
  }, [animationRange]);

  const onLeave = () => {
    if (animationState === 0) return;
    if (animationState === animationRange.range[1]) {
      setAnimationRange({ range: range.reverse, initial: false });
      return;
    }
    if (animationState !== animationRange.range[1]) {
      setAnimationRange({ range: [animationState, range.reverse[1]], initial: false });
      return;
    }
  };

  const onEnter = () => {
    if (animationState === 3) return;
    if (animationState === animationRange.range[1]) {
      setAnimationRange({ range: range.base, initial: false });
      return;
    }
    if (animationState !== animationRange.range[1]) {
      setAnimationRange({ range: [animationState, range.base[1]], initial: false });
      return;
    }
  };

  return (
    <Sector
      cx={cx}
      cy={cy}
      {...props}
      innerRadius={animationInnerRadius}
      outerRadius={animationOuterRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    />
  );
}

export function PieChart({ data, renderTooltip }: TPieChart.Props) {
  const DEFAULT_COLORS = ["#FFBC66", "#CE66FF", "#666BD7", "#66FFEF", "#F69EF3"];

  return (
    <ResponsiveContainer width="100%" height={148} className="px-12">
      <RechartsPieChart className="[&_.recharts-layer.recharts-pie-sector]:outline-none">
        <Pie
          data={data}
          dataKey="value"
          innerRadius={52}
          outerRadius={70}
          stroke="none"
          cx={74}
          // activeShape={<ActiveShape />}
          label={<CustomizedLabel />}
          labelLine={false}
        >
          {data.map((entry, index) => {
            const color = entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];

            return <Cell key={`cell-${index}`} fill={color} />;
          })}
        </Pie>

        <Legend layout="vertical" verticalAlign="middle" align="right" content={<CustomLegend />} />

        <Tooltip
          content={({ active, payload }) => (
            <CustomTooltip active={active} payload={payload} renderTooltip={renderTooltip} />
          )}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
