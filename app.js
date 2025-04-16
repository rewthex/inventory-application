import express from "express";
import indexRouter from "./routes/indexRouter.js";
import { rateLimit } from "express-rate-limit";

const PORT = process.env.PORT || 3000;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 25,
  message:
    "Too many requests from this IP, please try again after 15 minutes.",
})

app.use(limiter);

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(indexRouter);

app.use((err, req, res, next) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
