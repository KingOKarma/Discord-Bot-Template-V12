import { MessageEmbed } from "discord.js";
import { Command } from "../../interfaces";
import ms from "ms";

export const command: Command = {
    descirption: "Get a pong ping",
    example: ["!ping"],
    group: "miscellaneous",
    name: "ping",

    run: async (client, msg, args) => {
        let serverIcon = "https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png";

        if (msg.guild !== null) {
            const icon = msg.guild.iconURL( { dynamic: true } )
            if (icon !== null) {
            serverIcon = icon;
            }
        }

        const embed = new MessageEmbed()
            .setTitle("Bot Status")
            .setThumbnail(serverIcon)
            .setDescription(
                `\\> Ping: ${Math.round(client.ws.ping)}ms\n` +
                `\\> Bot Uptime: **${ms(client.uptime ?? 0)}**\n` +
                `\\> Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
                `)

            .setFooter("Brought to you by stinky");

        return msg.channel.send(embed);
    }
}

