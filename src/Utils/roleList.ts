type Role = {
    roleName: string,
    weight: string
    team?: string,
    winCondition?: string,
    dayAction?: string,
    nightAction?: string,
    notes?: string[],
}
export const roles: { [k: string]: () => Role } =
    {
        villager: () => ({
            roleName: 'Селянин 👱',
            team: 'Селяне',
            weight: '1',
            winCondition: 'жив хотя бы один представитель села ' +
                'и в живых больше не осталось ни одного волка/поджигателя/серийного убийцы.',
        }),
        traitor: () => ({
            ...roles.villager(),
            roleName: 'Предатель 🖕',
            weight: '-5',
            notes: [
                'Может выпасть, только если есть волк.',
                'Если в живых не остаётся ни одного волка, превращается в волка.',
                'Провидец видит его либо селянином (50%), либо волком (50%).',
            ],
        }),
        apprentice_seer: () => ({
            ...roles.villager(),
            roleName: 'Ученик провидца 🙇‍♂',
            weight: '5.5',
            notes: [
                'Если Провидец умрёт, ученик займет его место.'
            ]
        }),
        beauty: () => ({
            ...roles.villager(),
            roleName: 'Красавица 💅',
            weight: '0.5',
            notes: [
                'Если игрок с ночной ролью попытается навестить или ' +
                'убить тебя, вместо этого он полюбит тебя.',
            ],
        }),
        beholder: () => ({
            ...roles.villager(),
            roleName: 'Очевидец 👁',
            weight: 'Если есть провидец, то 4.5. В остальных случаях — 2.',
            notes: [
                'Очевидец видит есть ли провидец в начале игры.',
                'Очевидец увидит, если ученик провидца займёт место своего учителя.'
            ],
        }),
        blacksmith: () => ({
            ...roles.villager(),
            roleName: 'Кузнец ⚒',
            weight: 'Если есть Волк, то 8. Если есть Предатель или Дикий, то 4.5. В остальных случаях — 3.5.',
            dayAction: 'Разбрасывает серебрянную пыль повсюду на землю, ' +
                'тем самым защищая деревню от нападения волков на следующую ночь.',
            notes: ['Если Кузнец решит рабросить серебрянную пыль, то все игроки узнают об этом.']
        }),
        clumsy_guy: () => ({
            ...roles.villager(),
            roleName: 'Недотёпа 🤕',
            weight: '0.5',
            notes: ['Имеет 50% шанс проголосовать за случайного игрока, кроме изначально выбранной цели и самого себя.'],
        }),
        cowboy: () => ({
            ...roles.villager(),
            roleName: 'Ковбой 🤠',
            weight: '4.5',
            notes: ['Если ковбой умирает, он может застрелить кого-то из игроков.',
                'Если вор пытается украсть роль у ковбоя, то с 50% вероятностью ковбой может убить вора.'],
        }),
        cupid: () => ({
            ...roles.villager(),
            roleName: 'Купидон 🏹',
            weight: '2',
            nightAction: 'Может связать любых двух игроков, включая себя, любовными узами.'
        }),
        cursed: () => ({
            ...roles.villager(),
            roleName: 'Проклятый 😾',
            weight: 'Если есть волки, то [1 - (количество волков) * 2]. В остальных случаях — 1.',
            notes: [
                'Если Проклятого кусает волк, он становится Волком.',
            ]
        }),
        detective: () => ({
            ...roles.villager(),
            roleName: 'Детектив 🕵️',
            weight: '8.5',
            dayAction: 'Выбирает игрока. Перед голосованием узнает его роль.',
            notes: ['Если детектив смотрит Волка, то Волк узнает об этом.']
        }),
        drunk: () => ({
            ...roles.villager(),
            roleName: 'Пьяница 🍺',
            weight: 'Если в игре есть волк, то 3. В остальных случаях — 1.',
            notes: ['Если волк убивает пьяницу, все волки не смогут выбирать цель следующую ночь.'],
        }),
        fool: () => ({
            ...roles.seer(),
            roleName: 'Дурак 🃏',
            weight: '5',
            notes: [
                'Имеет 50% шанс увидить верную роль игрока, ' +
                'и 50% шанс увидить любую живую роль из этой игры, кроме правильной и своей.',
                ...roles.seer().notes || []
            ],
        }),
        guardian_angel: () => ({
            ...roles.villager(),
            roleName: 'Ангел-хранитель 👼',
            weight: '7.5',
            nightAction: 'Выбирает игрока. Если этого игрока попытаются убить, убийства не произойдёт.',
            notes: ['Если у Ангела-хранителя получилось спасти игрока, спасённый игрок узнает об этом.',
                'Если на выбранного игрока нападут сразу несколько раз, то Ангел-хранитель узнает об этом.',
                'Если Ангел-хранитель попытается защитить Серийного убийцу, то он умрёт.',
                'Если Ангел-хранитель попытается защитить волка, то он умрёт с вероятностью 50%.',
                'Если Блудница придёт в гости к игроку и умрёт, то Ангел-хранитель не сможет её спасти.'
            ]
        }),
        gunner: () => ({
            ...roles.villager(),
            roleName: "Стрелок 🔫",
            weight: '7',
            dayAction: 'Выбирает игрока, в которого хочет выстрелить.',
            notes: [
                'После выстрела, все игроки узнают об убийстве.',
                'Имеет 2 пули.'
            ]
        }),
        harlot: () => ({
            ...roles.villager(),
            roleName: "Блудница 💋",
            weight: '4.5',
            nightAction: 'Выбирает игрока. Вместе они проведут превосходную ночь, которую никогда не забудут.',
            notes: [
                'Если выберет волка или Серийного убийцу, то будет убита.',
                'Если выберет кого-то другого, то этот игрок будет знать, что кто-то к нему приходила блудница.',
                'Когда Блудницы нет дома, волки не могут её съесть.',
                'Серийный убийца может убить Блудницу даже если она к кому-то пошла на ночь.'
            ]
        }),
        martyr: () => ({
            ...roles.villager(),
            roleName: 'Мученица 🕯',
            weight: '0',
            nightAction: 'В начале игры выбирает игрока. ' +
                'Если этот игрок окажется на грани смерти, то Мученица спасёт его, но умрёт сама.',
            notes: ['Если Мученица умерла за свою цель, ' +
            'то она может выиграть только в том случае, если победит спасённый ею игрок.']
        }),
        mason: () => ({
            ...roles.villager(),
            roleName: 'Каменщик 👷',
            weight: 'Если каменщик один, то 1. Если в игре больше одного каменьщика, то [3 + количество каменщиков].',
            notes: ['Каждый Каменщик знает других Каменщиков.',
                'Каменщики узнают, если какой-то игрок станет Каменщиком.']
        }),
        mayor: () => ({
            ...roles.villager(),
            roleName: 'Мэр 🎖',
            weight: '4',
            dayAction: 'Мэр может раскрыть свою роль другим игрокам.',
            notes: ['После раскрытия, голос мэра начинает расцениваться за два.']
        }),
        monarch: () => ({
            ...roles.villager(),
            roleName: 'Монарх 🤴',
            weight: '4',
            dayAction: 'Монарх может раскрыть свою роль другим игрокам.',
            notes: ['После раскрытия, монарх получает на следующее голосование право выбрать, кого повесить.']
        }),
        oracle: () => ({
            ...roles.villager(),
            roleName: 'Оракул 🧿',
            weight: '5.5',
            nightAction: 'Оракул может выбрать игрока и узнать кем он НЕ является.',
            notes: ['Оракулу показывает роль любого другого живого игрока, кроме его самого.',
                'Оракулу показывает его самого только в том случае, когда все оставшиеся игроки имеют одну и ту же роль.']
        }),
        pacifist: () => ({
            ...roles.villager(),
            roleName: 'Пацифист ☮',
            weight: '3',
            dayAction: 'Может провести демонстрацию пацифизма, отменив тем самым следующее голосование за казнь.',
            notes: ['Все игроки узнают, кто пацифист после демонстрации.']
        }),
        princess: () => ({
            ...roles.villager(),
            roleName: 'Принцесса 💍',
            weight: '3.5',
            notes: [
                'При попытке казнить принцессу, селяне узнают роль приговоренной и не будут никого казнить. ' +
                'Это работает только один раз.',
                'Монарх может с первого раза казнить принцессу.'
            ]
        }),
        sandman: () => ({
            ...roles.villager(),
            roleName: 'Морфей 💤',
            weight: '8',
            dayAction: 'Может заставить всех уснуть, тем самым отменив все действия следующей ночи.',
            notes: ['Вскрывает свою роль другим игрокам.']
        }),
        seer: () => ({
            ...roles.villager(),
            roleName: 'Провидец 👳',
            weight: '6.5',
            nightAction: 'Выбирает игрока. После окончания ночи узнает его роль.',
            notes: [
                'И Провидец, и Дурак, думают, что их роль Провидец.',
                'Видит Ликана как Селянина.',
                'Видит Лесника как Волка.',
                'Видит волка любого типа как обычного Волка.',
                'Видит Предателя или Волком (50%), или Селянином (50%).'
            ]
        }),
        snowman: () => ({
            ...roles.villager(),
            roleName: 'Снеговик ☃',
            weight: 'Если в игре только один волк, то 9.5. ' +
                'Если в игре несколько волков, то 8. В остальных случаях — 6.5.',
            dayAction: 'Выбирает игрока. Бросает в него снежком, тем самым замораживая его на сутки.',
            notes: [
                'Все игроки узнают, в кого Снеговик бросил снежок.',
                'Если волк съест Снеговика, то все волки будут заморожены на одну ночь.'
            ]
        }),
        wild_child: () => ({
            ...roles.villager(),
            roleName: 'Дикий ребёнок 👶',
            weight: '-1.5',
            nightAction: 'Выбирает игрока на всю игру. Если он умрет, дикий ребёнок станет волком.',
        }),
        wise_elder: () => ({
            ...roles.villager(),
            roleName: "Мудрец 📚",
            weight: '5',
            dayAction: 'Выбирает игрока. После окончания дня узнает, может ли тот убивать.',
        }),
        woodMan: () => ({
            ...roles.villager(),
            roleName: 'Лесник 🧔‍♂‍🌚',
            weight: 'Если в игре есть провидец, то -1. В остальных случаях — 1.',
            notes: ['Провидец видит Лесника как Волка.']
        }),

        wolf: () => ({
            roleName: 'Волк 🐺',
            team: 'Волки',
            weight: '-8',
            nightAction: 'Может выбрать одного из игроков и попытаться его съесть.',
            winCondition: 'волков не меньше половины живых игроков.',
            notes: ['Если какой-то игрок станет волком, то вся стая узнает об этом.',
            'Если волков несколько, то для выбора жертвы проводится голосование.',
            'Если в стае нет Альфа-волка, то случайно выбранный волк идёт убивать цель.']
        }),
        lycan: () => ({
            ...roles.wolf(),
            roleName: 'Ликан 🐺🌝',
            weight: 'Если есть провидец, то -10. Если нет провидца, то -8.',
            notes: ['Провидец видит Ликана как Селянина.']
        }),
        alpha_wolf: () => ({
            ...roles.wolf(),
            roleName: 'Альфа-волк 🐺⭐',
            weight: '-11',
            notes: ['Имеет шанс 25% заразить свою жертву, в результате чего она превратится в Волка на следующую ночь.',
            'Если в стае есть Альфа-волк, то именно он идёт убивать жертву.']
        }),
        prowler: () => ({
            ...roles.wolf(),
            roleName: 'Сова 🦉',
            weight: '-4',
            nightAction: 'Каждую ночь может посмотреть в окно одного из игроков и узнать совершал ли он ночные ' +
                'действия в эту ночь. Если же его съедят, узнает имена всех волков.',
        }),
        sorcerer: () => ({
            ...roles.wolf(),
            roleName: 'Колдунья 🔮',
            weight: '-3',
            nightAction: 'Может узнать, является ли выбранный игрок волком или провидцем.',
            notes: [
                'Видит Ученика Провидца как Провидца с шансом 50%.'
            ]
        }),


        thief: () => ({
            roleName: 'Вор 😈',
            weight: '-4',
            nightAction: 'Ворует у другого игрока роль. Взамен другой игрок становится вором.',
            notes: [
                'Не может украсть роль у Двойника или другого Вора.',
                'При попытке украсть роль у Серийного Убийцы, Вор умирает.',
                'При попытке украсть роль у Ковбоя, с 50% шансом Вор умирает.'
            ],
        }),
        arsonist: () => ({
            roleName: 'Поджигатель 🔥',
            team: 'Поджигатели',
            weight: '-5',
            nightAction: 'Может залить игрока горючим или сжечь всех залитых игроков.',
            winCondition: 'остаётся последним выжившим или ' +
                'остаётся один на один с неспособной его убить ролью.',
            notes: [
                'Несмотря на то, что поджигатели играют в одной команде, они не знают других поджигателей.'
            ]
        }),
        doppelganger: () => ({
            roleName: 'Двойник 🎭',
            weight: '-1',
            nightAction: 'Выбирает игрока, двойником которого становится.',
            notes: [
                'Если цель двойника умирает, двойник меняет свою роль на роль цели.',
            ]
        }),
        undertaker: () => ({
            roleName: 'Гробовщик ⚰',
            weight: '0.5',
            nightAction: 'Может взять себе роль уже умершего игрока.',
        }),
        serial_killer: () => ({
            roleName: 'Серийный убийца 🔪',
            weight: '-11',
            team: 'Сам в команде',
            nightAction: 'Может выбрать одного из игроков и попытаться его убить.',
            winCondition: 'остаётся единственным выжившим или остаётся один на один с другим игроком, ' +
                'если тот не Серийный убийца.',
            notes: [
                'Если Серийного убийцу попытается убить волк, то Серийный убийца убьёт его.'
            ]
        }),
        suicide: () => ({
            roleName: 'Самоубийца 👺',
            team: 'Сам в команде',
            weight: 'Количество игроков / -2.',
            winCondition: 'будет повешен на голосовании',
        }),
    }
