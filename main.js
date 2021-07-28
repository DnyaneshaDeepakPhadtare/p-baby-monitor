function setup(){
    canvas=createCanvas(380,380);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);

    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}

status="";
objects=[];
song="";


function preload(){
    song=loadSound("alarm_beep_3.mp3");
}

function modelLoaded(){
    console.log("model loaded");
    status=true;
    
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
    }

function draw(){
    image(video,0,0,380,380);

    if(status!=""){
        objectDetector.detect(video,gotResult);

        r=random(255);
        g=random(255);
        b=random(255);

        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:Detected Objects";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are = "+objects.length;

            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+"  "+percent+"%",objects[i].x+15,objects[i].x+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].x,objects[i].width,objects[i].height);

            if(objects[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML="Baby Found";
                song.stop();
                console.log("stop");
                
            }
            else{
                document.getElementById("number_of_objects").innerHTML="Baby Not Found";
                song.play();
                console.log("played");
            }
            if(objects.length==0){
                document.getElementById("number_of_objects").innerHTML="Baby Not Found";
                song.play();
                console.log("played");
            }
        }
    }
}

