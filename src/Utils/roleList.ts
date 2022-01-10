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
            winCondition: 'в живых не осталось волков, поджигателя и серийного убицйы',
        }),
        traitor: () => ({
            ...roles.villager(),
            roleName: 'Предатель 🖕',
            weight: '-1',
            notes: [
                'Может выпасть, только если есть волк.',
                'Если в живых не остаётся ни одного волка, превращается в волка.',
                'Провидец видит его либо селянином(50%), либо волком(50%).',
            ],
        }),
        beauty: () => ({
            ...roles.villager(),
            roleName: 'Красавица 💅',
            weight: '0.5',
            notes: [
                'Если какая-то ночная роль попытается навестить или ' +
                'убить тебя, вместо этого он(а) полюбит тебя.',
            ],
        }),
        beholder: () => ({
            ...roles.villager(),
            roleName: 'Очевидец 👁',
            weight: 'Если есть провидец, то 4.5, если нет провидца, то 2.',
            notes: [
                'Очевидец видит есть провидец в игре или нет.',
                'Очевидец увидит, если ученик провидца займет место своего учителя.'
            ],
        }),
        apprentice_seer: () => ({
            ...roles.villager(),
            roleName: 'Ученик провидца 🙇‍♂️',
            weight: '5.5',
            notes: [
                'Если Провидец умрет, ученик займет его место.'
            ]
        }),
        blacksmith: () => ({
            ...roles.villager(),
            roleName: 'Кузнец ⚒',
            weight: 'Если есть Волк, то 8, если есть Предатель или Дикий то 4.5, в других случаях 3.5.',
            dayAction: 'Разбрасывает серебрянную пыль повсюду на землю, тем самым защищая деревню от нападения волков на следующую ночь.',
            notes: [
                'При выполнении активного действия вскрывает свою роль другим игрокам.',
            ]
        }),
        clumsy_guy: () => ({
            ...roles.villager(),
            roleName: 'Недотёпа 🤕',
            weight: '0.5',
            notes: ['Имеет 50% шанс проголосовать за случайного игрока.'],
        }),
        cowboy: () => ({
            ...roles.villager(),
            roleName: 'Ковбой 🤠',
            weight: '4.5',
            notes: ['Если ковбой умирает, он может застрелить кого-то из игроков.'],
        }),
        cupid: () => ({
            ...roles.villager(),
            roleName: 'Купидон 🏹',
            weight: '2',
            notes: [
                'Может связать двух игроков любовными узами, если один из них погибнет,' +
                'то другой умрет от печали.',
            ],
        }),
        cursed: () => ({
            ...roles.villager(),
            roleName: 'Проклятый 😾',
            weight: 'Если есть волки, то (1 - (количество волков)*2). Если волков нет, то 1.',
            notes: [
                'Если Проклятого кусает волк, он становится волком.',
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
            weight: 'Если в игре есть волк, то 3. Если волка нет, то 1.',
            notes: ['Если Волк убивает пьяницу, все волки не смогут выбирать цель следующую ночь.'],
        }),
        fool: () => ({
            ...roles.villager(),
            roleName: 'Дурак 🃏',
            weight: '5',
            notes: [
                'Имеет 50% шанс увидить верную роль игрока, и 50% шанс увидить любую живую роль из этой игры, кроме правильной и своей.',
                ...roles.seer().notes || []
            ],
        }),
        guardian_angel: () => ({
            ...roles.villager(),
            roleName: 'Ангел-хранитель 👼',
            weight: '6.5',
            nightAction: 'Выбирает игрока. Если этого игрока попытаются убить, убийства не произойдёт.',
            notes: ['Если у ангела получилось спасти игрока, спасённый игрок увидит, что его кто-то спас.']
        }),
        gunner: () => ({
            ...roles.villager(),
            roleName: "Стрелок 🔫",
            weight: '7',
            dayAction: 'Выбирает игрока, в которого хочет выстрелить.',
            notes: [
                'После убийства все игроки узнают, кто стрелок.'
            ]
        }),
        harlot: () => ({
            ...roles.villager(),
            roleName: "Блудница 💋",
            weight: '4.5',
            nightAction: 'Выбирает игрока. Вместе они проведут превосходную ночь, которую никогда не забудут.',
            notes: [
                'Если выберет волка или серийного убийцу, то будет убита.',
                'Если выберет кого-то другого, то этот игрок будет знать, что кто-то к нему приходила блудница.'
            ]
        }),
        mason: () => ({
            ...roles.villager(),
            roleName: 'Каменщик 👷',
            weight: 'Если в игре каменщиков больше одного, то 3 + количество каменщиков. Если каменщик один, то вес равзяется 1.',
            notes: ['Каждый каменщик знает других каменщиков.']
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
            notes: ['После раскрытия, монарх получает на следующее голосоване право выбрать, кого повесить.']
        }),
        oracle: () => ({
            ...roles.villager(),
            roleName: 'Оракул 🧿',
            weight: '5.5',
            nightAction: 'Оракул может выбрать игрока и узнать кем он НЕ является.',
            notes: ['Оракулу показывает роль кого-то другого живого игрока.']
        }),
        pacifist: () => ({
            ...roles.villager(),
            roleName: 'Пацифист ☮',
            weight: '3',
            dayAction: 'Может провести демонстрацию пацифизма, отменив тем самым следующее голосование за казнь.',
            // lynch
            notes: ['Все игроки узнают, кто пацифист.']
        }),
        princess: () => ({
            ...roles.villager(),
            roleName: 'Принцесса 💍',
            weight: '2',
            notes: [
                'При попытке казнить принцессу, селяне узнают роль приговоренной и не будут никого казнить. '
                + 'Это работает только первый раз.',
                'Монарх может с первого раза казнить принцессу.'
            ]
        }),
        sandman: () => ({
            ...roles.villager(),
            roleName: 'Морфей 💤',
            weight: '6.5',
            dayAction: 'Может заставить всех уснуть, тем самым отменив все действия следующей ночи.',
            notes: ['Вскрывает свою роль другим игрокам.']
        }),
        seer: () => ({
            ...roles.villager(),
            roleName: 'Провидец 👳',
            weight: '6.5',
            nightAction: 'Выбирает игрока. После окончания ночи узнает его роль.',
            notes: [
                'И Дурак, и Провидец, думают, что их роль Провидец.',
                'Видит Ликана Селянином.',
                'Видит Лесника Волком.',
                'Видит волка любого типа как обычного Волка.',
                'Видит Предателя или Волком(50%), или Селянином(50%).'
            ]
        }),
        wild_child: () => ({
            ...roles.villager(),
            roleName: 'Дикий ребёнок 👶',
            weight: '-1.5',
            nightAction: 'Выбирает игрока. Если он умрет, дикий ребёнок станет волком.',
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
            weight: 'Если в игре есть провидец, то -1. Если провидца нет, то 1.',
            notes: ['Провидец видет лесника волком.']
        }),


        wolf: () => ({
            roleName: 'Волк 🐺',
            team: 'Волки',
            weight: '-8',
            nightAction: 'Может выбрать одного из игроков и попытаться его съесть.',
            winCondition: 'волков не меньше половины живых игроков',
        }),
        lycan: () => ({
            ...roles.wolf(),
            roleName: 'Ликан 🐺🌝',
            weight: 'Если есть провидец, то -12. Если нет провидца, то -10.',
            notes: ['Провидец видит ликана селянином.']
        }),
        alpha_wolf: () => ({
            ...roles.wolf(),
            roleName: 'Альфа-волк 🐺⭐️',
            weight: '-11',
            notes: ['Имеет шанс 25% заразить свою жертву, в результате чего она превратится в Волка на следующую ночь.']
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
            nightAction: 'Выбирает игрока. Может узнать, является ли игрок волком или провидцем.',
            notes: [
                'Видит Ученика Провидца как Провидца.'
            ]
        }),


        thief: () => ({
            roleName: 'Вор 😈',
            weight: '-4',
            nightAction: 'Ворует у другого игрока роль. Взамен другой игрок становится вором.',
            notes: [
                'Не может украсть роль у Двойника.',
                'При попытке украсть роль у Серийного Убийцы, Вор умирает.'
            ],
        }),
        arsonist: () => ({
            roleName: 'Поджигатель 🔥',
            team: 'Поджигатели',
            weight: '-7',
            nightAction: 'Может залить игрока горючим, или сжечь всех залитых игроков.',
            winCondition: 'поджигателей не меньше половины игроков', // actually no
        }),
        doppelganger: () => ({
            roleName: 'Двойник 🎭',
            weight: '-1',
            nightAction: 'Выбирает игрока, двойником которого становится.',
            notes: [
                'Если игрок, который был целью двойника умирает, то двойник меняет свою роль на роль умершего',
            ]
        }),
        undertaker: () => ({
            roleName: 'Гробовщик ⚰',
            weight: '0',
            nightAction: 'Может взять себе роль уже умершего игрока',
        }),
        serial_killer: () => ({
            roleName: 'Серийный убийца 🔪',
            weight: '-12.5',
            team: 'Сам в команде',
            nightAction: 'Может выбрать одного из игроков и попытаться его зарезать.',
            winCondition: 'остаётся 1 на 1 с другим игроком',
        }),
        suicide: () => ({
            roleName: 'Самоубийца 👺',
            team: 'Сам в команде',
            weight: '-4',
            winCondition: 'повешен на голосовании',
        }),
    }
