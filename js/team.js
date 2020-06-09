"use strict";
window.addEventListener("DOMContentLoaded", function() {
  fetchSVG();
  hideContent();
});

function hideContent() {
  var mainContent = document.querySelector("main");

  TweenMax.set(mainContent, { autoAlpha: 0 });
}

const template = document.querySelector("template").content;
let counter = 1;

function get() {
  fetch("https://biofrontiers-85a8.restdb.io/rest/team-members", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ec3c60ece64705c9963fccd",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(members => {
      members.forEach(showMember);
    });
}

function showMember(member) {
  const clone = template.cloneNode(true);
  clone
    .querySelector(".js-team-member__img")
    .classList.add("border-style" + counter);
  clone.querySelector(".js-team-member__name h3").textContent = member.name;
  clone.querySelector(".js-team-member__button").href =
    "team-member.html?" + member._id;
  clone.querySelector(".js-team-member__img-link").href =
    "team-member.html?" + member._id;
  clone.querySelector(".js-team-member__img-link img").src =
    "https://biofrontiers-85a8.restdb.io/media/" + member.img;

  if (counter == 7) {
    counter = 1;
  } else {
    counter++;
  }
  document.querySelector(".js-page-team__content").appendChild(clone);

  showContent();
}

function fetchSVG() {
  fetch("../assets/images/team-circle.svg")
    .then(e => e.text())
    .then(SVGdata => loadSVGCircle(SVGdata));
}

function loadSVGCircle(SVGdata) {
  let circle = document.querySelector(".svg-circle-js");

  circle.innerHTML = SVGdata;
}

function showContent() {
  var mainContent = document.querySelector("main");

  TweenMax.to(mainContent, 1, { autoAlpha: 1 });
}

get();
