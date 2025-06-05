// for if i need to go back to reg javascript:
// make a "sticky" element/variable out of the div with the id #fixedscroll
// create an event listener for if that div is approaching the top edge of the screen
    // if the div reaches a certain threshold, at That point, apply a sticky condition
// another event listener for if the bottom of the div hits the edge of #stickycontainer 
    // that removes sticky condition

// another event listener for if the bottom of the div hits the bottom of the viewport height(vh)?
    // that would make it scroll up, might need one instead for the relation of the top of the div
    // to the top of the vh, like it always tending towards being in that perfect state of being dead center
    // and moving only within the bounds of the <aside>


var stickyGuy = getElementById("#fixed scroll");
console.log(stickyGuy);

var topStick = stickyGuy.offsetTop;
console.log(topStick);

if (topStick >= 100){
    stickyGuy.addClass("fixed").css;

}


/* 
this code works to keep the sidebar text sticky but it doesn't account for the fact that the sidebar info is taller than
what is on screen initially,,,,

var top = $("fixed-scroll").offset().top;
var height = $("fixedscroll").height();
var winHeight = $(window).height();
var gap = 10;

$(window).scroll(function(event) {
    var scrollTop = $(this).scrollTop();

    // sidebar reached the end
    if (scrollTop + winHeight >= top + height + gap) {
        // if so, fix the sidebar and make sure that offset().top will not give us results which would cancel the fixation
        $("#fixedscroll").addClass("fixed").css("top", winHeight - height - gap + "px");
    } else {
        // otherwise remove it
        $("#fixedscroll").removeClass("fixed").css("top", "0px");
    }
});
*/