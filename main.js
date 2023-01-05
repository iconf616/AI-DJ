
song = "";
leftwristx=0;
rightwristx=0;
leftwristy=0;
rightwristy=0;
score_leftwrist=0;
score_rightwrist=0;

function preload()
{
    song=loadSound("music.mp3");

}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);

}
function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video , modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("Posenet is initialised");
}
function draw()
{
    image(video , 0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(score_rightwrist>0.2)
    {
    circle(rightwristx,rightwristy,20);

if(rightwristy>0 && rightwristy<=100)
{
    document.getElementById("speed").innerHTML="speed - 0.5x";
    song.rate(0.5);
}
else if (rightwristy>100 && rightwristy<=200)
{
    document.getElementById("speed").innerHTML="speed - 1x";
    song.rate(1);
}
else if (rightwristy>200 && rightwristy<=300)
{
    document.getElementById("speed").innerHTML="speed - 1.5x";
    song.rate(1.5);
}
else if(rightwristy>300 && rightwristy<=400)
{
    document.getElementById("speed").innerHTML="speed - 2x";
    song.rate(2);
}
else if(rightwristy>400 && rightwristy<=500)
{
    document.getElementById("speed").innerHTML="speed - 2.5x";
    song.rate(2.5);
}
    }

    if(score_leftwrist>0.2)
    {
    circle(leftwristx,leftwristy,20);
    InNumberleftWristY=Number(leftwristy);
    remove_decimals=floor(InNumberleftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume = " + volume;
    song.setVolume(volume);
}
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("leftwristx = " + leftwristx + " leftwristy = " + leftwristy);
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("rightwristx = " + rightwristx + " rightwristy = " + rightwristy);
        score_leftwrist=results[0].pose.keypoints[9].score;
        console.log("score left wrist = " + score_leftwrist);
        score_rightwrist=results[0].pose.keypoints[10].score;
        console.log("score right wrist = " + score_rightwrist);
    }
}