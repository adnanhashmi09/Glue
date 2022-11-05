const TcpServer = require("./TCPserver");

const server = new TcpServer(31337);

server.get("PING", (s, data) => {
  s.send({ ...data, type: "PING" });
});
server.get("AUTH", (s, data) => {
  // check if token is valid, send packet if token is wrong
  // ...
  // assuming token provided is correct
  if (!server.rooms[data.token]) {
    server.rooms[data.token] = {};
  }
  const token = data.token;
  delete data.token;
  server.rooms[token][s.id] = { ...data };
  server.clients[s.id] = { room: token, socket: s };

  s.send({ type: "AUTH_OK", id: s.id });
});

server.get("CLIP_TEXT", (s, data) => {
  server.broadcast(
    { type: "CLIP_TEXT", ...data },
    server.clients[s.id].room,
    s.id
  );
});

server.get("CLIP_FILE", (s, data) => {
  server.broadcast(
    { type: "CLIP_FILE", file: data.file },
    server.clients[s.id].room,
    s.id
  );
});

server.get('CLIP_FILE_ENDED', (s, data) => {
  server.broadcast(
    { type: 'CLIP_FILE_ENDED', ...data },
    server.clients[s.id].room,
    s.id
  )
})

module.exports = { server };
