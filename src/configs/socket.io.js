import io from "socket.io-client";

const socket = io("http://localhost:6060");

export default socket;
// Compare this snippet from MEDPRO/src/controller/AuthController.js:
