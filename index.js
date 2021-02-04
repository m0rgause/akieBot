const { create, Client } = require('@open-wa/wa-automate')
const { color, options } = require('./tools')
const { ind, eng } = require('./message/text/lang/')
const { loader } = require('./function')
const figlet = require('figlet')
const msgHandler = require('./message')
const config = require('./config.json')
const ownerNumber = config.ownerBot
const fs = require('fs-extra')
const { groupLimit, memberLimit } = require('./database/bot/setting.json')

const start = async (akie = new Client()) => {
    console.log(color(figlet.textSync('AkieBot', 'Larry 3D'), 'cyan'))
    console.log(color('=> Bot successfully loaded! Database:', 'yellow'), color(loader.getAllDirFiles('./database').length), color('Library:', 'yellow'), color(loader.getAllDirFiles('./lib').length), color('Function:', 'yellow'), color(loader.getAllDirFiles('./function').length))
    console.log('[AKIE]', color('AkieBot is now online!'))
    console.log(color('[DEV]', 'cyan'), color('Welcome back, Owner! Hope you are doing well~', 'magenta'))

    loader.nocache('../message/index.js', m => console.log(color('[WATCH]', 'orange'), color(`=> '${m}'`, 'yellow'), 'file is updated!'))
    loader.nocache('../message/text/lang/ind.js', m => console.log(color('[WATCH]', 'orange'), color(`=> '${m}'`, 'yellow'), 'file is updated!'))

    // Force it to keep the current session
    akie.onStateChanged((state) => {
        console.log('[AKIE STATE]', state)
        if (state === 'UNPAIRED') akie.forceRefocus()
        if (state === 'CONFLICT') akie.forceRefocus()
        if (state === 'UNLAUNCHED') akie.forceRefocus()
    })

    // Set all received message to seen
    akie.onAck((x) => {
        const { to } = x
        if (x !== 3) akie.sendSeen(to)
    })

    // Listening added to group
    akie.onAddedToGroup(async (chat) => {
        const gc = await akie.getAllGroups()
        if (ownerNumber.includes(chat.id)) {
            await akie.sendText(chat.id, ind.addedGroup(chat))
        } else if (gc.length > groupLimit) {
            await akie.sendText(chat.id, `Max groups reached!\n\nCurrent status: ${gc.length}/${groupLimit}`)
            await akie.deleteChat(chat.id)
            await akie.leaveGroup(chat.id)
        } else if (chat.groupMetadata.participants.length < memberLimit) {
            await akie.sendText(chat.id, `Need at least ${memberLimit} members in group!`)
            await akie.deleteChat(chat.id)
            await akie.leaveGroup(chat.id)
        } else {
            await akie.sendText(chat.id, ind.addedGroup(chat))
        }
    })

    // Listening to messages
    akie.onMessage((message) => {
        akie.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 1000) {
                    console.log('[AKIE]', color(`Loaded message reach ${msg}, cuting message cache...`, 'yellow'))
                    akie.cutMsgCache()
                    console.log('[AKIE]', color('Cache deleted!', 'yellow'))
                }
            })
        // Below is an watched version but it will affect the performance
        require('./message/index.js')(akie, message)
        // msgHandler(akie, message)
    })

    // Block person who called bot
    akie.onIncomingCall(async (callData) => {
        await akie.sendText(callData.peerJid, ind.blocked(ownerNumber))
        await akie.contactBlock(callData.peerJid)
        console.log(color('[BLOCK]', 'red'), color(`${callData.peerJid} has been blocked. Reason:`, 'yellow'), color('CALLING THE BOT', 'cyan'))
    })

    // Listen to group's event
    akie.onGlobalParicipantsChanged(async (event) => {
        const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
        const isWelcome = _welcome.includes(event.chat)
        const botNumbers = await akie.getHostNumber() + '@c.us'
        try {
            if (event.action === 'add' && event.who !== botNumbers && isWelcome) {
                const pic = await akie.getProfilePicFromServer(event.who)
                if (pic === undefined) {
                    await akie.sendFileFromUrl(event.chat, 'https://i.imgur.com/uLAimaY.png', 'profile.png')
                } else {
                    await akie.sendFileFromUrl(event.chat, pic, 'profile.jpg')
                }
                await akie.sendTextWithMentions(event.chat, ind.welcome(event))
            }
        } catch (err) {
            console.error(err)
        }
    })
}

// Creating session
create(options(start))
    .then((akie) => start(akie))
    .catch((err) => console.error(err))
