const express = require("express");
const router = express.Router();
// const products = require("../db/products");

router.get("/", (req, res) => {
  res.render("products");
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
