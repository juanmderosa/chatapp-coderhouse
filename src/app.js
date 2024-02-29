import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewRouter from "./routes/views.router.js";

const app = express();
const PORT = process.env.PORT || 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars.engine());
app.use(viewRouter);

const server = app.listen(PORT, () => console.log(`Listening in por ${PORT}`));

const io = new Server(server); //instanciando socket.io

const msg = [];

/* app.get("/", (req, res) => {});
 */
io.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log(data);
    msg.push(data);
    io.emit("messageLogs", msg);
  });
});
