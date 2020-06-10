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

export default popUpGiftToggle;
