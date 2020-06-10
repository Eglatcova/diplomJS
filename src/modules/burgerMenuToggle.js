//14, 15, 16 бургер-меню
const burgerMenuToggle = () => {
  const popupMenu = document.querySelector(".popup-menu"),
    head = document.querySelector(".head"),
    topMenu = document.querySelector(".top-menu");

  const addElem = (elem) => {
    elem.style.display = "flex";
  };

  const removeElem = (elem) => {
    elem.style.display = "none";
  };
  //фиксация меню на опеределенной высоте скролла
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > head.clientHeight) {
      topMenu.style = "position: fixed";
      document.body.style.marginTop = topMenu.clientHeight + "px";
    } else {
      topMenu.style = "position: static";
      document.body.style.marginTop = 0 + "px";
    }
  });

  document.addEventListener("click", () => {
    let target = event.target;
    //искючение всех слушателей, кроме меню и его детей
    if (!target.closest(".menu-button, .close-menu-btn, a")) {
      return;
    }
    if (target.closest(".menu-button")) {
      addElem(popupMenu);
    }
    if (target.closest(".close-menu-btn")) {
      removeElem(popupMenu);
    }
    if (target.closest("a")) {
      removeElem(popupMenu);
    }
  });
};

export default burgerMenuToggle;
