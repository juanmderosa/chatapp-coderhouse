const socket = io();

let user;

window.addEventListener("DOMContentLoaded", () => {
  Swal.fire({
    title: "Identificate!",
    text: "Ingrese su nombre de usuario",
    input: "text",
    inputValidator: (value) => {
      return !value && "Necesitas escribir un nombre para continuar";
    },
    confirmButtonText: "OK",
  }).then((result) => {
    console.log(result);
    user = result.value;
    console.log(user);
    socket.emit("auth", user);
  });
});

const chatbox = document.getElementById("chatbox");
let log = document.getElementById("log");
chatbox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    console.log(chatbox.value);
    if (chatbox.value.trim().length > 0) {
      socket.emit("message", { user: user, message: chatbox.value });
      chatbox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  let messages = "";

  data.forEach((msg) => {
    messages += `${msg.user} dice ${msg.message} </br>`;
  });

  log.innerHTML = messages;
});
