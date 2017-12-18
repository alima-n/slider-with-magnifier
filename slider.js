'use strict';

function Slider(obj){
    
    const { targetClass, slideBlockClass, slideClass, imgs_prev, imgs,
            animation: {hasAnimation, animationClass}, 
            controls: {hasControls, controlsClass, prevBtnClass, nextBtnClass},
            navDots: {hasDots, dotsClass, dot, activeDotClass},
            autoplay: {hasAutoplay, timeout} 
        } = obj;

    const target = document.getElementsByClassName(targetClass)[0],
          slideBlock = document.getElementsByClassName(slideBlockClass)[0];

    let slides, showSlides, n, timerId;

    const addClasses = useClass('add'), 
          removeClasses = useClass('remove'), 
          toggleClasses = useClass('toggle');

    function useClass(method) {
        return (elem, ...classList) => {
            classList.forEach( (className) => {
            elem.classList[method](className);
          });
        };
    }

    this.render = function(){
        for ( let img of imgs_prev ){
            let i = imgs_prev.indexOf(img);
            let slide = document.createElement('div');
            (hasAnimation) ? addClasses(slide, slideClass, animationClass) : addClasses(slide, slideClass);
            slide.innerHTML = `<img src= ${img} data-fullsize = ${imgs[i]} style= "width:100%;" alt="Slide ${++i}">`
            slideBlock.append(slide);
        }

        if ( hasDots ) {
            let dots = document.createElement('div');
            addClasses(dots, dotsClass);
            dots.innerHTML = `<em>${dot}</em>`.repeat(imgs_prev.length);
            target.append(dots);
        }

        if ( hasControls ) {
            let controls = document.createElement('div');
            addClasses(controls, controlsClass);
            controls.innerHTML = ` 
                <span class="${prevBtnClass.join(' ')}"></span>
                <span class="${nextBtnClass.join(' ')}"></span>
            `;
            target.append(controls);
        }
    };

    this.activate = function(){
         
        const dots = document.getElementsByClassName(dotsClass)[0].children,
              prev = document.getElementsByClassName(...prevBtnClass)[0],
              next = document.getElementsByClassName(...nextBtnClass)[0];
              slides = document.getElementsByClassName(slideClass);

        addClasses(slides[0], 'active');
        addClasses(dots[0], activeDotClass);
        n = 0;

        showSlides = function(slideIndex){    
            if ( slideIndex > slides.length-1 ){
                slideIndex = 0;
            } else if ( slideIndex < 0 ) {
                slideIndex = slides.length - 1;
            }

            [...slides].forEach( (el) => removeClasses(el, 'active') );
            addClasses(slides[slideIndex], 'active');

            [...dots].forEach( (el) => removeClasses(el, activeDotClass) );
            addClasses(dots[slideIndex], activeDotClass);
            n = slideIndex;
        }

        function clickOnControls(e) {
            if ( e.target === next ){
                showSlides(n + 1);
            } else if ( e.target === prev ) {
                showSlides(n - 1);
            }
        }
        target.addEventListener('click', clickOnControls);
    };

    this.autoplay = function(){
        if (hasAutoplay){
            let play = () => showSlides(n + 1);   
            timerId = setInterval(play, timeout);
            let stop = () => clearInterval(timerId);

            target.addEventListener('mouseenter', stop);
            target.addEventListener('mouseleave', this.autoplay);
        }
    };

};