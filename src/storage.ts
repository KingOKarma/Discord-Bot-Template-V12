import { dump, load } from "js-yaml";
import { STORAGE } from "./globals";
import fs from "fs";

export interface Example {
    item1: string;
    item2: string;
}

/**
 * This represents the storage.yml
 * @class Storage
 * @property {IDs} ids
 * @property {Servers} servers
 */
export default class Storage {
    private static readonly _configLocation = "./storage.yml";

    public examples: Example;

    private constructor() {
        this.examples = { item1: "", item2: "" };

    }

    /**
       *  Call getConfig instead of constructor
       */
    public static getConfig(): Storage {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!fs.existsSync(Storage._configLocation)) {
            throw new Error("Please create a storage.yml");
        }
        const fileContents = fs.readFileSync(
            Storage._configLocation,
            "utf-8"
        );
        const casted = load(fileContents) as Storage;

        return casted;
    }

    /**
   *  Safe the config to the storage.yml default location
   */
    public static saveConfig(): void {
        fs.writeFileSync(Storage._configLocation, dump(STORAGE));
    }
}
