const axios = require('axios');

const getDoujin = async (id) => new Promise((resolve, reject) => {
    axios.get(`https://cord-exultant-browser.glitch.me/api/gallery?id=${id}`)
        .then((resp) => {
            resolve(resp);
        })
        .catch(err => {
            reject(err);
        })

})

const exists = (id) => new Promise(async (resolve, reject) => {
    axios.get(`https://cord-exultant-browser.glitch.me/api/gallery?id=${id}`)
        .then((resp) => {
            if (resp.data.error) {
                resolve(false)
            } else {
                resolve(true)
            }

        }).catch((err) => {
            reject(err)
        })
})


const getImageURL = (media_id, cover) => new Promise(async (resolve, reject) => {
    // https://t.nhentai.net/galleries/1831326/cover.jpg
    try {
        resolve(`https://demo.cloudimg.io/v7/t.nhentai.net/galleries/${media_id}/cover.${cover}`)
    } catch (errr) {
        reject(errr)
    }
})
module.exports = { exists, getDoujin, getImageURL }