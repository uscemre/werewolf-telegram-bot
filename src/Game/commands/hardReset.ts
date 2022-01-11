import TelegramBot from "node-telegram-bot-api";
import {State} from "../../Bot";

export const hardReset = (bot: TelegramBot, state: State) => {
    bot.onText(/\/hard_reset/, async msg => {
        if (JSON.parse(process.env.ADMINS_ID!).includes(msg.from?.id)) {
            await state.game?.deleteGame()
        }
    })
}

