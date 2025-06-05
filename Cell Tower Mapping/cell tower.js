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