
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

renderer.scheduleSegmentRender(colorSegment, 2000);
renderer.scheduleSegmentRender(audioSegment, 2000);

var logSlider = new LogSlider({
  minval: 0.05,
  maxval: 100
});

var playbackRateEl = document.querySelector('.playback-rate');
var rateInput = document.querySelector('#rate-input');
var titleEl = document.querySelector('.film-title');

rateInput.value = logSlider.position(1.0);

var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
colors.forEach(function(color) {
  if (window.location.pathname.indexOf(color) >= 0) {
    titleEl.classList.add(color);
    rateInput.classList.add(color);
    playbackRateEl.classList.add(color);

    titleEl.textContent = color;
  }
});

rateInput.onchange = rateInput.oninput = function() {
  var rate = logSlider.value(rateInput.value);

  playbackRateEl.textContent = (Math.round(rate * 100) / 100) + 'x';

  colorSegment.setPlaybackRate(rate);
  audioSegment.setPlaybackRate(rate);
};

setTimeout(function() {
  titleEl.classList.add('transparent');
}, 4000);
