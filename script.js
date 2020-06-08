"use strict";
//2.выбор клуба
const selectClub = () => {
  const buttonClubs = document.querySelector(".clubs-list"),
    clubsUl = document.querySelector(".clubs-list ul");

  const addElem = (elem) => {
    elem.style.display = "block";
  };

  const removeElem = (elem) => {
    elem.style.display = "none";
  };

  buttonClubs.addEventListener("click", () => {
    addElem(clubsUl);
  });
  document.addEventListener("click", () => {
    let target = event.target;
    target = target.closest(".clubs-list");
    if (target === null) {
      removeElem(clubsUl);
    }
  });
};

//3.открытие и закрытие модального окна "Записаться на бесплатный визит"
const popUpVisitToggle = () => {
  const popUp = document.querySelector("#free_visit_form"),
    popUpOpenButton = document.querySelector(".free-visit");

  const addElem = (elem) => {
    elem.style.display = "block";
  };

  const removeElem = (elem) => {
    elem.style.display = "none";
  };

  popUpOpenButton.addEventListener("click", () => {
    addElem(popUp);
  });

  popUp.addEventListener("click", () => {
    let target = event.target;

    if (target.closest(".form-content") === null) {
      removeElem(popUp);
    }
  });
};

//4. открытие и закрытие модального окна "Перезвоните мне"
const popUpCallbackToggle = () => {
  const popUp = document.querySelector("#callback_form"),
    popUpOpenButton = document.querySelector(".callback-btn"),
    popUpCloseButton = popUp.querySelector(".close-form");

  const addElem = (elem) => {
    elem.style.display = "block";
  };

  const removeElem = (elem) => {
    elem.style.display = "none";
  };

  popUpOpenButton.addEventListener("click", () => {
    addElem(popUp);
  });
  // закрыти при клике вне модально окна
  popUp.addEventListener("click", () => {
    let target = event.target;
    target = target.closest(".form-content");
    if (target === null) {
      removeElem(popUp);
    }
  });
};

//5.отправка посредством ajax и валидация
//баннер
const sendFormBanner = () => {
  const errorMessage = "Что то пошло не так",
    loadMessage = "Загрузка...",
    successMessage = "Спасибо! Мы скоро с вами свяжемся!";

  const bannerContent = document.querySelector("#banner .wrapper"),
    form = document.querySelector("#banner-form"),
    formName = document.querySelector("#name-banner-form");

  //сообщение-статус
  const statusMessage = document.createElement("div");
  statusMessage.style.cssText = "font-size: 2rem";

  //валидация имени
  formName.addEventListener("input", () => {
    formName.value = formName.value.match(/[а-яёА-ЯЁ  ]+/u, "");
  });

  //божественная маска

  function maskPhone(selector, masked = "+7 (___) ___-__-__") {
    const elems = document.querySelectorAll(selector);

    function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      //console.log(template);
      let i = 0,
        newValue = template.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf("_");
      if (i != -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      ) {
        this.value = newValue;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
    }

    for (const elem of elems) {
      elem.addEventListener("input", mask);
      elem.addEventListener("focus", mask);
      elem.addEventListener("blur", mask);
    }
  }

  // use

  maskPhone("#phone-banner-form", "+7 (___) ___-__-__");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.append(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(form);
    //объект для внесения в него данных формы
    let body = {};
    //запись данных формы в объект body
    formData.forEach((val, key) => {
      body[key] = val;
    });

    const postData = (body) => {
      return fetch("./server.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    };

    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("status network not 200");
        }
        bannerContent.innerHTML = successMessage;
        bannerContent.style.cssText = "font-size: 2rem";
      })
      .catch((error) => {
        bannerContent.innerHTML = errorMessage;
        bannerContent.style.cssText = "font-size: 2rem";
        console.error(error);
      });
  });
};

//заказ карты
const sendFormCard = () => {
  const errorMessage = "Что то пошло не так",
    loadMessage = "Загрузка...",
    successMessage = "Спасибо! Мы скоро с вами свяжемся!";

  const bannerContent = document.querySelector("#cards .right"),
    form = document.querySelector("#card_order"),
    formName = document.querySelector("#name-card-form");

  //сообщение-статус
  const statusMessage = document.createElement("div");
  statusMessage.style.cssText = "font-size: 2rem";

  //валидация имени
  formName.addEventListener("input", () => {
    formName.value = formName.value.match(/[а-яёА-ЯЁ  ]+/u, "");
  });

  //божественная маска

  function maskPhone(selector, masked = "+7 (___) ___-__-__") {
    const elems = document.querySelectorAll(selector);

    function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      //console.log(template);
      let i = 0,
        newValue = template.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf("_");
      if (i != -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      ) {
        this.value = newValue;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
    }

    for (const elem of elems) {
      elem.addEventListener("input", mask);
      elem.addEventListener("focus", mask);
      elem.addEventListener("blur", mask);
    }
  }

  // use

  maskPhone("#phone-card-form", "+7 (___) ___-__-__");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.append(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(form);
    //объект для внесения в него данных формы
    let body = {};
    //запись данных формы в объект body
    formData.forEach((val, key) => {
      body[key] = val;
    });

    const postData = (body) => {
      return fetch("./server.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    };

    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("status network not 200");
        }
        bannerContent.innerHTML = successMessage;
        bannerContent.style.cssText = "font-size: 2rem";
      })
      .catch((error) => {
        bannerContent.innerHTML = errorMessage;
        bannerContent.style.cssText = "font-size: 2rem";
        console.error(error);
      });
  });
};

//форма в футере
const sendFormFooter = () => {
  const errorMessage = "Что то пошло не так",
    loadMessage = "Загрузка...",
    successMessage = "Спасибо! Мы скоро с вами свяжемся!";

  const bannerContent = document.querySelector("#footer .right"),
    form = document.querySelector("#footer_form");

  //сообщение-статус
  const statusMessage = document.createElement("div");
  statusMessage.style.cssText = "font-size: 1.6rem";

  //божественная маска

  function maskPhone(selector, masked = "+7 (___) ___-__-__") {
    const elems = document.querySelectorAll(selector);

    function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      //console.log(template);
      let i = 0,
        newValue = template.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf("_");
      if (i != -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      ) {
        this.value = newValue;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
    }

    for (const elem of elems) {
      elem.addEventListener("input", mask);
      elem.addEventListener("focus", mask);
      elem.addEventListener("blur", mask);
    }
  }

  // use

  maskPhone("#callback_footer_form-phone", "+7 (___) ___-__-__");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.append(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(form);
    //объект для внесения в него данных формы
    let body = {};
    //запись данных формы в объект body
    formData.forEach((val, key) => {
      body[key] = val;
    });

    const postData = (body) => {
      return fetch("./server.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    };

    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("status network not 200");
        }
        bannerContent.innerHTML = successMessage;
        bannerContent.style.cssText = "font-size: 1.6rem";
      })
      .catch((error) => {
        bannerContent.innerHTML = errorMessage;
        bannerContent.style.cssText = "font-size: 1.6rem";
        console.error(error);
      });
  });
};

//callback-form
const sendFormCallback = () => {
  const errorMessage = "Что то пошло не так",
    loadMessage = "Загрузка...",
    successMessage = "Спасибо! Мы скоро с вами свяжемся!";

  const bannerContent = document.querySelector("#callback_form #form1"),
    form = document.querySelector("#form1"),
    formName = document.querySelector("#name-card-form");

  //сообщение-статус
  const statusMessage = document.createElement("div");
  statusMessage.style.cssText = "font-size: 1.7rem; color: white";

  //валидация имени
  formName.addEventListener("input", () => {
    formName.value = formName.value.match(/[а-яёА-ЯЁ  ]+/u, "");
  });

  //божественная маска

  function maskPhone(selector, masked = "+7 (___) ___-__-__") {
    const elems = document.querySelectorAll(selector);

    function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      //console.log(template);
      let i = 0,
        newValue = template.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf("_");
      if (i != -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      ) {
        this.value = newValue;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
    }

    for (const elem of elems) {
      elem.addEventListener("input", mask);
      elem.addEventListener("focus", mask);
      elem.addEventListener("blur", mask);
    }
  }

  // use

  maskPhone("#callback_form1-phone", "+7 (___) ___-__-__");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.append(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(form);
    //объект для внесения в него данных формы
    let body = {};
    //запись данных формы в объект body
    formData.forEach((val, key) => {
      body[key] = val;
    });

    const postData = (body) => {
      return fetch("./server.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    };

    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("status network not 200");
        }
        bannerContent.innerHTML = successMessage;
        bannerContent.style.cssText =
          "font-size: 1.7rem; color: white; margin-top: 2rem";
      })
      .catch((error) => {
        bannerContent.innerHTML = errorMessage;
        bannerContent.style.cssText =
          "font-size: 1.7rem; color: white; margin-top: 2rem";
        console.error(error);
      });
  });
};

//записаться на визит
const sendFormVisit = () => {
  const errorMessage = "Что то пошло не так",
    loadMessage = "Загрузка...",
    successMessage = "Спасибо! Мы скоро с вами свяжемся!";

  const bannerContent = document.querySelector("#free_visit_form #form2"),
    form = document.querySelector("#form2"),
    formName = document.querySelector("#name-card-form");
  //сообщение-статус
  const statusMessage = document.createElement("div");
  statusMessage.style.cssText = "font-size: 1.7rem; color: white";

  //валидация имени
  formName.addEventListener("input", () => {
    formName.value = formName.value.match(/[а-яёА-ЯЁ  ]+/u, "");
  });

  //божественная маска

  function maskPhone(selector, masked = "+7 (___) ___-__-__") {
    const elems = document.querySelectorAll(selector);

    function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      //console.log(template);
      let i = 0,
        newValue = template.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf("_");
      if (i != -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      ) {
        this.value = newValue;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
    }

    for (const elem of elems) {
      elem.addEventListener("input", mask);
      elem.addEventListener("focus", mask);
      elem.addEventListener("blur", mask);
    }
  }

  // use

  maskPhone("#callback_form2-phone", "+7 (___) ___-__-__");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.append(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(form);
    //объект для внесения в него данных формы
    let body = {};
    //запись данных формы в объект body
    formData.forEach((val, key) => {
      body[key] = val;
    });

    const postData = (body) => {
      return fetch("./server.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    };

    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("status network not 200");
        }
        bannerContent.innerHTML = successMessage;
        bannerContent.style.cssText =
          "font-size: 1.7rem; color: white; margin-top: 2rem";
      })
      .catch((error) => {
        bannerContent.innerHTML = errorMessage;
        bannerContent.style.cssText =
          "font-size: 1.7rem; color: white; margin-top: 2rem";
        console.error(error);
      });
  });
};

//6.открытие и закрытие модального окна при клике на подарок
const popUpGiftToggle = () => {
  const giftOpenBtn = document.querySelector(".fixed-gift"),
    popUp = document.querySelector("#gift");

  const addElem = (elem) => {
    elem.style.display = "block";
  };

  const removeElem = (elem) => {
    elem.style.display = "none";
  };

  giftOpenBtn.addEventListener("click", () => {
    addElem(popUp);
  });

  popUp.addEventListener("click", () => {
    let target = event.target;
    if (target.closest(".form-content") === null) {
      removeElem(popUp);
      removeElem(giftOpenBtn);
    } else if (target.closest(".close-btn")) {
      removeElem(popUp);
      removeElem(giftOpenBtn);
    }
  });
};

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
  //console.log(slide)
};

//9.СЛАЙДЕР-КАРУСЕЛЬ услуги
/* $main: слайдер(только)
   $wrap: обертка слайдера с пагинацией, навигацией
   $slides: все слайды, делаем коллекцию
   $next: навигация
   $prev: навигация
   $slidesToShow: кол-во слайдов изначально
   $responsive: массив из брейкпоинтов и соответствующих им ширин экрана
*/
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
    //console.log(this);
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
    this.prev.addEventListener("click", this.prevSlide);
    this.next.addEventListener("click", this.nextSlide);
  }
  //показ следующего слайда путем изменения css-свойтва translateX, в addStyle() обертке присваивается overflow: hidden
  prevSlide = () => {
    if (this.options.position > 0) {
      --this.options.position;
      this.main.style.transform = `translateX(-${
        this.options.position * this.options.widthSlide
      }%)`;
    }
  };
  nextSlide = () => {
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
    //console.log(allResponse)
  }
}

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

selectClub();
popUpVisitToggle();
popUpCallbackToggle();

sendFormBanner();
sendFormCard();
sendFormFooter();
sendFormCallback();
sendFormVisit();

popUpGiftToggle();

mainSlider();
sliderGallery();
