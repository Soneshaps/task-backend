const express = require("express");

const router = express.Router();
const UserRouter = require("./routes/user.route");
const TodoRouter = require("./routes/todo.route");
const { validateToken } = require("./middleware/user.middleware");

router.use("/users", UserRouter);
router.use("/todos", validateToken, TodoRouter);
module.exports = router;
