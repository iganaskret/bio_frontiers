"use strict";
const template = document.querySelector("template").content;

get();
hideContent();
loadCursorFollower();

const currentId = window.location.href.slice(
  window.location.href.indexOf("?") + 1
);

function hideContent() {
  var mainContent = document.querySelector("main");

  TweenMax.set(mainContent, { autoAlpha: 0 });
}

function get() {
  fetch("https://biofrontiers-85a8.restdb.io/rest/homepage", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ec3c60ece64705c9963fccd",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(sections => {
      sections.forEach(showSection);
    })
    .then(b => {
      connectTheDots();
    });
}

function showSection(section) {
  const clone = template.cloneNode(true);
  clone
    .querySelector(".js-page-home__section")
    .classList.add("page-home__" + section.id);
  clone.querySelector(".js-page-home__section").setAttribute("id", section.id);
  clone.querySelector(".js-page-home__section h1").textContent = section.title;
  clone.querySelector(".js-page-home__section p").innerHTML = section.content;
  clone
    .querySelector(".js-page-home__circle")
    .setAttribute("id", section.id + "_circle");
  if (section.link) {
    clone.querySelector(".js-page-home__section-link").href =
      "/bio_frontiers/pages/" + section.link + ".html";
    clone.querySelector(".js-page-home__section-link").textContent =
      section.link_text;
    clone
      .querySelector(".js-page-home__section p")
      .classList.add("p-padding-bottom");
  }

  document.querySelector(".page-home__sections-container").appendChild(clone);
}

window.addEventListener("DOMContentLoaded", function() {
  fetchSVG();
  if (currentId) {
    setTimeout(function() {
      let elmnt = document.getElementById(currentId);
      elmnt.scrollIntoView();
    }, 1500);
  }
});

function fetchSVG() {
  fetch("assets/images/home-circle.svg")
    .then(e => e.text())
    .then(SVGdata => loadSVGCircle(SVGdata));
}

function loadSVGArrow(SVGdata) {
  let arrows = document.querySelectorAll(".svg-arrow-js");

  for (let arrow of arrows) {
    arrow.innerHTML = SVGdata;
  }
}
function loadGrowth() {
  let circles = document.querySelectorAll(".js-page-home__circle");
  for (let circle of circles) {
    let blob = circle.getElementsByTagName("video")[0];
    console.log(circle.id);
    if (circle.id != "about_circle" && circle.id != "contact_circle") {
      blob.src = "assets/images/" + circle.id + ".webm";
    }
    blob.id = circle.id + "_video";
  }
}

function loadSVGCircle(SVGdata) {
  let circle = document.querySelector(".svg-circle-js");

  circle.innerHTML = SVGdata;
  showContent();
}

function loadCursorFollower() {
  var container = document.getElementById("container");
  var circle = document.querySelector(".circle");
  var staticCircle = document.querySelector(".svg-circle-js");

  TweenMax.set(circle, { scale: 0, xPercent: -50, yPercent: -50 });
  TweenMax.set(staticCircle, { opacity: 0.9 });

  container.addEventListener("pointerenter", function(e) {
    TweenMax.to(circle, 0.3, { scale: 1, opacity: 1 });
    TweenMax.to(staticCircle, 4, { scale: 1, ease: "elastic.out(1, 1)" });
    positionCircle(e);
  });

  container.addEventListener("pointerleave", function(e) {
    TweenMax.to(circle, 0.3, { scale: 0, opacity: 0 });
    TweenMax.to(staticCircle, 2, { scale: 1, ease: "elastic.out(1, 1)" });
    positionCircle(e);
  });

  container.addEventListener("pointermove", function(e) {
    //TweenMax.to(staticCircle, 1, { opacity: .9, ease: "elastic.out(1, 1)" });
    //TweenMax.to(staticCircle, 2, { rotation: 90, repeat: -1, transformOrigin: "left 50%" });
    positionCircle(e);
  });

  function positionCircle(e) {
    var rect = container.getBoundingClientRect();
    var relX = e.pageX - container.offsetLeft;
    var relY = e.pageY - container.offsetTop;

    TweenMax.to(circle, 0.3, { x: relX, y: relY });
    TweenMax.to(staticCircle, 5.3, {
      y: relY / 10,
      transformOrigin: "50% bottom",
      skewX: relX / -200,
      ease: "elastic.out(1, 1)"
    });
  }
}

function showContent() {
  var mainContent = document.querySelector("main");

  TweenMax.to(mainContent, 1, { autoAlpha: 1 });
}

//connector between sections
function connectTheDots() {
  /* let divHome      = document.querySelector("#home_circle"); */
  let divAbout = document.querySelector("#about_circle");
  let divWho = document.querySelector("#who_circle");
  let divHow = document.querySelector("#how_circle");
  let divEvents = document.querySelector("#events_circle");
  let divJoin = document.querySelector("#join_circle");
  let divContact = document.querySelector("#contact_circle");
  let connector = document.querySelector("#connector");

  let drawConnector = function() {
    /*   let posHome = {
        x: divHome.offsetLeft + divHome.offsetWidth / 2,
        y: divHome.offsetTop  + divHome.offsetHeight / 2
      }; */
    let posAbout = {
      x: divAbout.offsetLeft + divAbout.offsetWidth / 2,
      y: divAbout.offsetTop + divAbout.offsetHeight / 2
    };
    let posWho = {
      x: divWho.offsetLeft + divAbout.offsetWidth / 2,
      y: divWho.offsetTop + divAbout.offsetHeight / 2
    };
    let posHow = {
      x: divHow.offsetLeft + divHow.offsetWidth / 2,
      y: divHow.offsetTop + divHow.offsetHeight / 2
    };
    let posEvents = {
      x: divEvents.offsetLeft + divEvents.offsetWidth / 2,
      y: divEvents.offsetTop + divEvents.offsetHeight / 2
    };
    let posJoin = {
      x: divJoin.offsetLeft + divJoin.offsetWidth / 2,
      y: divJoin.offsetTop + divJoin.offsetHeight / 2
    };
    let posContact = {
      x: divContact.offsetLeft + divContact.offsetWidth / 2,
      y: divContact.offsetTop + divContact.offsetHeight / 2
    };
    let dStr =
      "M" +
      posAbout.x +
      "," +
      posAbout.y +
      " " +
      /*  "M" +
      (posHome.x      ) + "," + (posHome.y) + " " +
      "L" +
      (posHome.x) + "," + (posHome.y) + " " +
      (posAbout.x) + "," + (posAbout.y) + " " +  */
      "L" +
      posAbout.x +
      "," +
      posAbout.y +
      " " +
      posWho.x +
      "," +
      posWho.y +
      " " +
      "L" +
      posWho.x +
      "," +
      posWho.y +
      " " +
      posHow.x +
      "," +
      posHow.y +
      " " +
      "L" +
      posHow.x +
      "," +
      posHow.y +
      " " +
      posEvents.x +
      "," +
      posEvents.y +
      " " +
      "L" +
      posEvents.x +
      "," +
      posEvents.y +
      " " +
      posJoin.x +
      "," +
      posJoin.y +
      " " +
      "L" +
      posJoin.x +
      "," +
      posJoin.y +
      " " +
      posContact.x +
      "," +
      posContact.y;

    connector.setAttribute("d", dStr);
  };
  window.addEventListener("scroll", drawConnector);
  window.addEventListener("resize", drawConnector);

  loadGrowth();
  drawConnector();
  // playing blobs on mouseneter

  let video = document.querySelectorAll("video");

  video.forEach(video => {
    video.addEventListener("mouseover", function() {
      this.play();
    });
    video.addEventListener("mouseout", function() {
      this.pause();
    });
    video.addEventListener("touchstart", function() {
      this.play();
    });
    video.addEventListener("touchend", function() {
      this.pause();
    });
  });
}
