//11.рассчет стоимости клубной карты и
//18.скидка
const calcCards = () => {
  const monthBtns = document.querySelectorAll(".time>input"),
    inputClub = document.querySelectorAll("#cards .club>input"),
    priceTotal = document.querySelector("#price-total"),
    cardForm = document.querySelector("#card_order"),
    promoSale = document.querySelector("#promo-sale");
  let clubName = "mozaika",
    clickButton = "1",
    sale = false,
    price = "2999",
    //хранение цены
    startPrice;

  //поднять флаг(sale)
  const onSale = () => {
    if (promoSale.value === "ТЕЛО2020") {
      startPrice = price;
      priceTotal.innerHTML = Math.ceil(startPrice * 0.7);
      sale = true;
    }
  };
  //опустить флаг
  const offSale = () => {
    priceTotal.innerHTML = price;
    sale = false;
  };

  cardForm.addEventListener("click", (elem) => {
    let target = event.target;
    //искючение всех слушателей, кроме меню и его детей
    if (
      !target.closest("#card_leto_mozaika, #card_leto_schelkovo, .time>input")
    ) {
      return;
    }

    monthBtns.forEach((elem) => {
      if (elem.checked) {
        clickButton = elem.value;
      }
    });
    inputClub.forEach((elem) => {
      if (elem.checked) {
        clubName = elem.value;
      }
    });

    if (clubName === "mozaika") {
      switch (clickButton) {
        case "1":
          priceTotal.innerHTML = "2999";
          break;
        case "6":
          priceTotal.innerHTML = "9900";
          break;
        case "9":
          priceTotal.innerHTML = "13900";
          break;
        case "12":
          priceTotal.innerHTML = "19900";
          break;
      }
      price = priceTotal.innerHTML;
      onSale();
    } else if (clubName === "schelkovo") {
      switch (clickButton) {
        case "1":
          priceTotal.innerHTML = "2999";
          break;
        case "6":
          priceTotal.innerHTML = "14990";
          break;
        case "9":
          priceTotal.innerHTML = "21990";
          break;
        case "12":
          priceTotal.innerHTML = "24990";
          break;
      }
      price = priceTotal.innerHTML;
      onSale();
    }
  });

  promoSale.addEventListener("input", () => {
    if (promoSale.value === "ТЕЛО2020" && !sale) {
      onSale();
    } else if (sale) {
      offSale();
    }
  });
};

export default calcCards;