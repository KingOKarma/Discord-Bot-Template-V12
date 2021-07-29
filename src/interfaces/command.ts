import Client from "../client";
import { Message } from "discord.js";

type Run = (client: Client, message: Message, args: string[]) => void;

export default interface Command {
    aliases?: string[];
    descirption: string;
    example: string[];
    group: string;
    name: string;
    run: Run;

}
