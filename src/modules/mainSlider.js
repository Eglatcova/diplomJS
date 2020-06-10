//7.слайдер на верху страницы
const mainSlider = (time = 3000) => {
  const slide = document.querySelectorAll(".main-slider>.slide");

  //удаление слайда
  const prevSlide = (elem, index) => {
    elem[index].style.display = "none";
  };
  //добавление слайда
  const nextSlide = (elem, index) => {
    elem[index].style.display = "flex";
  };
  //переключение слайдов
  const autoPlaySlide = () => {
    prevSlide(slide, currentSlide);
    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide);
  };
  let currentSlide = 0,
    interval;
  //автоматическое переключение слайдов
  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };

  startSlide(3000);
};

export default mainSlider;