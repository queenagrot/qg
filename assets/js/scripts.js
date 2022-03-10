console.log("This be the Queena Grot Universe!");

// OPEN INFO POPUP

let body = document.body
let popup = document.getElementById('popup')

function openinfo() {
    if (popup.style.display = "none"){
        popup.style.display = "flex"
        body.style.overflow = "hidden"
    } else {
        popup.style.display = "none"
    }
}

function closeinfo() {
    if (popup.style.display = "flex"){
        popup.style.display = "none"
        body.style.overflow = "auto"
    } else {
        popup.style.display = "flex"
    }
}

// INTERSECTION OBSERVER 4 SECTIONS ('fading up sections using Intersection Obvserver' dev.to tutorial)

if ('IntersectionObserver' in window) {
  console.log("Your browser supports IntersectionObserver");
} else {
  console.log("Your browser does not support IntersectionObserver");
}

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

//FOLIOBG COLOUR SCROLL

const foliobg = document.querySelector("#foliobg");
const foliofg = document.querySelector("#foliofg");
const footer = document.querySelector("footer");

const sectionOptions = {
  root: null,
  threshold: 0,
  rootMargin: '0% 0% -100% 0%'
};

const sectionObserver = new IntersectionObserver(function(entries, sectionObserver) {
  // const headerEntry = entries.find(entry => entry.target.tagName === 'HEADER');
  const footerEntry = entries.find(entry => entry.target.tagName === 'FOOTER');
  if (footerEntry && footerEntry.isIntersecting) {
    body.classList.remove("bodynormal");
    body.classList.add("bodyfooter");
    foliobg.classList.remove("bgnormal");
    foliobg.classList.add("bgfooter");
    foliofg.classList.remove("fgnormal");
    foliofg.classList.add("fgfooter");
  // } else if(footerEntry && footerEntry.isIntersecting) {
  //   photo.classList.remove("fixed");
  //   photo.classList.add("absolute");
  } else {
    body.classList.remove("bodyfooter");
    body.classList.add("bodynormal");
    foliobg.classList.remove("bgfooter");
    foliobg.classList.add("bgnormal");
    foliofg.classList.remove("fgfooter");
    foliofg.classList.add("fgnormal");
  }
}, sectionOptions);

sectionObserver.observe(footer);



