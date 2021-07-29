import { CONFIG } from "../globals";
import { Event } from "../interfaces/event";


export const event: Event = {
    name: "message",
    run: async (client, msg) => {
    if (msg.author.bot) return;
  
    if (!msg.content.startsWith(CONFIG.prefix)) return;
  
    const args = msg.content.slice(CONFIG.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
  
    if (!cmd) return;

    const command = client.commands.get(cmd) ?? client.aliases.get(cmd);

    if (command) {
        command.run(client, msg, args);
    }
  
    }
}
