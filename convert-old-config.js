

if (require.main === module) {
  main();
}

function main() {
  var args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('need a config path to convert...');
    return;
  }

  var fs = require('fs');
  var path = require('path');

  var configPath = args[0];
  var outPath = args.length > 1 ? args[1] : 'new_config.json';
  var framesPath = args.length > 2 ? args[2] : 'movie.frames.json';

  var oldConfig = JSON.parse(fs.readFileSync(configPath).toString());

  var newConfig = convert(oldConfig);

  fs.writeFileSync(framesPath, JSON.stringify(newConfig.frames[0]));

  delete newConfig.frames[0].frames;
  newConfig.frames[0].filename = path.basename(framesPath);
  fs.writeFileSync(outPath, JSON.stringify(newConfig));
}

function convert(oldConfig) {
  var colors = oldConfig.colors;

  var frames = [];
  colors.forEach(function(color) {
    var framesData = colorToFramesData(color);
    frames.push(framesData);
  });

  var newConfig = {
    frames: frames
  };

  for (var key in oldConfig) {
    if (oldConfig.hasOwnProperty(key) && key !== 'colors') {
      newConfig[key] = oldConfig[key];
    }
  }

  return newConfig;
}

function colorToFramesData(color) {
  var frames = [];
  color.colors.forEach(function(colorArray) {
    var frame = {
      colors: {
        dominant: colorArray,
        palette: [colorArray]
      }
    };
    frames.push(frame);
  });

  return {
    filename: color.filename,
    duration: color.duration,
    numberOfFrames: color.numberOfFrames,
    fps: 30,
    frames: frames
  };
}

module.exports = convert;
