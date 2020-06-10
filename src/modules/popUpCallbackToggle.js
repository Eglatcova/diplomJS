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

export default popUpCallbackToggle;
