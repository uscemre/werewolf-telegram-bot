import {RoleBase} from "../Abstract/RoleBase";
import {specialConditionSandman} from "../../Utils/specialConditionTypes";

export class Sandman extends RoleBase {
    roleName = 'Морфей 💤';
    roleIntroductionText = () => `Ты Морфей. `
    startMessageText = () => `Один раз за игру ты можешь использовать свою магию, чтобы заставить всех спать ` +
        `так крепко, что никто не сможет выполнить свои ночные действия.`
    weight = () => 3;
    
    specialCondition: specialConditionSandman = {
        sleep: undefined
    }

    action = () => {
        if (this.specialCondition.sleep === false) return;
        if (this.specialCondition.sleep) {
            this.specialCondition.sleep = false;
            return;
        }

        Sandman.game.bot.sendMessage(
            this.player.id,
            'Желаешь ли ты использовать свою магию?',
            {
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'Использовать', callback_data: JSON.stringify({type: 'role', choice: 'magic'})}],
                        [{text: 'Пропустить', callback_data: JSON.stringify({type: 'role', choice: 'skip'})}]
                    ]
                }
            }
        ).then(msg => this.choiceMsgId = msg.message_id)
    }

    actionResolve = () => {
        if (!this.specialCondition.sleep) return

        Sandman.game.players.filter(player => player.isAlive).forEach(player => player.isFrozen = true);
    }

    handleChoice = (choice?: string) => {
        if (choice !== 'magic') {
            this.choiceMsgEditText();
            return;
        }

        this.specialCondition.sleep = true;
        this.choiceMsgEditText();

        Sandman.game.bot.sendMessage(
            Sandman.game.chatId,
            'Пока жители деревни обсуждают события прошедшей ночи, ' +
            `${this.player} возвращается в дом и начинает ` +
            'напевать мягкую мелодию. Сегодня ночью все будут спать очень глубоко, ' +
            'и никто не сможет выполнить свои ночные действия.'
        )
    }

    choiceMsgEditText = () => {
        Sandman.game.bot.editMessageText(
            `Выбор принят: ${this.specialCondition.sleep ? 'Использовать' : 'Пропустить'}.`,
            {
                message_id: this.choiceMsgId,
                chat_id: this.player.id,
            }
        )
    }
}