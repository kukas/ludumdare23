soundSources={
  Alarm:"Assets/Alarm.wav",
  Silence:"Assets/Silence.wav",
  Ambient:"Assets/Ambient.wav",
  BossFight:"Assets/BossFight.wav",
};
var a;


function soundLoad(){
  for(i in soundSources){
    a=document.createElement('audio');
    a.src=soundSources[i];
    a.id=i;
    a.soundPlay=function(){
      this.play();
    };
    a.soundPause=function(){
      this.pause();
    };
    a.soundReplay=function(){
      this.pause();
      this.currentTime=0;
      this.play();
    };
    document.body.appendChild(a);
  }
}

/*
*/
