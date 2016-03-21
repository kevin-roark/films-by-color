
colors=( "red" "orange" "yellow" "green" "blue" "indigo" "violet" )

for color in "${colors[@]}"
do
  echo "building " $color

  # make new folder and copy template
  cp template/index.html $color/

  # run frampton on combo
  ../frampton/src/cli/web-bundle.js score.js $color/media_config.json --out ./ --onlyscore
  mv js/build.js $color/js

done
