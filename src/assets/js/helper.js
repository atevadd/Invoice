// total price
export const calculateTotalPrice = (prices) => {
  try {
    let total = 0;
    for (let price in prices) {
      total += Number(prices[price].qty) * Number(prices[price].price);
    }
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch {
    return 0;
  }
};

// const total
export const total = (qty, price) => {
  return (Number(qty) * Number(price))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// add new input field to item list
export const addMetaData = (list) => {
  list.push({
    name: "",
    quantity: "",
    price: "",
  });
};

// remove form fie
export const removeMetaData = (key, list) => {
  list.splice(key, 1);
};
