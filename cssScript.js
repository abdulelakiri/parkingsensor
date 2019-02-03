window.addEventListener("scroll", function() {
    if (window.scrollY > 1) {
        $('.navbar').fadeOut(250);
    }
    else {
        $('.navbar').show();
    }
},false);