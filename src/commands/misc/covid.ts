import { CanvasRenderService } from "chartjs-node-canvas";
import { MessageAttachment } from "discord.js";
import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

const width = 800;
const height = 600;

const chartCallback = (ChartJS) => {
  ChartJS.plugins.register({
    beforeDraw: (chartInstance) => {
      const { chart } = chartInstance;
      const { ctx } = chart;
      ctx.fillStyle = "rgb(3, 24, 38)";
      ctx.fillRect(0, 0, chart.width, chart.height);
    },
  });
};

export const command: Command = {
  name: "covid",
  aliases: [],
  run: async (client, message, args) => {
    const days = parseInt(args[0], 10) || 30;

    const url = "https://api.covidtracking.com/v1/us/daily.json";
    let { data: results }: any = await axios.get(url);
    results = results.slice(0, days).reverse();

    const labels = [];
    const deaths = [];
    const cases = [];
    const negative = [];

    for (const result of results) {
      const date = String(result.date);
      const year = date.substring(0, 4);
      const month = date.substring(4, 6);
      const day = date.substring(6, 8);
      labels.push(`${day}/${month}/${year}`);

      deaths.push(result.death);
      cases.push(result.positive);
      negative.push(result.negative);
    }

    const canvas = new CanvasRenderService(width, height, chartCallback);

    const configuration = {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Negative cases",
            data: negative,
            color: "#592ec2",
            backgroundColor: "#592ec2",
            borderColor: "#592ec2",
            fill: false,
          },
          {
            label: "Cases",
            data: cases,
            color: "#7289d9",
            backgroundColor: "#7289d9",
            borderColor: "#7289d9",
            fill: false,
          },
          {
            label: "Deaths",
            data: deaths,
            color: "#b32f38",
            backgroundColor: "#b32f38",
            borderColor: "#b32f38",
            fill: false,
          },
        ],
      },
    };

    const image = await canvas.renderToBuffer(configuration);
    const attachment = new MessageAttachment(image);

    const attachmentEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Here is a graph of US COVID data:")
      .setDescription(
        "**Note that the deaths are are much lower than the positive and negative cases and may look flat on the graph.*"
      );

    message.channel.send({
      embeds: [attachmentEmbed],
      files: [attachment],
    });
  },
};
