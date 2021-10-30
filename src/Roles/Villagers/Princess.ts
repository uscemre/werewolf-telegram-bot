import {RoleBase} from "../Abstract/RoleBase";
import {Player} from "../../Player/Player";
import {highlightPlayer} from "../../Utils/highlightPlayer";

export class Princess extends RoleBase {
    roleName = 'Принцесса 💍';
    roleIntroductionText = () => `Ты скрывающаяся ${this.roleName}, `;
    startMessageText = () => 'сбежавшая от своей скучной, изнеженной жизни, ' +
        '`чтобы провести пару дней среди деревенщин. ' +
        'Если они попытаются казнить тебя, они совершат огромную ошибку, и никто не будет казнен.';
    weight = () => 3;

    lynchedAlready: boolean = false;

    handleDeath(killer?: Player): boolean {
        if (!killer && !this.lynchedAlready) {
            Princess.game.bot.sendAnimation(
                Princess.game.chatId,
                'https://media.giphy.com/media/RLVHPJJv7jY1q/giphy.gif',
                {
                    caption: `Как только селяне приступили казнитть ${highlightPlayer(this.player)}, ` +
                        `она воскликнула “Постойте! Я ${this.roleName}! ` +
                        'Это королевское кольцо, эта печать короля все подтверждают! ' +
                        'Каждую ночь я в окружении слуг. Так что я не могу быть злой!” ' +
                        'Почувствовав себя глупо, смущенные жители удалились на ночь.'
                })
            this.lynchedAlready = true;
            return false;
        }
        return super.handleDeath(killer);
    }
}