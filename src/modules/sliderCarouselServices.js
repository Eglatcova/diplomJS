//9.СЛАЙДЕР-КАРУСЕЛЬ услуги
/* $main: слайдер(только)
   $wrap: обертка слайдера с пагинацией, навигацией
   $slides: все слайды, делаем коллекцию
   $next: навигация
   $prev: навигация
   $slidesToShow: кол-во слайдов изначально
   $responsive: массив из брейкпоинтов и соответствующих им ширин экрана
*/


const sliderCarouselServicesFu = () => {
 class sliderCarouselServices {
    
    constructor({
      main,
      wrap,
      slides,
      next,
      prev,
      slidesToShow = 3,
      responsive = [],
    }) {
      this.main = document.querySelector(main);
      this.wrap = document.querySelector(wrap);
      this.slides = document.querySelectorAll(slides);
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);
      this.slidesToShow = slidesToShow;
      this.responsive = responsive;
      this.options = {
        position: 0,
        //ширина одного слайда
        widthSlide: 100 / this.slidesToShow,
      };
    }
    //вызов методов
    init() {
      this.addClass();
      this.addStyle();
      this.controlSlider();
      //если передали брейкпоинты
      if (this.responsive) {
        this.responseInit();
      }
    }
    //свои классы, отличные от верстки
    addClass() {
      this.main.classList.add("slider");
      this.wrap.classList.add("slider-wrap");
      this.slides.forEach((elem) => {
        elem.classList.add("slide__item");
      });
    }
    //стилизация
    
    addStyle() {
      const style = document.createElement("style");
      style.id = "slider-carousel-cervices-style";
      style.textContent = `.slider-wrap {
       overflow: hidden;
        padding-left: 0;
        padding-right: 0;
      }
      .slider {
        
        transition: transform 0.5s;
        will-change: transform;
        padding-left: 0;
        padding-right: 0;
      }
      .slide__item {
        flex: 0 0 calc(${this.options.widthSlide}% - 12px);
        margin-left: 0px
      }
      `;
      document.head.append(style);
    }
    //вызов навигации
    controlSlider() {
      this.prev.addEventListener("click", this.prevSlide.bind(this));
      this.next.addEventListener("click", this.nextSlide.bind(this));
    }
    //показ следующего слайда путем изменения css-свойтва translateX, в addStyle() обертке присваивается overflow: hidden
    prevSlide () {
      if (this.options.position > 0) {
        --this.options.position;
        this.main.style.transform = `translateX(-${
          this.options.position * this.options.widthSlide
        }%)`;
      }
    };
    nextSlide () {
      if (this.options.position < this.slides.length - this.slidesToShow) {
        ++this.options.position;
        this.main.style.transform = `translateX(-${
          this.options.position * this.options.widthSlide
        }%)`;
      }
    };
    //изменение количества слайдев на странице в зависимости от ширины экрана
    responseInit() {
      //записываем изначальную ширину
      const slidesDefault = this.slidesToShow,
        //вытаскиваем брейкпоинты
        allResponse = this.responsive.map((item) => item.breakpoint),
        //узнаем максимальный брейкпоинт
        maxResponse = Math.max(...allResponse);
  
      const checkResponse = () => {
        const widthWindow = document.documentElement.clientWidth;
        //запуск цикла если текущая ширина меньше максимального брейкпоинта
        if (widthWindow < maxResponse) {
          for (let i = 0; i < allResponse.length; i++) {
            //перебор массива брейкпоинтов, текущему slidesToShow присваивается slidesToShow из массива с брейкпоинтами, соответствующий минимально возможному брейкпоинту
            if (widthWindow < allResponse[i]) {
              this.slidesToShow = this.responsive[i].slidesToShow;
              this.options.widthSlide = 100 / this.slidesToShow;
              this.addStyle();
            }
          }
        } else {
          this.slidesToShow = slidesDefault;
          this.options.widthSlide = 100 / this.slidesToShow;
          this.addStyle();
        }
      };
  
      checkResponse();
  
      window.addEventListener("resize", checkResponse);
    }
  }

  const carousel = new sliderCarouselServices({
    main: ".services-slider",
    wrap: "#services .wrapper",
    slides: ".services-slider>.slide",
    next: ".services__navigation-left",
    prev: ".services__navigation-right",
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1024,
        slidesToShow: 4,
      },
      {
        breakpoint: 768,
        slidesToShow: 3,
      },
      {
        breakpoint: 576,
        slidesToShow: 2,
      },
    ],
  });
  carousel.init();


}



export default sliderCarouselServicesFu;