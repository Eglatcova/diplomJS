//--удаление окна thanks(вызов в тех формах, шде необходимо)
const thanksRemove = () => {
  const modalThanks = document.querySelector("#thanks");

  const removeElem = (elem) => {
    elem.style.display = "none";
  };

  modalThanks.addEventListener("click", (event) => {
    let target = event.target;
    if (target.closest(".close-form, .close-btn")) {
      removeElem(modalThanks);
    }
  });
};

export default thanksRemove;
