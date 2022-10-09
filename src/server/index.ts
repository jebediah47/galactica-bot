import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.status(200).send("Bot is running!");
});

function galacticaServer(port: number) {
  app.listen(port, () => {
    process.stdout.write(`Server is listening in port ${port}\n`);
  });
}

export { galacticaServer };
