"use strict";
const template = document.querySelector("template").content;
let counter = 1;

window.addEventListener("DOMContentLoaded", function() {
  get();
  hideContent();
});

function hideContent() {
  var mainContent = document.querySelector("main");

  TweenMax.set(mainContent, { autoAlpha: 0 });
}

function get() {
  fetch("https://biofrontiers-85a8.restdb.io/rest/events", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ec3c60ece64705c9963fccd",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(events => {
      events.forEach(showEvent);
    });
}

function showEvent(event) {
  const clone = template.cloneNode(true);
  clone.querySelector(".js-checkbox").setAttribute("id", "chck" + counter);
  clone.querySelector(".js-accordion__tab-label").htmlFor = "chck" + counter;
  counter++;
  clone.querySelector(".js-accordion__tab-title").textContent = event.title;
  clone.querySelector(".js-accordion__tab-date").textContent = event.date;
  clone.querySelector(".js-accordion__tab-content p").innerHTML = event.content;

  if (event.poster) {
    clone.querySelector(".accordion__tab-content-first-extra").style.display =
      "flex";
  }

  if (event.speakers) {
    clone.querySelector(".accordion__tab-content-second-extra").style.display =
      "flex";
  }

  if (event.category == "upcoming") {
    document
      .querySelector(".js-accordions-first-section__tabs")
      .appendChild(clone);
  } else {
    document
      .querySelector(".js-accordions-second-section__tabs")
      .appendChild(clone);
  }
  loadRest();
}

function loadRest() {
  fetchSVG();
}

function fetchSVG() {
  fetch("../assets/images/arrow-down.svg")
    .then(e => e.text())
    .then(SVGdata => loadSVGArrow(SVGdata));

  fetch("../assets/images/circle.svg")
    .then(e => e.text())
    .then(SVGdata => loadSVGCircle(SVGdata));

  showContent();
}

function loadSVGArrow(SVGdata) {
  let arrows = document.querySelectorAll(".svg-arrow-js");

  for (let arrow of arrows) {
    arrow.innerHTML = SVGdata;
  }
}

function loadSVGCircle(SVGdata) {
  let circle = document.querySelector(".svg-circle-js");

  circle.innerHTML = SVGdata;
}

function showContent() {
  var mainContent = document.querySelector("main");

  TweenMax.to(mainContent, 1, { autoAlpha: 1 });
}
