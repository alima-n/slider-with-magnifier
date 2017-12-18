'use strict';

function Magnifier(obj) {

	const { targetClass, windowClass, magnifierClass } = obj;

	const target = document.getElementsByClassName(targetClass)[0],
	 	  targetCoords = target.getBoundingClientRect(),
	 	  width = targetCoords.width,
		  height = targetCoords.height;

	let	scrollTop = document.documentElement.scrollTop,
		scrollLeft = document.documentElement.scrollLeft,
		top = targetCoords.top + scrollTop + 'px',
		right = targetCoords.right + scrollLeft + 'px',
		left = targetCoords.left + scrollLeft - width + 'px';

	const zoomWindow = document.createElement('div');

	this.renderZoomWindow = function(){
		zoomWindow.classList.add(windowClass);
		zoomWindow.style.top = top;
		zoomWindow.style.width = width + 'px';
		zoomWindow.style.height = height + 'px';
		zoomWindow.hidden = true;
		document.body.append(zoomWindow);
	};

	this.setWindowPosition = function(direction){
		if ( direction === 'right') {
			zoomWindow.style.left = right;
		} else if ( direction === 'left' || direction ) {
			zoomWindow.style.left = left;
		}
	};
	 
	const magnifier = document.createElement('div');
	magnifier.classList.add(magnifierClass);

	let magnifierHeight = magnifier.clientHeight,
		magnifierWidth = magnifier.clientHeight;
		magnifier.style.width = width/4 + 'px';
		magnifier.style.height = height/4 + 'px';

	let activeSlide, activeImg, multiplierX, multiplierY, fullSizeImg;

	function uploadFullsize(e){
		activeSlide	= document.querySelector('.active');
		activeImg = activeSlide.querySelector('.active > img');
		activeSlide.append(magnifier);
		zoomWindow.hidden = false;
		zoomWindow.innerHTML = `<img src = ${activeImg.dataset.fullsize} style = "position: absolute">`;
		fullSizeImg = zoomWindow.querySelector('img');
	}

  	function magnify(e){
        if ( e.target === activeImg ) {
            multiplierX = 4;
            multiplierY = 4;
            const {top, left} = e.target.getBoundingClientRect();
            const clientY = e.clientY - top - magnifierHeight;
            const clientX = e.clientX - left;

            magnifier.style.top = clientY + 'px';
            magnifier.style.left = clientX + 'px';
            fullSizeImg.style.top = -(clientY * multiplierY) + 'px';
            fullSizeImg.style.left = -(clientX * multiplierX)+ 'px';
        }
    }

	function clear(e){
		zoomWindow.hidden = true;
		magnifier.style.left = '';
		magnifier.style.top = '';
	}
	
	this.activate = function(){
		target.addEventListener('mouseenter', uploadFullsize);
		target.addEventListener('mouseleave', clear);
		target.addEventListener('mousemove', magnify);
	}
	
}


