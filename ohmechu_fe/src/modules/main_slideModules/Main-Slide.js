const slider = document.querySelector('#slider');
const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const sliderWidth = slider.clientWidth;

// console.log(slide.length);
var currentSlide = 0;

setInterval(() => {
  const from = -(sliderWidth * currentSlide);
  const to = from - sliderWidth;
  slides.animate(
    {
      marginLeft: [from + 'px', to + 'px'],
    },
    {
      duration: 500,
      easing: 'ease',
      iterations: 1,
      fill: 'both',
    }
  );
  currentSlide++;
  if (currentSlide === slide.length - 1) {
    currentSlide = 0;
  }
}, 3000);
