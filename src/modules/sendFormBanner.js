import maskPhone from "./maskPhone";

//8 баннер
const sendFormBanner = () => {
  const errorMessage = "Что то пошло не так",
    loadMessage = "Загрузка...",
    successMessage = "Спасибо! Мы скоро с вами свяжемся!";

  const bannerContent = document.querySelector("#banner .wrapper"),
    form = document.querySelector("#banner-form"),
    formName = document.querySelector("#name-banner-form"),
    modalThanks = document.querySelector("#thanks"),
    popUpThanks = modalThanks.querySelector("p");

  //сообщение-статус
  const statusMessage = document.createElement("div");
  statusMessage.style.cssText = "font-size: 2rem";

  const addElem = (elem) => {
    elem.style.display = "block";
  };

  //валидация имени
  formName.addEventListener("input", () => {
    formName.value = formName.value.match(/[а-яёА-ЯЁ  ]+/u, "");
  });

  // MASKPHONE
  maskPhone("#phone-banner-form", "+7 (___) ___-__-__");

  maskPhone("#phone", "+7 (___) ___-__-__");

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
        addElem(modalThanks);
        bannerContent.innerHTML = successMessage;
        bannerContent.style.cssText = "font-size: 2rem";
      })
      .catch((error) => {
        popUpThanks.innerHTML = errorMessage;
        popUpThanks.style.cssText =
          "font-size: 1.6rem; color: white; padding-bottom: 2rem";
        addElem(modalThanks);
        statusMessage.textContent = errorMessage;
        console.error(error);
      });
  });
};

export default sendFormBanner;