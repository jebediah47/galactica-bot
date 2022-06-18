/* eslint-disable no-inner-declarations */
/**
 * @author Rahul Marban creator of simply-djs
 * @author Christian Llupo (jebediah47) to use extended interaction and to remove bloat
 * @license CC_BY-NC-NDv4.0 https://github.com/Rahuletto/simply-djs/blob/main/LICENSE
 * @copyright Rahul Marban 2021-2022
 * @copyright Christian Llupo 2022
 * Modifications are licensed under the GNU Affero General Public License-v3.0
 * Thanks again to Rahul Marban for creating this package!
 */
import {
  MessageButtonStyle,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  ColorResolvable,
  ButtonInteraction,
} from "discord.js";
import { ExtendedInteraction } from "../interfaces";

/**
 * **URL** of the Type: *https://simplyd.js.org/docs/types/CustomizableEmbed*
 */
interface CustomizableEmbed {
  author?: MessageEmbedAuthor;
  title?: string;
  footer?: MessageEmbedFooter;
  color?: ColorResolvable;
  description?: string;

  credit?: boolean;
}

/**
 * **URL** of the Type: *https://simplyd.js.org/docs/General/calculator#calcbuttons*
 */

interface calcButtons {
  numbers?: MessageButtonStyle;
  symbols?: MessageButtonStyle;
  delete?: MessageButtonStyle;
}

export type calcOptions = {
  embed?: CustomizableEmbed;
  buttons?: calcButtons;
};

/**
 * A Unique **calculator** which can be *used inside Discord*
 * @param interaction
 * @param options
 * @link `Documentation:` ***https://simplyd.js.org/docs/General/calculator***
 * @example simplydjs.calculator(interaction)
 */

export async function calculator(
  interaction: ExtendedInteraction,
  options: calcOptions = {
    buttons: { numbers: "SECONDARY", symbols: "PRIMARY", delete: "DANGER" },
  }
): Promise<void> {
  try {
    const button = [[], [], [], [], []];
    const row: any[] = [];
    const text: string[] = [
      "Clear",
      "(",
      ")",
      "/",
      "⌫",
      "7",
      "8",
      "9",
      "*",
      "%",
      "4",
      "5",
      "6",
      "-",
      "^",
      "1",
      "2",
      "3",
      "+",
      "π",
      ".",
      "0",
      "00",
      "=",
      "Delete",
    ];
    let current = 0;

    if (!options.embed) {
      options.embed = {
        footer: {
          text: "Console output.",
        },
        color: "#075FFF",
        credit: true,
      };
    }

    options.buttons = {
      numbers: options.buttons?.numbers || "SECONDARY",
      symbols: options.buttons?.symbols || "PRIMARY",
      delete: options.buttons?.delete || "DANGER",
    };

    let message;
    if (!interaction.commandId) {
      message = interaction;
    }

    for (let i = 0; i < text.length; i++) {
      if (button[current].length === 5) current++;
      button[current].push(createButton(text[i]) as never);
      if (i === text.length - 1) {
        for (const btn of button) row.push(addRow(btn));
      }
    }

    const emb1 = new MessageEmbed()
      .setColor(options.embed?.color || "#075FFF")
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .setFooter((options.embed?.credit ? options.embed?.footer : null)!)
      .setDescription(
        "```js\n0\n// Result: 0\n```" +
          (options.embed?.description ? `\n${options.embed?.description}` : "")
      );

    if (options.embed.author) {
      emb1.setAuthor(options.embed.author);
    }
    if (options.embed.title) {
      emb1.setTitle(options.embed.title);
    }

    let msg: any;

    const int = interaction as ExtendedInteraction;

    if (!message) {
      await int.followUp({
        embeds: [emb1],
        components: row,
      });

      msg = await int.fetchReply();
    }
    const time = 300000;

    let elem = "0";

    const filter = (button: ButtonInteraction) =>
      button.user.id ===
        (interaction.user ? interaction.user : interaction.member).id &&
      button.customId.startsWith("cal-");

    const collect = msg.createMessageComponentCollector({
      filter,
      componentType: "BUTTON",
      time: time,
    });

    collect.on("collect", async (button: ButtonInteraction) => {
      await button.deferUpdate();

      const btnName: any = button.customId.replace("cal-", "");

      if (elem === "0") elem = "";

      if (btnName === "=") {
        elem = mathEval(elem, true);

        emb1.setDescription(
          `\`\`\`js\n${elem}\n\`\`\`` +
            (options.embed?.description
              ? `\n${options.embed?.description}`
              : "")
        );

        elem = "0";

        return await msg
          .edit({
            embeds: [emb1],
            components: row,
          })
          .catch((err: string) => process.stdout.write(`${err}`));
      }

      elem = elem + btnName.toString();

      if (btnName === "Delete")
        return await msg
          .delete()
          .catch((err: string) => process.stdout.write(`${err}`));
      else if (btnName === "Clear") elem = "0";
      if (btnName === "⌫") elem = elem.slice(0, -2);

      if (isNaN(btnName) && btnName !== "⌫") {
        emb1.setDescription(
          `\`\`\`js\n${elem
            .replaceAll("+", " + ")
            .replaceAll("*", " * ")}\n\t\n\`\`\`` +
            (options.embed?.description
              ? `\n${options.embed?.description}`
              : "")
        );
        return await msg
          .edit({
            embeds: [emb1],
            components: row,
          })
          .catch((err: string) => process.stdout.write(`${err}`));
      }

      emb1.setDescription(
        `\`\`\`js\n${elem
          .replaceAll("+", " + ")
          .replaceAll("*", " * ")}\n// Result: ${mathEval(elem)
          .replaceAll("^", "**")
          .replaceAll("%", "/100")
          .replace(" ", "")}\n\`\`\`` +
          (options.embed?.description ? `\n${options.embed?.description}` : "")
      );
      await msg
        .edit({
          embeds: [emb1],
          components: row,
        })
        .catch((err: string) => process.stdout.write(`${err}`));
    });

    setTimeout(async () => {
      if (!msg) return;
      if (!msg.editable) return;

      if (msg) {
        if (msg.editable) {
          emb1.setDescription(
            "Your Time for using the calculator ran out (5 minutes)"
          );
          emb1.setColor(0xc90000);
          await msg
            .edit({ embeds: [emb1], components: [] })
            .catch((err: string) => process.stdout.write(`${err}`));
        }
      }
    }, time);

    function addRow(btns: MessageButton[]) {
      const row1 = new MessageActionRow();
      for (const btn of btns) {
        row1.addComponents(btn);
      }
      return row1;
    }

    function createButton(
      label: any,
      style: MessageButtonStyle | undefined = options.buttons?.numbers
    ) {
      if (style != undefined) {
        if (label === "Clear") style = options.buttons?.delete;
        else if (label === "Delete") style = options.buttons?.delete;
        else if (label === "⌫") style = options.buttons?.delete;
        else if (label === "π") style = options.buttons?.numbers;
        else if (label === "%") style = options.buttons?.numbers;
        else if (label === "^") style = options.buttons?.numbers;
        else if (label === ".") style = options.buttons?.symbols;
        else if (label === "=") style = "SUCCESS";
        else if (isNaN(label)) style = options.buttons?.symbols;
        return (
          new MessageButton()
            .setLabel(label)
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .setStyle(style!)
            .setCustomId("cal-" + label)
        );
      }
    }

    const evalRegex = /^[\dπ+%^\-*\/.()]*$/;
    function mathEval(input: string, result = false) {
      try {
        const matched = evalRegex.exec(input);
        if (!matched) return "Invalid";

        if (!result) {
          return `${Function(
            `"use strict";let π=Math.PI;return (${input})`
          )()}`;
        } else
          return `${input
            .replaceAll("**", "^")
            .replaceAll("/100", "%")} = ${Function(
            `"use strict";let π=Math.PI;return (${input})`
          )()}`;
      } catch {
        return "Wrong Input";
      }
    }
  } catch (err) {
    process.stdout.write(`${err}`);
  }
}
