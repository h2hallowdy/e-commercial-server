document.addEventListener('DOMContentLoaded', function() {

    var dots = document.querySelectorAll('.dot');
    var slides = document.querySelectorAll('.slide');
    function AutoSlide() {
        this.start = setInterval(toNextSlide, 3000);
        this.stop = function() { clearInterval(this.start); }
        this.continue = function() { this.start = setInterval(toNextSlide, 5000); }
    }
    
    var autoSlide = new AutoSlide();
    autoSlide.start;
    for(x of dots) {
        x.addEventListener('click', function() {
            autoSlide.stop();
            autoSlide.continue();
            let currentDot = document.querySelector('.dot.active');
            let currentSlide = document.querySelector('.slide.active');
            currentDot.classList.remove('active');
            currentSlide.classList.remove('active');
            this.classList.add('active');
            var arrDots = Object.values(dots);
            slides[arrDots.indexOf(this)].classList.add('active');
            // let current = this;
            // let number = 0;
            // for(x of dots) {
            //     x.classList.remove('active');
            // }
            // this.classList.add('active');
            // for(x of slides) { x.classList.remove('active') }
            // while (current = current.previousElementSibling) {
            //     number ++;
            // }
            // slides[number].classList.add('active');
        }); 
    }

    function toNextSlide() {
        let currentSlide = document.querySelector('.slide.active');
        let currentDot = document.querySelector('.dot.active');
        currentSlide.classList.remove('active');
        currentDot.classList.remove('active');
        autoSlide.stop();
        autoSlide.continue();
        if (currentSlide.nextElementSibling != null) {
            currentSlide.nextElementSibling.classList.add('active');
            currentDot.nextElementSibling.classList.add('active');
        } else {
            slides[0].classList.add('active');
            dots[0].classList.add('active');
        }
        
    }

    function toPrevSlide() {
        let currentSlide = document.querySelector('.slide.active');
        let currentDot = document.querySelector('.dot.active');
        currentSlide.classList.remove('active');
        currentDot.classList.remove('active');
        autoSlide.stop();
        autoSlide.continue();
        if (currentSlide.previousElementSibling != null) {
            currentSlide.previousElementSibling.classList.add('active');
            currentDot.previousElementSibling.classList.add('active');
        } else {
            slides[slides.length - 1].classList.add('active');
            dots[slides.length - 1].classList.add('active');
        }
        
    }

    var leftArrow = document.querySelector('.left-arrow');
    var rightArrow = document.querySelector('.right-arrow');

    rightArrow.addEventListener('click', toNextSlide);
    leftArrow.addEventListener('click', toPrevSlide);
}, false);