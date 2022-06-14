import { Command } from "../../interfaces";
import axios from "axios";

export const command: Command = {
  name: "programmingquote",
  description: "Sends a random programming quote",
  run: async (client, interaction) => {
    const { data } = await axios.get(
      "https://programming-quotes-api.herokuapp.com/Quotes/random"
    );
    await interaction.reply({ content: data.en });
  },
};
