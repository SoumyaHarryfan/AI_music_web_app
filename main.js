song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristscore = 0;
song1status = "";
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(600,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,500,600);
   if(leftWristscore>0.2){
    fill('pink');
    stroke('red');
    circle(leftWristX,leftWristY,20);
    song1status = isPlaying();
    song2.stop();
   }
   if(song1status==false){
       song1.play();
       document.getElementById("song_name").innerHTML="song 1 = "+"harry potter theme song";
   }
}
function modelLoaded(){
    console.log("poseNet is initialized");
}
function gotPoses(results){
    if(results.length>0){
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX = "+leftWristX);
        console.log("leftWristY = "+leftWristY);
        console.log("rightWristX = "+rightWristX);
        console.log("rightWristY = "+rightWristY);
        leftWristscore = results[0].pose.keypoints[9].score;
    }
}