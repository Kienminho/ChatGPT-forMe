require("dotenv").config();
const axios = require("axios");
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();

//open ai
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
const openAI = new OpenAIApi(configuration);
app.engine(
  "handlebars",
  exphbs.engine({ extname: ".handlebars", defaultLayout: false })
);
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/chat", async (req, res) => {
  console.log(req.body.prompt); // Kiểm tra dữ liệu trước khi gửi request đến OpenAI API
  try {
    const response = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.prompt }],
    });
    const answer = response["data"]["choices"][0]["message"]["content"];
    res.json({ status: 200, message: answer });
  } catch (error) {
    res.status(500).send("Error occurred while processing request");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
