var sopraccigliaSx;
var sopraccigliaDx;
var prete;
var ult=0;
var troppo_lungo=false;
var man;
var vol;

var font;

var mic;

function setup() {
    createCanvas(windowWidth, windowHeight);
    sopraccigliaSx = loadImage("./assets/sopracciglia_sx.jpg");
    sopraccigliaSx = loadImage("./assets/sopracciglia_sx.png");
    
    sopraccigliaDx = loadImage("./assets/sopracciglia_dx.jpg");
    sopraccigliaDx = loadImage("./assets/sopracciglia_dx.png");

    prete = loadImage("./assets/prete.jpg");
    prete = loadImage("./assets/prete.png");

    mic = new p5.AudioIn();
    mic.start();
    
    
    man=new uomo();
}

function draw() {
    
    
    var vol = map(mic.getLevel(), 0, 0.2, 0, 255);
    background(255, 255 - vol, 255 - vol);
    
    textSize(height/50);
    textFont('Raleway');
    
    fill(vol,vol,vol);
    textAlign(CENTER);
    text('(Whistle or talk loud for best results)',0+random(0,mic.getLevel()*20),(height/8)+random(0,mic.getLevel()*20),width,height/8);
    
    textSize(height/10);
    textFont('Abril Fatface');
    
    textAlign(CENTER);
    text("SILENTIUM!",0+random(0,mic.getLevel()*20),0+random(0,mic.getLevel()*20),width,height/9);
    man.display();
}

function uomo() {
    this.angry=function(){
        
        stroke(0);
        strokeWeight(height / 110);
        line(width / 2 - (height * 0.8) * 0.1, (height * 0.2) + (height * 0.8) * 0.54, width / 2 + ((height * 0.8) * 0.1), (height * 0.2) + (height * 0.8) * 0.54);

        line(width / 2 - (height * 0.8) * 0.1, (height * 0.2) + (height * 0.8) * 0.57 + (height * 0.8) * 0.05, width / 2 + ((height * 0.8) * 0.1), (height * 0.2) + (height * 0.8) * 0.57 + (height * 0.8) * 0.05);
        noStroke();
    }
    this.normal=function(){
        troppo=false;
        troppo_lungo=false;
        noStroke();
        fill(255);
        rect(width / 2 - (height * 0.8) * 0.1, (height * 0.2) + (height * 0.8) * 0.526, ((height * 0.8) * 0.2), (height * 0.8) * 0.05);

        //inferiore
        rect(width / 2 - (height * 0.8) * 0.1, (height * 0.2) + (height * 0.8) * 0.5835, ((height * 0.8) * 0.2), (height * 0.8) * 0.05);
    }
    this.display=function(){
        noFill();
        strokeWeight(height / 90);

        image(prete, (width / 2) - (height * 0.8) / 0.87 / 2, height - (height * 0.8), ((height * 0.8) / 0.87), (height * 0.8));
        
        //palpebre
        
        stroke(0);
        fill(255);
        strokeWeight(0);
        vol = map(mic.getLevel(), 0, 1, 0, 0.08);
        
        rect(width / 2 - (height * 0.8) * 0.22, (height * 0.2) + (height * 0.8) * (0.29-vol), ((height * 0.8) * 0.15), (height * 0.8) * 0.05);

        vol = map(mic.getLevel(), 0, 0.5, 0, (height * 0.8) * 0.05);
        
        if(troppo_lungo==false){
            if (vol < (height * 0.8) * 0.001 && ult!=0){
                troppo_lungo=true;
                setTimeout(this.attesa(),2000);
            }
            if (vol > (height * 0.8) * 0.001) {
                if(troppo_lungo==false){
                    this.angry();
                }
            }
            else{
                    this.normal();
            }
        }else{
            this.angry();
        }
    }

    this.attesa = function(){
        troppo_lungo=false;
    }
    ult=vol;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
