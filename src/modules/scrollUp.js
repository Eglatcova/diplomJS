//17 стрелка вверх
const scrollUp = () => {
  const arrowUp = document.querySelector("#totop"),
    mainHeader = document.querySelector(".header-main");

  //плавный скролл!!!
  const scrollUp = () => {
    window.scrollBy(0, -100); // чем меньше значение (цифра -10), тем меньше скорость перемещения
    if (window.pageYOffset > 0) {
      requestAnimationFrame(scrollUp);
    } // если значение прокрутки больше нуля, то функция повторится
  };

  const addElem = (elem) => {
    elem.style.display = "inline-block";
  };

  const removeElem = (elem) => {
    elem.style.display = "none";
  };

  removeElem(arrowUp);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > mainHeader.clientHeight) {
      addElem(arrowUp);
    } else {
      removeElem(arrowUp);
    }
  });

  arrowUp.addEventListener("click", function (e) {
    e.preventDefault(); // запрет перехода по ссылке, вместо него скрипт
    scrollUp();
  });
};

export default scrollUp;
