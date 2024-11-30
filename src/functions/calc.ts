/**
 * @author Rahul Marban creator of simply-djs
 * @author Christian Llupo (jebediah47) contributor of simply-djs
 * @license CC_BY-NC-NDv4.0 https://github.com/Rahuletto/simply-djs/blob/main/LICENSE
 * @copyright Rahul Marban 2021-2024
 * @copyright Christian Llupo 2024
 * Modifications are licensed under the GNU Affero General Public License-v3.0
 * Thanks again to Rahul Marban for creating this package!
 */

import type { ExtendedInteraction } from "@/interfaces"
import {
  ActionRowBuilder,
  ButtonBuilder,
  type ButtonInteraction,
  ButtonStyle,
  type ColorResolvable,
  ComponentType,
  type EmbedAuthorOptions,
  EmbedBuilder,
} from "discord.js"

// ------------------------------
// ------- T Y P I N G S --------
// ------------------------------

/**
 * **URL** of the Type: *https://simplyd.js.org/docs/types/CustomizableEmbed*
 */

interface CustomizableEmbed {
  author?: EmbedAuthorOptions
  title?: string
  color?: ColorResolvable
  description?: string
}

/**
 * **URL** of the Type: *https://simplyd.js.org/docs/General/calculator#calcbuttons*
 */

interface calcButtons {
  numbers?: ButtonStyle
  symbols?: ButtonStyle
  delete?: ButtonStyle
}

export type calcOptions = {
  embed?: CustomizableEmbed
  buttons?: calcButtons
}

// ------------------------------
// ------ F U N C T I O N -------
// ------------------------------

/**
 * A Unique **calculator** which can be *used inside Discord*
 * @link `Documentation:` ***https://simplyd.js.org/docs/General/calculator***
 * @example simplydjs.calculator(interaction)
 */

export async function calculator(
  interaction: ExtendedInteraction,
  options: calcOptions = {
    buttons: {
      numbers: ButtonStyle.Secondary,
      symbols: ButtonStyle.Primary,
      delete: ButtonStyle.Danger,
    },
  },
): Promise<void> {
  try {
    const button = [[], [], [], [], []]
    const row: any[] = []
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
    ]
    let current = 0

    if (!options.embed) {
      options.embed = {
        color: "#075FFF",
      }
    }

    options.buttons = {
      numbers: options.buttons?.numbers,
      symbols: options.buttons?.symbols,
      delete: options.buttons?.delete,
    }

    let message
    if (!interaction.commandId) {
      message = interaction
    }

    for (let i = 0; i < text.length; i++) {
      if (button[current].length === 5) current++
      button[current].push(createButton(text[i]) as never)
      if (i === text.length - 1) {
        for (const btn of button) row.push(addRow(btn))
      }
    }

    const emb1 = new EmbedBuilder()
      .setColor(options.embed?.color || "#075FFF")
      .setDescription(
        "```js\n0\n// Result: 0\n```" +
          (options.embed?.description ? `\n${options.embed?.description}` : ""),
      )

    if (options.embed.author) {
      emb1.setAuthor(options.embed.author)
    }
    if (options.embed.title) {
      emb1.setTitle(options.embed.title)
    }

    let msg: any

    const int = interaction as ExtendedInteraction

    if (!message) {
      await int.followUp({
        embeds: [emb1],
        components: row,
      })

      msg = await int.fetchReply()
    }

    const time = 30000

    let elem = "0"

    const filter = (button: ButtonInteraction) =>
      button.user.id ===
        (interaction.user ? interaction.user : interaction.member).id &&
      button.customId.startsWith("cal-")

    const collect = msg.createMessageComponentCollector(filter, {
      componentType: ComponentType.Button,
      time: time,
    })

    collect.on("collect", async (button: ButtonInteraction) => {
      await button.deferUpdate()

      const btnName: string = button.customId.replace("cal-", "")

      if (elem === "0") elem = ""

      if (btnName === "=") {
        elem = mathEval(elem, true)

        emb1.setDescription(
          `\`\`\`js\n${elem}\n\`\`\`` +
            (options.embed?.description
              ? `\n${options.embed?.description}`
              : ""),
        )

        elem = "0"

        return await msg
          .edit({
            embeds: [emb1],
            components: row,
          })
          .catch((err: string) => process.stdout.write(`${err}`))
      }

      elem = elem + btnName.toString()

      if (btnName === "Delete")
        return await msg
          .delete()
          .catch((err: string) => process.stdout.write(`${err}`))
      else if (btnName === "Clear") elem = "0"
      if (btnName === "⌫") elem = elem.slice(0, -2)

      if (isNaN(Number(btnName)) && btnName !== "⌫") {
        emb1.setDescription(
          `\`\`\`js\n${elem
            .replaceAll("+", " + ")
            .replaceAll("*", " * ")}\n\t\n\`\`\`` +
            (options.embed?.description
              ? `\n${options.embed?.description}`
              : ""),
        )
        return await msg
          .edit({
            embeds: [emb1],
            components: row,
          })
          .catch((err: string) => process.stdout.write(`${err}`))
      }

      emb1.setDescription(
        `\`\`\`js\n${elem
          .replaceAll("+", " + ")
          .replaceAll("*", " * ")}\n// Result: ${mathEval(elem)
          .replaceAll("^", "**")
          .replaceAll("%", "/100")
          .replace(" ", "")}\n\`\`\`` +
          (options.embed?.description ? `\n${options.embed?.description}` : ""),
      )
      await msg
        .edit({
          embeds: [emb1],
          components: row,
        })
        .catch((err: string) => process.stdout.write(`${err}`))
    })

    setTimeout(async () => {
      if (!msg) return
      if (!msg.editable) return

      if (msg) {
        if (msg.editable) {
          emb1.setDescription(
            "Your Time for using the calculator ran out (30 seconds)",
          )
          emb1.setColor(0xc90000)
          await msg
            .edit({ embeds: [emb1], components: [] })
            .catch((err: string) => process.stdout.write(`${err}`))
        }
      }
    }, time)

    function addRow(btns: ButtonBuilder[]) {
      const row1 = new ActionRowBuilder()
      for (const btn of btns) {
        row1.addComponents(btn)
      }
      return row1
    }

    function createButton(
      label: string,
      style: ButtonStyle | undefined = options.buttons?.numbers,
    ) {
      if (label === "Clear") style = options.buttons?.delete
      else if (label === "Delete") style = options.buttons?.delete
      else if (label === "⌫") style = options.buttons?.delete
      else if (label === "π") style = options.buttons?.numbers
      else if (label === "%") style = options.buttons?.numbers
      else if (label === "^") style = options.buttons?.numbers
      else if (label === ".") style = options.buttons?.symbols
      else if (label === "=") style = ButtonStyle.Success
      else if (isNaN(Number(label))) style = options.buttons?.symbols

      return new ButtonBuilder()
        .setLabel(label)
        .setStyle(style as ButtonStyle)
        .setCustomId("cal-" + label)
    }

    const evalRegex = /^[0-9π+%^\-*\/.()]*$/
    function mathEval(input: string, result = false) {
      try {
        const matched = evalRegex.exec(input)
        if (!matched) return "Invalid"

        if (!result) {
          return `${Function(`"use strict";let π=Math.PI;return (${input})`)()}`
        } else
          return `${input
            .replaceAll("**", "^")
            .replaceAll("/100", "%")} = ${Function(
            `"use strict";let π=Math.PI;return (${input})`,
          )()}`
      } catch {
        return "Wrong Input"
      }
    }
  } catch (err) {
    process.stdout.write(`An error occurred: ${err}`)
  }
}
