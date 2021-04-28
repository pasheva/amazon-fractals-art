class Phasor {
  constructor(inc) {
    this.phase = 0.0;
    this.inc = inc;
  }
  speed = function (inc) {
    this.inc = inc;
  };
  update = function () {
    this.phase += this.inc;

    while (this.phase > 1) {
      this.phase -= 1;
    }
    while (this.phase < 0) {
      this.phase += 1;
    }
  };
}

function getMeANewTriplet(x, y, h, m) {
  return {
    position: [x, y],
    hue: h,
    phasors: [
      new Phasor(0.0025),
      new Phasor(0.0061),
      new Phasor(0.000627),
      new Phasor(0.01),
    ],
    mode: m,
  };
}

const triplets = [];

let img;
function preload() {
  img = loadImage("bg.jpg");
  soundFormats("mp3");
  jungleSound = loadSound("jungle");
  fireSound = loadSound("fire");
  monkeySound = loadSound("monkey");
}

function setup() {
  createCanvas(1200, 800);
  colorMode(HSB);

  jungleSound.playMode("restart");
  fireSound.playMode("restart");
  monkeySound.playMode("restart");
  // reds
  // top
  triplets.push(getMeANewTriplet(300, 180, 3, 0));
  triplets.push(getMeANewTriplet(430, 180, 3, 0));
  triplets.push(getMeANewTriplet(550, 180, 3, 0));
  triplets.push(getMeANewTriplet(650, 180, 3, 0));

  // bottom
  triplets.push(getMeANewTriplet(380, 800, 3, 0));
  triplets.push(getMeANewTriplet(360, 750, 3, 0));
  triplets.push(getMeANewTriplet(340, 700, 3, 0));
  triplets.push(getMeANewTriplet(340, 650, 3, 0));
  triplets.push(getMeANewTriplet(360, 600, 3, 0));
  triplets.push(getMeANewTriplet(380, 550, 3, 0));

  triplets.push(getMeANewTriplet(400, 500, 3, 0));
  triplets.push(getMeANewTriplet(500, 480, 3, 0));
  triplets.push(getMeANewTriplet(600, 460, 3, 0));
  triplets.push(getMeANewTriplet(700, 440, 3, 0));
  triplets.push(getMeANewTriplet(800, 420, 3, 0));

  triplets.push(getMeANewTriplet(700, 340, 3, 1));
  triplets.push(getMeANewTriplet(800, 320, 3, 1));

  // greens
  triplets.push(getMeANewTriplet(240, 250, 123, 0));
  triplets.push(getMeANewTriplet(300, 350, 123, 0));
  triplets.push(getMeANewTriplet(360, 250, 123, 0));

  triplets.push(getMeANewTriplet(420, 300, 123, 0));
  triplets.push(getMeANewTriplet(480, 250, 123, 0));
  triplets.push(getMeANewTriplet(540, 300, 123, 0));
  triplets.push(getMeANewTriplet(600, 250, 123, 0));

  triplets.push(getMeANewTriplet(220, 400, 123, 0));
  triplets.push(getMeANewTriplet(280, 350, 123, 0));
  triplets.push(getMeANewTriplet(340, 400, 123, 0));
  triplets.push(getMeANewTriplet(400, 350, 123, 0));
  triplets.push(getMeANewTriplet(420, 400, 123, 0));
  triplets.push(getMeANewTriplet(480, 350, 123, 0));
  triplets.push(getMeANewTriplet(540, 400, 123, 0));
  triplets.push(getMeANewTriplet(600, 350, 123, 0));

  triplets.push(getMeANewTriplet(240, 400, 123, 0));
  triplets.push(getMeANewTriplet(300, 450, 123, 0));
  triplets.push(getMeANewTriplet(200, 450, 123, 0));
  triplets.push(getMeANewTriplet(200, 500, 123, 0));
  triplets.push(getMeANewTriplet(210, 550, 123, 0));
  triplets.push(getMeANewTriplet(225, 600, 123, 0));
}

function draw() {
  clear();
  image(img, 0, 0);

  // console.log(mouseX, mouseY);

  triplets.forEach(({ position, phasors, hue, mode }) => {
    push();
    if (
      (mouseX > 300 && mouseX < 650 && mouseY > 105 && mouseY < 185) ||
      (mouseX > 340 && mouseX < 700 && mouseY > 350 && mouseY < 800)
    ) {
      if (!fireSound.isPlaying()) {
        monkeySound.stop();
        jungleSound.stop();
        fireSound.loop();
      }
      if (hue == 3 && mode == 0) {
        phasors[0].speed(0.0125);
      }
    } else {
      if (hue == 3) {
        phasors[0].speed(0.0025);
      }
    }

    if (mouseX > 200 && mouseX < 700 && mouseY > 250 && mouseY < 350) {
      if (!jungleSound.isPlaying()) {
        monkeySound.stop();
        fireSound.stop();
        jungleSound.loop();
      }

      if (hue == 123) {
        phasors[0].speed(0.0125);
      }
    } else {
      if (hue == 123) {
        phasors[0].speed(0.0025);
      }
    }

    if (mouseX > 700 && mouseX < 850 && mouseY > 250 && mouseY < 300) {
      if (!monkeySound.isPlaying()) {
        jungleSound.stop();
        fireSound.stop();
        monkeySound.play();
      }
    }

    // Fixing orientation
    translate(position[0], position[1]);
    rotate(PI / -2);
    animatedFractal(phasors, 40, 0, hue, mode);
    pop();
    phasors.forEach((phasor) => phasor.update());
  });
}

function mouseClicked() {
  if (mouseX > 700 && mouseX < 850 && mouseY > 250 && mouseY < 300) {
    if (mouseX > 800) {
      window.open("https://youtu.be/2ocykBzWDiM?autoplay=1");
    }
    window.open(
      "https://www.washingtonpost.com/graphics/2019/world/amp-stories/amazon-fires-causes-rainforest-climate-change/"
    );
  }
}

function animatedFractal(phasors, length, gen, h, mode) {
  gen++;
  var end = createVector(length, 0);

  if (gen > 1) {
    // colors and thickness
    console.log(mode);
    if (mode == 1) {
      h = gen * 20 - phasors[3].phase * 360;
      while (h > 360) {
        h -= 360;
      }
      while (h < 0) {
        h += 360;
      }
    }
    stroke(h, 90, 100, 0.7);
    // Strokes get thinner with each generation
    strokeWeight((1 / gen) * 5);
    line(0, 0, end.x, end.y);
  }

  // Create new branches. Terminates if length is less 5 or less.
  if (length > 8) {
    // Generation angle offset
    const genOffset = gen / map(sin(phasors[2].phase * TAU), 10, 10, 16, 64);

    // Angles for branches
    angle = map(
      sin(genOffset * TWO_PI + phasors[0].phase * TAU),
      -1,
      1,
      TWO_PI,
      0
    );
    angle2 = -map(
      sin(genOffset * TWO_PI + phasors[1].phase * TAU + PI),
      -1,
      1,
      -TWO_PI,
      0
    );

    // Create new length
    const newLength = length * 0.7;

    // Use matrix transformations when creating two new branches
    push();
    translate(length, 0);
    push();
    rotate(angle);
    animatedFractal(phasors, newLength, gen, h, mode);
    pop();
    push();
    rotate(angle2);
    animatedFractal(phasors, newLength, gen, h, mode);
    pop();
    pop();
  }
}
