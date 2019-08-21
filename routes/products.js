const express = require("express");
const router = express.Router();
const products = require("../db/products");

router.get("/search", (req, res) => {
  res.render("search");
});

router.get("/delete", (req, res) => {
  res.render("delete");
});

router.get("/new", (req, res) => {
  res.render("add");
});

router.delete("/delete", (req, res) => {
  let itemID = parseInt(req.body.id);
  let goods = products.filterTheGoods(itemID);

  if (itemID === "" || goods == false) {
    res.render("delete", { error: "Could not find your product. Try again." });
  } else {
    products.deleteTheGoods(itemID);
    res.render("delete", { success: "Success!" });
  }
});

router.get("/fetch", (req, res) => {
  let searchID = req.query.id;
  let goods = products.filterTheGoods(searchID);

  if (searchID === "" || goods == false) {
    res.render("search", { error: "Could not find your product. Try again." });
  } else {
    res.render("product", { products: goods });
  }
});

router.get("/:id", (req, res) => {
  let searchID = req.params.id;
  let goods = products.filterTheGoods(searchID);

  if (searchID === "" || goods == false) {
    res.render("search", { error: "Could not find your product. Try again." });
  } else {
    res.render("product", { products: goods });
  }
});

router.post("/fetch", (req, res) => {
  let item = req.body;
  if (item.name !== "" && item.price !== "" && item.inventory !== "") {
    let newItem = products.addToGoods(item.name, item.price, item.inventory);
    let goods = products.filterTheGoods(newItem.id);

    res.render("product", { products: goods });
  } else {
    res.render("add", { error: "Please input all fields." });
  }
});

router.get("/", (req, res) => {
  let goods = { products: products.getTheGoods };
  res.render("products", goods);
});

module.exports = router;
