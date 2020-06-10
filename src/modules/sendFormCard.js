import maskPhone from "./maskPhone";

//заказ карты
const sendFormCard = () => {
  const errorMessage = "Что то пошло не так",
    loadMessage = "Загрузка...",
    successMessage = "Спасибо! Мы скоро с вами свяжемся!";

  const bannerContent = document.querySelector("#cards .right"),
    form = document.querySelector("#card_order"),
    formName = document.querySelector("#name-card-form"),
    priceDiv = document.querySelector("#price-total");

  //сообщение-статус
  const statusMessage = document.createElement("div");
  statusMessage.style.cssText = "font-size: 2rem";

  //валидация имени
  formName.addEventListener("input", () => {
    formName.value = formName.value.match(/[а-яёА-ЯЁ  ]+/u, "");
  });

  // use

  maskPhone("#phone-card-form", "+7 (___) ___-__-__");
  maskPhone("#callback_form-phone", "+7 (___) ___-__-__");



  form.addEventListener("submit", (event) => {
    let price = priceDiv.innerHTML;
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
    body["totlPrice"] = price;
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


export default sendFormCard;