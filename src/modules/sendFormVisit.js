import maskPhone from "./maskPhone";

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

export default sendFormVisit;