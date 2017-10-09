$(document).ready(function(){
  
      // Point at which to disable parallax
  let minWidth = 700,

      // Amount of foreground image initially hidden from view
      foregroundHidden =  
          $('.foreground-image').height()
        + parseInt($('.foreground-image').css('top'), 10) 
        - $('.parallax-window').height(),

      // Speed of parallax elements
      foregroundSpeed = -0.5,
      logoSpeed = 1.2,

      // Scroll distance
      wScroll = 0,
      
      // Ticking
      ticking = false;
    
  function update() {
    
    // Using pageYOffset is more optimal than jQuery's scrollTop() function
    wScroll = window.pageYOffset;

    // Execute parallax only if the window width is above the minimum
    // and the parallax element is in view.
    if($(window).width() > minWidth && wScroll <= $('.parallax-window').height()){

      // translate logo
      let translateLogo = Math.round(wScroll * logoSpeed); 
      $('.logo h1').css({
        'transform' : 'translate3d(0, ' + translateLogo + 'px, 0 )',
      });

      // translate foreground
      let translateForeground = Math.round(wScroll * foregroundSpeed);
      // Stop translation once fg is fully in view
      if(foregroundHidden > Math.abs(translateForeground)){
        $('.foreground-image').css({
          'transform' : 'translate3d(0, ' + translateForeground + 'px, 0 )',
        });        
      }    
    }

    //rAF
    requestAnimationFrame(update);

  } //scroll function



$(window).scroll(()=>{
  if(!ticking) {
		requestAnimationFrame(update);
	}
	ticking = true;
}); // Event Listener

}); //document ready function