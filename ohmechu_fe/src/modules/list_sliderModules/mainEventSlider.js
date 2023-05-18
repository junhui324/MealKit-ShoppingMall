const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let slideInterval;

function sliderEvent() {
  slideInterval = setInterval(() => {
    if (currentSlide === slides.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    slide();
  }, 8000);
}

function slide() {
  slider.style.transform = `translateX(-${currentSlide * 20}%)`;
  for (let i = 0; i < slides.length; i++) {
    if (i === currentSlide) {
      slides[i].style.transform = 'translateX(0)';
    } else {
      slides[i].style.transform = 'translateX(100%)';
    }
  }
}

export { sliderEvent };
