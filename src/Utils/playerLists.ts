import {highlightPlayer} from "./highlightPlayer";
import {Player} from "../Player/Player";

export const playerGameList = (players: Player[]) => `Живые игроки (${players
        .sort((p) => -!p.isAlive)
        .filter(e => e.isAlive).length}/${players.length}):\n`
    + players.map(e => `${e.isAlive ? highlightPlayer(e) : `*${e.name}*`}: ${e.isAlive ? '🙂 Жив(а)' : `💀 Мертв(а) `
        + ` — *${e.role?.roleName}*`}`
    ).join('\n')


export const startPlayerList = (players: Player[]) => `Игроки (${players.length}):\n`
    + players.map(e => `[${e.name}](tg://user?id=${e.id})`).join('\n')

export const endPlayerList = (players: Player[]) => `Игроки (${players.length}):\n` + players.map(p => {
    let role = {...p.role}
    const previousRoles = []
    while (role.previousRole) {
        role = role.previousRole
        previousRoles.push(role)
    }
    return `[${p.name}](tg://user?id=${p.id}): `
    + `${p.won ? '👍 Выиграл(а)' : '👎 Проиграл(а)'} — `
    + `${p.isAlive ? '🙂 Жив(а)' : '💀 Мертв(а)'} — `
    + `*${p.role?.roleName}* `
    + previousRoles.length
        ? `(${previousRoles.map(r => r.roleName && r.roleName.match(/[\p{Emoji}\u200d]+/gu)).join(', ')})`
        : ''
}).join('\n')
