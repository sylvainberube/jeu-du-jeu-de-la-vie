// Selon https://p5js.org/examples/classes-and-objects-snowflakes/ 
// le code est modifié pour que les flocons ne tombent qu'une fois.


class Snowflake {
  constructor(couleur = color(random(100, 255), random(100, 255), random(100, 255))) {
    this.posX = 0;
    this.posY = random(-height/4, 0);
    this.initialAngle = random(0, 360);
    this.size = random(2, 5);
    this.radius = sqrt(random(pow(width / 2, 2)));
    this.color = couleur;
  }

  update(time) {
    angleMode(DEGREES);
    // Define angular speed (degrees / second)
    let angularSpeed = 35;

    // Calculate the current angle
    let angle = this.initialAngle + angularSpeed * time;

    // x position follows a sine wave
    this.posX = width / 2 + this.radius * sin(angle);

    // Different size snowflakes fall at different y speeds
    let ySpeed = 30 / this.size;
    this.posY += ySpeed;
  }

  display() {
    colorMode(HSB, 360, 100, 100);
    fill(this.color);
    noStroke();
    ellipse(this.posX, this.posY, this.size);
    colorMode(RGB, 255, 255, 255, 255);
  }
}