const { fetchJson, toBuffer } = require('../tools/fetcher')
const { twitter } = require('video-url-link')
const tiktok = require("tiktok-search");
const { promisify } = require('util')
const config = require('../config.json')
const bent = require('bent')


const twtGetInfo = promisify(twitter.getInfo)

/**
 * Get Instagram media from URL.
 * @param {String} url
 * @returns {Object}
 */
const insta = (url) => new Promise((resolve, reject) => {
    console.log(`Get Instagram media from ${url}`)
    fetchJson(`http://api.kikiaf.art/v1/igpost?url=${encodeURI(url)}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get TikTok video from URL.
 * @param {String} url 
 * @returns {Object}
 */
const tik = (url) => new Promise((resolve, reject) => {
    console.log(`Get TikTok media from ${url}`)
    tiktok.download(url).then((res) => {
        resolve(res)
    }).catch((err) => {
        reject(err)
    })
    // fetchJson(`https://api.vhtear.com/tiktokdl?link=${url}&apikey=${config.vhtear}`)
    //     .then((result) => resolve(result))
    //     .catch((err) => reject(err))
})

/**
 * Get media from Facebook.
 * @param {String} query
 * @returns {Object}
 */
const fb = (query) => new Promise((resolve, reject) => {
    console.log(`Downloading FB Video from ${query}`)
    fetchJson(`https://api.vhtear.com/fbdl?link=${query}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get YouTube media from URL.
 * @param {String} url
 * @returns {Object}
 */
const ytdl = (url) => new Promise((resolve, reject) => {
    console.log(`Get YouTube media from ${url}`)
    fetchJson(`http://api.kikiaf.art/v1/ytdl?id=${encodeURI(url)}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Joox music metadata from title.
 * @param {String} title
 * @returns {Object}
 */
const joox = (title) => new Promise((resolve, reject) => {
    console.log(`Get Joox music from ${title}...`)
    // jxdl.ge
    fetchJson(`http://api.kikiaf.art/joox/?q=${title}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Twitter media from URL.
 * @param {String} url 
 * @returns {Object}
 */
const tweet = (url) => new Promise((resolve, reject) => {
    console.log(`Get Twitter media from ${url}`)
    twtGetInfo(url, {}, (error, info) => {
        if (error) {
            reject(error)
        } else {
            resolve(info)
        }
    })
})

/**
 * Get TikTok video with no WM.
 * @param {String} url 
 * @returns {Object}
 */
const tikNoWm = (url) => new Promise((resolve, reject) => {
    console.log(`Get TikTok with no WM from ${url}`)
    fetchJson(`https://videfikri.com/api/tiktok/?url=${url}`)
        .then(async (res) => {
            const { result } = res
            toBuffer(result.link)
                .then((buffer) => resolve(buffer))
                .catch((err) => reject(err))
        })
        .catch((err) => reject(err))
})

module.exports = {
    fb,
    ytdl,
    tik,
    joox,
    insta,
    tweet,
    tikNoWm
}
