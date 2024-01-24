song="";
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;

function preload(){
song=loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.position(650,250);
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
}

function modelLoaded(){
    console.log("Model Loaded");
    poseNet.on("pose", Gotposes);
}

function draw(){
image(video, 0, 0, 600, 500);
if (scoreleftWrist>0.2){
fill("red");
circle(leftWristX, leftWristY, 20);
stroke("red");
numberleftwrist=Number(leftWristY);
remove_decimals=floor(numberleftwrist);
volume=remove_decimals/500;
console.log(volume);
song.setVolume(volume);
document.getElementById("volume").innerHTML="Volume = " + volume;
}
if(scorerightWrist>0.2){

fill("blue");
stroke("blue");
circle(rightWristX, rightWristY, 20);

 if(rightWristY>0 && rightWristY<=100){
    song.rate(0.5);
    document.getElementById("speed").innerHTML= "Speed = 0.5x";
 }

 else if(rightWristY>100 && rightWristY<=200){
    song.rate(1);
    document.getElementById("speed").innerHTML= "Speed = 1x";
 }

 else if(rightWristY>200 && rightWristY<=300){
    song.rate(1.5);
    document.getElementById("speed").innerHTML= "Speed = 1.5x";
 }

 else if(rightWristY>300 && rightWristY<=400){
    song.rate(2);
    document.getElementById("speed").innerHTML= "Speed = 2x";
 }

 else if(rightWristY>400 && rightWristY<=500){
    song.rate(2);
    document.getElementById("speed").innerHTML= "Speed = 2x";
 }
 
}


}

function play(){
    song.play();
    song.setvolume(1);
    song.rate(1);
}

function pause(){
    song.pause();
    
}

function stop(){
    song.stop();
    
}

function Gotposes(results){
   if(results.length>0){
    console.log(results);
    leftWristX=results[0].pose.leftWrist.x;
    rightWristX=results[0].pose.rightWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("leftWristX=" + leftWristX + "leftWristY=" + leftWristY);
    console.log("rightWristX=" + rightWristX + "rightWristY=" + rightWristY);
    scoreleftWrist=results[0].pose.keypoints[9].score;
    console.log(scoreleftWrist);

    scorerightWrist=results[0].pose.keypoints[10].score;
    console.log(scorerightWrist);
   }
}