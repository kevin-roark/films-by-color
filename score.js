
var renderer = new frampton.Renderer({
  mediaConfig: mediaConfig
});

var color = frampton.util.choice(mediaConfig.colors);
var colorSegment = new frampton.ColorSegment(color);
colorSegment.loop = true;

var track = frampton.util.choice(mediaConfig.audio);
var audioSegment = new frampton.AudioSegment(track);
audioSegment.loop = true;

renderer.scheduleSegmentRender(colorSegment, 2000);
renderer.scheduleSegmentRender(audioSegment, 2000);
