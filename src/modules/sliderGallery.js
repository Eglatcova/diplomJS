//10.слайдер Фотогалерея
const sliderGallery = () => {
  const slides = document.querySelectorAll("#gallery .slide"),
    pagination = document.querySelector(".gallery__pagination"),
    slider = document.querySelector("#gallery .wrapper");
  let currentSlide = 0,
    interval;
  // создает пагинацию слайдера
  let dotAll = [];
  slides.forEach((index) => {
    (dotAll[index] = document.createElement("div")),
      (dotAll[index].className = "dot"),
      dotAll.push(dotAll[index]);
    dotAll[0].className = "dot dot-active";
    pagination.append(dotAll[index]);
  });

  //удаление слайда
  const prevSlide = (elem, currentIndex, elemClass) => {
    elem[currentIndex].classList.remove(elemClass);
  };

  //добавление слайда
  const nextSlide = (elem, currentIndex, elemClass) => {
    elem[currentIndex].classList.add(elemClass);
  };

  const autoPlaySlide = () => {
    prevSlide(slides, currentSlide, "slide-active");
    prevSlide(dotAll, currentSlide, "dot-active");
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    nextSlide(slides, currentSlide, "slide-active");
    nextSlide(dotAll, currentSlide, "dot-active");
  };
  //вызов автоматического переключения
  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener("click", (event) => {
    event.preventDefault();
    let target = event.target;
    if (!target.matches(".next-slide, .prev-slide, .dot")) {
      return;
    }
    prevSlide(slides, currentSlide, "slide-active");
    prevSlide(dotAll, currentSlide, "dot-active");
    if (target.matches(".next-slide")) {
      currentSlide++;
    } else if (target.matches(".prev-slide")) {
      currentSlide--;
    } else if (target.matches(".dot")) {
      dotAll.forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
    nextSlide(slides, currentSlide, "slide-active");
    nextSlide(dotAll, currentSlide, "dot-active");
  });

  //остановка автоматического переключения при наведении на пагинацию и навигацию
  slider.addEventListener("mouseover", (event) => {
    if (
      event.target.matches(".next-slide, .prev-slide") ||
      event.target.matches(".dot")
    ) {
      stopSlide();
    }
  });
  //включение автоматического переключения если нет наведения
  slider.addEventListener("mouseout", (event) => {
    if (
      event.target.matches(".next-slide, .prev-slide") ||
      event.target.matches(".dot")
    ) {
      startSlide();
    }
  });

  startSlide();
};

export default sliderGallery;
