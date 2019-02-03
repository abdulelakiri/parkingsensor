window.addEventListener("wheel", function(e) {
    if(e.deltaY < 30){
        $('.navbar').fadeIn(250);
    }
    if(e.deltaY > 0 ){
        $('.navbar').fadeOut(250);
    }
},false);

$(".parkNow").on("click", function(){
    console.log("Clicked!");
    $(body).scrollTop(300);
})

$(".pageJump").click(function(){
    var id = "#" + $(this).attr('goto');
    var top = $(id).position().top;
    $('html').scrollTop(top);
  });

$(".navDisable").click(function(){
    console.log("HIDE!");
    $('.navbar').toggle();
})