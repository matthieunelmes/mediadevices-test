navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var video = document.createElement('video');
video.style.width =  document.width + 'px';
video.style.height = document.height + 'px';
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.setAttribute('playsinline', '');

	// trick to trigger the video on android
	document.body.addEventListener('click', function onClick(){
		document.body.removeEventListener('click', onClick);
		video.play()
	})

var facingMode = "user";

var constraints = {
  audio: false,
  video: {
    facingMode: facingMode
  }
}

navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
	video.srcObject = stream;
}).catch(function(error) {
    alert(error.name + ": " + error.message);
  });;

document.body.appendChild(video);

video.addEventListener('click', function() {
  if (facingMode == "user") {
    facingMode = "environment";
  } else {
    facingMode = "user";
  }
  
  constraints = {
    audio: false,
    video: {
      facingMode: facingMode
    }
  }  
  
  navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
	  video.srcObject = stream;	
  });
});