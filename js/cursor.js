"use strict";

window.addEventListener("DOMContentLoaded", function () {
    loadCursorFollower();
});

// function loadCursorFollower() {
//     const cursor = document.querySelector(".cursor");
//     document.addEventListener("mousemove", (e) => {
//         cursor.setAttribute(
//             "style",
//             "top: " + (e.pageY - 20) + "px; left: " + (e.pageX - 60) + "px;"
//         );
//     });

//     document.addEventListener("click", (e) => {
//         console.log(e.target);
//         cursor.classList.add("click");

//         setTimeout(() => {
//             cursor.classList.remove("click");
//         }, 500);
//     });
// }
function loadCursorFollower() {
    var container = document.getElementById("container");
    var circle = document.querySelector(".circle");
    var staticCircle = document.querySelector(".svg-circle-js");

    TweenMax.set(circle, { scale: 0, xPercent: -50, yPercent: -50 });

    container.addEventListener("pointerenter", function (e) {
        TweenMax.to(circle, 0.3, { scale: 1, opacity: 1 });
        TweenMax.to(staticCircle, 2, { scale: 1.7, opacity: 0.9, ease: "elastic.out(1, 1)" });
        positionCircle(e);

    });

    container.addEventListener("pointerleave", function (e) {
        TweenMax.to(circle, 0.3, { scale: 0, opacity: 0 });
        TweenMax.to(staticCircle, 2, { scale: 0.8, opacity: 0.8, ease: "elastic.out(1, 1)" });
        positionCircle(e);
    });

    container.addEventListener("pointermove", function (e) {
        //TweenMax.to(staticCircle, 1, { scale: 1, opacity: .9, ease: "elastic.out(1, 1)" });
        //TweenMax.to(staticCircle, 2, { rotation: 90, repeat: -1, transformOrigin: "left 50%" });
        positionCircle(e);
    });

    function positionCircle(e) {
        var rect = container.getBoundingClientRect();
        var relX = e.pageX - container.offsetLeft;
        var relY = e.pageY - container.offsetTop;

        TweenMax.to(circle, 0.3, { x: relX, y: relY });
        TweenMax.to(staticCircle, 2.3, { x: relX * -0.3, y: relY * -0.5, ease: "elastic.out(1, 1)" });
    }
}

