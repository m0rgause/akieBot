/**
 * This source code below is free, please DO NOT sell this in any form!
 * Source code ini gratis, jadi tolong JANGAN jual dalam bentuk apapun!
 *
 * If you copying one of our source code, please give us CREDITS. Because this is one of our hardwork.
 * Apabila kamu menjiplak salah satu source code ini, tolong berikan kami CREDIT. Karena ini adalah salah satu kerja keras kami.
 *
 * If you want to contributing to this source code, pull requests are always open.
 * Apabila kamu ingin berkontribusi ke source code ini, pull request selalu kami buka.
 * 
 * Thanks for the contributions.
 * Terima kasih atas kontribusinya.
 */

/********** MODULES **********/
const { decryptMedia, Client } = require('@open-wa/wa-automate')
const { JSTikTok } = require("../lib/tiktok");
const fs = require('fs-extra')
const config = require('../config.json')
const Nekos = require('nekos.life')
const neko = new Nekos()
const os = require('os')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const api = new API()
const sagiri = require('sagiri')
const NanaAPI = require('nana-api')
const nana = new NanaAPI()
const isPorn = require('is-porn')
const exec = require('await-exec')
const webp = require('webp-converter')
const sharp = require('sharp')
const saus = sagiri(config.nao, { results: 5 })
const axios = require('axios')
const tts = require('node-gtts')
const nekobocc = require('nekobocc')
const bent = require('bent')
const ms = require('parse-ms')
const toMs = require('ms')
const canvas = require('canvacord')
const mathjs = require('mathjs')
const emojiUnicode = require('emoji-unicode')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const nhtai = require('../lib/nhentai')
var remote = require('remote-file-size')
/********** END OF MODULES **********/

/********** UTILS **********/
const { msgFilter, color, processTime, isUrl, createSerial } = require('../tools')
const { nsfw, weeaboo, downloader, sticker, fun, misc, toxic } = require('../lib')
const { uploadImages } = require('../tools/fetcher')
const { ind, eng } = require('./text/lang/')
const { limit, level, card, register, afk, reminder, premium } = require('../function')
const Exif = require('../tools/exif')
const exif = new Exif()
const cd = 4.32e+7
const errorImg = 'https://i.ibb.co/jRCpLfn/user.png'
const tanggal = moment.tz('Asia/Jakarta').format('DD-MM-YYYY')
/********** END OF UTILS **********/

/********** DATABASES **********/
const _nsfw = JSON.parse(fs.readFileSync('./database/group/nsfw.json'))
const _antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const _antinsfw = JSON.parse(fs.readFileSync('./database/group/antinsfw.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
const _autosticker = JSON.parse(fs.readFileSync('./database/group/autosticker.json'))
const _ban = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
const _premium = JSON.parse(fs.readFileSync('./database/bot/premium.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
const _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const _afk = JSON.parse(fs.readFileSync('./database/user/afk.json'))
const _reminder = JSON.parse(fs.readFileSync('./database/user/reminder.json'))
const _bg = JSON.parse(fs.readFileSync('./database/user/card/background.json'))
const _setting = JSON.parse(fs.readFileSync('./database/bot/setting.json'))
let { memberLimit, groupLimit } = _setting
/********** END OF DATABASES **********/

function formatBytes(a, b = 2) { if (0 === a) return "0 Bytes"; const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024)); return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d] }

/********** MESSAGE HANDLER **********/
module.exports = msgHandler = async (akie = new Client(), message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName
        const botNumber = await akie.getHostNumber() + '@c.us'
        const blockNumber = await akie.getBlockedIds()
        const ownerNumber = config.ownerBot
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await akie.getGroupAdmins(groupId) : ''
        const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')

        const chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : ''
        const prefix = config.prefix
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const uaOverride = config.uaOverride
        const q = args.join(' ')
        const ar = args.map((v) => v.toLowerCase())
        const url = args.length !== 0 ? args[0] : ''

        /********** VALIDATOR **********/
        const isCmd = body.startsWith(prefix)
        const isBlocked = blockNumber.includes(sender.id)
        const isOwner = sender.id === ownerNumber
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isBanned = _ban.includes(sender.id)
        const isPremium = premium.checkPremiumUser(sender.id, _premium)
        const isRegistered = register.checkRegisteredUser(sender.id, _registered)
        const isNsfw = isGroupMsg ? _nsfw.includes(groupId) : false
        const isWelcomeOn = isGroupMsg ? _welcome.includes(groupId) : false
        const isDetectorOn = isGroupMsg ? _antilink.includes(groupId) : false
        const isLevelingOn = isGroupMsg ? _leveling.includes(groupId) : false
        const isAutoStickerOn = isGroupMsg ? _autosticker.includes(groupId) : false
        const isAntiNsfw = isGroupMsg ? _antinsfw.includes(groupId) : false
        const isAfkOn = afk.checkAfkUser(sender.id, _afk)
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isImage = type === 'image'
        /********** END OF VALIDATOR **********/

        // Automate
        premium.expiredCheck(_premium)

        // ROLE (Change to what you want, or add) and You can change the role sort based on XP
        const levelRole = level.getLevelingLevel(sender.id, _level)
        var role = 'Warrior V'
        if (levelRole <= 5) {
            var role = 'Warrior IV'
        } else if (levelRole <= 10) {
            var role = 'Warrior III'
        } else if (levelRole <= 15) {
            var role = 'Warrior II'
        } else if (levelRole <= 20) {
            var role = 'Warrior I'
        } else if (levelRole <= 25) {
            var role = 'Elite V'
        } else if (levelRole <= 30) {
            var role = 'Elite IV'
        } else if (levelRole <= 35) {
            var role = 'Elite III'
        } else if (levelRole <= 40) {
            var role = 'Elite II'
        } else if (levelRole <= 45) {
            var role = 'Elite I'
        } else if (levelRole <= 50) {
            var role = 'Master V'
        } else if (levelRole <= 55) {
            var role = 'Master IV'
        } else if (levelRole <= 60) {
            var role = 'Master III'
        } else if (levelRole <= 65) {
            var role = 'Master II'
        } else if (levelRole <= 70) {
            var role = 'Master I'
        } else if (levelRole <= 75) {
            var role = 'Grandmaster V'
        } else if (levelRole <= 80) {
            var role = 'Grandmaster IV'
        } else if (levelRole <= 85) {
            var role = 'Grandmaster III'
        } else if (levelRole <= 90) {
            var role = 'Grandmaster II'
        } else if (levelRole <= 95) {
            var role = 'Grandmaster I'
        } else if (levelRole <= 100) {
            var role = 'Epic V'
        } else if (levelRole <= 105) {
            var role = 'Epic IV'
        } else if (levelRole <= 110) {
            var role = 'Epic III'
        } else if (levelRole <= 115) {
            var role = 'Epic II'
        } else if (levelRole <= 120) {
            var role = 'Epic I'
        } else if (levelRole <= 125) {
            var role = 'Legend V'
        } else if (levelRole <= 130) {
            var role = 'Legend IV'
        } else if (levelRole <= 135) {
            var role = 'Legend III'
        } else if (levelRole <= 140) {
            var role = 'Legend II'
        } else if (levelRole <= 145) {
            var role = 'Legend I'
        } else if (levelRole <= 150) {
            var role = 'Mythic V'
        } else if (levelRole <= 160) {
            var role = 'Mythic IV'
        } else if (levelRole <= 170) {
            var role = 'Mythic III'
        } else if (levelRole <= 180) {
            var role = 'Mythic II'
        } else if (levelRole <= 190) {
            var role = 'Mythic I'
        } else if (levelRole <= 200) {
            var role = 'Mythical Glory'
        }


        if (isGroupMsg && isRegistered && !isBanned && isLevelingOn) {
            const currentLevel = level.getLevelingLevel(sender.id, _level)
            const checkId = level.getLevelingId(sender.id, _level)
            const checkBg = card.getBg(sender.id, _bg)
            try {
                if (currentLevel === undefined && checkId === undefined) level.addLevelingId(sender.id, _level)
                if (checkBg === undefined) card.addBg(sender.id, _bg)
                const amountXp = Math.floor(Math.random() * 10) + 150
                const requiredXp = 200 * (Math.pow(2, currentLevel) - 1)
                const getLevel = level.getLevelingLevel(sender.id, _level)
                level.addLevelingXp(sender.id, amountXp, _level)
                if (requiredXp <= level.getLevelingXp(sender.id, _level)) {
                    level.addLevelingLevel(sender.id, 1, _level)
                    const fetchXp = 200 * (Math.pow(2, level.getLevelingLevel(sender.id, _level)) - 1)
                    await akie.reply(from, `*「 LEVEL UP 」*\n\n➸ *Name*: ${pushname}\n➸ *XP*: ${level.getLevelingXp(sender.id, _level)} / ${fetchXp}\n➸ *Level*: ${getLevel} -> ${level.getLevelingLevel(sender.id, _level)} 🆙 \n➸ *Role*: *${role}*\n\nCongrats!! 🎉🎉`, id)
                }
            } catch (err) {
                console.error(err)
            }
        }

        // Anti-group link detector
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats.match(new RegExp(/(https:\/\/chat.whatsapp.com)/gi))) {
                const valid = await akie.inviteInfo(chats)
                if (valid) {
                    console.log(color('[KICK]', 'red'), color('Received a group link and it is a valid link!', 'yellow'))
                    await akie.reply(from, ind.linkDetected(), id)
                    await akie.removeParticipant(groupId, sender.id)
                } else {
                    console.log(color('[WARN]', 'yellow'), color('Received a group link but is not a valid link!', 'yellow'))
                }
            }
        }

        // Anti NSFW links but kinda uneffective
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isAntiNsfw && !isOwner) {
            if (isUrl(chats)) {
                const classify = new URL(isUrl(chats))
                console.log(color('[FILTER]', 'yellow'), 'Checking link:', classify.hostname)
                isPorn(classify.hostname, async (err, status) => {
                    if (err) return console.error(err)
                    if (status) {
                        console.log(color('[NSFW]', 'red'), color('The link is classified as NSFW!', 'yellow'))
                        await akie.reply(from, ind.linkNsfw(), id)
                        await akie.removeParticipant(groupId, sender.id)
                    } else {
                        console.log(('[NEUTRAL]'), color('The link is safe!'))
                    }
                })
            }
        }

        // Auto-sticker
        if (isGroupMsg && isAutoStickerOn && isMedia && isImage && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await akie.sendImageAsSticker(from, imageBase64)
                .then(() => {
                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                })
                .catch(async (err) => {
                    console.error(err)
                    await akie.reply(from, 'Error!', id)
                })
        }


        if (isGroupMsg) {
            for (let ment of mentionedJidList) {
                if (afk.checkAfkUser(ment, _afk)) {
                    const getId = afk.getAfkId(ment, _afk)
                    const getReason = afk.getAfkReason(getId, _afk)
                    const getTime = afk.getAfkTime(getId, _afk)
                    await akie.reply(from, ind.afkMentioned(getReason, getTime), id)
                }
            }
            if (afk.checkAfkUser(sender.id, _afk) && !isCmd) {
                _afk.splice(afk.getAfkPosition(sender.id, _afk), 1)
                fs.writeFileSync('./database/user/afk.json', JSON.stringify(_afk))
                await akie.sendText(from, ind.afkDone(pushname))
            }
        }

        // Ignore banned and blocked users
        if (isCmd && (isBanned || isBlocked) && !isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && (isBanned || isBlocked) && isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Anti-spam
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Log
        if (isCmd && !isGroupMsg) console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isGroupMsg) console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Anti-spam
        if (isCmd) msgFilter.addFilter(from)

        switch (command) {

            case 'register':
                if (isRegistered) return await akie.reply(from, ind.registeredAlready(), id)
                if (isGroupMsg) return await akie.reply(from, ind.pcOnly(), id)
                if (!q.includes('|')) return await akie.reply(from, ind.wrongFormat(), id)
                const namaUser = q.substring(0, q.indexOf('|') - 1)
                const umurUser = q.substring(q.lastIndexOf('|') + 2)
                const serialUser = createSerial(20)
                register.addRegisteredUser(sender.id, namaUser, umurUser, time, serialUser, _registered)
                await akie.reply(from, ind.registered(namaUser, umurUser, sender.id, time, serialUser), id)
                console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
                break


            case 'level':

                if (!isLevelingOn) return await akie.reply(from, ind.levelingNotOn(), id)
                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                const userLevel = level.getLevelingLevel(sender.id, _level)
                const userXp = level.getLevelingXp(sender.id, _level)
                if (userLevel === undefined && userXp === undefined) return await akie.reply(from, ind.levelNull(), id)
                const ppLink = await akie.getProfilePicFromServer(sender.id)
                if (ppLink === undefined) {
                    var pepe = errorImg
                } else {
                    var pepe = ppLink
                }
                const bege = card.getBg(sender.id, _bg)
                const requiredXp = 200 * (Math.pow(2, userLevel) - 1)
                const randomHexs = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
                const randomHex = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
                const rank = new canvas.Rank()
                    .setAvatar(pepe)
                    .setLevel(userLevel)
                    .setRank(1, `${role}`, false) // Set value to true if you want to display user's roles
                    .setCurrentXP(userXp)
                    .setRequiredXP(requiredXp)
                    .setProgressBar([randomHexs, randomHex], 'GRADIENT')
                    .setBackground('IMAGE', bege)
                    .setUsername(pushname)
                    .setDiscriminator(sender.id.substring(6, 10))
                rank.build()
                    .then(async (buffer) => {
                        canvas.write(buffer, `${pushname}_card.png`)
                        await akie.sendFile(from, `${pushname}_card.png`, `${pushname}_card.png`, '', id)
                        fs.unlinkSync(`${pushname}_card.png`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'leaderboard':

                if (!isLevelingOn) return await akie.reply(from, ind.levelingNotOn(), id)
                if (!isGroupMsg) return await akie.reply(from.ind.groupOnly(), id)
                _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                let leaderboard = '-----[ *LEADERBOARD* ]----\n\n'
                let nom = 0
                try {
                    for (let i = 0; i < 10; i++) {
                        nom++
                        leaderboard += `${nom}. wa.me/${_level[i].id.replace('@c.us', '')}\n➸ *XP*: ${_level[i].xp} *Level*: ${_level[i].level}\n\n`
                    }
                    await akie.reply(from, leaderboard, id)
                } catch (err) {
                    console.error(err)
                    await akie.reply(from, ind.minimalDb(), id)
                }
                break
            case 'setbackground':
            case 'setbg':

                if (!isLevelingOn) return await akie.reply(from, ind.levelingNotOn(), id)
                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (!isUrl(url)) return await akie.reply(from, ind.wrongFormat(), id)
                const levels = level.getLevelingLevel(sender.id, _level)
                const xps = level.getLevelingXp(sender.id, _level)
                if (levels === undefined && xps === undefined) return await akie.reply(from, ind.levelNull(), id)
                card.replaceBg(sender.id, url, _bg)
                await akie.reply(from, 'Success set new background!', id)
                break

            // Downloader
            case 'joox':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                downloader.joox(q)
                    .then(async (result) => {
                        await akie.sendFileFromUrl(from, result.image, `${result.title}.jpg`, ind.joox(result, q), id)
                        await akie.sendFileFromUrl(from, result.url, `${result.title}.mp3`, '', id)
                        console.log('Success sending music from Joox!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'igpost':
            case 'instapost':
                if (!isUrl(url) && !url.includes('instagram.com')) return await akie.reply(from, ind.wrongFormat(), id)
                // await akie.reply(from, ind.wait(), id)
                downloader.insta(url)
                    .then(async (results) => {
                        for (result of results.contents) {
                            if (result.type === "photo") {
                                await akie.sendFileFromUrl(from, result.url, 'igcontentsdl.jpg', `*❏* *Instagram Post Downloader* \n\n*Username*: ${results.author.username}\n*Caption*: ${results.caption}`, id)
                            } else if (result.contents.type === "video") {
                                await akie.sendFileFromUrl(from, result.url, 'igcontentsdl.mp4', `*❏* *Instagram Post Downloader* \n\n*Username*: ${results.author.username}\n*Caption*: ${results.caption}`, id)
                            }
                        }
                        console.log('Success sending Instagram media!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'facebook':
            case 'fb':

                if (!isUrl(url) && !url.includes('facebook.com')) return await akie.reply(from, `URL bukan dari facebook!`, id)
                await akie.reply(from, ind.wait(), id)
                downloader.fb(q)
                    .then(async ({ result }) => {
                        await akie.sendFileFromUrl(from, result.VideoUrl, 'videofb.mp4', '', id)
                        console.log(from, 'Success sending Facebook video!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, `Ada yang Error!`, id)
                    })
                break
            case 'ytmp3':

                if (!isUrl(url) && !url.includes(['youtu.be', 'youtube.com'])) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                downloader.ytdl(url)
                    .then(async (res) => {
                        var url = res.mp3
                        remote(url, async (err, o) => {
                            if (Number(formatBytes(o).split(' MB')[0] >= 30) || err) {
                                await akie.reply(from, ind.videoLimit(), id)
                            } else {
                                await akie.sendFileFromUrl(from, res.thumb.url, `${res.title}.jpg`, ind.ytFound(res), id)
                                await akie.sendFileFromUrl(from, res.mp3, `${res.title}.mp3`, '', id)
                                console.log('Success sending YouTube video!')
                            }
                        })
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'ytmp4':

                if (!isUrl(url) && !url.includes('youtu.be')) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                downloader.ytdl(url)
                    .then(async (res) => {
                        var url = res.mp4
                        remote(url, async (err, o) => {
                            if (Number(formatBytes(o).split(' MB')[0] >= 30) || err) {
                                await akie.reply(from, ind.videoLimit(), id)
                            } else {
                                await akie.sendFileFromUrl(from, res.thumb.url, `${res.title}.jpg`, ind.ytFound(res), id)
                                await akie.sendFileFromUrl(from, res.mp4, `${res.title}.mp4`, '', id)
                                console.log('Success sending YouTube video!')
                            }
                        })
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'tiktokpic':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                try {
                    console.log(`Get profile pic for ${q}`)
                    const tkt = await axios.get(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${q}`)
                    if (tkt.data.error) return akie.reply(from, tkt.data.error, id)
                    await akie.sendFileFromUrl(from, tkt.data.result, 'tiktokpic.jpg', 'Ini :D', id)
                    console.log('Success sending TikTok profile pic!')
                } catch (err) {
                    console.error(err)
                    await akie.reply(from, 'Error!', id)
                }
                break
            case 'tiktoknowm': // by: VideFrelan
            case 'tktnowm':

                if (!isUrl(url) && !url.includes('tiktok.com')) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                downloader.tikNoWm(url)
                    .then(async (res) => {
                        fs.writeFileSync(`./temp/${sender.id}.mp4`, res)
                        await akie.sendFile(from, `./temp/${sender.id}.mp4`, 'nowm.mp4', '', id)
                        console.log('Success sending TikTok video with no WM!')
                        fs.unlinkSync(`./temp/${sender.id}.mp4`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'tiktok':

                if (!isUrl(url) && !url.includes('tiktok.com')) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                const tik = new JSTikTok(url);
                await tik.get().then(function () {
                    //Log the video title
                    console.log(tik.datas.video.title);

                    //Start download
                    tik.download_video();
                });

                // downloader.tik(url)
                //     .then(async ({ result }) => {
                //         // await akie.sendFileFromUrl(from, result.video, 'tiktok.mp4', '', id)
                //         console.log(result)
                //         console.log('Success sending TikTok video!')
                //     })
                //     .catch(async (err) => {
                //         console.log(err)
                //         // await akie.reply(from, 'Error!', id)
                //     })
                break
            case 'twitter':
            case 'twt':

                if (!isUrl(url) && !url.includes('twitter.com')) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                downloader.tweet(url)
                    .then(async (data) => {
                        if (data.type === 'video') {
                            const content = data.variants.filter((x) => x.content_type !== 'application/x-mpegURL').sort((a, b) => b.bitrate - a.bitrate)
                            const result = await misc.shortener(content[0].url)
                            console.log('Shortlink:', result)
                            await akie.sendFileFromUrl(from, content[0].url, 'video.mp4', `Link HD: ${result}`, id)
                                .then(() => console.log('Success sending Twitter media!'))
                                .catch(async (err) => {
                                    console.error(err)
                                    await akie.reply(from, 'Error!', id)
                                })
                        } else if (data.type === 'photo') {
                            for (let i = 0; i < data.variants.length; i++) {
                                await akie.sendFileFromUrl(from, data.variants[i], data.variants[i].split('/media/')[1], '', id)
                                    .then(() => console.log('Success sending Twitter media!'))
                                    .catch(async (err) => {
                                        console.error(err)
                                        await akie.reply(from, 'Error!', id)
                                    })
                            }
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break

            // Misc
            case 'say':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.sendText(from, q)
                break
            case 'afk':

                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (isAfkOn) return await akie.reply(from, ind.afkOnAlready(), id)
                const reason = q ? q : 'Nothing.'
                afk.addAfkUser(sender.id, time, reason, _afk)
                await akie.reply(from, ind.afkOn(pushname, reason), id)
                break
            case 'lyric':
            case 'lirik':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                misc.lirik(q)
                    .then(async ({ result }) => {
                        if (result.code !== 200) return await akie.reply(from, 'Not found.', id)
                        await akie.reply(from, result.result, id)
                        console.log('Success sending lyric!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'shortlink':

                if (!isUrl(url)) return await akie.reply(from, ind.wrongFormat(), id)
                const urlShort = await misc.shortener(url)
                await akie.reply(from, ind.wait(), id)
                await akie.reply(from, urlShort, id)
                console.log('Success!')
                break
            case 'wikipedia':
            case 'wiki':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                misc.wiki(q)
                    .then(async ({ result, status }) => {
                        if (status !== 200) {
                            return await akie.reply(from, 'Not found.', id)
                        } else {
                            await akie.reply(from, result, id)
                            console.log('Success sending Wiki!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'instastory': //By: VideFrelan
            case 'igstory':
                if (!q) return akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                misc.its(q)
                    .then(async ({ result }) => {
                        for (let i = 0; i < result.story.itemlist.length; i++) {
                            const { urlDownload } = result.story.itemlist[i]
                            await akie.sendFileFromUrl(from, urlDownload, '', 'By: VideFrelan', id)
                            console.log('Success sending IG Story!')
                        }
                    })
                break
            case 'kbbi':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                misc.kbbi(q)
                    .then(async ({ status, result, pesan }) => {
                        if (status === 'error') {
                            await akie.reply(from, pesan, id)
                        } else {
                            await akie.reply(from, result, id)
                                .then(() => console.log('Success sending definition!'))
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'linesticker':
            case 'linestiker':

                await akie.reply(from, ind.wait(), id)
                misc.linesticker()
                    .then(async ({ result }) => {
                        let lines = `-----[ *NEW STICKER* ]-----`
                        for (let i = 0; i < result.hasil.length; i++) {
                            lines += `\n\n➸ *Title*: ${result.hasil[i].title}\n➸ *URL*: ${result.hasil[i].uri}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await akie.reply(from, lines, id)
                        console.log('Success sending sticker Line!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, `Error!\n{err}`, id)
                    })
                break
            case 'jadwalsholat':
            case 'jadwalsolat':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                misc.jadwalSholat(q)
                    .then((data) => {
                        data.map(async ({ isya, subuh, dzuhur, ashar, maghrib, terbit }) => {
                            const x = subuh.split(':')
                            const y = terbit.split(':')
                            const xy = x[0] - y[0]
                            const yx = x[1] - y[1]
                            const perbandingan = `${xy < 0 ? Math.abs(xy) : xy} jam ${yx < 0 ? Math.abs(yx) : yx} menit`
                            const msg = `Jadwal sholat untuk ${q} dan sekitarnya ( *${tanggal}* )\n\nDzuhur: ${dzuhur}\nAshar: ${ashar}\nMaghrib: ${maghrib}\nIsya: ${isya}\nSubuh: ${subuh}\n\nDiperkirakan matahari akan terbit pada pukul ${terbit} dengan jeda dari subuh sekitar ${perbandingan}`
                            await akie.reply(from, msg, id)
                            console.log('Success sending jadwal sholat!')
                        })
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'gempa':

                await akie.reply(from, ind.wait(), id)
                misc.bmkg()
                    .then(async ({ kedalaman, koordinat, lokasi, magnitude, map, potensi, waktu }) => {
                        const teksInfo = `${lokasi}\n\nKoordinat: ${koordinat}\nKedalaman: ${kedalaman}\nMagnitudo: ${magnitude} SR\nPotensi: ${potensi}\n\n${waktu}`
                        await akie.sendFileFromUrl(from, map, 'gempa.jpg', teksInfo, id)
                            .then(() => console.log('Success sending info!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'igstalk':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                misc.igStalk(q)
                    .then(async ({ graphql }) => {
                        if (graphql === undefined) {
                            await akie.reply(from, 'Not found.', id)
                        } else {
                            const { biography, edge_followed_by, edge_follow, full_name, is_private, is_verified, profile_pic_url_hd, username, edge_owner_to_timeline_media } = graphql.user
                            const text = `*「 IG STALK 」*\n\n➸ *Username*: ${username}\n➸ *Bio*: ${biography}\n➸ *Full name*: ${full_name}\n➸ *Followers*: ${edge_followed_by.count}\n➸ *Followings*: ${edge_follow.count}\n➸ *Private*: ${is_private ? 'Yes' : 'No'}\n➸ *Verified*: ${is_verified ? 'Yes' : 'No'}\n➸ *Total posts*: ${edge_owner_to_timeline_media.count}`
                            await akie.sendFileFromUrl(from, profile_pic_url_hd, 'insta.jpg', text, id)
                            console.log('Success sending IG stalk!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'gsmarena':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                try {
                    misc.gsmarena(q)
                        .then(async ({ result }) => {
                            await akie.sendFileFromUrl(from, result.image, `${result.title}.jpg`, ind.gsm(result), id)
                                .then(() => console.log('Success sending phone info!'))
                        })
                } catch (err) {
                    console.error(err)
                    await akie.reply(from, 'Error!', id)
                }
                break
            case 'receipt':
            case 'resep':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                try {
                    misc.resep(q)
                        .then(async ({ result }) => {
                            await akie.sendFileFromUrl(from, result.image, `${result.title}.jpg`, ind.receipt(result), id)
                                .then(() => console.log('Success sending food receipt!'))
                        })
                } catch (err) {
                    console.error(err)
                    await akie.reply(from, 'Error!', id)
                }
                break
            case 'findsticker':
            case 'findstiker':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                try {
                    misc.sticker(q)
                        .then(async ({ result }) => {
                            if (result.response !== 200) return await akie.reply(from, 'Not found!', id)
                            for (let i = 0; i < result.data.length; i++) {
                                await akie.sendStickerfromUrl(from, result.data[i])
                            }
                            console.log('Success sending sticker!')
                        })
                } catch (err) {
                    console.error(err)
                    await akie.reply(from, `Error!\n\n${err}`, id)
                }
                break
            case 'movie':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                misc.movie(q)
                    .then(async ({ result }) => {
                        let movies = `Result for: *${result.judul}*`
                        for (let i = 0; i < result.data.length; i++) {
                            movies += `\n\n➸ *Quality:* : ${result.data[i].resolusi}\n➸ *URL*: ${result.data[i].urlDownload}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        movies += '\n\nBy: VideFrelan'
                        await akie.reply(from, movies, id)
                        console.log('Success sending movie result!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'cekongkir': // By: VideFrelan

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                const kurir = q.substring(0, q.indexOf('|') - 1)
                const askot = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const tukot = q.substring(q.lastIndexOf('|') + 2)
                misc.ongkir(kurir, askot, tukot)
                    .then(async ({ result }) => {
                        let onkir = `-----[ *${result.title}* ]-----`
                        for (let i = 0; i < result.data.length; i++) {
                            onkir += `\n\n➸ *Layanan*: ${result.data[i].layanan}\n➸ *Estimasi*: ${result.data[i].etd}\n➸ *Tarif*: ${result.data[i].tarif}\n➸ *Info*: ${result.informasi}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        onkir += '\n\nBy: VideFrelan'
                        await akie.reply(from, onkir, id)
                        console.log('Success sending ongkir info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'distance':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                const kotaAsal = q.substring(0, q.indexOf('|') - 1)
                const kotaTujuan = q.substring(q.lastIndexOf('|') + 2)
                misc.distance(kotaAsal, kotaTujuan)
                    .then(async ({ result }) => {
                        if (result.response !== 200) {
                            await akie.reply(from, 'Error!', id)
                        } else {
                            await akie.reply(from, result.data, id)
                            console.log('Success sending distance info!')
                        }
                    })
                break
            case 'ytsearch':
            case 'yts':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                try {
                    misc.ytSearch(q)
                        .then(async (results) => {
                            for (result of results.items) {
                                const { id, thumbnail, title, duration, views } = await result
                                await akie.sendFileFromUrl(from, thumbnail.url, `${title}.jpg`, ind.ytResult('https://youtube.com/watch?v=' + id, title, duration, views), id)
                                console.log('Success sending YouTube results!')
                            }
                        }).catch(async (err) => {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        })
                } catch (err) {
                    console.error(err)
                    await akie.reply(from, 'Error!', id)
                }
                break
            case 'tts':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                const speech = q.substring(q.indexOf('|') + 2)
                const ptt = tts(ar[0])
                try {
                    ptt.save(`${speech}.mp3`, speech, async () => {
                        await akie.sendPtt(from, `${speech}.mp3`, id)
                        fs.unlinkSync(`${speech}.mp3`)
                    })
                } catch (err) {
                    console.error(err)
                    await akie.reply(from, 'Error!', id)
                }
                break
            case 'playstore':
            case 'ps':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                try {
                    misc.playstore(q)
                        .then(async ({ result }) => {
                            for (let i = 0; i < 5; i++) {
                                const { app_id, icon, title, developer, description, price, free } = result[i]
                                await akie.sendFileFromUrl(from, icon, `${title}.jpg`, ind.playstore(app_id, title, developer, description, price, free))
                            }
                            console.log('Success sending PlayStore result!')
                        })
                } catch (err) {
                    console.error(err)
                    await akie.reply(from, `Error!\n\n${err}`, id)
                }
                break
            case 'math':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                if (typeof mathjs.evaluate(q) !== "number") {
                    await akie.reply(from, ind.notNum(q), id)
                } else {
                    await akie.reply(from, `*「 MATH 」*\n\n${q} = ${mathjs.evaluate(q)}`, id)
                }
                break
            case 'shopee':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                const namaBarang = q.substring(0, q.indexOf('|') - 1)
                const jumlahBarang = q.substring(q.lastIndexOf('|') + 2)
                await akie.reply(from, ind.wait(), id)
                try {
                    misc.shopee(namaBarang, jumlahBarang)
                        .then(async ({ result }) => {
                            for (let i = 0; i < result.items.length; i++) {
                                const { nama, harga, terjual, shop_location, description, link_product, image_cover } = result.items[i]
                                await akie.sendFileFromUrl(from, image_cover, `${nama}.jpg`, ind.shopee(nama, harga, terjual, shop_location, description, link_product))
                            }
                            console.log('Success sending Shopee data!')
                        })
                } catch (err) {
                    console.error(err)
                    await akie.reply(from, `Error!\n\n${err}`, id)
                }
                break
            case 'mutual':

                if (isGroupMsg) return await akie.reply(from, 'Command ini tidak bisa digunakan di dalam grup!', id)
                await akie.reply(from, 'Looking for a partner...', id)
                await akie.sendContact(from, register.getRegisteredRandomId(_registered))
                await akie.sendText(from, `Partner found: 🙉\n*${prefix}next* — find a new partner`)
                break
            case 'next':

                if (isGroupMsg) return await akie.reply(from, 'Command ini tidak bisa digunakan di dalam grup!', id)
                await akie.reply(from, 'Looking for a partner...', id)
                await akie.sendContact(from, register.getRegisteredRandomId(_registered))
                await akie.sendText(from, `Partner found: 🙉\n*${prefix}next* — find a new partner`)
                break
            case 'tafsir':

                if (args.length === 0) return akie.reply(from, `Untuk menampilkan ayat Al-Qur'an tertentu beserta tafsir dan terjemahannya\ngunakan ${prefix}tafsir surah ayat\n\nContoh: ${prefix}tafsir Al-Mulk 10`, id)
                await akie.reply(from, ind.wait(), id)
                const responSurah = await axios.get('https://raw.githubusercontent.com/VideFrelan/words/main/tafsir.txt')
                const { data } = responSurah.data
                const idx = data.findIndex((post) => {
                    if ((post.name.transliteration.id.toLowerCase() === args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() === args[0].toLowerCase())) return true
                })
                const nomerSurah = data[idx].number
                if (!isNaN(nomerSurah)) {
                    const responseh = await axios.get('https://api.quran.sutanlab.id/surah/' + nomerSurah + '/' + args[1])
                    const { data } = responseh.data
                    let pesan = ''
                    pesan += 'Tafsir Q.S. ' + data.surah.name.transliteration.id + ':' + args[1] + '\n\n'
                    pesan += data.text.arab + '\n\n'
                    pesan += '_' + data.translation.id + '_\n\n' + data.tafsir.id.long
                    await akie.reply(from, pesan, id)
                }
                break
            case 'listsurah':

                await akie.reply(from, ind.wait(), id)
                misc.listSurah()
                    .then(async ({ result }) => {
                        let list = '-----[ AL-QUR\'AN LIST ]-----\n\n'
                        for (let i = 0; i < result.list.length; i++) {
                            list += `${result.list[i]}\n\n`
                        }
                        await akie.reply(from, list, id)
                        console.log('Success sending Al-Qur\'an list!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'surah':

                if (args.length !== 1) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                misc.getSurah(args[0])
                    .then(async ({ result }) => {
                        await akie.reply(from, `${result.surah}\n\n${result.quran}`, id)
                        console.log('Success sending surah!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'motivasi':

                misc.motivasi()
                    .then(async (body) => {
                        const motivasiSplit = body.split('\n')
                        const randomMotivasi = motivasiSplit[Math.floor(Math.random() * motivasiSplit.length)]
                        await akie.sendText(from, randomMotivasi)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'play':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                misc.ytPlay(q)
                    .then(async (result) => {
                        remote(result.mp3, async (err, o) => {
                            if (Number(formatBytes(o).split(' MB')[0]) >= 10.00) {
                                return akie.sendFileFromUrl(from, result.thumb.url, `${result.title}.jpg`, `Judul: ${result.title}\nSize: *${formatBytes(o)}*\n\nGagal, Maksimal video size adalah *10MB*!`, id)
                            } else {
                                await akie.sendFileFromUrl(from, result.thumb.url, `${result.title}.jpg`, ind.ytPlay(result), id)
                                await akie.sendFileFromUrl(from, result.mp3, `${result.title}.mp3`, '', id, null, true, true)
                            }
                        })

                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'whois':

                if (args.length !== 1) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                misc.whois(args[0])
                    .then(async ({ result }) => {
                        await akie.reply(from, `*「 WHOIS 」*\n\n➸ *IP address*: ${result.ip_address}\n➸ *City*: ${result.city}\n➸ *Region*: ${result.region}\n➸ *Country*: ${result.country}\n➸ *ZIP code*: ${result.postal_code}\n➸ *Latitude and longitude*: ${result.latitude_longitude}\n➸ *Time zone*: ${result.time_zone}\n➸ *Call code*: ${result.calling_code}\n➸ *Currency*: ${result.currency}\n➸ *Language code*: ${result.languages}\n➸ *ASN*: ${result.asn}\n➸ *Organization*: ${result.org}`, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'sms':

                if (!q.includes('|')) return await akie.reply(from, ind.wrongFormat(), id)
                const pesanPengirim = q.substring(0, q.indexOf('|') - 1)
                const nomorPenerima = q.substring(q.lastIndexOf('|') + 2)
                await akie.reply(from, ind.wait(), id)
                misc.sms(nomorPenerima, pesanPengirim)
                    .then(async ({ status, pesan }) => {
                        if (status !== 'success') return await akie.reply(from, pesan, id)
                        await akie.reply(from, `Success sending SMS to: ${nomorPenerima}\nMessage: ${pesanPengirim}`, id)
                        console.log(`Success sending SMS to ${nomorPenerima}!`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'toxic':

                await akie.reply(from, toxic(), id)
                break
            case 'alkitab':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                misc.alkitab(q)
                    .then(async ({ result }) => {
                        let alkitab = `-----[ *AL-KITAB* ]-----`
                        for (let i = 0; i < result.length; i++) {
                            alkitab += `\n\n➸ *Ayat*: ${result[i].ayat}\n➸ *Isi*: ${result[i].isi}\n➸ *Link*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await akie.reply(from, alkitab, id)
                        console.log('Success sending Al-Kitab!')
                    })
                break
            case 'reminder':

                if (!q.includes('|')) return await akie.reply(from, ind.wrongFormat(), id)
                const timeRemind = q.substring(0, q.indexOf('|') - 1)
                const messRemind = q.substring(q.lastIndexOf('|') + 2)
                const parsedTime = ms(toMs(timeRemind))
                reminder.addReminder(sender.id, messRemind, timeRemind, _reminder)
                await akie.sendTextWithMentions(from, `*「 REMINDER 」*\n\nReminder diaktifkan! :3\n\n➸ *Pesan*: ${messRemind}\n➸ *Durasi*: ${parsedTime.hours} jam ${parsedTime.minutes} menit ${parsedTime.seconds} detik\n➸ *Untuk*: @${sender.id.replace('@c.us', '')}`, id)
                const intervRemind = setInterval(async () => {
                    if (Date.now() >= reminder.getReminderTime(sender.id, _reminder)) {
                        await akie.sendTextWithMentions(from, `⏰ *「 REMINDER 」* ⏰\n\nAkhirnya tepat waktu~ @${sender.id.replace('@c.us', '')}\n\n➸ *Pesan*: ${reminder.getReminderMsg(sender.id, _reminder)}`)
                        _reminder.splice(reminder.getReminderPosition(sender.id, _reminder), 1)
                        fs.writeFileSync('./database/user/reminder.json', JSON.stringify(_reminder))
                        clearInterval(intervRemind)
                    }
                }, 1000)
                break
            case 'imagetourl':
            case 'imgtourl':

                if (isMedia && isImage || isQuotedImage) {
                    await akie.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const linkImg = await uploadImages(mediaData, `${sender.id}_img`)
                    await akie.reply(from, linkImg, id)
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'infohoax':

                await akie.reply(from, ind.wait(), id)
                misc.infoHoax()
                    .then(async ({ result }) => {
                        let txt = '*「 HOAXES 」*'
                        for (let i = 0; i < result.length; i++) {
                            const { tag, title, link } = result[i]
                            txt += `\n\n➸ *Status*: ${tag}\n➸ *Deskripsi*: ${title}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await akie.sendFileFromUrl(from, result[0].image, 'hoax.jpg', txt, id)
                        console.log('Success sending info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'trending':

                await akie.reply(from, ind.wait(), id)
                misc.trendingTwt()
                    .then(async ({ result }) => {
                        let txt = '*「 TRENDING TWITTER 」*'
                        for (let i = 0; i < result.length; i++) {
                            const { hastag, rank, tweet, link } = result[i]
                            txt += `\n\n${rank}. *${hastag}*\n➸ *Tweets*: ${tweet}\n➸ *Link*: ${link}`
                        }
                        await akie.reply(from, txt, id)
                        console.log('Success sending trending!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'jobseek':

                await akie.reply(from, ind.wait(), id)
                misc.jobSeek()
                    .then(async ({ result }) => {
                        let txt = '*「 JOB SEEKER 」*'
                        for (let i = 0; i < result.length; i++) {
                            const { perusahaan, link, profesi, gaji, lokasi, pengalaman, edukasi, desc, syarat } = result[i]
                            txt += `\n\n➸ *Perusahaan*: ${perusahaan}\n➸ *Lokasi*: ${lokasi}\n➸ *Profesi*: ${profesi}\n➸ *Gaji*: ${gaji}\n➸ *Pengalaman*: ${pengalaman}\n➸ *Deskripsi*: ${desc}\n➸ *Syarat*: ${syarat}\n➸ *Edukasi*: ${edukasi}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await akie.reply(from, txt, id)
                        console.log('Success sending jobseek!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'spamcall':

                if (args.length !== 1) return await akie.reply(from, ind.wrongFormat(), id)
                if (isNaN(Number(args[0]))) return await akie.reply(from, ind.wrongFormat())
                await akie.reply(from, ind.wait(), id)
                misc.spamcall(args[0])
                    .then(async ({ status, logs, msg }) => {
                        if (status !== 200) {
                            await akie.reply(from, msg, id)
                        } else {
                            await akie.reply(from, logs, id)
                            console.log('Success sending spam!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'spamsms':

                if (args.length !== 2) return await akie.reply(from, ind.wrongFormat(), id)
                if (isNaN(Number(args[0])) && isNaN(Number(args[1]))) return await akie.reply(from, ind.wrongFormat(), id)
                if (Number(args[1]) > 10) return await akie.reply(from, 'Maximum 10 SMS.', id)
                await akie.reply(from, ind.wait(), id)
                misc.spamsms(args[0], args[1])
                    .then(async ({ status, logs, msg }) => {
                        if (status !== 200) {
                            await akie.reply(from, msg, id)
                        } else {
                            await akie.reply(from, logs, id)
                            console.log('Success sending spam!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break

            // Bot
            case 'menu':
            case 'help':
                const jumlahUser = _registered.length
                const levelMenu = level.getLevelingLevel(sender.id, _level)
                const xpMenu = level.getLevelingXp(sender.id, _level)
                const reqXpMenu = 200 * (Math.pow(2, levelMenu) - 1)

                if (args[0] === '1') {
                    await akie.sendText(from, ind.menuDownloader())
                } else if (args[0] === '2') {
                    await akie.sendText(from, ind.menuBot())
                } else if (args[0] === '3') {
                    await akie.sendText(from, ind.menuMisc())
                } else if (args[0] === '4') {
                    await akie.sendText(from, ind.menuSticker())
                } else if (args[0] === '5') {
                    await akie.sendText(from, ind.menuWeeaboo())
                } else if (args[0] === '6') {
                    await akie.sendText(from, ind.menuFun())
                } else if (args[0] === '7') {
                    await akie.sendText(from, ind.menuModeration())
                } else if (args[0] === '8') {
                    if (isGroupMsg && !isNsfw) return await akie.reply(from, ind.notNsfw(), id)
                    await akie.sendText(from, ind.menuNsfw())
                } else if (args[0] === '9') {
                    if (!isOwner) return await akie.reply(from, ind.ownerOnly())
                    await akie.sendText(from, ind.menuOwner())
                } else if (args[0] === '10') {
                    if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                    await akie.sendText(from, ind.menuLeveling())
                } else {
                    await akie.sendText(from, ind.menu(jumlahUser, levelMenu, xpMenu, role, pushname, reqXpMenu, isPremium ? 'YES' : 'NO'))
                }
                break
            case 'rules':
            case 'rule':

                await akie.sendText(from, ind.rules())
                break
            case 'nsfw':

                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await akie.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isNsfw) return await akie.reply(from, ind.nsfwAlready(), id)
                    _nsfw.push(groupId)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await akie.reply(from, ind.nsfwOn(), id)
                } else if (ar[0] === 'disable') {
                    _nsfw.splice(groupId, 1)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await akie.reply(from, ind.nsfwOff(), id)
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'status':

                await akie.sendText(from, `*RAM*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(os.totalmem / 1024 / 1024)} MB\n*CPU*: ${os.cpus()[0].model}`)
                break
            case 'listblock':

                let block = ind.listBlock(blockNumber)
                for (let i of blockNumber) {
                    block += `@${i.replace('@c.us', '')}\n`
                }
                await akie.sendTextWithMentions(from, block)
                break
            case 'ownerbot':

                await akie.sendContact(from, ownerNumber)
                break
            case 'ping':
            case 'p':

                await akie.sendText(from, `Pong!\nSpeed: ${processTime(t, moment())} secs`)
                break
            case 'delete':
            case 'del':

                if (!quotedMsg) return await akie.reply(from, ind.wrongFormat(), id)
                if (!quotedMsgObj.fromMe) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                break
            case 'report':

                if (!q) return await akie.reply(from, ind.emptyMess(), id)
                const lastReport = limit.getLimit(sender.id, _limit)
                if (lastReport !== undefined && cd - (Date.now() - lastReport) > 0) {
                    const time = ms(cd - (Date.now() - lastReport))
                    await akie.reply(from, ind.limit(time), id)
                } else {
                    if (isGroupMsg) {
                        await akie.sendText(ownerNumber, `-----[ REPORT ]-----\n\n*From*: ${pushname}\n*ID*: ${sender.id}\n*Group*: ${(name || formattedTitle)}\n*Message*: ${q}`)
                        await akie.reply(from, ind.received(pushname), id)
                    } else {
                        await akie.sendText(ownerNumber, `-----[ REPORT ]-----\n\n*From*: ${pushname}\n*ID*: ${sender.id}\n*Message*: ${q}`)
                        await akie.reply(from, ind.received(pushname), id)
                    }
                    limit.addLimit(sender.id, _limit)
                }
                break
            case 'tos':

                break
            case 'join':

                if (!isUrl(url) && !url.includes('chat.whatsapp.com')) return await akie.reply(from, ind.wrongFormat(), id)
                const checkInvite = await akie.inviteInfo(url)
                if (isOwner) {
                    await akie.joinGroupViaLink(url)
                    await akie.reply(from, ind.ok(), id)
                    await akie.sendText(checkInvite.id, `Hello!! I was invited by ${pushname}`)
                } else {
                    const getGroupData = await akie.getAllGroups()
                    if (getGroupData.length >= groupLimit) {
                        await akie.reply(from, `Invite refused. Max group is: ${groupLimit}`, id)
                    } else if (getGroupData.size <= memberLimit) {
                        await akie.reply(from, `Invite refused. Minimum member is: ${memberLimit}`, id)
                    } else {
                        await akie.joinGroupViaLink(url)
                        await akie.reply(from, ind.ok(), id)
                        await akie.sendText(checkInvite.id, `Hello!! I was invited by ${pushname}`)
                    }
                }
                break
            case 'premiumcheck':
            case 'cekpremium':

                if (!isPremium) return await akie.reply(from, ind.notPremium(), id)
                const cekExp = ms(premium.getPremiumExpired(sender.id, _premium) - Date.now())
                await akie.reply(from, `*「 PREMIUM EXPIRE 」*\n\n➸ *ID*: ${sender.id}\n➸ *Premium left*: ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)`, id)
                break
            case 'premiumlist':
            case 'listpremium':

                let listPremi = '「 *PREMIUM USER LIST* 」\n\n'
                let nomorList = 0
                const arrayPremi = []
                for (let i = 0; i < premium.getAllPremiumUser(_premium).length; i++) {
                    arrayPremi.push(await akie.getContact(premium.getAllPremiumUser(_premium)[i]))
                    nomorList++
                    listPremi += `${nomorList}. ${premium.getAllPremiumUser(_premium)[i]}\n➸ *Name*: ${arrayPremi[i].pushname}\n\n`
                }
                await akie.reply(from, listPremi, id)
                break
            case 'getpic':

                if (mentionedJidList.length !== 0) {
                    const userPic = await akie.getProfilePicFromServer(mentionedJidList[0])
                    if (userPic === undefined) {
                        pek = errorImg
                    } else {
                        pek = userPic
                    }
                    await akie.sendFileFromUrl(from, pek, 'pic.jpg', '', id)
                } else if (args.length !== 0) {
                    const userPic = await akie.getProfilePicFromServer(args[0] + '@c.us')
                    if (userPic === undefined) {
                        peks = errorImg
                    } else {
                        peks = userPic
                    }
                    await akie.sendFileFromUrl(from, peks, 'pic.jpg', '', id)
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'serial':

                if (isGroupMsg) return await akie.reply(from, ind.pcOnly(), id)
                if (args.length !== 1) return await akie.reply(from, ind.wrongFormat(), id)
                const serials = args[0]
                if (register.checkRegisteredUserFromSerial(serials, _registered)) {
                    const name = register.getRegisteredNameFromSerial(serials, _registered)
                    const age = register.getRegisteredAgeFromSerial(serials, _registered)
                    const time = register.getRegisteredTimeFromSerial(serials, _registered)
                    const id = register.getRegisteredIdFromSerial(serials, _registered)
                    await akie.sendText(from, ind.registeredFound(name, age, time, serials, id))
                } else {
                    await akie.sendText(from, ind.registeredNotFound(serials))
                }
                break

            // Weeb zone
            case 'neko':

                await akie.reply(from, ind.wait(), id)
                console.log('Getting neko image...')
                await akie.sendFileFromUrl(from, (await neko.sfw.neko()).url, 'neko.jpg', '', null, null, true)
                    .then(() => console.log('Success sending neko image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'wallpaper':
            case 'wp':

                await akie.reply(from, ind.wait(), id)
                console.log('Getting wallpaper image...')
                await akie.sendFileFromUrl(from, (await neko.sfw.wallpaper()).url, 'wallpaper.jpg', '', null, null, true)
                    .then(() => console.log('Success sending wallpaper image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'kemono':

                await akie.reply(from, ind.wait(), id)
                console.log('Getting kemonomimi image...')
                await akie.sendFileFromUrl(from, (await neko.sfw.kemonomimi()).url, 'kemono.jpg', '', null, null, true)
                    .then(() => console.log('Success sending kemonomimi image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'kusonime':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                weeaboo.anime(q)
                    .then(async ({ info, link_dl, sinopsis, thumb, title, error, status }) => {
                        if (status === false) {
                            return await akie.reply(from, error, id)
                        } else {
                            let animek = `${title}\n\n${info}\n\nSinopsis: ${sinopsis}\n\nLink download:\n${link_dl}`
                            await akie.sendFileFromUrl(from, thumb, 'animek.jpg', animek, null, null, true)
                                .then(() => console.log('Success sending anime info!'))
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'komiku':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                weeaboo.manga(q)
                    .then(async ({ genre, info, link_dl, sinopsis, thumb }) => {
                        let mangak = `${info}${genre}\nSinopsis: ${sinopsis}\nLink download:\n${link_dl}`
                        await akie.sendFileFromUrl(from, thumb, 'mangak.jpg', mangak, null, null, true)
                            .then(() => console.log('Success sending manga info!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'wait':

                if (isMedia && isImage || isQuotedImage) {
                    await akie.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    weeaboo.wait(imageBase64)
                        .then(async (result) => {
                            if (result.docs && result.docs.length <= 0) {
                                return await akie.reply(from, 'Anime not found! :(', id)
                            } else {
                                const { title, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = result.docs[0]
                                let teks = ''
                                if (similarity < 0.92) {
                                    teks = 'Low similarity. 🤔\n\n'
                                } else {
                                    teks += `*Title*: ${title}\n*Romaji*: ${title_romaji}\n*English*: ${title_english}\n*Episode*: ${episode}\n*Similarity*: ${(similarity * 100).toFixed(1)}%`
                                    const video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`
                                    await akie.sendFileFromUrl(from, video, `${title_romaji}.mp4`, teks, id)
                                        .then(() => console.log('Success sending anime source!'))
                                }
                            }
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        })
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'source':
            case 'sauce':

                if (isMedia && isImage || isQuotedImage) {
                    await akie.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    try {
                        const imageLink = await uploadImages(mediaData, `sauce.${sender.id}`)
                        console.log('Searching for source...')
                        const results = await saus(imageLink)
                        for (let i = 0; i < results.length; i++) {
                            let teks = ''
                            if (results[i].similarity < 80.00) {
                                teks = 'Low similarity. 🤔\n\n'
                            } else {
                                teks += `*Link*: ${results[i].url}\n*Site*: ${results[i].site}\n*Author name*: ${results[i].authorName}\n*Author link*: ${results[i].authorUrl}\n*Similarity*: ${results[i].similarity}%`
                                await akie.sendLinkWithAutoPreview(from, results[i].url, teks)
                                    .then(() => console.log('Source found!'))
                            }
                        }
                    } catch (err) {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    }
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'waifu':

                await akie.reply(from, ind.wait(), id)
                weeaboo.waifu(false)
                    .then(async ({ url }) => {
                        await akie.sendFileFromUrl(from, url, 'waifu.png', '', id)
                            .then(() => console.log('Success sending waifu!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'anitoki':

                await akie.reply(from, ind.wait(), id)
                weeaboo.anitoki()
                    .then(async ({ result }) => {
                        let anitoki = `-----[ *ANITOKI LATEST* ]-----`
                        for (let i = 0; i < result.length; i++) {
                            anitoki += `\n\n➸ *Title*: ${result[i].title}\n➸ *URL*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await akie.reply(from, anitoki, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'neonime':

                await akie.reply(from, ind.wait(), id)
                weeaboo.neonime()
                    .then(async ({ status, result }) => {
                        if (status !== 200) return await akie.reply(from, `Not found.`, id)
                        let neoInfo = '-----[ *NEONIME LATEST* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            const { date, title, link, desc } = result[i]
                            neoInfo += `\n\n➸ *Title*: ${title}\n➸ *Date*: ${date}\n➸ *Synopsis*: ${desc}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await akie.reply(from, neoInfo, id)
                        console.log('Success sending Neonime latest update!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'anoboy':

                await akie.reply(from, ind.wait(), id)
                weeaboo.anoboy()
                    .then(async ({ result }) => {
                        let anoboyInfo = '-----[ *ANOBOY ON-GOING* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            anoboyInfo += `\n\n➸ *Title*: ${result[i].title}\n➸ *URL*: ${result[i].url}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await akie.reply(from, anoboyInfo, id)
                        console.log('Success sending on-going anime!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break

            // Fun
            case 'asupan':

                await akie.reply(from, ind.wait(), id)
                fun.asupan()
                    .then(async (body) => {
                        const asupan = body.split('\n')
                        const asupanx = asupan[Math.floor(Math.random() * asupan.length)]
                        await akie.sendFileFromUrl(from, `http://sansekai.my.id/ptl_repost/${asupanx}`, 'asupan.mp4', 'Follow IG: https://www.instagram.com/ptl_repost untuk mendapatkan asupan lebih banyak.', id)
                        console.log('Success sending video!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'chika'://Piyobot

                await akie.reply(from, ind.wait(), id)
                fun.chika()
                    .then(async (body) => {
                        const chika = body.split('\n')
                        const chikax = chika[Math.floor(Math.random() * chika.length)]
                        await akie.sendFileFromUrl(from, `https://piyobot.000webhostapp.com//${chikax}.mp4`, 'asupan.mp4', 'Follow IG: https://www.instagram.com/alvio151 untuk mendapatkan asupan lebih banyak.', id)
                        console.log('Success sending video!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'citacita': // Piyobot

                fun.cita()
                    .then(async (body) => {
                        const cita = body.split('\n')
                        const randomCita = cita[Math.floor(Math.random() * cita.length)]
                        await akie.sendFileFromUrl(from, randomCita, 'cita.mp3', '', id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'profile':
            case 'me':

                if (quotedMsg) {
                    const getQuoted = quotedMsgObj.sender.id
                    const profilePic = await akie.getProfilePicFromServer(getQuoted)
                    const username = quotedMsgObj.sender.name
                    const statuses = await akie.getStatus(getQuoted)
                    const benet = _ban.includes(getQuoted) ? 'Yes' : 'No'
                    const adm = groupAdmins.includes(getQuoted) ? 'Yes' : 'No'
                    const premi = premium.checkPremiumUser(getQuoted, _premium) ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(getQuoted, _level)
                    const xpMe = level.getLevelingXp(getQuoted, _level)
                    const req = 200 * (Math.pow(2, levelMe) - 1)
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfp = errorImg
                    } else {
                        var pfp = profilePic
                    }
                    await akie.sendFileFromUrl(from, pfp, `${username}.jpg`, ind.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                } else {
                    const profilePic = await akie.getProfilePicFromServer(sender.id)
                    const username = pushname
                    const statuses = await akie.getStatus(sender.id)
                    const benet = isBanned ? 'Yes' : 'No'
                    const adm = isGroupAdmins ? 'Yes' : 'No'
                    const premi = isPremium ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(sender.id, _level)
                    const xpMe = level.getLevelingXp(sender.id, _level)
                    const req = 200 * (Math.pow(2, levelMe) - 1)
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfp = errorImg
                    } else {
                        var pfp = profilePic
                    }
                    await akie.sendFileFromUrl(from, pfp, `${username}.jpg`, ind.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                }
                break
            case 'hartatahta':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                console.log('Creating harta tahta text...')
                await akie.sendFileFromUrl(from, `https://api.vhtear.com/hartatahta?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'calendar':

                if (isMedia && isImage || isQuotedImage) {
                    await akie.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageLink = await uploadImages(mediaData, `calendar.${sender.id}`)
                    fun.calendar(imageLink)
                        .then(async ({ result }) => {
                            await akie.sendFileFromUrl(from, result.imgUrl, 'calendar.jpg', '', id)
                                .then(() => console.log('Success creating image!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        })
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'partner':
            case 'pasangan':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                const nama = q.substring(0, q.indexOf('|') - 1)
                const pasangan = q.substring(q.lastIndexOf('|') + 2)
                await akie.reply(from, ind.wait(), id)
                fun.pasangan(nama, pasangan)
                    .then(async ({ result }) => {
                        await akie.reply(from, result.hasil, id)
                            .then(() => console.log('Success sending fortune!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'zodiac':
            case 'zodiak':

                if (args.length !== 1) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                fun.zodiak(args[0])
                    .then(async ({ result }) => {
                        if (result.status === 204) {
                            return await akie.reply(from, result.ramalan, id)
                        } else {
                            let ramalan = `Zodiak: ${result.zodiak}\n\nRamalan: ${result.ramalan}\n\nAngka laksek: ${result.nomorKeberuntungan}\n\n${result.motivasi}\n\n${result.inspirasi}`
                            await akie.reply(from, ramalan, id)
                                .then(() => console.log('Success sending zodiac fortune!'))
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'write':
            case 'nulis':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                console.log('Creating writing...')
                await akie.sendFileFromUrl(from, `https://api.vhtear.com/write?text=${q}&apikey=${config.vhtear}`, 'nulis.jpg', '', id)
                    .then(() => console.log('Success sending write image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'missing':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                const atas = q.substring(0, q.indexOf('|') - 1)
                const tengah = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const bawah = q.substring(q.lastIndexOf('|') + 2)
                if (isMedia && isImage || isQuotedImage) {
                    await akie.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageLink = await uploadImages(mediaData, `missing.${sender.id}`)
                    fun.missing(atas, tengah, bawah, imageLink)
                        .then(async ({ result }) => {
                            await akie.sendFileFromUrl(from, result.imgUrl, 'missing.jpg', '', id)
                            console.log('Success sending image!')
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        })
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'ffbanner': // By: VideFrelan

                if (!q.includes('|')) return akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                console.log('Creating FF banner...')
                const teks1ffanjg = q.substring(0, q.indexOf('|') - 1)
                const teks2ffanjg = q.substring(q.lastIndexOf('|') + 2)
                await akie.sendFileFromUrl(from, `https://api.vhtear.com/bannerff?title=${teks1ffanjg}&text=${teks2ffanjg}&apikey=${config.vhtear}`, id)
                console.log('Success!')
                break
            case 'fflogo': // By: VideFrelan

                if (!q.includes('|')) return akie.reply(from, `Untuk membuat Logo Karakter Freefire\ngunakan ${prefix}fflogo karakter | teks\n\nContoh: ${prefix}fflogo alok | Fikri gans`, id)
                await akie.reply(from, ind.wait(), id)
                console.log('Creating FF logo...')
                const karakter = q.substring(0, q.indexOf('|') - 1)
                const teksff = q.substring(q.lastIndexOf('|') + 2)
                await akie.sendFileFromUrl(from, `https://api.vhtear.com/logoff?hero=${karakter}&text=${teksff}&apikey=${config.vhtear}`, id)
                console.log('Success!')
                break
            case 'text3d':
            case '3dtext':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                console.log('Creating 3D text...')
                await akie.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/text3d?text=${q}`, `${q}.jpg`, '', id)
                console.log('Success creating 3D text!')
                break
            case 'valentine':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await akie.reply(from, ind.wait(), id)
                    const nama = q.substring(0, q.indexOf('|') - 1)
                    const pasangan = q.substring(q.lastIndexOf('|') + 2)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const dataPasangan = await decryptMedia(encryptMedia, uaOverride)
                    const foto = await akie.getProfilePicFromServer(sender.id)
                    const dataMu = await bent('buffer')(foto)
                    const fotoMu = await uploadImages(dataMu, `fotoMu.${sender.id}`)
                    const fotoPasangan = await uploadImages(dataPasangan, `fotoPasangan.${sender.id}`)
                    fun.valentine(nama, pasangan, fotoMu, fotoPasangan)
                        .then(async ({ result }) => {
                            await akie.sendFileFromUrl(from, result.imgUrl, `${nama}_${pasangan}.jpg`, '', id)
                                .then(() => console.log('Success creating image!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        })
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'simi'://By: VideFrelan

                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                fun.simi(q)
                    .then(async ({ jawaban }) => {
                        await akie.reply(from, jawaban, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, `Error!\n\n${err}`, id)
                    })
                break
            case 'glitchtext':
            case 'glitext':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                const teks1 = q.substring(0, q.indexOf('|') - 1)
                const teks2 = q.substring(q.lastIndexOf('|') + 2)
                await akie.reply(from, ind.wait(), id)
                console.log('Creating glitch text...')
                await akie.sendFileFromUrl(from, `https://api.vhtear.com/glitchtext?text1=${teks1}&text2=${teks2}&apikey=${config.vhtear}`, 'glitch.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'phmaker':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                const kiri = q.substring(0, q.indexOf('|') - 1)
                const kanan = q.substring(q.lastIndexOf('|') + 2)
                await akie.reply(from, ind.wait(), id)
                console.log('Creating Pornhub text...')
                await akie.sendFileFromUrl(from, `https://api.vhtear.com/pornlogo?text1=${kiri}&text2=${kanan}&apikey=${config.vhtear}`, 'ph.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'blackpink':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                console.log('Creating Blackpink text...')
                await akie.sendFileFromUrl(from, `https://api.vhtear.com/blackpinkicon?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'galaxy':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                console.log('Creating galaxy text...')
                await akie.sendFileFromUrl(from, `https://api.vhtear.com/galaxytext?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'tod':

                await akie.reply(from, 'Sebelum bermain berjanjilah akan melaksanakan apapun perintah yang diberikan.', id)
                await akie.sendText(from, `Silakan ketik *${prefix}truth* atau *${prefix}dare*`)
                break
            case 'weton':

                if (!q.includes('|')) return await akie.reply(from, ind.wrongFormat(), id)
                const tgl = q.substring(0, q.indexOf('|') - 1)
                const bln = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const thn = q.substring(q.lastIndexOf('|') + 2)
                await akie.reply(from, ind.wait(), id)
                fun.weton(tgl, bln, thn)
                    .then(async ({ result }) => {
                        if (result.response !== 200) return await akie.reply(from, 'Invalid!', id)
                        await akie.reply(from, result.hasil, id)
                        console.log('Success sending weton info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'truth':

                fun.truth()
                    .then(async (body) => {
                        const tod = body.split('\n')
                        const randomTod = tod[Math.floor(Math.random() * tod.length)]
                        await akie.reply(from, randomTod, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'dare':

                fun.dare()
                    .then(async (body) => {
                        const dare = body.split('\n')
                        const randomDare = dare[Math.floor(Math.random() * dare.length)]
                        await akie.reply(from, randomDare, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'triggered':

                try {
                    if (isMedia && isImage) {
                        const ppRaw = await decryptMedia(message, uaOverride)
                        canvas.Canvas.trigger(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await akie.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else if (quotedMsg) {
                        const ppRaw = await akie.getProfilePicFromServer(quotedMsgObj.sender.id)
                        canvas.Canvas.trigger(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await akie.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else {
                        const ppRaw = await akie.getProfilePicFromServer(sender.id)
                        canvas.Canvas.trigger(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await akie.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await akie.reply(from, 'Error!', id)
                }
                break
            case 'kiss':

                try {
                    if (isMedia && isImage) {
                        const ppRaw = await akie.getProfilePicFromServer(sender.id)
                        const ppSecond = await decryptMedia(message, uaOverride)
                        if (ppRaw === undefined) {
                            var ppFirst = errorImg
                        } else {
                            var ppFirst = ppRaw
                        }
                        canvas.Canvas.kiss(ppFirst, ppSecond)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_kiss.png`)
                                await akie.sendFile(from, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else if (quotedMsg) {
                        const ppRaw = await akie.getProfilePicFromServer(sender.id)
                        const ppSecond = await akie.getProfilePicFromServer(quotedMsgObj.sender.id)
                        if (ppRaw === undefined) {
                            var ppFirst = errorImg
                        } else {
                            var ppFirst = ppRaw
                        }
                        canvas.Canvas.kiss(ppFirst, ppSecond)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_kiss.png`)
                                await akie.sendFile(from, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else {
                        await akie.reply(from, ind.wrongFormat(), id)
                    }
                } catch (err) {
                    console.error(err)
                    await akie.reply(from, 'Error!', id)
                }
                break
            case 'phcomment':

                if (!q.includes('|')) return await akie.reply(from, ind.wrongFormat(), id)
                const usernamePh = q.substring(0, q.indexOf('|') - 1)
                const commentPh = q.substring(q.lastIndexOf('|') + 2)
                const ppPhRaw = await akie.getProfilePicFromServer(sender.id)
                if (ppPhRaw === undefined) {
                    var ppPh = errorImg
                } else {
                    var ppPh = ppPhRaw
                }
                const dataPpPh = await bent('buffer')(ppPh)
                const linkPpPh = await uploadImages(dataPpPh, `${sender.id}_ph`)
                await akie.reply(from, ind.wait(), id)
                const preproccessPh = await axios.get(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${linkPpPh}&text=${commentPh}&username=${usernamePh}`)
                await akie.sendFileFromUrl(from, preproccessPh.data.message, 'ph.jpg', '', id)
                console.log('Success creating image!')
                break
            case 'readmore':

                if (!q.includes('|')) return await akie.reply(from, ind.wrongFormat(), id)
                const rawReadMore = `a


​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​b`
                const pertama = q.substring(0, q.indexOf('|') - 1)
                const kedua = q.substring(q.lastIndexOf('|') + 2)
                const formatted1 = rawReadMore.replace('a', pertama)
                const formatted2 = formatted1.replace('b', kedua)
                await akie.sendText(from, formatted2)
                break
            case 'neontext':
            case 'neon':

                if (!q.includes('|')) return await akie.reply(from, ind.wrongFormat(), id)
                const atasnya = q.substring(0, q.indexOf('|') - 1)
                const tengahnya = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const bawahnya = q.substring(q.lastIndexOf('|') + 2)
                await akie.reply(from, ind.wait(), id)
                await akie.sendFileFromUrl(from, `http://docs-jojo.herokuapp.com/api/neon?text1=${atasnya}&text2=${tengahnya}&text3=${bawahnya}`, 'neon.jpg', '', id)
                console.log('Success creating image!')
                break

            // Sticker
            case 'stickerwm': // By Slavyan
            case 'stcwm':

                if (!isOwner) return await akie.reply(from, ind.ownerOnly(), id)
                if (!q.includes('|')) return await akie.reply(from, ind.wrongFormat(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await akie.reply(from, ind.wait(), id)
                    const packname = q.substring(0, q.indexOf('|') - 1)
                    const author = q.substring(q.lastIndexOf('|') + 2)
                    exif.create(packname, author)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: true })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await akie.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        })
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'stickermeme':
            case 'stcmeme':

                if (!q.includes('|')) return await akie.reply(from, ind.wrongFormat(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await akie.reply(from, ind.wait(), id)
                    const top = q.substring(0, q.indexOf('|') - 1)
                    const bottom = q.substring(q.lastIndexOf('|') + 2)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const getUrl = await uploadImages(mediaData, `meme.${sender.id}`)
                    const create = `https://api.memegen.link/images/custom/${top}/${bottom}.png?background=${getUrl}`
                    const meme = await bent('buffer')(create)
                    webp.buffer2webpbuffer(meme, 'png', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: true })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await akie.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'sticker':
            case 'stiker':

                if (isMedia && isImage || isQuotedImage) {
                    await akie.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    // await akie.sendImageAsSticker(from, base64);
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: true })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await akie.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'stickergif':
            case 'stikergif':

                if (isMedia && type === 'video' || mimetype === 'image/gif') {
                    await akie.reply(from, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(message, uaOverride)
                        const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await akie.sendMp4AsSticker(from, videoBase64, { fps: 24, startTime: `00:00:00.0`, endTime: `00:00:05.0`, loop: 0 })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                await akie.sendText(from, ind.ok())
                            })
                    } catch (err) {
                        console.error(err)
                        await akie.reply(from, ind.videoLimit(), id)
                    }
                } else if (isQuotedGif || isQuotedVideo) {
                    await akie.reply(from, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await akie.sendMp4AsSticker(from, videoBase64, { fps: 30, startTime: `00:00:00.0`, endTime: `00:00:03.0`, loop: 0 })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                await akie.sendText(from, ind.ok())
                            })
                    } catch (err) {
                        console.error(err)
                        await akie.reply(from, ind.videoLimit(), id)
                    }
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'stickerlightning':
            case 'slightning':

                if (isMedia && isImage || isQuotedImage) {
                    await akie.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageLink = await uploadImages(mediaData, `lightning.${sender.id}`)
                    sticker.stickerLight(imageLink)
                        .then(async ({ result }) => {
                            await akie.sendStickerfromUrl(from, result.imgUrl)
                                .then(async () => {
                                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                    await akie.sendText(from, ind.ok())
                                })
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        })
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'stickerfire':
            case 'sfire':

                if (isMedia && isImage || isQuotedImage) {
                    await akie.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageLink = await uploadImages(mediaData, `fire.${sender.id}`)
                    sticker.stickerFire(imageLink)
                        .then(async ({ result }) => {
                            if (result.error) return await akie.reply(from, 'Error... :(', id)
                            await akie.sendStickerfromUrl(from, result.imgUrl)
                                .then(async () => {
                                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                    await akie.sendText(from, ind.ok())
                                })
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        })
                } else {
                    await akie.reply(from, ind.wrongFormat(), err)
                }
                break
            case 'ttg':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.reply(from, ind.wait(), id)
                await akie.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${q}&apikey=${config.vhtear}`)
                    .then(() => console.log('Success creating GIF!'))
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    })
                break
            case 'stickertoimg':
            case 'stikertoimg':
            case 'toimg':

                if (isQuotedSticker) {
                    await akie.reply(from, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await akie.sendFile(from, imageBase64, 'sticker.jpg', '', id)
                    } catch (err) {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    }
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'emojisticker':
            case 'emojistiker':

                if (args.length !== 1) return akie.reply(from, ind.wrongFormat(), id)
                const emoji = emojiUnicode(args[0])
                await akie.reply(from, ind.wait(), id)
                console.log('Creating emoji code for =>', emoji)
                await akie.sendStickerfromUrl(from, `https://api.vhtear.com/emojitopng?code=${emoji}&apikey=${config.vhtear}`)
                    .then(async () => {
                        await akie.reply(from, ind.ok(), id)
                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await akie.reply(from, 'Emoji not supported!', id)
                    })
                break

            // NSFW
            case 'multilewds':
            case 'multilewd':
            case 'mlewds':
            case 'mlewd':
                // Premium feature, contact the owner.

                if (isGroupMsg) {
                    if (!isNsfw) return await akie.reply(from, ind.notNsfw(), id)
                    if (!isPremium) return await akie.reply(from, ind.notPremium(), id)
                    await akie.reply(from, ind.botNotPremium(), id)
                } else {
                    if (!isPremium) return await akie.reply(from, ind.notPremium(), id)
                    await akie.reply(from, ind.botNotPremium(), id)
                }
                break
            case 'multifetish':
            case 'mfetish':
                // Premium feature, contact the owner.

                if (isGroupMsg) {
                    if (!isNsfw) return await akie.reply(from, ind.notNsfw(), id)
                    if (!isPremium) return await akie.reply(from, ind.notPremium(), id)
                    await akie.reply(from, ind.botNotPremium(), id)
                } else {
                    if (!isPremium) return await akie.reply(from, ind.notPremium(), id)
                    await akie.reply(from, ind.botNotPremium(), id)
                }
                break
            case 'lewds':
            case 'lewd':

                if (isGroupMsg) {
                    if (!isNsfw) return await akie.reply(from, ind.notNsfw(), id)
                    await akie.reply(from, ind.wait(), id)
                    nsfw.randomLewd()
                        .then(async ({ url }) => {
                            await akie.sendFileFromUrl(from, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Success sending lewd!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        })
                } else {
                    await akie.reply(from, ind.wait(), id)
                    nsfw.randomLewd()
                        .then(async ({ url }) => {
                            await akie.sendFileFromUrl(from, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Success sending lewd!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        })
                }
                break
            case 'fetish':

                if (ar.length !== 1) return await akie.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await akie.reply(from, ind.notNsfw(), id)
                    await akie.reply(from, ind.wait(), id)
                    try {
                        if (ar[0] === 'armpits') {
                            nsfw.armpits()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'armpits.jpg', '', id)
                                        .then(() => console.log('Success sending armpits pic!'))
                                })
                        } else if (ar[0] === 'feets') {
                            nsfw.feets()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'feets.jpg', '', id)
                                        .then(() => console.log('Success sending feets pic!'))
                                })
                        } else if (ar[0] === 'thighs') {
                            nsfw.thighs()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'thighs.jpg', '', id)
                                        .then(() => console.log('Success sending thighs pic!'))
                                })
                        } else if (ar[0] === 'ass') {
                            nsfw.ass()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'ass.jpg', '', id)
                                        .then(() => console.log('Success sending ass pic!'))
                                })
                        } else if (ar[0] === 'boobs') {
                            nsfw.boobs()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'boobs.jpg', '', id)
                                        .then(() => console.log('Success sending boobs pic!'))
                                })
                        } else if (ar[0] === 'belly') {
                            nsfw.belly()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'belly.jpg', '', id)
                                        .then(() => console.log('Success sending belly pic!'))
                                })
                        } else if (ar[0] === 'sideboobs') {
                            nsfw.sideboobs()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'sideboobs.jpg', '', id)
                                        .then(() => console.log('Success sending sideboobs pic!'))
                                })
                        } else if (ar[0] === 'ahegao') {
                            nsfw.ahegao()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'ahegao.jpg', '', id)
                                        .then(() => console.log('Success sending ahegao pic!'))
                                })
                        } else {
                            await akie.reply(from, 'Tag not found.', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await akie.reply(from, err, id)
                    }
                } else {
                    await akie.reply(from, ind.wait(), id)
                    try {
                        if (ar[0] === 'armpits') {
                            nsfw.armpits()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'armpits.jpg', '', id)
                                        .then(() => console.log('Success sending armpits pic!'))
                                })
                        } else if (ar[0] === 'feets') {
                            nsfw.feets()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'feets.jpg', '', id)
                                        .then(() => console.log('Success sending feets pic!'))
                                })
                        } else if (ar[0] === 'thighs') {
                            nsfw.thighs()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'thighs.jpg', '', id)
                                        .then(() => console.log('Success sending thighs pic!'))
                                })
                        } else if (ar[0] === 'ass') {
                            nsfw.ass()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'ass.jpg', '', id)
                                        .then(() => console.log('Success sending ass pic!'))
                                })
                        } else if (ar[0] === 'boobs') {
                            nsfw.boobs()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'boobs.jpg', '', id)
                                        .then(() => console.log('Success sending boobs pic!'))
                                })
                        } else if (ar[0] === 'belly') {
                            nsfw.belly()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'belly.jpg', '', id)
                                        .then(() => console.log('Success sending belly pic!'))
                                })
                        } else if (ar[0] === 'sideboobs') {
                            nsfw.sideboobs()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'sideboobs.jpg', '', id)
                                        .then(() => console.log('Success sending sideboobs pic!'))
                                })
                        } else if (ar[0] === 'ahegao') {
                            nsfw.ahegao()
                                .then(async ({ url }) => {
                                    await akie.sendFileFromUrl(from, url, 'ahegao.jpg', '', id)
                                        .then(() => console.log('Success sending ahegao pic!'))
                                })
                        } else {
                            await akie.reply(from, 'Tag not found.', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    }
                }
                break
            case 'nhentai':
            case 'nh':

                if (args.length !== 1) return await akie.reply(from, ind.wrongFormat(), id)
                if (isNaN(Number(args[0]))) return await akie.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await akie.reply(from, ind.notNsfw(), id)
                    await akie.reply(from, ind.wait(), id);
                    console.log(`Searching nHentai for ${args[0]}...`);
                    const validate = await nhtai.exists(args[0])
                    if (validate === true) {
                        try {
                            const pic = await nhtai.getDoujin(args[0])
                                .then((book) => {
                                    let type = book.data.images.cover.t
                                    let ext = { "j": "jpg", "p": "png", "g": "gif" }
                                    const coverImg = ext[type];
                                    return nhtai.getImageURL(book.data.media_id, coverImg)
                                })
                            const dojin = await nhtai.getDoujin(args[0])
                            const { title, tags } = dojin.data
                            var tag = [];
                            var artist = [];
                            var category = [];
                            var language = [];
                            tags.forEach(el => {
                                if (el.type === 'tag') tag.push(`${el.name}`)
                                if (el.type === 'artist') artist.push(`${el.name}`)
                                if (el.type === 'category') category.push(`${el.name}`)
                                if (el.type === 'language') language.push(`${el.name}`)
                            });

                            let teks = `*Title*: ${title.english}\n\n*Genre*: ${tag.join(', ')}\n\n*Artists*: ${artist}\n\n*Languages*: ${language.join(', ')}\n\n*Categories*: ${category}\n`
                            await akie.sendFileFromUrl(from, pic, 'nhentai.jpg', teks, id)
                                .then(() => console.log('Success sending nHentai info!'))
                        } catch (err) {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        }
                    } else {
                        await akie.reply(from, ind.nhFalse(), id)
                    }
                } else {
                    await akie.reply(from, ind.wait(), id)
                    console.log(`Searching nHentai for ${args[0]}...`)
                    const validate = await nhentai.exists(args[0])
                    if (validate === true) {
                        try {
                            const pic = await api.getBook(args[0])
                                .then((book) => {
                                    return api.getImageURL(book.cover)
                                })
                            const dojin = await nhentai.getDoujin(args[0])
                            const { title, details, link } = dojin
                            const { tags, artists, languages, categories } = await details
                            let teks = `*Title*: ${title}\n\n*Tags*: ${tags.join(', ')}\n\n*Artists*: ${artists}\n\n*Languages*: ${languages.join(', ')}\n\n*Categories*: ${categories}\n\n*Link*: ${link}`
                            await akie.sendFileFromUrl(from, pic, 'nhentai.jpg', teks, id)
                                .then(() => console.log('Success sending nHentai info!'))
                        } catch (err) {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        }
                    } else {
                        await akie.reply(from, ind.nhFalse(), id)
                    }
                }
                break
            case 'nhdl':
                // Premium feature, contact the owner.

                if (isGroupMsg) {
                    if (!isNsfw) return await akie.reply(from, ind.notNsfw(), id)
                    if (!isPremium) return await akie.reply(from, ind.notPremium(), id)
                    await akie.reply(from, ind.botNotPremium(), id)
                } else {
                    if (!isPremium) return await akie.reply(from, ind.notPremium(), id)
                    await akie.reply(from, ind.botNotPremium(), id)
                }
                break
            case 'nhsearch':

                if (args.length !== 1) return await akie.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await akie.reply(from, ind.notNsfw(), id)
                    await akie.reply(from, ind.wait(), id)
                    console.log(`Searching nHentai for ${q}...`)
                    nana.search(q)
                        .then(async (g) => {
                            let txt = `-----[ *NHENTAI* ]-----\n\n➸ *Result for*: ${q}`
                            for (let i = 0; i < g.results.length; i++) {
                                const { id, title, language } = g.results[i]
                                txt += `\n\n➸ *Title*: ${title}\n➸ *Language*: ${language.charAt(0).toUpperCase() + language.slice(1)}\n➸ *Link*: nhentai.net/g/${id}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            await akie.sendFileFromUrl(from, g.results[0].thumbnail.s, `${g.results[0].title}`, txt, id)
                                .then(() => console.log('Success sending nHentai results!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        })
                } else {
                    await akie.reply(from, ind.wait(), id)
                    console.log(`Searching nHentai for ${q}...`)
                    nana.search(q)
                        .then(async (g) => {
                            let txt = `-----[ *NHENTAI* ]-----\n\n➸ *Result for*: ${q}`
                            for (let i = 0; i < g.results.length; i++) {
                                const { id, title, language } = g.results[i]
                                txt += `\n\n➸ *Title*: ${title}\n➸ *Language*: ${language.charAt(0).toUpperCase() + language.slice(1)}\n➸ *Link*: nhentai.net/g/${id}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            await akie.sendFileFromUrl(from, g.results[0].thumbnail.s, `${g.results[0].title}`, txt, id)
                                .then(() => console.log('Success sending nHentai results!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        })
                }
                break
            case 'nekopoi':

                if (isGroupMsg) {
                    if (!isNsfw) return await akie.reply(from, ind.notNsfw(), id)
                    await akie.reply(from, ind.wait(), id)
                    try {
                        const res = await nekobocc.latest()
                        let text = '-----[ *NEKOPOI LATEST* ]-----'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await akie.reply(from, text, id)
                    } catch (err) {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    }
                } else {
                    await akie.reply(from, ind.wait(), id)
                    try {
                        const res = await nekobocc.latest()
                        let text = '-----[ *NEKOPOI LATEST* ]-----'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await akie.reply(from, text, id)
                    } catch (err) {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    }
                }
                break
            case 'nekosearch':

                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await akie.reply(from, ind.notNsfw(), id)
                    await akie.reply(from, ind.wait(), id)
                    try {
                        const res = await nekobocc.search(q)
                        let text = '-----[ *NEKOPOI RESULT* ]-----'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await akie.reply(from, text, id)
                    } catch (err) {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    }
                } else {
                    await akie.reply(from, ind.wait(), id)
                    try {
                        const res = await nekobocc.search(q)
                        let text = '-----[ *NEKOPOI RESULT* ]-----'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await akie.reply(from, text, id)
                    } catch (err) {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    }
                }
                break
            case 'waifu18':

                if (isGroupMsg) {
                    if (!isNsfw) return await akie.reply(from, ind.notNsfw(), id)
                    await akie.reply(from, ind.wait(), id)
                    weeaboo.waifu(true)
                        .then(async ({ url }) => {
                            await akie.sendFileFromUrl(from, url, 'waifu.png', '', id)
                                .then(() => console.log('Success sending waifu!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        })
                } else {
                    await akie.reply(from, ind.wait(), id)
                    weeaboo.waifu(true)
                        .then(async ({ url }) => {
                            await akie.sendFileFromUrl(from, url, 'waifu.png', '', id)
                                .then(() => console.log('Success sending waifu!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await akie.reply(from, 'Error!', id)
                        })
                }
                break
            case 'phdl':

                if (isGroupMsg) {
                    if (!isNsfw) return await akie.reply(from, ind.notNsfw(), id)
                    if (!isUrl(url) && !url.includes('pornhub.com')) return await akie.reply(from, ind.wrongFormat(), id)
                    await akie.reply(from, ind.wait(), id)
                    try {
                        nsfw.phDl(url)
                            .then(async ({ title, download_urls, thumbnail_url }) => {
                                const count = Object.keys(download_urls).length
                                if (count !== 2) {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    const shortsMid = await misc.shortener(download_urls['480P'])
                                    const shortsHigh = await misc.shortener(download_urls['720P'])
                                    await akie.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                } else {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    await akie.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                }
                            })
                    } catch (err) {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    }
                } else {
                    if (!isUrl(url) && !url.includes('pornhub.com')) return await akie.reply(from, ind.wrongFormat(), id)
                    await akie.reply(from, ind.wait(), id)
                    try {
                        nsfw.phDl(url)
                            .then(async ({ title, download_urls, thumbnail_url }) => {
                                const count = Object.keys(download_urls).length
                                if (count !== 2) {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    const shortsMid = await misc.shortener(download_urls['480P'])
                                    const shortsHigh = await misc.shortener(download_urls['720P'])
                                    await akie.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                } else {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    await akie.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                }
                            })
                    } catch (err) {
                        console.error(err)
                        await akie.reply(from, 'Error!', id)
                    }
                }
                break
            case 'yuri':

                if (isGroupMsg) {
                    if (!isNsfw) return await akie.reply(from, ind.notNsfw(), id)
                    await akie.reply(from, ind.wait(), id)
                    await akie.sendFileFromUrl(from, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '', id)
                } else {
                    await akie.reply(from, ind.wait(), id)
                    await akie.sendFileFromUrl(from, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '', id)
                }
                break
            case 'lewdavatar':

                if (isGroupMsg) {
                    if (!isNsfw) return await akie.reply(from, ind.notNsfw(), id)
                    await akie.reply(from, ind.wait(), id)
                    await akie.sendFileFromUrl(from, (await neko.nsfw.avatar()).url, 'avatar.jpg', '', id)
                } else {
                    await akie.reply(from, ind.wait(), id)
                    await akie.sendFileFromUrl(from, (await neko.nsfw.avatar()).url, 'avatar.jpg', '', id)
                }
                break
            case 'femdom':

                if (isGroupMsg) {
                    if (!isNsfw) return await akie.reply(from, ind.notNsfw(), id)
                    await akie.reply(from, ind.wait(), id)
                    await akie.sendFileFromUrl(from, (await neko.nsfw.femdom()).url, 'femdom.jpg', '', id)
                } else {
                    await akie.reply(from, ind.wait(), id)
                    await akie.sendFileFromUrl(from, (await neko.nsfw.femdom()).url, 'femdom.jpg', '', id)
                }
                break

            // Moderation command
            case 'mutegc':
            case 'mute':

                if (!isGroupMsg) return akie.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return akie.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return akie.reply(from, ind.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    await akie.setGroupToAdminsOnly(groupId, true)
                    await akie.sendText(from, ind.gcMute())
                } else if (ar[0] === 'disable') {
                    await akie.setGroupToAdminsOnly(groupId, false)
                    await akie.sendText(from, ind.gcUnmute())
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'add':

                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await akie.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await akie.reply(from, ind.botNotAdmin(), id)
                if (args.length !== 1) return await akie.reply(from, ind.wrongFormat(), id)
                try {
                    await akie.addParticipant(from, `${args[0]}@c.us`)
                    await akie.sendText(from, '🎉 Welcome! 🎉')
                } catch (err) {
                    console.error(err)
                    await akie.reply(from, 'Error!', id)
                }
                break
            case 'kick':

                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await akie.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await akie.reply(from, ind.botNotAdmin(), id)
                if (mentionedJidList.length === 0) return await akie.reply(from, ind.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await akie.reply(from, ind.wrongFormat(), id)
                await akie.sendTextWithMentions(from, `Good bye~\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                for (let i of mentionedJidList) {
                    if (groupAdmins.includes(i)) return await akie.sendText(from, ind.wrongFormat())
                    await akie.removeParticipant(groupId, i)
                }
                break
            case 'promote':

                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await akie.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await akie.reply(from, ind.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await akie.reply(from, ind.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await akie.reply(from, ind.wrongFormat(), id)
                if (groupAdmins.includes(mentionedJidList[0])) return await akie.reply(from, ind.adminAlready(), id)
                await akie.promoteParticipant(groupId, mentionedJidList[0])
                await akie.reply(from, ind.ok(), id)
                break
            case 'demote':

                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await akie.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await akie.reply(from, ind.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await akie.reply(from, ind.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await akie.reply(from, ind.wrongFormat(), id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await akie.reply(from, ind.notAdmin(), id)
                await akie.demoteParticipant(groupId, mentionedJidList[0])
                await akie.reply(from, ind.ok(), id)
                break
            case 'leave':

                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await akie.reply(from, ind.adminOnly(), id)
                await akie.sendText(from, 'Sayounara~ 👋')
                await akie.leaveGroup(groupId)
                break
            case 'everyone': // Thanks to ArugaZ

                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await akie.reply(from, ind.adminOnly(), id)
                const groupMem = await akie.getGroupMembers(groupId)
                const lastEveryone = limit.getLimit(sender.id, _limit)
                if (lastEveryone !== undefined && cd - (Date.now() - lastEveryone) > 0) {
                    const time = ms(cd - (Date.now() - lastEveryone))
                    await akie.reply(from, ind.limit(time), id)
                } else if (isOwner) {
                    let txt = ''
                    for (let i = 0; i < groupMem.length; i++) {
                        txt += ` @${groupMem[i].id.replace(/@c.us/g, '')}`
                    }

                    await akie.sendTextWithMentions(from, txt)
                } else {
                    let txt = ''
                    for (let i = 0; i < groupMem.length; i++) {
                        txt += ` @${groupMem[i].id.replace(/@c.us/g, '')}`
                    }
                    txt += ''
                    await akie.sendTextWithMentions(from, txt)
                    limit.addLimit(sender.id, _limit)
                }
                break
            case 'groupicon':

                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await akie.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return akie.reply(from, ind.botNotAdmin(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await akie.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await akie.setGroupIcon(groupId, imageBase64)
                    await akie.sendText(from, ind.ok())
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'antilink':

                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await akie.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await akie.reply(from, ind.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (isDetectorOn) return await akie.reply(from, ind.detectorOnAlready(), id)
                    _antilink.push(groupId)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await akie.reply(from, ind.detectorOn(name, formattedTitle), id)
                } else if (ar[0] === 'disable') {
                    _antilink.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await akie.reply(from, ind.detectorOff(), id)
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'leveling':

                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await akie.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isLevelingOn) return await akie.reply(from, ind.levelingOnAlready(), id)
                    _leveling.push(groupId)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await akie.reply(from, ind.levelingOn(), id)
                } else if (ar[0] === 'disable') {
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await akie.reply(from, ind.levelingOff(), id)
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'welcome':

                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await akie.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isWelcomeOn) return await akie.reply(from, ind.welcomeOnAlready(), id)
                    _welcome.push(groupId)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await akie.reply(from, ind.welcomeOn(), id)
                } else if (ar[0] === 'disable') {
                    _welcome.splice(groupId, 1)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await akie.reply(from, ind.welcomeOff(), id)
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'autosticker':
            case 'autostiker':
            case 'autostik':

                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await akie.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isAutoStickerOn) return await akie.reply(from, ind.autoStikOnAlready(), id)
                    _autosticker.push(groupId)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await akie.reply(from, ind.autoStikOn(), id)
                } else if (ar[0] === 'disable') {
                    _autosticker.splice(groupId, 1)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await akie.reply(from, ind.autoStikOff(), id)
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'antinsfw':

                if (!isGroupMsg) return await akie.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await akie.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await akie.reply(from, ind.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (isDetectorOn) return await akie.reply(from, ind.antiNsfwOnAlready(), id)
                    _antinsfw.push(groupId)
                    fs.writeFileSync('./database/group/antinsfw.json', JSON.stringify(_antinsfw))
                    await akie.reply(from, ind.antiNsfwOn(name, formattedTitle), id)
                } else if (ar[0] === 'disable') {
                    _antinsfw.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antinsfw.json', JSON.stringify(_antinsfw))
                    await akie.reply(from, ind.antiNsfwOff(), id)
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break

            // Owner command
            case 'bc':
                if (!isOwner) return await akie.reply(from, ind.ownerOnly(), id)
                if (!q) return await akie.reply(from, ind.emptyMess(), id)
                const chats = await akie.getAllChatIds()
                for (let bcs of chats) {
                    let cvk = await akie.getChatById(bcs)
                    if (!cvk.isReadOnly) await akie.sendText(bcs, `${q}\n\n- Slavyan (Kal)\n_Broadcasted message_`)
                }
                await akie.reply(from, ind.doneOwner(), id)
                break
            case 'clearall':
                if (!isOwner) return await akie.reply(from, ind.ownerOnly(), id)
                const allChats = await akie.getAllChats()
                for (let delChats of allChats) {
                    await akie.deleteChat(delChats.id)
                }
                await akie.reply(from, ind.doneOwner(), id)
                break
            case 'leaveall':
                if (!isOwner) return await akie.reply(from, ind.ownerOnly(), id)
                if (!q) return await akie.reply(from, ind.emptyMess(), id)
                const allGroup = await akie.getAllGroups()
                for (let gclist of allGroup) {
                    await akie.sendText(gclist.contact.id, q)
                    await akie.leaveGroup(gclist.contact.id)
                }
                await akie.reply(from, ind.doneOwner())
                break
            case 'getses':
                if (!isOwner) return await akie.reply(from, ind.ownerOnly(), id)
                const ses = await akie.getSnapshot()
                await akie.sendFile(from, ses, 'session.png', ind.doneOwner())
                break
            case 'ban':
                if (!isOwner) return await akie.reply(from, ind.ownerOnly(), id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let benet of mentionedJidList) {
                            if (benet === botNumber) return await akie.reply(from, ind.wrongFormat(), id)
                            _ban.push(benet)
                            fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        }
                        await akie.reply(from, ind.doneOwner(), id)
                    } else {
                        _ban.push(args[1] + '@c.us')
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await akie.reply(from, ind.doneOwner(), id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await akie.reply(from, ind.wrongFormat(), id)
                        _ban.splice(mentionedJidList[0], 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await akie.reply(from, ind.doneOwner(), id)
                    } else {
                        _ban.splice(args[1] + '@c.us', 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await akie.reply(from, ind.doneOwner(), id)
                    }
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'eval':
            case 'ev':
                if (!isOwner) return await akie.reply(from, ind.ownerOnly(), id)
                if (!q) return await akie.reply(from, ind.wrongFormat(), id)
                try {
                    let evaled = await eval(q)
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    await akie.sendText(from, evaled)
                } catch (err) {
                    console.error(err)
                    await akie.reply(from, 'Error!', id)
                }
                break
            case 'shutdown':
                if (!isOwner) return await akie.reply(from, ind.ownerOnly(), id)
                await akie.sendText(from, 'Otsukaresama deshita~ 👋')
                    .then(async () => await akie.kill())
                    .catch(() => new Error('Target closed.'))
                break
            case 'premium':
                if (!isOwner) return await akie.reply(from, ind.ownerOnly(), id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let benet of mentionedJidList) {
                            if (benet === botNumber) return await akie.reply(from, ind.wrongFormat(), id)
                            premium.addPremiumUser(benet, args[2], _premium)
                            await akie.reply(from, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${benet}\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                        }
                    } else {
                        premium.addPremiumUser(args[1] + '@c.us', args[2], _premium)
                        await akie.reply(from, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${args[1]}@c.us\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await akie.reply(from, ind.wrongFormat(), id)
                        _premium.splice(premium.getPremiumPosition(mentionedJidList[0], _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await akie.reply(from, ind.doneOwner(), id)
                    } else {
                        _premium.splice(premium.getPremiumPosition(args[1] + '@c.us', _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await akie.reply(from, ind.doneOwner(), id)
                    }
                } else {
                    await akie.reply(from, ind.wrongFormat(), id)
                }
                break
            case 'setstatus':
            case 'setstats':
            case 'setstat':
                if (!isOwner) return await akie.reply(from, ind.ownerOnly(), id)
                if (!q) return await akie.reply(from, ind.emptyMess(), id)
                await akie.setMyStatus(q)
                await akie.sendText(from, ind.doneOwner())
                break
            case 'exif':
                if (!isOwner) return await akie.reply(from, ind.ownerOnly(), id)
                if (!q.includes('|')) return await akie.reply(from, ind.wrongFormat(), id)
                const namaPack = q.substring(0, q.indexOf('|') - 1)
                const authorPack = q.substring(q.lastIndexOf('|') + 2)
                exif.create(namaPack, authorPack)
                await akie.reply(from, ind.doneOwner(), id)
                break
            default:
                if (isCmd) {
                    await akie.reply(from, ind.cmdNotFound(command), id)
                }
                break
        }
    } catch (err) {
        console.error(color('[ERROR]', 'red'), err)
    }
}
/********** END OF MESSAGE HANDLER **********/
