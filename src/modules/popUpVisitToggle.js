//3.открытие и закрытие модального окна "Записаться на бесплатный визит"
const popUpVisitToggle = () => {
  const popUp = document.querySelector("#free_visit_form"),
    popUpOpenButton = document.querySelector(".free-visit"),
    inner = popUp.innerHTML;
  //console.log(inner);
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

export default popUpVisitToggle;
