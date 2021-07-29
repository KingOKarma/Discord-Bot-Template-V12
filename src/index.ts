import { Client, Collection } from "discord.js";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const client = new Discord.Client();
public commands: Collection<string, Command> = new Collection();
public events: Collection<string, Event> = new Collection();
public aliases: Collection<string, Command> = new Collection();
client.config = process.env;

client.login(client.config.token);

const eventPath = path.join(__dirname, "events");

console.log(eventPath);
fs.readdir(eventPath, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const { event } = require(`${eventPath}/${file}`);
    client.events.set(event.name, event);
    console.log(event)
    client.on(event.name, event.run.bind(null, client));
  });
});


const commandPath = path.join(__dirname, "commands");
console.log(commandPath);
fs.readdirSync(commandPath).forEach((dir) => {
  const commands = fs.readdirSync(`${commandPath}/${dir}/`).filter((file) => file.endsWith(".js"));

  for (const file of commands) {
    const { command } = require(`${commandPath}/${dir}/${file}`);
    client.commands.set(command.name, command);

    if (command?.aliases !== undefined) {
      command.aliases.forEach((alias: string) => {
        client.aliases.set(alias, command);
      });
    }
  }
});
