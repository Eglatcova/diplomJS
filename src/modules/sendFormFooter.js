import maskPhone from "./maskPhone";

//12 форма в футере
const sendFormFooter = () => {
  const errorMessage = "Что то пошло не так",
    loadMessage = "Загрузка...",
    successMessage = "Спасибо! Мы скоро с вами свяжемся!",
    modalThanks = document.querySelector("#thanks"),
    popUpThanks = modalThanks.querySelector("p");

  const bannerContent = document.querySelector("#footer .right"),
    form = document.querySelector("#footer_form");

  //сообщение-статус
  const statusMessage = document.createElement("div");
  statusMessage.style.cssText = "font-size: 1.6rem";

  const addElem = (elem) => {
    elem.style.display = "block";
  };

  //божественная маска

  // use
  maskPhone("#callback_footer_form-phone", "+7 (___) ___-__-__");

  //события формы
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
        bannerContent.style.cssText = "font-size: 1.6rem";
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

  //события всплывающего окна
};


export default sendFormFooter;