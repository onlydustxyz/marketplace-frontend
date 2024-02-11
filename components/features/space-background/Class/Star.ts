export interface IStar {
  coordinate: Coordinates;
  radius: number;
  velocity: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  draw: () => void;
  animate: (boost: boolean) => void;
}

interface Coords {
  x: number;
  y: number;
}

interface Coordinates {
  initial: Coords;
  controlled: Coords;
  range: {
    max: Coords;
    min: Coords;
  };
  config: {
    direction: "bottom" | "top";
  };
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
  coordinate: Coordinates;
  radius: number;
  color: number[];
  velocity: number;
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
    const sizeRange = [0.1, 3];
    this.coordinate = {
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
      },
    };

    this.radius = Math.random() * 2.5;
    this.velocity = Math.random() * 0.015;
    this.speed = Math.random() * 1;
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
    // console.log("velocity", `rgba(${this.color.join(",")}, ${this.opacity})`);
    // console.log("this.velocity", this.velocity);
    // console.log("this.opacity", this.opacity);
    // console.log("this.opacity", `rgba(${this.color.join(",")}, ${this.opacity})`);
    const { x, y } = this.coordinate.controlled;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(${this.color.join(",")},${this.opacity})`;
    // console.log(`rgba(${this.color.join(",")}, ${this.opacity})`);
    // console.log(`velocity`, this.velocity);
    // console.log(`rgba(${this.color.join(",")}, ${this.opacity})`);
    this.ctx.fill();
  }
  private update() {
    if (this.opacity >= 1) {
      this.factor = -1;
      this.opacity = 1;
      this.shineCompleted = true;
    } else if (this.opacity <= 0) {
      this.factor = 1;
      this.opacity = 0;
    }
    this.opacity += this.velocity * this.factor;
    // console.log("this.opacity", this.opacity);
    // if (this.opacity < 0) {
    //   this.opacity = 1;
    // }
    this.draw();
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

    this.opacity += this.velocity * this.factor;
  }

  private move(boost: boolean) {
    let rangeMinY = this.coordinate.range.min.y;
    let intialY = this.coordinate.initial.y;

    let speed = this.speed;
    if (boost) {
      speed = 20;
      rangeMinY = rangeMinY - window.innerWidth;
      intialY = rangeMinY + window.innerWidth;
    }
    if (this.coordinate.controlled.y <= rangeMinY) {
      this.coordinate.config.direction = "top";
    } else if (this.coordinate.controlled.y >= rangeMinY && this.coordinate.controlled.y >= intialY) {
      this.coordinate.config.direction = "bottom";
    }

    if (this.coordinate.config.direction === "bottom") {
      this.coordinate.controlled.y -= 0.3 * speed;
      this.coordinate.controlled.x += 0.2 * speed;
    } else {
      this.coordinate.controlled.x -= 0.2 * speed;
      this.coordinate.controlled.y += 0.3 * speed;
    }
  }

  animate(boost: boolean) {
    this.shine(boost);
    this.move(boost);
    this.draw();
  }
}
