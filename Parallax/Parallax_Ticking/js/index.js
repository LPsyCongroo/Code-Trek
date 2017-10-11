
      // DOM elements
  const foregroundImage = document.querySelector('.foreground-image'),
        logo = document.querySelector('.logo h1'),
        parallaxWindow = document.querySelector('.parallax-window'),

      // DOM properties
        pwHeight = parallaxWindow.offsetHeight,
        fgHeight = foregroundImage.offsetHeight,
        fgTop = parseInt(window.getComputedStyle(foregroundImage).top, 10);

      // Device width at which to disable parallax
  let minWidth = 700,

      // Amount of foreground image initially hidden from view
      foregroundHidden =  
          fgHeight
        + fgTop
        - pwHeight,

      // Speed of parallax elements
      foregroundSpeed = -0.5,
      logoSpeed = 1.2,

      // Scroll distance
      wScroll = 0,
      
      // trigger -> We use this so that only an initial scroll event triggers rAF
      rAFtriggered = false,

      // rAF ID for cancelation
      rAFID,
      
      // Are we in a position to parallax? 
      canParallax = wScroll <= pwHeight;

  function update() {

    // Execute parallax only if the window width is above the minimum
    // and the parallax element is in view.
    if(window.innerWidth > minWidth ){ //&& canParallax){

      // translate logo
      let translateLogo = Math.round(wScroll * logoSpeed); 
      logo.style.transform = 'translate3d(0, ' + translateLogo + 'px, 0)';

      // translate foreground
      let translateForeground = Math.round(wScroll * foregroundSpeed);
      // Stop translation once fg is fully in view
      if(foregroundHidden > Math.abs(translateForeground)){
        foregroundImage.style.transform = 'translate3d(0, ' + translateForeground + 'px, 0)';       
      }    

    }

    rAFID = requestAnimationFrame(update);

  } //update function



  window.addEventListener('scroll', ()=>{
    // Get the distance the window scrolled from the top
    wScroll = window.pageYOffset;

    // Can wee see the parallaxWindow in the viewport?
    canParallax = wScroll <= pwHeight;

    // If we can parallax and a rAF has not yet been triggered then kickoff the rAF
    if(!rAFtriggered && canParallax) {
      rAFID = requestAnimationFrame(update);
      rAFtriggered = true;
    }

    // If we cannot see the parallax window and a rAF is running, cancel the rAF
    else if(rAFtriggered && !canParallax){
      cancelAnimationFrame(rAFID);
      rAFtriggered = false;
    }
  }); // Event Listener

