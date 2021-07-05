import { Command } from "../../interfaces";
import * as figlet from "figlet";
import * as util from "util";

const figletAsync = util.promisify(figlet);

export const command: Command = {
  name: "ascii",
  aliases: ['unicode', 'utf-8', 'figlet'],
  run: async(client, message, args) => {
    const text = args.join(" ");
    if (!text || text.length > 20) {
      return;
    }

    const rendered = await figletAsync(text);
    message.channel.send("```" + rendered + "```");
  }
};
