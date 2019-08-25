const express = require("express");
const router = express.Router();
const products = require("../db/products");

router.get("/search", (req, res) => {
  res.render("products/search");
});

router.get("/delete", (req, res) => {
  res.render("products/delete");
});

router.get("/new", (req, res) => {
  res.render("products/add");
});

router.get("/edit", (req, res) => {
  let goods = { products: products.getTheGoods() };
  res.render("products/edit", goods);
});

router.put("/edit", (req, res) => {
  let itemID = parseInt(req.body.id);
  let itemName = req.body.name;
  let itemPrice = parseInt(req.body.price);
  let itemInventory = parseInt(req.body.inventory);
  let goods = products.filterTheGoods(itemID);

  if (
    req.body.name === "" ||
    req.body.price === "" ||
    req.body.inventory === ""
  ) {
    res.render("products/edit", {
      products: products.getTheGoods(),
      error: "Please fill in all fields"
    });
  } else {
    products.editTheGoods(itemID, itemName, itemPrice, itemInventory);
    res.render("products/product", { products: goods });
  }
});

router.delete("/delete", (req, res) => {
  let itemID = parseInt(req.body.id);
  let goods = products.filterTheGoods(itemID);

  if (itemID === "" || goods == false) {
    res.render("products/delete", {
      error: "Could not find your product. Try again."
    });
  } else {
    products.deleteTheGoods(itemID);
    res.render("products/delete", { success: "Success!" });
  }
});

router.get("/delete/:id", (req, res) => {
  let itemID = parseInt(req.params.id);
  let goods = products.filterTheGoods(itemID);

  if (itemID === "" || goods == false) {
    res.render("products/delete", {
      error: "Could not find your product. Try again."
    });
  } else {
    products.deleteTheGoods(itemID);
    res.render("products/delete", { success: "Success!" });
  }
});

router.get("/fetch", (req, res) => {
  let searchID = req.query.id;
  let goods = products.filterTheGoods(searchID);

  if (searchID === "" || goods == false) {
    res.render("products/search", {
      error: "Could not find your product. Try again."
    });
  } else {
    res.render("products/product", { products: goods });
  }
});

router.get("/:id", (req, res) => {
  let searchID = req.params.id;
  let goods = products.filterTheGoods(searchID);

  if (searchID === "" || goods == false) {
    res.render("products/search", {
      error: "Could not find your product. Try again."
    });
  } else {
    res.render("products/product", { products: goods });
  }
});

router.post("/fetch", (req, res) => {
  let item = req.body;
  if (item.name !== "" && item.price !== "" && item.inventory !== "") {
    let newItem = products.addToGoods(item.name, item.price, item.inventory);
    let goods = products.filterTheGoods(newItem.id);

    res.render("products/product", { products: goods });
  } else {
    res.render("products/add", { error: "Please input all fields." });
  }
});

router.get("/", (req, res) => {
  let goods = { products: products.getTheGoods };
  res.render("products/index", goods);
});

module.exports = router;
