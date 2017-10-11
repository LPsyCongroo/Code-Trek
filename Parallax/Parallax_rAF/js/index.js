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

      // Last update
      lastScroll = window.pageYOffset;

  function update() {
    let currentScroll = window.pageYOffset;
    if(lastScroll !== currentScroll){

      // Execute parallax only if the window width is above the minimum
      // and the parallax element is in view.
      if($(window).width() > minWidth && currentScroll <= $('.parallax-window').height()){

        // translate logo
        let translateLogo = Math.round(currentScroll * logoSpeed); 
        $('.logo h1').css({
          'transform' : 'translate3d(0, ' + translateLogo + 'px, 0 )',
        });

        // translate foreground
        let translateForeground = Math.round(currentScroll * foregroundSpeed);
        // Stop translation once fg is fully in view
        if(foregroundHidden > Math.abs(translateForeground)){
          $('.foreground-image').css({
            'transform' : 'translate3d(0, ' + translateForeground + 'px, 0 )',
          });
        }        
        
        lastScroll = currentScroll;
      }  

    }
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
  
});