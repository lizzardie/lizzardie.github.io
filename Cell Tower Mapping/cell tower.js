

$(document).ready(function () {
    var length = $("#stickycontainer").height() - $("#fixedscroll").height();

    $(window).scroll(function () {
        var scroll = $(this).scrollTop();
        console.log(scroll);
        var height = $("#fixedscroll").height() + "px";

        if(scroll <= 0) {
            $("#fixedscroll").css({
                "position": "absolute",
                "top": "146.15px"
            });
        } else if(scroll > 20 && scroll < 50){
            $("#fixedscroll").css({
                "position": "absolute",
                "top": "130px",
                "left": "20px",
                "width": "165px"
        });
        } else if(scroll > 120 && scroll < 220){
            $("#fixedscroll").css({
                "position": "absolute",
                "top": "20px",
                "left": "20px",
                "width": "165px"
        });
        } else if(scroll >= length + 250) {
            $("#fixedscroll").css({
                "position": "absolute",
                "top": "30px",
                "bottom": "60px"
                
            });
        
        } else if(scroll >= length + 300) {
            $("#fixedscroll").css({
                "position": "absolute",
                "bottom": "300px"
                
            });
        } else {
            $("#fixedscroll").css({
                "position": "fixed",
                "height": "centered"
            });
        }
    });

});




/*


} else if(scroll >= length + 400) {
            $("#fixedscroll").css({
                "position": "absolute",
                "top": "-20px",
                "bottom": "200px"
                
            });


var stickyGuy = "#fixedscroll";
console.log(stickyGuy);






function findPos(stickyGuy){
    var curleft = curtop = 0;
    if (stickyGuy.offsetParent) {
        do{
            curleft += stickyGuy.offsetLeft;
            curtop += stickyGuy.offsetTop;
        } while(stickyGuy = stickyGuy.offsetParent);
        return [curleft, curtop];
        
}
}

*/


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

/* 
var stickyGuy = getElementById("#fixed scroll");
console.log(stickyGuy);

var topStick = stickyGuy.offsetTop;
console.log(topStick);

if (topStick >= 100){
    stickyGuy.addClass("fixed").css;

}
*/

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