let theGoods = [
  { id: 1, name: "Gibson Les Paul", price: 2600, inventory: 10 },
  { id: 2, name: "Fender Telecaster", price: 1600, inventory: 10 },
  { id: 3, name: "Gibson SG", price: 2200, inventory: 15 },
  { id: 4, name: "Fender Jazzmaster", price: 1850, inventory: 20 },
  { id: 5, name: "Gibson ES-3355", price: 3200, inventory: 3 }
];

const getTheGoods = () => {
  return theGoods;
};

const addToGoods = (name, price, inventory) => {
  let id = theGoods.length;
  let newItem = { id: id, name: name, price: price, inventory: inventory };
  theGoods.push(newItem);
};

module.exports = {
  getTheGoods,
  addToGoods
};
