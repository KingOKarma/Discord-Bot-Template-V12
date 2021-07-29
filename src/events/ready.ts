import { Event } from "../interfaces/event";
import { STORAGE } from "../globals";

export const event: Event = {    name: "ready",
    run: (client) => {
        console.log(`${client.user?.tag} Ready to serve!`);
        console.log(STORAGE);

        client.user?.setPresence({ activity: { name: 'github.com/VRRemi', type: 'WATCHING' }, status: 'dnd' })
            .catch(console.error);
    }

}

// Type Options: WATCHING, PLAYING, STREAMING
// Status Options: online, idle, dnd
// Example: client.user.setPresence({ activity: { name: 'test', type: 'STREAMING'}, status: 'idle' })
//          .catch(console.error);
//              }
