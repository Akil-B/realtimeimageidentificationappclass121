function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet',model_loaded);
}
function model_loaded(){
  console.log("model is loaded");
}
function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,gotresult);
}
var previous_result="";
function gotresult(error,results){
if(error){
  console.log(error);
}
else{
  if((results[0].confidence>0.5)&&(previous_result!=results[0].label)){
    console.log(results);
    previous_result=results[0].label;
    var synth=window.speechSynthesis;
    speak_data="The Object detected is- "+results[0].label;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    document.getElementById("result_object_name").innerHTML=results[0].label;
    document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(2);
  }
}
}




