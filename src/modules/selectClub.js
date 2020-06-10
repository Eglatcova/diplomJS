//2.выбор клуба
const selectClub = () => {
  const clubsUl = document.querySelector(".clubs-list ul");
  const toggleElem = (elem) => {
    elem.classList.toggle("ul-club-select");
  };

  const removeElem = (elem) => {
    elem.classList.remove("ul-club-select");
  };

  document.addEventListener("click", () => {
    let target = event.target;
    if (target.closest(".p-club-select")) {
      toggleElem(clubsUl);
    }

    target = target.closest(".clubs-list");
    if (target === null) {
      removeElem(clubsUl);
    }
  });
};

export default selectClub;
