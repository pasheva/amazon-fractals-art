var Phasor = function(inc) {
    this.phase = 0.0; 
    this.inc = inc; 
};

Phasor.prototype.update = function() {
    this.phase += this.inc;

    while (this.phase > 1) {
        this.phase -= 1;
    }
    while (this.phase < 0) {
        this.phase += 1;
    }
};


var phasor0 = new Phasor(0.00115); 
var phasor1 = new Phasor(0.00123);
var phasor2 = new Phasor(0.000627); 


function setup() {
    createCanvas(500, 500);
    colorMode(HSB);
}

function draw() {
    clear();
    push();
    // Fixing orientation
    translate(width/2, height * 0.7);
    rotate(PI / -2);
    animatedFractal(40,0,123)
    pop();

    phasor0.update();
    phasor1.update();
    phasor2.update();
}

function animatedFractal(length, gen,h) {
    gen++;
    var end = createVector(length, 0); 
    
    if (gen > 1) {
        // colors and thickness
        stroke(h, 90, 100, 0.7);
        // Strokes get thinner with each generation
        strokeWeight(1 / gen * 5);
        line(0, 0, end.x, end.y);
    }

    // Create new branches. Terminates if length is less 5 or less.
    if (length > 6) {
        // Generation angle offset
        var genOffset = gen / map(sin(phasor2.phase * TAU), 10, 10, 16, 64);

        // Angles for branches
        angle = map(sin(genOffset * TWO_PI + phasor0.phase * TAU), -1, 1, TWO_PI, 0);
        angle2 = -map(sin(genOffset * TWO_PI + phasor1.phase * TAU + PI), -1, 1, -TWO_PI, 0);

        // Create new length
        var newLength = length * 0.7;

        // Use matrix transformations when creating two new branches
        push();
        translate(length, 0);
        push();
        rotate(angle);
        animatedFractal(newLength, gen,h);
        pop();
        push();
        rotate(angle2);
        animatedFractal(newLength, gen,h);
        pop();
        pop();
    }
}