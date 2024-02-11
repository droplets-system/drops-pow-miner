import { AnyAction } from "@wharfkit/session"
import { session } from "./config.js"

export function transfer(drops: string[]): AnyAction {
    return {
        account: "drops",
        name: "destroy",
        authorization: [session.permissionLevel],
        data: {
            owner: session.actor,
            drops,
            to_notify: "token.gm",
            memo: "",
        }
    }
}
