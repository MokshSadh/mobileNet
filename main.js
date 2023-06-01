function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet' , modalLoaded);
}
function modalLoaded(){
  console.log("Modal is loaded");
}

function draw(){
  image(video,0,0,300,300);
  classifier.classify(video , gotResult);
}
var previous_function='';


function gotResult(error,results){
  if(error){
    console.error(error);
  }
  else{
    if((results[0].confidence>0.5)&&(previous_function!=results[0].label)){
    console.log(results);
    previous_function=results[0].label;
   var synth=window.speechSynthesis;
   speak_data="OBJECT DETECTED IS  "+results[0].label;
  var utterThis=new SpeechSynthesisUtterance(speak_data);
   synth.speak(utterThis);
    document.getElementById("result_para_object").innerHTML="Object - "+results[0].label;
    document.getElementById("result_para_accuracy").innerHTML="Accuracy - "+results[0].confidence.toFixed(3);
    }
  }
}

