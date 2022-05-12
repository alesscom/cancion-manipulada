var dragons = "";
var bruno = "";
var mar = "";
var dftpunk = "";
var m_iz_x = 0;
var m_iz_y = 0;
var m_de_x = 0;
var m_de_y = 0;
pmiz = 0;
pmde = 0;
function preload(){
dragons =loadSound("believer.mp3");
bruno =loadSound("uptown.mp3");
mar =loadSound("sugar.mp3");
dftpunk =loadSound("instant.mp3");
}
function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}
function modelLoaded(){
    console.log('posenet se inicio');
}
function draw(){
    image(video,0,0,600,500);
    fill("blue");
    stroke("blue");
    if(pmiz > 0.2){
       circle(m_iz_x, m_iz_y, 20);
       n_y_m_iz = Number(m_iz_y);
       sindc = floor(n_y_m_iz);
       volu = sindc/500;
       document.getElementById("volumen").innerHTML="volumen= " + volu;
       dragons.setVolume(volu);
       bruno.setVolume(volu);
       mar.setVolume(volu);
       dftpunk.setVolume(volu);
    };
    if(pmde>0.2){
        circle(m_de_x, m_de_y, 20);
        if(m_de_y>0 && m_de_y<=100){
           document.getElementById("velocidad").innerHTML="velocidad =0.5x"
           dragons.rate(0.5);
            bruno.rate(0.5);
            mar.rate(0.5);
            dftpunk.rate(0.5);
        }
        else if(m_de_y>100 && m_de_y<=200){
            document.getElementById("velocidad").innerHTML="velocidad =1x"
            dragons.rate(1);
             bruno.rate(1);
             mar.rate(1);
             dftpunk.rate(1);
         }
         else if(m_de_y>200 && m_de_y<=300){
            document.getElementById("velocidad").innerHTML="velocidad =1.5x"
            dragons.rate(1.5);
             bruno.rate(1.5);
             mar.rate(1.5);
             dftpunk.rate(1.5);
         }
         else if(m_de_y>300 && m_de_y<=400){
            document.getElementById("velocidad").innerHTML="velocidad =2x"
            dragons.rate(2);
             bruno.rate(2);
             mar.rate(2);
             dftpunk.rate(2);
         }
         else if(m_de_y>400 && m_de_y<=500){
            document.getElementById("velocidad").innerHTML="velocidad =2.5x"
            dragons.rate(2.5);
             bruno.rate(2.5);
             mar.rate(2.5);
             dftpunk.rate(2.5);
         }
    }
}
function play(){
    cancion= document.getElementById("cancion").value;
    if(cancion == "dragons"){
        bruno.stop();
        mar.stop();
        dftpunk.stop();
        dragons.setVolume(1);
        dragons.rate(1);
        dragons.play();
    }
    if(cancion == "bruno"){
        dragons.stop();
        mar.stop();
        dftpunk.stop();
        bruno.setVolume(1);
        bruno.rate(1);
        bruno.play();
    }
    if(cancion == "mar"){
        bruno.stop();
        dragons.stop();
        dftpunk.stop();
        mar.setVolume(1);
        mar.rate(1);
        mar.play();
    }
    if(cancion == "dftpunk"){
        bruno.stop();
        mar.stop();
        dragons.stop();
        dftpunk.setVolume(1);
        dftpunk.rate(1);
        dftpunk.play();
    }
}
function pause(){
    dragons.pause();
    mar.pause();
    bruno.pause();
    dftpunk.pause();
}
function stop(){
    dragons.stop();
    bruno.stop();
    mar.stop();
    dftpunk.stop();
}
function gotPoses(results){
    if(results.length>0){
       console.log(results);
       pmiz = results[0].pose.keypoints[9].score;
       pmde = results[0].pose.keypoints[10].score;
       console.log("puntuacion uñeca iz y de"+ pmiz + pmde);
       m_de_x=results[0].pose.rightWrist.x;
       m_de_y=results[0].pose.rightWrist.y;
       console.log("pos x muñeca derecha: "+ m_de_x + "  pos y muñeca derecha: " + m_de_y);
       m_iz_x=results[0].pose.leftWrist.x;
       m_iz_y=results[0].pose.leftWrist.y;
       console.log("pos x muñeca iz: "+ m_iz_x + "  pos y muñeca iz: " + m_iz_y);
    };
}