const express = require("express");

const app = express();
const cors = require("cors");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

// const User = require("./model/user.service");

const ApiRouter = require("./api.routes");

app.use("/api", ApiRouter);

// app.use((err, req, res, next) => {
//   const { message } = err;
//   res.status(statusCode).json({
//     statusCode: statusCode,
//     message: message,
//   });
// });
app.listen(4000, () => {
  console.log("Listining on Port 4000");
});
