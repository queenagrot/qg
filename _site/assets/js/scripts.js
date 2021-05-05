console.log("Hello world!");

if ('IntersectionObserver' in window) {
    console.log("Your browser supports IntersectionObserver");
} else {
    console.log("Your browser does not support IntersectionObserver");
}

// INTERSECTION OBSERVER 4 SECTIONS ('fading up sections using Intersection Obvserver' dev.to tutorial)

const observerOptions = {
     root: null,
     threshold: 0,
     rootMargin: '0% 0% -20% 0%'
 };

 const observer = new IntersectionObserver(entries => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.classList.add('in-view');
               observer.unobserve(entry.target);
           }
       });
   }, observerOptions);

window.addEventListener('DOMContentLoaded', (event) => {
    const sections =Array.from(document.getElementsByClassName('section'));
    for (let section of sections) {
      observer.observe(section);
    }
});

// STICKY HEADER - Hide Header on on scroll down

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}

// ANIMATED WORD CLOUD

$("#btn_light").click(function() {
  $('.transform').toggleClass('transform-active');
});

document.getElementById('div1').style.visibility = "hidden";

var change = function changeVisibility() {
  document.getElementById('all').style.visibility = "hidden";
  document.getElementById('div1').style.visibility = "visible";
}
setTimeout(change, 4000);

$('#btn_replace').click(function () {
    $('#div1').find('span').toggleClass('div2');
    $(this).find('span').toggleClass('div2');
    $('#blob').toggleClass('hidden');
});

var radius = 300;
var dtr = Math.PI / 180;
var d = 700;

var mcList = [];
var active = false;
var lasta = 1;
var lastb = 1;
var distr = true;
var tspeed = 5;
var size = 250;

var mouseX = 0;
var mouseY = 0;

var howElliptical = 1;

var aA = null;
var oDiv = null;

window.onload = function() {
  var i = 0;
  var oTag = null;

  oDiv = document.getElementById('div1');

  aA = oDiv.getElementsByTagName('span');
  // aA=document.getElementById('nodisplay');
  // aA=oDiv.getElementsByTagName('span');

  for (i = 0; i < aA.length; i++) {
    oTag = {};

    oTag.offsetWidth = aA[i].offsetWidth;
    oTag.offsetHeight = aA[i].offsetHeight;

    mcList.push(oTag);
  }

  sineCosine(0, 0, 0);

  positionAll();

  oDiv.onmouseover = function() {
    active = true;
  };

  oDiv.onmouseout = function() {
    active = false;
  };

  oDiv.onmousemove = function(ev) {
    var oEvent = window.event || ev;

    mouseX = oEvent.clientX - (oDiv.offsetLeft + oDiv.offsetWidth / 2);
    mouseY = oEvent.clientY - (oDiv.offsetTop + oDiv.offsetHeight / 2);

    mouseX /= 5;
    mouseY /= 5;
  };

  setInterval(update, 30);
};

function update() {
  var a;
  var b;

  if (active) {
    a = (-Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed;
    b = (Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed;
  } else {
    a = lasta * 0.98;
    b = lastb * 0.98;
  }

  lasta = a;
  lastb = b;

  if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
    return;
  }

  var c = 0;
  sineCosine(a, b, c);
  for (var j = 0; j < mcList.length; j++) {
    var rx1 = mcList[j].cx;
    var ry1 = mcList[j].cy * ca + mcList[j].cz * (-sa);
    var rz1 = mcList[j].cy * sa + mcList[j].cz * ca;

    var rx2 = rx1 * cb + rz1 * sb;
    var ry2 = ry1;
    var rz2 = rx1 * (-sb) + rz1 * cb;

    var rx3 = rx2 * cc + ry2 * (-sc);
    var ry3 = rx2 * sc + ry2 * cc;
    var rz3 = rz2;

    mcList[j].cx = rx3;
    mcList[j].cy = ry3;
    mcList[j].cz = rz3;

    per = d / (d + rz3);

    mcList[j].x = (howElliptical * rx3 * per) - (howElliptical * 2);
    mcList[j].y = ry3 * per;
    mcList[j].scale = per;
    mcList[j].alpha = per;

    mcList[j].alpha = (mcList[j].alpha - 0.6) * (10 / 6);
  }

  doPosition();
  depthSort();
}

function depthSort() {
  var i = 0;
  var aTmp = [];

  for (i = 0; i < aA.length; i++) {
    aTmp.push(aA[i]);
  }

  aTmp.sort(
    function(vItem1, vItem2) {
      if (vItem1.cz > vItem2.cz) {
        return -1;
      } else if (vItem1.cz < vItem2.cz) {
        return 1;
      } else {
        return 0;
      }
    }
  );

  for (i = 0; i < aTmp.length; i++) {
    aTmp[i].style.zIndex = i;
  }
}

function positionAll() {
  var phi = 0;
  var theta = 0;
  var max = mcList.length;
  var i = 0;

  var aTmp = [];
  var oFragment = document.createDocumentFragment();

  //Ëæ»úÅÅÐò
  for (i = 0; i < aA.length; i++) {
    aTmp.push(aA[i]);
  }

  aTmp.sort(
    function() {
      return Math.random() < 0.5 ? 1 : -1;
    }
  );

  for (i = 0; i < aTmp.length; i++) {
    oFragment.appendChild(aTmp[i]);
  }

  oDiv.appendChild(oFragment);

  for (var i = 1; i < max + 1; i++) {
    if (distr) {
      phi = Math.acos(-1 + (2 * i - 1) / max);
      theta = Math.sqrt(max * Math.PI) * phi;
    } else {
      phi = Math.random() * (Math.PI);
      theta = Math.random() * (2 * Math.PI);
    }
    //×ø±ê±ä»»
    mcList[i - 1].cx = radius * Math.cos(theta) * Math.sin(phi);
    mcList[i - 1].cy = radius * Math.sin(theta) * Math.sin(phi);
    mcList[i - 1].cz = radius * Math.cos(phi);

    aA[i - 1].style.left = mcList[i - 1].cx + oDiv.offsetWidth / 2 - mcList[i - 1].offsetWidth / 2 + 'px';
    aA[i - 1].style.top = mcList[i - 1].cy + oDiv.offsetHeight / 2 - mcList[i - 1].offsetHeight / 2 + 'px';
  }
}

function doPosition() {
  var l = oDiv.offsetWidth / 2;
  var t = oDiv.offsetHeight / 2;
  for (var i = 0; i < mcList.length; i++) {
    aA[i].style.left = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 'px';
    aA[i].style.top = mcList[i].cy + t - mcList[i].offsetHeight / 2 + 'px';

    aA[i].style.fontSize = Math.ceil(12 * mcList[i].scale / 2) + 8 + 'px';

    aA[i].style.filter = "alpha(opacity=" + 100 * mcList[i].alpha + ")";
    aA[i].style.opacity = mcList[i].alpha;
  }
}

function sineCosine(a, b, c) {
  sa = Math.sin(a * dtr);
  ca = Math.cos(a * dtr);
  sb = Math.sin(b * dtr);
  cb = Math.cos(b * dtr);
  sc = Math.sin(c * dtr);
  cc = Math.cos(c * dtr);
}

//EMOJI

// const MINIMUM_COLOR_R = 60;
// const MINIMUM_COLOR_G = 15;
// const MINIMUM_COLOR_B = 90;
//
// const MAXIMUM_COLOR_R = 180;
// const MAXIMUM_COLOR_G = 15;
// const MAXIMUM_COLOR_B = 30;

const MINIMUM_COLOR_R = 20;
const MINIMUM_COLOR_G = 20;
const MINIMUM_COLOR_B = 20;

const MAXIMUM_COLOR_R = 150;
const MAXIMUM_COLOR_G = 120;
const MAXIMUM_COLOR_B = 120;

const ICONS_DISTANCE = 50;

let cachePosition = {
  x: 0,
  y: 0
}
let bcg = generateRGB(true);
let bcgName = `rgb(${MINIMUM_COLOR_R},${MINIMUM_COLOR_G},${MINIMUM_COLOR_R})`

document.body.style.background = bcgName;

// Generate random number within a given range.
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Handle rgb change on mouseOver inside the body.
// implemented by calculating the percentage of the cursor position regarding the highest numer we can achieve inside the palette (<255).
// minimum color in an RGB is 0 (which is black, so we had to set different minimum).
function setSmoothColorChange(pos, colors) {
  colors.r = MINIMUM_COLOR_R + Math.round((pos / window.innerWidth) * MAXIMUM_COLOR_R);
  colors.g = MINIMUM_COLOR_G + Math.round((pos / window.innerWidth) * MAXIMUM_COLOR_G);
  colors.b = MINIMUM_COLOR_B + Math.round((pos / window.innerWidth) * MAXIMUM_COLOR_B);

  return bcgName = `rgb(${colors.r},${colors.g},${colors.b})`;
}

// As the function name applies.
function generateRGB(isObj) {
  let colors = {
    r: getRandomInt(0, 255),
    g: getRandomInt(0, 255),
    b: getRandomInt(0, 255)
  }
  return isObj ? colors : `rgb(${colors.r},${colors.g},${colors.b})`;
};


// $('#btn_replace').click(function () {
//   pamelasfunction().toggle();
// });


//
// $('#btn_replace').toggle(
//     pamelasfunction();
//     derpfunction();
// });

// jQuery(document).ready(function(){
//     pamelasfunction();
// });

// $('#btn_replace').click(function () {


// function pamelasfunction() {

function renderEmoji() {
  let allEmojis = ["🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️", "🪐","🐌","🧘🏽‍♀️","🕯","💅🏽","🌚","⚖️", "🐡", "👁","🔮", "👙", "👡","🏄🏽‍♀️", "🐊","🐸","🇵🇭","🌞"];
  let randomNum = getRandomInt(0, allEmojis.length - 1);
  let emojiCon = document.createElement('p');
  emojiCon.classList.add("emoji");

  emojiCon.innerHTML = allEmojis[randomNum];
  emojiCon.style.top = `${cachePosition.y}px`;
  emojiCon.style.left = `${cachePosition.x}px`;
  document.body.appendChild(emojiCon);
  setTimeout(() => {
    emojiCon.classList.add("fadeOut");
    setTimeout(() => document.body.removeChild(emojiCon), 300);
  }, 2000);
}

(function() {
  let mousePos;

  document.onmousemove = handleMouseMove;
  setInterval(getMousePosition, 1000); // setInterval repeats every X ms

  function handleMouseMove(event) {
    let dot, eventDoc, doc, body, pageX, pageY;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY +
        (doc && doc.scrollTop || body && body.scrollTop || 0) -
        (doc && doc.clientTop || body && body.clientTop || 0);
    }

    mousePos = {
      x: event.pageX,
      y: event.pageY
    };

    // Fixing the distance between each emoji
    switch (true) {
      case mousePos.x - cachePosition.x > ICONS_DISTANCE:
      case mousePos.y - cachePosition.y > ICONS_DISTANCE:
        cachePosition = mousePos;
        renderEmoji();
        break;
      case cachePosition.y - mousePos.y > ICONS_DISTANCE:
      case cachePosition.x - mousePos.x > ICONS_DISTANCE:
        cachePosition = mousePos;
        renderEmoji();
        break;
      default:
        break;
    }

    setSmoothColorChange(mousePos.x, bcg);
    document.body.style.background = bcgName;
  }

  function getMousePosition() {
    let pos = mousePos;
    if (!pos) {
      // We haven't seen any movement yet
    } else {
      // Use pos.x and pos.y
    }
  }
})();

// }

// }); click btn_replace

// TODO:
// 1. Set min & high color pickers.
// 2. Add the Y axis color interpulation (minimal color change effect just for more coolness).
