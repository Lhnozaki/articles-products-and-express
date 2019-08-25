const express = require("express");
const router = express.Router();
const articles = require("../db/articles");
articles.getUriTitle();

router.get("/search", (req, res) => {
  res.render("articles/search");
});

router.get("/delete", (req, res) => {
  let allArticles = { articles: articles.getTheTea() };
  res.render("articles/delete", allArticles);
});

router.get("/new", (req, res) => {
  res.render("articles/add");
});

router.get("/edit", (req, res) => {
  let allArticles = { articles: articles.getTheTea() };
  res.render("articles/edit", allArticles);
});

router.put("/edit", (req, res) => {
  if (req.body.title === "" || req.body.author === "" || req.body.body === "") {
    res.render("articles/edit", {
      articles: articles.getTheTea(),
      error: "Please fill in all fields"
    });
  } else {
    articles.editTheTea(
      req.body.id,
      req.body.title,
      req.body.author,
      req.body.body
    );
    let story = articles.filterTheTea(req.body.title);
    console.log(articles.getTheTea());
    res.render("articles/article", { articles: story });
  }
});

router.delete("/delete", (req, res) => {
  let story = req.body.title;
  if (story === undefined || story === "") {
    res.render("articles/delete", {
      error: "Could not find the article.",
      articles: articles.getTheTea()
    });
  } else {
    articles.deleteTheTea(story);
    res.render("articles/delete", {
      success: "Success!",
      articles: articles.getTheTea()
    });
  }
});

router.get("/delete/:id", (req, res) => {
  let searchName = req.params.id;
  let urlName = encodeURI(searchName);
  let story = articles.filterTheTeaByUrl(urlName);
  if (story === "" || story == false) {
    res.render("articles/delete", {
      error: "Could not find the article.",
      articles: articles.getTheTea()
    });
  } else {
    articles.deleteTheTea(urlName);
    res.render("articles/delete", {
      success: "Success!",
      articles: articles.getTheTea()
    });
  }
});

router.get("/fetch", (req, res) => {
  let searchName = req.query.articleName;
  let story = articles.filterTheTea(searchName);

  if (searchName === "" || story == false) {
    res.render("articles/search", {
      error: "Could not find your product. Try again."
    });
  } else {
    res.render("articles/article", { articles: story });
  }
});

router.get("/:id", (req, res) => {
  let searchName = req.params.id;
  let urlName = encodeURI(searchName);
  let story = articles.filterTheTeaByUrl(urlName);

  if (searchName === "" || story == false) {
    res.render("articles/search", {
      error: "Could not find your product. Try again."
    });
  } else {
    res.render("articles/article", { articles: story });
  }
});

router.post("/fetch", (req, res) => {
  let story = req.body;

  if (story.title !== "" && story.author !== "" && story.body !== "") {
    let newStory = articles.addToTea(story.title, story.author, story.body);
    let theStory = articles.filterTheTea(newStory.title);

    res.render("articles/article", { articles: theStory });
  } else {
    res.render("articles/add", { error: "Please input all fields." });
  }
});

router.get("/", (req, res) => {
  articles.getUriTitle();
  let goods = { articles: articles.getTheTea };
  res.render("articles/index", goods);
});

module.exports = router;
