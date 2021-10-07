const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

//import router
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");

//middleware
app.use(express.json());

// Register routers under root URLs
app.use("/users", userRouter);
app.use("/images", imageRouter);

app.listen(port, console.log(`Listening on ${port}`));
