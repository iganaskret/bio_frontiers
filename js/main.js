// global stuff

window.addEventListener("DOMContentLoaded", function () {
    hideHeaderOnScroll();
});

function hideHeaderOnScroll() {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.querySelector(".header").style.top = "0";
        } else {
            document.querySelector(".header").style.top = "-8.6em";
        }
        prevScrollpos = currentScrollPos;
    }
}