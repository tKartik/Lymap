var result, token; //reading string
var x, y, z;
var angle = [];
var v, inX, inY; //initial point
var textfeild, output, submit;
var slider, slider2;
var r, g, b; //color of vectors
var type1, type;

function newtext() {
  result = textfeild.value();
  token = splitTokens(result, ' "",!.?');
  //console.log(token.length);
  // return token;
}

function keyTyped() {
  if (key == "1") {
    if (type == 0) {
      type = 1; //function to change color
    } else {
      type = 0;
    }
  }
  if (key == "2") {
    if (type1 == 0) {
      type1 = 1; //function to change color
    } else {
      type1 = 0;
    }
  }
}

function setup() {
  var canWidth = windowWidth * 0.66;
  var canHeight = windowHeight - 100;

  var canvas = createCanvas(canWidth, canHeight); //canvas size
  canvas.parent("sketch-holder");

  textfeild = select("#txt");
  output = select("#output");

  var u = windowWidth;

  //sliders
  slider = createSlider(0, canWidth, canWidth / 2);
  slider.parent("s1");
  slider2 = createSlider(0, canHeight, canHeight / 2);
  slider2.parent("s2");
  slider3 = createSlider(4, 20, 20);
  slider3.parent("s3");

  frameRate(3);

  for (i = 0; i < 26; i++) {
    //assigning angles to each key
    angle[i] = ((PI * 2) / 26) * i;
  }

  // var allwords = result.join("\n");
  // var token = splitTokens(allwords, ' ,!.?');
}

function draw() {
  if (type1 == 0) {
    background(255);
  } else {
    background(30);
  }

  newtext();

  var scale = slider3.value(); //scale is the length of vector
  var connect, thick; // thick is the thickness and connect is the ellipse joining two vectors

  inX = slider.value();
  inY = slider2.value();

  //scaling

  if (scale < 16 && scale > 8) {
    connect = 1;
    thick = 2;
  } else if (scale < 9 && scale > 6) {
    connect = 1;
    thick = 1;
  } else if (scale < 7) {
    connect = 0;
    thick = 1;
  } else {
    connect = 2;
    thick = 3;
  }

  //drawing vectors

  for (i = 0; i < token.length; i++) {
    for (x = 0; x < token[i].length; x++) {
      var s = token[i].charAt(x);

      for (z = 0; z < 26; z++) {
        if (char(z + 65) == s || char(z + 97) == s) {
          var a = angle[z]; //angle of each vector
          //console.log(a);

          if (type == 0) {
            r = z * 2;
            g = 80 + z * 3; //color chaneg on key press
            b = 180 - z * 5;
          } else {
            r = 50 + z * 6;
            g = 150 - z * 5;
            b = 150 - z * 6;
          }

          var v = p5.Vector.fromAngle(a);
          push();
          translate(inX, inY);
          stroke(r, g, b, 200); //color relation
          strokeWeight(thick);
          rotate(v.heading());
          line(0, 0, scale, 0);
          ellipse(0, 0, connect, connect);
          pop();
          inX = inX + scale * cos(a);
          inY = inY + scale * sin(a);

          break;
        }
      }
    }
  }

  //color wheel on left

  for (z = 0; z < 26; z++) {
    var a = angle[z];
    //console.log(a);

    if (type == 0) {
      r = z * 2;
      g = 80 + z * 3; //color chaneg on key press
      b = 180 - z * 5;
    } else {
      r = 50 + z * 6;
      g = 150 - z * 5;
      b = 150 - z * 6;
    }

    var v = p5.Vector.fromAngle(a);
    push();
    translate(80, 80);
    stroke(r, g, b, 200);
    strokeWeight(3);
    rotate(v.heading());
    line(0, 0, 40, 0);
    ellipse(0, 0, 2, 2);
    pop();

    push();
    translate(80, 85);
    rectMode(CENTER);
    textAlign(CENTER);
    fill(r, g, b, 200);
    stroke(r, g, b, 200);
    strokeWeight(1);
    textSize(12);
    text(char(z + 65), 55 * cos(a), 55 * sin(a));
    pop();
  }
}
