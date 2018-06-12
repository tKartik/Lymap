var mapimg;

var result;
var x;
var y;
var angle = [];
var colourr = [];
var v,q=3900,w=3000;                 //initial point


function preload() {
  result = loadStrings('test.txt');
}

function setup() {
  var canvas = createCanvas(4800,4000);   //canvas size
  // canvas.parent('sketch-holder');

  for(i=0;i<26;i++){
    angle[i] = PI*2/26*i;
  }

  background(30);

  var allwords = result.join("\n");
  var token = splitTokens(allwords,' ,!.?');

  for(i=0; i<token.length ; i++ ){
    for(x=0; x<token[i].length ; x++){

      var s = token[i].charAt(x);

      for(z=0 ; z<26 ;z++){
          if(char(z+65)==s || char(z+97)==s){

          var a = angle[z];
          //console.log(a);

          var v = p5.Vector.fromAngle(a);
            push();
            translate(q,w);
            stroke(200-z*6,150-z*5,150-z*6,200);            //color realation
            strokeWeight(3);
            rotate(v.heading());
            line(0,0,20,0);
            ellipse(0,0,2,2);
            pop();
            q=q+20*cos(a);
            w=w+20*sin(a);

          break;
          }
        }
    }
  }


  for(z=0 ; z<26 ;z++){
      var a = angle[z];
      //console.log(a);
      var v = p5.Vector.fromAngle(a);
        push();
        translate(250,250);
        stroke(200-z*6,150-z*5,150-z*6,200);                //color
        strokeWeight(3);
        rotate(v.heading());
        line(0,0,150,0);
        ellipse(0,0,2,2);
        pop();

        push();
        translate(250,258);
        rectMode(CENTER);
        textAlign(CENTER);
        fill(200-z*6,150-z*5,150-z*6,200);                  //color
        stroke(200-z*6,150-z*5,150-z*6,200);
        strokeWeight(3);
        textSize(40);
        text(char(z+65),180*cos(a),180*sin(a));
        pop();

    }
}
