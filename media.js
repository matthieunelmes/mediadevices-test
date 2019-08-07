// navigator.mediaDevices.getUserMedia  = navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function(constraints) {
  
      // First get ahold of the legacy getUserMedia, if present
      var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  
      // Some browsers just don't implement it - return a rejected promise with an error
      // to keep a consistent interface
      if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
      }
  
      // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
      return new Promise(function(resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    }
  }

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