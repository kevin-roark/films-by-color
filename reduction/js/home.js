
(function() {

  var colorSliceMap = {
    'red-color-link': {
      title: 'Red',
      color: 'red',
      img: '/media/color-slices/red.png'
    },
    'orange-color-link': {
      title: 'Mad Max',
      color: 'orange',
      img: '/media/color-slices/orange.png'
    },
    'yellow-color-link': {
      title: 'Minions',
      color: 'yellow',
      img: '/media/color-slices/yellow.png'
    },
    'green-color-link': {
      title: 'Shrek',
      color: 'green',
      img: '/media/color-slices/green.png'
    },
    'blue-color-link': {
      title: 'Deep Blue Sea',
      color: 'blue',
      img: '/media/color-slices/blue.png'
    },
    'indigo-color-link': {
      title: 'Spring Breakers',
      color: 'indigo',
      img: '/media/color-slices/indigo.png'
    },
    'violet-color-link': {
      title: 'Raw Nerves: A Lacanian Thriller',
      color: 'violet',
      img: '/media/color-slices/violet.png'
    }
  };

  var linkTitleEl = document.querySelector('.link-title');

  var colorLinks = document.querySelectorAll('.color-link');
  for (var i = 0; i < colorLinks.length; i++) {
    hoverify(colorLinks[i]);
  }

  function hoverify(colorLink) {
    var colorInfo = colorSliceMap[colorLink.id];

    var img = document.createElement('img');
    img.src = colorInfo.img;
    img.style.width = '100%'; img.style.height = '100%';
    img.style.opacity = 0.75;
    img.style.display = 'none';
    colorLink.appendChild(img);

    var isOver = false;

    colorLink.onmouseover = function() {
      if (!isOver) {
        img.style.display = 'block';
        linkTitleEl.classList.add(colorInfo.color);
        linkTitleEl.textContent = colorInfo.title;
        isOver = true;
      }
    };

    colorLink.onmouseout = function() {
      if (isOver) {
        img.style.display = 'none';
        linkTitleEl.classList.remove(colorInfo.color);
        linkTitleEl.textContent = '';
        isOver = false;
      }
    };
  }

})();
