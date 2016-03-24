
/// Helpful lil guy http://stackoverflow.com/questions/846221/logarithmic-slider
function LogSlider(options) {
  if (!options) options = {};
  this.minpos = options.minpos || 0;
  this.maxpos = options.maxpos || 100;
  this.minlval = Math.log(options.minval || 1);
  this.maxlval = Math.log(options.maxval || 100000);

  this.scale = (this.maxlval - this.minlval) / (this.maxpos - this.minpos);
}

LogSlider.prototype.value = function(position) {
  return Math.exp((position - this.minpos) * this.scale + this.minlval);
};

LogSlider.prototype.position = function(value) {
  return this.minpos + (Math.log(value) - this.minlval) / this.scale;
};

/// Score

var renderer = new frampton.Renderer({
  mediaConfig: mediaConfig,
  timeToLoadVideo: 15000,
  videoSourceMaker: function(filename) {
    return '/media/' + filename;
  }
});

var color = frampton.util.choice(mediaConfig.colors);
var colorSegment = new frampton.ColorSegment(color);
colorSegment.loop = true;

var track = frampton.util.choice(mediaConfig.audio);
var audioSegment = new frampton.AudioSegment(track);
audioSegment.loop = true;

var loadTime = 15000;
renderer.scheduleSegmentRender(colorSegment, loadTime);
renderer.scheduleSegmentRender(audioSegment, loadTime);

var playbackRateEl = document.querySelector('.playback-rate');
var rateInput = document.querySelector('#rate-input');
var titleEl = document.querySelector('.film-title');
//var progressBar = document.querySelector('.progress-bar');

var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
colors.forEach(function(color) {
  if (window.location.pathname.indexOf(color) >= 0) {
    titleEl.classList.add(color);
    rateInput.classList.add(color);
    playbackRateEl.classList.add(color);
    //progressBar.classList.add(color + '-background');

    titleEl.textContent = 'Chromatic Reduction: ' + color.charAt(0).toUpperCase() + color.slice(1);
  }
});

var muteButton = document.querySelector('.mute-button');
var isMuted = false;
muteButton.onclick = function() {
  isMuted = !isMuted;
  muteButton.textContent = isMuted ? 'Unmute' : 'Mute';
  audioSegment.setVolume(isMuted ? 0 : 0.8);
};

var loadingIndicator = document.querySelector('.loading-indicator');

var colorIndex = 0;
var degrees = 0;
function changeLoadingColor() {
  loadingIndicator.classList.remove(colors[colorIndex] + '-background');

  colorIndex = (colorIndex + 1) % colors.length;

  loadingIndicator.classList.add(colors[colorIndex] + '-background');

  degrees += 90;
  loadingIndicator.style.transform = loadingIndicator.style.webkitTransform = loadingIndicator.style.mozTransform = 'rotate(' + degrees + 'deg)';
}

changeLoadingColor();
var loadingInterval = setInterval(changeLoadingColor, 1000);

var logSlider = new LogSlider({
  minval: 0.05,
  maxval: 100
});

rateInput.value = logSlider.position(1.0);

rateInput.onchange = rateInput.oninput = function() {
  var rate = logSlider.value(rateInput.value);
  if (rate > 0.95 && rate < 1.02) {
    rate = 1.0;
  }

  playbackRateEl.textContent = (Math.round(rate * 100) / 100) + 'x';

  colorSegment.setPlaybackRate(rate);
  audioSegment.setPlaybackRate(rate);
};

setTimeout(function() {
  loadingIndicator.classList.add('transparent');
  muteButton.style.opacity = 1.0;
  clearInterval(loadingInterval);

  // var time = 0;
  // var duration = (track.duration * 1000);
  // setInterval(function updateProgressBar() {
  //   time = (time + (100 * audioSegment.playbackRate)) % duration;
  //   var percent = Math.max(0.01, (time / duration));
  //   progressBar.style.width = (percent * window.innerWidth) + 'px';
  // }, 100);

}, loadTime);

setTimeout(function() {
  titleEl.classList.add('transparent');
}, loadTime + 5000);

setTimeout(function() {
  document.querySelector('.rate-control').style.opacity = 1.0;
}, loadTime + 12000);
