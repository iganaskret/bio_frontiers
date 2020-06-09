"use strict";

window.addEventListener("DOMContentLoaded", function() {
  loadCursorFollower();
  hideContent();
});

function hideContent() {
  var mainContent = document.querySelector("main");

  TweenMax.set(mainContent, { autoAlpha: 0, yPercent: -5 });
}

const template = document.querySelector("template").content;
const currentId = window.location.href.slice(
  window.location.href.indexOf("?") + 1
);
let counter = 1;
let currBorder, currColor;

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
  if (member._id == currentId) {
    const clone = template.cloneNode(true);
    clone.querySelector(".js-page--title").textContent = member.name;
    clone
      .querySelector(".js-page-team-member__img")
      .classList.add("border-style" + counter);
    currBorder = counter;
    clone.querySelector(".js-page-team-member__descr p").textContent =
      member.descr;
    clone.querySelector(".js-page-team-member__email").href =
      "mailto:" + member.email;
    clone.querySelector(".js-page-team-member__email").textContent =
      member.email;
    clone.querySelector(".js-page-team-member__linkedin").href =
      member.linkedin;
    clone.querySelector(".js-page-team-member__img img").src =
      "https://biofrontiers-85a8.restdb.io/media/" + member.img;
    document.querySelector(".js-page-team-member__content").appendChild(clone);
  }
  if (counter == 7) {
    counter = 1;
  } else {
    counter++;
  }

  fetchSVG();
}

function fetchSVG() {
  fetch("../assets/images/team-circle.svg")
    .then(e => e.text())
    .then(SVGdata => loadSVGCircle(SVGdata));

  fetch("../assets/images/arrow-down.svg")
    .then(e => e.text())
    .then(SVGdata => loadSVGArrow(SVGdata));
}

function loadSVGCircle(SVGdata) {
  let circle = document.querySelector(".svg-circle-js");

  circle.innerHTML = SVGdata;
  if (currBorder == 1) {
    currColor = "#6D8494";
  } else if (currBorder == 2) {
    currColor = "#82A6A2";
  } else if (currBorder == 3) {
    currColor = "#DFDBCF";
  } else if (currBorder == 4) {
    currColor = "#838654";
  } else if (currBorder == 5) {
    currColor = " #5B5C3C";
  } else if (currBorder == 6) {
    currColor = "#8B6C64";
  } else {
    currColor = "#CB8E71";
  }

  document.querySelector(".team__fill").style.fill = currColor;
}

function loadSVGArrow(SVGdata) {
  let arrows = document.querySelectorAll(".svg-arrow-js");

  for (let arrow of arrows) {
    arrow.innerHTML = SVGdata;
  }

  showContent();
}

function loadCursorFollower() {
  var container = document.querySelector(".page-team-member");
  var circle = document.querySelector(".svg-circle-js");

  TweenMax.set(circle, { xPercent: 100, yPercent: 0, opacity: 0.5 });

  container.addEventListener("pointerenter", function(e) {
    TweenMax.to(circle, 1, {
      scale: 0.7,
      opacity: 0.5,
      yPercent: 20,
      ease: "elastic.out(1, 1)"
    });
    positionCircle(e);
  });

  container.addEventListener("pointerleave", function(e) {
    TweenMax.to(circle, 1, { scale: 0, opacity: 0 });
    positionCircle(e);
  });

  container.addEventListener("pointermove", function(e) {
    positionCircle(e);
  });

  function positionCircle(e) {
    var rect = container.getBoundingClientRect();
    var relX = e.pageX - container.offsetLeft;
    var relY = e.pageY - container.offsetTop;

    TweenMax.to(circle, 3, {
      x: relX * -0.3,
      y: relY * -0.3,
      ease: "elastic.out(1, 1)"
    });
  }
}

function showContent() {
  var mainContent = document.querySelector("main");

  TweenMax.to(mainContent, 1, {
    autoAlpha: 1,
    yPercent: 0,
    ease: "power2.out"
  });
}

get();
