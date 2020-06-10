//--валидация всех чекбоксов
const checkboxESValide = () => {
  //чекбокс1(баннер)
  const form1 = document.querySelector("#banner-form"),
    label1 = form1.querySelector(".personal-data label"),
    checkForm1 = document.querySelector("#check1");
  //чекбокс2(клубные карты)
  const form2 = document.querySelector("#card_order"),
    label2 = form2.querySelector(".personal-data label"),
    checkForm2 = document.querySelector("#card_check");
  //контейнер для текста ошибки
  let errorText = document.createElement("p");
  errorText.classList.add("error-text1");
  errorText.style =
    "color: red; text-align: center; left: 0; right:0; top: 1.5rem; margin: auto; position: absolute";

  //показать текст ошибки

  const errorTextAdd = (label, checkbox) => {
    if (!checkbox.checked) {
      label.append(errorText);
      errorText.textContent = "Подтвердите согласие!";
    }
  };

  //убрать текст ошибки

  const clearTextError = (checkbox) => {
    if (checkbox.checked) {
      errorText.textContent = "";
    }
  };

  document.addEventListener("click", () => {
    let target = event.target;
    if (!target.closest("#banner-form, #card_order")) {
      return;
    }
    //валидация чекбокса1(баннер)
    if (target.closest("#banner-form")) {
      if (target.closest(".btn__bunner")) {
        errorTextAdd(label1, checkForm1);
      }

      if (target.closest("#check1")) {
        clearTextError(checkForm1);
      }
    }

    //валидация чекбокса2(клубные карты)
    if (target.closest("#card_order")) {
      if (target.closest(".card-order-btn")) {
        errorTextAdd(label2, checkForm2);
      }

      if (target.closest("#card_check")) {
        clearTextError(checkForm2);
      }
    }
  });
};

export default checkboxESValide;