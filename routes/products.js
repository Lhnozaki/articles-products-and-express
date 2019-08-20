const express = require("express");
const router = express.Router();
const products = require("../db/products");

router.get("/search", (req, res) => {
  res.render("search");
});

router.get("/fetch", (req, res) => {
  let searchID = req.query.id;
  let goods = products.getTheGoods().filter(e => {
    return e.id === parseInt(searchID);
  });

  if (searchID === "" || goods == false) {
    res.render("search", { error: "Could not find your product. Try again." });
  } else {
    res.render("found", { products: goods });
  }
});

router.get("/new", (req, res) => {
  res.render("add");
});

router.get("/:id", (req, res) => {
  let searchID = req.query.id;
  let goods = products.getTheGoods().filter(e => {
    return e.id === parseInt(searchID);
  });

  if (searchID === "" || goods == false) {
    res.render("search", { error: "Could not find your product. Try again." });
  } else {
    res.render("found", { products: goods });
  }
});

router.get("/", (req, res) => {
  let goods = { products: products.getTheGoods };
  res.render("products", goods);
});

router.get("/delete", (req, res) => {
  res.render("index");
});

router.post("/", (req, res) => {
  res.send("Hello World");
});

router.put("/", (req, res) => {
  res.send("Hello World");
});

router.delete("/", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
