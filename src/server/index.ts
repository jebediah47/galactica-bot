import * as express from "express";

const app = express();

app.all("/", (req, res) => {
  res.send("Bot is running!");
});

function galacticaServer(port: number) {
  app.listen(port || 3000, () => {
    process.stdout.write(`Server is listening in port ${port}\n`);
  });
}

export { galacticaServer };
