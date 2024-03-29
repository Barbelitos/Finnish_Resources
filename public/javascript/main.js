$(function($) {
    let url = window.location.href;
    $('nav ul li a').each(function() {
        if (this.href === url) {
            $(this).addClass('active');
        }
    });
});

document.querySelector('.navbar-toggler').onclick = function() {
    var headerContent = document.querySelector('.header-content');
    // headerContent.style.transition = 'opacity 0.5s';
    const { opacity } = headerContent.ownerDocument.defaultView.getComputedStyle(headerContent, null);
    if (opacity === '1') {
    headerContent.style.opacity = '0';
    } else {
    headerContent.style.opacity = '1';
    }
};

$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            // Store hash
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function(){
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});

$(".slideshow > div:gt(0)").hide();

setInterval(function() {
    $('.slideshow > div:first')
    .fadeOut(2000)
    .next()
    .fadeIn(2000)
    .end()
    .appendTo('.slideshow');
},  8000);