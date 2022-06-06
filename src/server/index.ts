import * as express from "express";

const app = express();

app.all("/", (req, res) => {
  res.send("Bot is running!");
});

function galacticaServer(port: number) {
  switch (port) {
    case null:
      port = 3000;
      break;
  }
  app.listen(port, () => {
    process.stdout.write(`Server is listening in port ${port}\n`);
  });
}

export { galacticaServer };
