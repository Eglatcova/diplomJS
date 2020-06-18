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
  //чекбокс3(обратный звонок)
  const form3 = document.querySelector("#form1"),
    label3 = form3.querySelector(".personal-data label"),
    checkForm3 = form3.querySelector("#check");
  //чекбокс4(запись на визит)
  const form4 = document.querySelector("#form2"),
    label4 = form4.querySelector(".personal-data label"),
    checkForm4 = form4.querySelector("#check2");

  //контейнер для текста ошибки1
  let errorText = document.createElement("p");
  errorText.classList.add("error-text1");
  errorText.style =
    "color: red; text-align: center; left: 0; right:0; top: 1.5rem; margin: auto; position: absolute;";

  //контейнер для текста ошибки2
  let errorText2 = document.createElement("p");
  errorText2.classList.add("error-text1");
  errorText2.style =
    "color: red; text-align: center; left: 0; right:0; top: 2.35rem; margin: auto; position: absolute;";

  //показать текст ошибки1

  const errorTextAdd = (label, checkbox, error) => {
    if (!checkbox.checked) {
      label.append(error);
      error.textContent = "Подтвердите согласие!";
    }
  };

  //убрать текст ошибки1

  const clearTextError = (checkbox, error) => {
    if (checkbox.checked) {
      error.textContent = "";
    }
  };

  document.addEventListener("click", () => {
    let target = event.target;
    if (!target.closest("#banner-form, #card_order, #form1, #form2")) {
      return;
    }
    //валидация чекбокса1(баннер)
    if (target.closest("#banner-form")) {
      if (target.closest(".btn__bunner")) {
        errorTextAdd(label1, checkForm1, errorText);
      }

      if (target.closest("#check1")) {
        clearTextError(checkForm1, errorText);
      }
    }

    //валидация чекбокса2(клубные карты)
    if (target.closest("#card_order")) {
      if (target.closest(".card-order-btn")) {
        errorTextAdd(label2, checkForm2, errorText);
      }

      if (target.closest("#card_check")) {
        clearTextError(checkForm2, errorText);
      }
    }

    //валидация чекбокса3(обратный звонок)
    if (target.closest("#form1")) {
      if (target.closest(".btn-send")) {
        errorTextAdd(label3, checkForm3, errorText2);
      }

      if (target.closest("#check")) {
        clearTextError(checkForm3, errorText2);
      }
    }

    //валидация чекбокса4(запись на визит)
    if (target.closest("#form2")) {
      if (target.closest(".btn-send")) {
        errorTextAdd(label4, checkForm4, errorText2);
      }

      if (target.closest("#check2")) {
        clearTextError(checkForm4, errorText2);
      }
    }
  });
};

export default checkboxESValide;
