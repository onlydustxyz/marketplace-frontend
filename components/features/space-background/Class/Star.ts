interface Coords {
  x: number;
  y: number;
}

interface Positions {
  initial: Coords;
  controlled: Coords;
  range: {
    max: Coords;
    min: Coords;
  };
  config: {
    direction: "bottom" | "top";
    speed: number;
    speedRange: {
      min: number;
      max: number;
    };
    moveRange: {
      x: number;
      y: number;
    };
  };
}

export interface IStar {
  positions: Positions;
  radius: number;
  opacitySpeed: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  draw: () => void;
  animate: (boost: boolean) => void;
}

export class Star implements IStar {
  config = {
    colors: [
      [0, 255, 228],
      [51, 60, 145],
      [255, 144, 0],
      [174, 0, 255],
    ],
  };
  positions: Positions;
  radius: number;
  color: number[];
  opacitySpeed: number;
  speed: number;
  opacity: number;
  factor: number;
  speedFactor: number;
  movedTo: number;
  shineCompleted: boolean;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const [x, y] = [Math.random() * window.innerWidth, Math.random() * window.innerHeight];
    const minSpeed = window.innerWidth * 0.0005;
    const maxSpeed = window.innerWidth * 0.0004;
    this.positions = {
      initial: {
        x,
        y,
      },
      controlled: {
        x,
        y,
      },
      range: {
        max: {
          x,
          y,
        },
        min: {
          x: x - 80,
          y: y - 80,
        },
      },
      config: {
        direction: "top",
        speed: Math.random() * (maxSpeed - minSpeed + 1) + minSpeed,
        speedRange: {
          min: minSpeed,
          max: maxSpeed,
        },
        moveRange: {
          x: window.innerWidth * 0.00002,
          y: window.innerWidth * 0.00003,
        },
      },
    };

    this.radius = Math.random() * 2.5;
    this.opacitySpeed = Math.random() * 0.005;
    this.speed = Math.random() * (maxSpeed - minSpeed + 1) + minSpeed;
    this.shineCompleted = false;
    this.opacity = 1;
    this.factor = 1;
    this.speedFactor = 1;
    this.canvas = canvas;
    this.ctx = ctx;
    this.color = this.config.colors[Math.floor(Math.random() * this.config.colors.length)];

    this.movedTo = 0;
  }
  draw() {
    const { x, y } = this.positions.controlled;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(${this.color.join(",")},${this.opacity})`;
    this.ctx.fill();
  }
  private shine(boost: boolean) {
    if (this.opacity >= 1) {
      this.factor = -1;
      this.opacity = 1;
      this.shineCompleted = true;
    } else if (this.opacity <= 0) {
      this.factor = 1;
      this.opacity = 0;
    }

    if (boost) {
      this.opacity = 1;
    }

    this.opacity += this.opacitySpeed * this.factor;
  }

  private move(boost: boolean) {
    if (this.positions.controlled.y < -10) {
      this.positions.controlled.y = window.innerHeight + 10;
    }
    if (this.positions.controlled.x > window.innerWidth + 10) {
      this.positions.controlled.x = -10;
    }

    let speed = this.positions.config.speed;
    if (boost) {
      speed = (window.innerHeight - (this.positions.controlled.y || 0)) * 0.1;
    }

    this.positions.controlled.y -= this.positions.config.moveRange.y * speed;
    this.positions.controlled.x += this.positions.config.moveRange.x * speed;
  }

  animate(boost: boolean) {
    this.shine(boost);
    this.move(boost);
    this.draw();
  }
}
