
colors=( "red" "orange" "yellow" "green" "blue" "indigo" "violet" )

for color in "${colors[@]}"
do
  echo "converting " $color

  node convert-old-config.js $color/media_config.json $color/new_media_config.json media/$color.frames.json
  mv $color/new_media_config.json $color/media_config.json

done
