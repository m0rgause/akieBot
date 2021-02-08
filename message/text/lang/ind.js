const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('config.json'))

exports.wait = () => {
    return `Sebentar a~`
}

exports.ok = () => {
    return `Okoklh~`
}

exports.wrongFormat = () => {
    return `Format salah! Silakan cek cara penggunaan di *${prefix}menu*.`
}

exports.emptyMess = () => {
    return `Ga boleh kosong a!`
}

exports.cmdNotFound = (cmd) => {
    return `Command *${prefix}${cmd}* tidak ditemukan!`
}

exports.blocked = (ownerNumber) => {
    return `Jangan Nelpon Bot hadehh. block tq!\n\nHarap hubungi owner: wa.me/${ownerNumber.replace('@c.us', '')}`
}

exports.ownerOnly = () => {
    return `Command ini khusus Owner Lord!`
}

exports.doneOwner = () => {
    return `Sudah selesai, Owner Lord~`
}

exports.groupOnly = () => {
    return `Command ini hanya bisa digunakan di dalam grup!`
}

exports.adminOnly = () => {
    return `Command ini hanya bisa digunakan oleh admin grup!`
}

exports.notNsfw = () => {
    return `Command NSFW belum diaktifkan!`
}

exports.nsfwOn = () => {
    return `Command NSFW berhasil *diaktifkan*!`
}

exports.nsfwOff = () => {
    return `Command NSFW berhasil *dinonaktifkan*!`
}

exports.nsfwAlready = () => {
    return `Command NSFW sudah diaktifkan sebelumnya.`
}

exports.addedGroup = (chat) => {
    return `Terima kasih telah mengundangku, para member *${chat.contact.name}*!\n\nSilakan register dengan cara ketik:\n*${prefix}register* nama | umur`
}

exports.nhFalse = () => {
    return `Nuklir Tidak Valid Hadehhh!`
}

exports.listBlock = (blockNumber) => {
    return `------[ HADEHHHH ]------
    
Total diblokir: *${blockNumber.length}* user\n`
}

exports.notPremium = () => {
    return `mpp! Command ini khusus untuk user premium saja.`
}

exports.notAdmin = () => {
    return `User bukan seorang admin!`
}

exports.adminAlready = () => {
    return `Tidak dapat mem-promote user yang merupakan admin!`
}

exports.botNotPremium = () => {
    return `Bot ini tidak mendukung command premium. Silakan hubungi pemilik bot ini.`
}

exports.botNotAdmin = () => {
    return `Jadikan bot sebagai admin terlebih dahulu cepat..!`
}

exports.ytFound = (res) => {
    return `*Video ditemukan!*\n\n➸ *Judul*: ${res.title}\n➸ *Durasi*: ${res.duration} menit\n\nMedia sedang dikirim, mohon tunggu...`
}

exports.notRegistered = () => {
    return `Daftar dulu a hadeh!\n\nformat:\n*${prefix}register* nama | umur\n\nNote:\nFollow IG owner biar berkah _kiki.af`
}

exports.registered = (name, age, userId, time, serial) => {
    return `*「 REGISTRATION 」*\n\nAkun kamu telah terdaftar dengan data:\n\n➸ *Nama*: ${name}\n➸ *Umur*: ${age}\n➸ *ID*: ${userId}\n➸ *Waktu pendaftaran*: ${time}\n➸ *Serial*: ${serial}\n\nCatatan:\nJangan pernah menyebarkan data *serial* ke pada siapapun!\n\nKetik *${prefix}rules* terlebih dahulu ya~`
}

exports.registeredAlready = () => {
    return `Kamu sudah mendaftar sebelumnya.`
}

exports.received = (pushname) => {
    return `Halo ${pushname}!\nTerima kasih telah melapor, laporanmu akan kami segera terima.`
}

exports.limit = (pushname, time) => {
    return `*Mpp, ${pushname} kamu di banned.\nSilakan tunggu ${time.hours} jam ${time.minutes}* menit ${time.seconds} detik lagi.*`
}

exports.videoLimit = () => {
    return `Ukuran video terlalu besar!`
}

exports.joox = (result, q) => {

    return `
❏ *Info Lagu*
┌   Hasil Pencarian dari : ${q}
├   *Penyanyi*: ${result.singer}
├   *Judul*: ${result.title}
├   *Album*: ${result.album}
├   *Size*: ${result.filesize}
├   *Durasi*: ${result.duration}
└   Media sedang dikirim, mohon tunggu...`
}

exports.gsm = (result) => {
    return `➸ *Model HP*: ${result.title}\n➸ *Spesifikasi*: ${result.spec}`
}

exports.receipt = (result) => {
    return `${result.title}\n\n${result.desc}\n\n*Bahan*: ${result.bahan}\n\n*Cara membuat*:\n${result.cara}`
}

exports.ytResult = (urlyt, title, duration, views) => {
    return `➸ *Judul*: ${title}\n➸ *Durasi*: ${duration}\n➸ *Views*: ${views}\n➸ *Link*: ${urlyt}`
}

exports.profile = (username, status, premi, benet, adm, level, requiredXp, xp) => {
    return `-----[ *USER INFO* ]-----\n\n➸ *Username*: ${username}\n➸ *Status*: ${status}\n➸ *Premium*: ${premi}\n➸ *Banned*: ${benet}\n➸ *Admin*: ${adm}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=\n\nYour progress:\n➸ *Level*: ${level}\n➸ *XP*: ${xp} / ${requiredXp}`
}

exports.detectorOn = (name, formattedTitle) => {
    return `*「 ANTI GROUP LINK 」*\n\nPerhatian untuk penghuni grup ${(name || formattedTitle)}\nGrup ini memiliki anti-group link detector, apabila ada salah satu member mengirim group link di sini maka dia akan ter-kick secara otomatis.\n\nSekian terima kasih.\n- Admin ${(name || formattedTitle)}`
}

exports.detectorOff = () => {
    return `Fitur anti-group link berhasil *dinonaktifkan*!`
}

exports.detectorOnAlready = () => {
    return `Fitur anti-group link telah diaktifkan sebelumnya.`
}

exports.antiNsfwOn = (name, formattedTitle) => {
    return `*「 ANTI NSFW LINK 」*\n\nPerhatian untuk penghuni grup ${(name || formattedTitle)}\nGrup ini memiliki anti-NSFW link detector, apabila ada salah satu member mengirim link NSFW/porn di sini maka dia akan ter-kick secara otomatis.\n\nSekian terima kasih.\n- Admin ${(name || formattedTitle)}`
}

exports.antiNsfwOff = () => {
    return `Fitur anti-NSFW link berhasil *dinonaktifkan*!`
}

exports.antiNsfwOnAlready = () => {
    return `Fitur anti-NSFW link telah diaktifkan sebelumnya.`
}

exports.linkDetected = () => {
    return `*「 SATPAM ANTI GROUP 」*\n\nKamu mengirim link group chat!\nMaaf tapi kami harus mengeluarkan mu...\nSelamat tinggal~`
}

exports.levelingOn = () => {
    return `Fitur leveling berhasil *diaktifkan*!`
}

exports.levelingOff = () => {
    return `Fitur leveling berhasil *dinonaktifkan*!`
}

exports.levelingOnAlready = () => {
    return `Fitur leveling telah diaktifkan sebelumnya.`
}

exports.levelingNotOn = () => {
    return `Fitur leveling belum diaktifkan!`
}

exports.levelNull = () => {
    return `Kamu belum memiliki level!`
}

exports.welcome = (event) => {
    return `Selamat datang @${event.who.replace('@c.us', '')}!\n\n Lansgung intro aja kak~`
}

exports.welcomeOn = () => {
    return `Fitur welcome berhasil *diaktifkan*!`
}

exports.welcomeOff = () => {
    return `Fitur welcome berhasil *dinonaktifkan*!`
}

exports.welcomeOnAlready = () => {
    return `Fitur welcome telah diaktifkan sebelumnya.`
}

exports.minimalDb = () => {
    return `Perlu setidaknya *10* user yang memiliki level di database!`
}

exports.autoStikOn = () => {
    return `Fitur auto-stiker berhasil *diaktifkan*!`
}

exports.autoStikOff = () => {
    return `Fitur auto-stiker berhasil *dinonaktifkan*!`
}

exports.autoStikOnAlready = () => {
    return `Fitur auto-stiker telah diaktifkan sebelumnya.`
}

exports.afkOn = (pushname, reason) => {
    return `Fitur AFK berhasil *diaktifkan*!\n\n➸ *Username*: ${pushname}\n➸ *Alasan*: ${reason}`
}

exports.afkOnAlready = () => {
    return `Fitur AFK telah diaktifkan sebelumnya.`
}

exports.afkMentioned = (getReason, getTime) => {
    return `*「 AFK MODE 」*\n\nSssttt! Orangnya lagi AFK, jangan diganggu!\n➸ *Alasan*: ${getReason}\n➸ *Sejak*: ${getTime}`
}

exports.afkDone = (pushname) => {
    return `*${pushname}* telah kembali dari AFK! Selamat datang kembali~`
}

exports.gcMute = () => {
    return `*「 MUTED 」*\n\hanya admin yang dapat mengirim pesan ke grup ini.`
}

exports.gcUnmute = () => {
    return `*「 UNMUTED 」*\n\nSekarang semua anggota dapat mengirim chat di grup ini.`
}

exports.notNum = (q) => {
    return `"${q}", bukan angka!`
}

exports.playstore = (app_id, title, developer, description, price, free) => {
    return `➸ *Nama*: ${title}\n➸ *ID*: ${app_id}\n➸ *Developer*: ${developer}\n➸ *Gratis*: ${free}\n➸ *Harga*: ${price}\n➸ *Deskripsi*: ${description}`
}

exports.shopee = (nama, harga, terjual, shop_location, description, link_product) => {
    return `➸ *Nama*: ${nama}\n➸ *Harga*: ${harga}\n➸ *Terjual*: ${terjual}\n➸ *Lokasi*: ${shop_location}\n➸ *Link produk*: ${link_product}\n➸ *Deskripsi*: ${description}`
}

exports.pc = (pushname) => {
    return `*「 REGISTRATION 」*\n\nAkun kamu berhasil terdaftar! Silakan cek pesan ku di private chat mu ya ${pushname}~ <3\n\nNote:\nJika kamu tidak menerima pesan, artinya kamu belum save nomor bot.`
}

exports.registeredFound = (name, age, time, serial, userId) => {
    return `*「 REGISTERED 」*\n\nAkun ditemukan!\n\n➸ *Nama*: ${name}\n➸ *Umur*: ${age}\n➸ *ID*: ${userId}\n➸ *Waktu pendaftaran*: ${time}\n➸ *Serial*: ${serial}`
}

exports.registeredNotFound = (serial) => {
    return `Akun dengan serial: *${serial}* tidak ditemukan!`
}

exports.ytPlay = (result) => {
    return `*「 PLAY 」*\n\n➸ *Judul*: ${result.title}\n➸ *Durasi*: ${result.duration}\n➸ *Link*: ${result.video_url}\n\nsedang dikirim,bentar a...`
}
exports.pcOnly = () => {
    return `Command ini hanya bisa digunakan di dalam private chat saja!`
}

exports.linkNsfw = () => {
    return `*「 ANTI NSFW LINK 」*\n\nKamu telah mengirim link NSFW!\nMaaf, tapi aku harus mengeluarkan mu...`
}

exports.menu = (jumlahUser, level, xp, role, pushname, requiredXp, premium) => {
    return `
┌──┤ A K I E B O T
├   IG       : _kiki.af
├   WA Owner : bit.ly/3atBmCi
└──┤ Total Commands: 463

Berikut adalah menu yang tersedia:

❏ *I N F O R M A T I O N*
┌   ${prefix}rules
├   ${prefix}menu
├   ${prefix}status
├   ${prefix}listblock
├   ${prefix}ping
├   ${prefix}delete
├   ${prefix}report
├   ${prefix}tos
├   ${prefix}join
├   ${prefix}ownerbot
├   ${prefix}getpic @tag
├   ${prefix}premiumcheck
├   ${prefix}premiumlist
└   ${prefix}twitter link

❏ *D O W N L O A D E R*
┌   ${prefix}facebook link_video
├   ${prefix}ytmp3 link_video
├   ${prefix}ytmp4 link_video
├   ${prefix}joox judul_lagu
├   ${prefix}tiktok link_video
├   ${prefix}tiktokpic username
├   ${prefix}tiktoknowm link_video
└   ${prefix}twitter link
 
❏ *F U N  M E N U*
┌   ${prefix}say teks *[Bot akan mengulang pesan mu]*
├   ${prefix}lirik judul_lagu *[mencari lirik lagu]*
├   ${prefix}shortlink link *[membuat shortlink]*
├   ${prefix}wikipedia teks *[mengirim wikipedia dari teks]*
├   ${prefix}kbbi teks *[mengirim definisi kata dari KBBI]*
├   ${prefix}igstalk username *[stalk akun Instagram]*
├   ${prefix}gsmarena model_hp *[Mengirim info spek dari GSMArena]*
├   ${prefix}ytsearch query *[mengirim hasil pencarian YouTube]*
├   ${prefix}tts kode_bahasa teks *[membuat Text to Speech. Example : ${prefix}tts id hadeh]*
├   ${prefix}afk alasan *[Set akun ke mode AFK, bot akan mengirim pesan ke orang yang me-mention kamu]*
├   ${prefix}distance kota_asal | kota_tujuan *[jarak dari kota_asal ke kota_tujuan]*
├   ${prefix}findsticker teks *[mencari stiker yang kamu cari]*
├   ${prefix}math 1+1 [Kalkulator. * = Perkalian, + = Tambah , - = Kurang, / = Bagi  ]
├   ${prefix}surah momor_surah *[mengirim surah al quran]*
├   ${prefix}listsurah [melihat list surah al quran]
├   ${prefix}js namadaerah *[melihat jadwal shalat di daerah kalian]*
├   ${prefix}mutual *[Dapatkan kontak WA random]*
├   ${prefix}whois ip_address *[IP Look-Up]*
├   ${prefix}play judul_video *[Play audio dari Youtube]*
├   ${prefix}toxic *[random toxic]*
├   ${prefix}tafsir nama_surah ayat *[Tafsir ayat Al-Quran]*
├   ${prefix}motivasi *[kata-kata motivasi]*
├   ${prefix}linesticker *[Sticker line baru]*
├   ${prefix}alkitab nama_injil *[al kita search]*
├   ${prefix}cekongkir kurir | asal | tujuan *[cek ongkir]*
├   ${prefix}movie judul *[cari film]*
├   ${prefix}reminder 2h | pesan *[Pengingat. s - detik, m - menit, h - jam, d - hari] *
├   ${prefix}imagetourl *kirim gambar dengan caption atau reply gambar dengan caption [Image Uploader]*
├   ${prefix}infohoax *[cek update info hoax]*
├   ${prefix}trending *[cek trending twitter]*
├   ${prefix}jobseek *[Info lowongan kerja]*
├   ${prefix}hartatahta nama
├   ${prefix}calendar *[membuat kalender dari foto yang dikirim]*
├   ${prefix}partner nama | pasangan
├   ${prefix}zodiac nama_zodiak *[ramalan zodiak]*
├   ${prefix}write teks *[membuat catatan tulisan di buku]*
├   ${prefix}missing teks_atas | teks_tengah | teks_bawah
├   ${prefix}valentine nama_pasangan *[membuat valentine dari gambar yang dikirim]*
├   ${prefix}glichtext teks1 | teks2 *[membuat gambar teks glitch]*
├   ${prefix}simi teks *[chat simisimi]*
├   ${prefix}blackpink teks *[membuat teks dengan style logo blackpink]*
├   ${prefix}phmaker tekskiri | tekskanan *[gambar dengan style PornHub ]*
├   ${prefix}galaxy teks *[membuat gambar teks galaxy]*
├   ${prefix}tod *[Truth or Dare]*
├   ${prefix}weton tanggal | bulan | tahun *[ramalan weton]*
├   ${prefix}kiss *[kiss photo yang dikirim]*
├   ${prefix}asupan *[asupan video cewek-cewek]*
├   ${prefix}citacita *[meme cita-cita]*
├   ${prefix}phcomment nama | teks *[membuat caption ala PH comment]*
├   ${prefix}ffbanner teks1 | teks2 *[banner free fire]*
├   ${prefix}fflogo teks1 | teks2 *[logo karakter FF]*
├   ${prefix}readmore teks1 | teks2 *[generate teks baca selengkapnya]*
├   ${prefix}neontext teks_atas | teks_tengah | teks_bawah
└   ${prefix}resep nama_makanan *[mengirim resep makanan]*

❏ *S T I C K E R*
┌   ${prefix}sticker *[membuat stiker dari gambar yang dikirim ata di-reply]*
├   ${prefix}triggered *[sticker effect triggered]*
├   ${prefix}stickergif *[sticker dari video mp4 atau GIF yang dikirim atau di-reply]*
├   ${prefix}stickerlightning *[stiker effect lightning dari gambar yang dikirim atau di-reply]*
├   ${prefix}stickerfire *[stiker fire dari gambar yang dikirim atau di-reply]*
├   ${prefix}ttg *[stiker text to GIF]*
├   ${prefix}toimg *[convert stiker ke foto]*
├   ${prefix}emojisticker *[convert emoji ke sticker*
├   ${prefix}stickerwm pack_name author_name *[stiker dengan WM]*
└   ${prefix}stickermeme teks_atas teks_bawah

❏ *A N I M E*
┌   ${prefix}neko
├   ${prefix}wallpaper
├   ${prefix}kemono
├   ${prefix}komiku
├   ${prefix}wait *[mencari source anime dari gambar yang dikirim atau di-reply]*
├   ${prefix}source *[mencari source dari gambar yang berhubungan dengan gambar yang dikkirim]*
└   ${prefix}waifu

❏ *N S F W*
┌   ${prefix}lewds
├   ${prefix}multilewds
├   ${prefix}nh kode
├   ${prefix}nhdl kode
├   ${prefix}nhsearch query
├   ${prefix}nekopoi
├   ${prefix}nekosearch query
├   ${prefix}multifetish <armpits/feets/thighs/ass/boobs/belly/sideboobs/ahegaoi>
├   ${prefix}fetish armpits/feets/thighs/ass/boobs/belly/sideboobs/ahegaoi
├   ${prefix}phdl link
├   ${prefix}yuri
├   ${prefix}lewdavatar
├   ${prefix}femdom
└   ${prefix}waifu18

❏ *L E V E L I N G*
┌   ${prefix}leveling enable/disable *[on/off leveling]
├   ${prefix}level *[melihat level kamu]*
├   ${prefix}leaderboard
└   ${prefix}setbackground link_gambar *[set bg level card] 

❏ *M O D E R A T I O N*
┌   ${prefix}add 62xxxxxxxxx
├   ${prefix}kick @tag
├   ${prefix}promote @tag
├   ${prefix}demote @tag
├   ${prefix}leave *[bot akan meninggalkan grup]*
├   ${prefix}everyone *[mention semua member]*
├   ${prefix}nsfw enable/disable *[menyalakan/matikan mode NSFW]
├   ${prefix}groupicon *[mengganti icon grup]*
├   ${prefix}antilink enable/disable *[fitur anti-group link]*
├   ${prefix}welcome enable/disable *[fitur welcome di grup agar menyambut member baru]*
├   ${prefix}autosticker enable/disable
└   ${prefix}antinsfw enable/disable

Catatan:
*Perlakukan bot secara baik, dev akan bertindak tegas apabila user melanggar rules.*
*Bot ini terdapat anti-spam yang berupa cooldown command selama 5 detik setiap kali pemakaian.*
`
}

exports.menuDownloader = () => {
    return `
-----[ DOWNLOADER ]-----

1. *${prefix}facebook*
Download Facebook video.
Aliases: *fb*
Usage: *${prefix}facebook* link_video

2. *${prefix}ytmp3*
Download YouTube audio.
Aliases: -
Usage: *${prefix}ytmp3* link

3. *${prefix}ytmp4*
Download YouTube video.
Aliases: -
Usage: *${prefix}ytmp4* link

4. *${prefix}joox*
Mencari dan men-download lagu dari Joox.
Aliases: -
Usage: *${prefix}joox* judul_lagu

5. *${prefix}tiktok*
Mendownload video TikTok.
Aliases: -
Usage: *${prefix}tiktok* link_video

6. *${prefix}twitter*
Download Twitter media.
Aliases: *twt*
Usage: *${prefix}twiter* link

7. *${prefix}tiktokpic*
Download profile pic user
Aliases: -
Usage: *${prefix}tiktokpic* username

8. *${prefix}tiktoknowm*
Download video TikTok tanpa WM.
Aliases: *tktnowm*
Usage: *${prefix}tiktoknowm* link_video

_Index of [1]_
    `
}

exports.menuBot = () => {
    return `
-----[ BOT ]-----

1. *${prefix}rules*
Wajib baca.
Aliases: *rule*
Usage: *${prefix}rules*

2. *${prefix}menu*
Menampilkan commands yang tersedia.
Aliases: *help*
Usage: *${prefix}menu* angka_index

3. *${prefix}status*
Menampilkan status bot.
Aliases: *stats*
Usage: *${prefix}status*

4. *${prefix}listblock*
Cek nomor yang diblokir.
Aliases: -
Usage: *${prefix}listblock*

5. *${prefix}ping*
Cek speed bot.
Aliases: *p*
Usage: *${prefix}ping*

6. *${prefix}delete*
Hapus pesan dari bot.
Aliases: *del*
Usage: Reply pesan yang dihapus dengan caption *${prefix}delete*.

7. *${prefix}report*
Laporkan bug ke dev.
Aliases: -
Usage: *${prefix}report* pesan

8. *${prefix}tos*
Syarat dan ketentuan. (TOS)
Aliases: -
Usage: *${prefix}tos*

9. *${prefix}join*
Join grup via link.
Aliases: -
Usage: *${prefix}join* link_group

10. *${prefix}ownerbot*
Mengirim kontak owner.
Aliases: -
Usage: *${prefix}ownerbot*

11. *${prefix}getpic*
Mengirim foto profil user.
Aliases: -
Usage: *${prefix}getpic* @user/62812xxxxxxxx

12. *${prefix}premiumcheck*
Cek masa aktif premium.
Aliases: *cekpremium*
Usage: *${prefix}premiumcheck*

13. *${prefix}premiumlist*
Cek list user premium.
Aliases: *listpremium*
Usage: *${prefix}premiumlist*

_Index of [2]_
    `
}

exports.menuMisc = () => {
    return `
-----[ MISC ]-----

1. *${prefix}say*
Bot akan mengulang pesan mu.
Aliases: -
Usage: *${prefix}say* teks

2. *${prefix}lirik*
Mencari lirik lagu.
Aliases: -
Usage: *${prefix}lirik* judul_lagu

3. *${prefix}shortlink*
Membuat shortlink.
Aliases: -
Usage: *${prefix}shortlink* link

4. *${prefix}wikipedia*
Mengirim Wikipedia dari teks yang diberikan.
Aliases: *wiki*
Usage: *${prefix}wikipedia* teks

5. *${prefix}kbbi*
Mengirim definisi kata dari KBBI.
Aliases: -
Usage: *${prefix}kbbi* teks

6. *${prefix}igstalk*
Stalk akun Instagram.
Aliases: -
Usage: *${prefix}igstalk* username

7. *${prefix}gsmarena*
Mengirim info spesifikasi HP dari GSMArena.
Aliases: -
Usage: *${prefix}gsmarena* model_hp

8. *${prefix}receipt*
Mengirim resep makanan.
Aliases: *resep*
Usage: *${prefix}receipt* nama_makanan

9. *${prefix}ytsearch*
Mengirim hasil pencarian di YouTube.
Aliases: *yts*
Usage: *${prefix}ytsearch* query

10. *${prefix}tts*
Membuat Text to Speech. Kalian perlu kode bahasa setiap menggunakan, cek di sini https://id.wikipedia.org/wiki/Daftar_bahasa_menurut_ISO_639-2
Aliases: -
Usage: *${prefix}tts* kode_bahasa | teks

11. *${prefix}afk*
Set akun kamu ke mode AFK, aku akan mengirim pesan ke orang yang me-mention kamu.
Aliases: -
Usage: *${prefix}afk* alasan. Kirim pesan ke grup untuk menonaktifkan mode AFK.

12. *${prefix}distance*
Untuk mengetahui jarak dari kotamu ke kota yang kamu tuju
Aliases: -
Usage: *${prefix}distance* kota_asal | kota_tujuan

13. *${prefix}findsticker*
Untuk mencari sticker yang kamu cari
Aliases: *findstiker*
Usage: *${prefix}findsticker* teks

14. *${prefix}math*
Kalkulator.
* = Perkalian
+ = Pertambahan
- = Pengurangan
/ = Pembagian
Aliases: -
Usage: *${prefix}math* 12*12

15. *${prefix}listsurah*
Melihat list surah Al-Qur'an.
Aliases: -
Usage: *${prefix}listsurah*

16. *${prefix}surah*
Mengirim surah Al-Qur'an.
Aliases: -
Usage: *${prefix}surah* nomor_surah

17. *${prefix}js*
Mengetahui jadwal shalat di daerah kalian
Aliases: - 
Usage: *${prefix}js* namadaerah

18. *${prefix}mutual*
Dapatkan kontak WA random.
Aliases: -
Usage: *${prefix}mutual*

19. *${prefix}whois*
IP look-up.
Aliases: -
Usage: *${prefix}whois* ip_address

20. *${prefix}play*
Play audio dari YouTube.
Aliases: - 
Usage: *${prefix}play* judul_video

21. *${prefix}sms*
Mengirim SMS secara anonymous. (SMS gateway)
Aliases: -
Usage: *${prefix}sms* pesan | nomor_penerima

22. *${prefix}toxic*
Random toxic.
Aliases: -
Usage: *${prefix}toxic*

23. *${prefix}tafsir*
Tafsir ayat surah Al-Qur'an.
Aliases: -
Usage: *${prefix}tafsir* nama_surah  ayat

24. *${prefix}motivasi*
Kata-kata motivasi.
Aliases: -
Usage: *${prefix}motivasi*

25. *${prefix}linesticker*
Sticker Line terbaru.
Aliases: *linestiker*
Usage: *${prefix}linesticker*

26. *${prefix}alkitab*
Al-Kitab search.
Aliases: -
Usage: *${prefix}* nama_injil

27. *${prefix}cekongkir*
Cek ongkos kirim.
Aliases: -
Usage: *${prefix}ongkir* kurir | asal | tujuan

28. *${prefix}movie*
Cari film.
Aliases: -
Usage: *${prefix}movie* judul

28. *${prefix}reminder*
Pengingat. 
*s* - detik
*m* - menit
*h* - jam
*d* - hari
Aliases: -
Usage: *${prefix}reminder* 10s | pesan_pengingat

29. *${prefix}imagetourl*
Image uploader.
Aliases: *imgtourl*
Usage: Kirim gambar dengan caption *${prefix}imagetourl* atau reply gambar dengan caption *${prefix}imagetourl*.

30. *${prefix}infohoax*
Cek update info hoax.
Aliases: -
Usage: *${prefix}infohoax*

31. *${prefix}trending*
Cek trending di Twitter.
Aliases: -
Usage: *${prefix}trending*

32. *${prefix}jobseek*
Mencari info lowongan kerja.
Aliases: -
Usage: *${prefix}jobseek*

33. *${prefix}spamcall*
Spam call.
Aliases: -
Usage: *${prefix}spamcall* 812xxxxxxxx

34. *${prefix}spamsms*
Spam SMS.
Aliases: -
Usage: *${prefix}spamsms* 0812xxxxxxxx jumlah_pesan

_Index of [3]_
    `
}

exports.menuSticker = () => {
    return `
-----[ STICKER ]-----

1. *${prefix}sticker*
Membuat stiker dari gambar yang dikirim atau di-reply.
Aliases: *stiker*
Usage: Kirim gambar dengan caption *${prefix}sticker* atau reply gambar dengan caption *${prefix}sticker*.

2. *${prefix}stickergif*
Membuat stiker dari video MP4 atau GIF yang dikirim atau di-reply.
Aliases: *stikergif*
Usage: Kirim video/GIF dengan caption *${prefix}stickergif* atau reply video/GIF dengan caption *${prefix}stickergif*.

3. *${prefix}stickerlightning*
Membuat stiker lightning dari gambar yang dikirim atau di-reply.
Aliases: *slightning*
Usage: Kirim gambar dengan caption *${prefix}stickerlightning* atau reply gambar dengan caption *${prefix}stickerlightning*.

4. *${prefix}stickerfire*
Membuat stiker fire dari gambar yang dikirim atau di-reply.
Aliases: *sfire*
Usage: Kirim gambar dengan caption *${prefix}stickerfire* atau reply gambar dengan caption *${prefix}stickerfire*.

5. *${prefix}ttg*
Membuat stiker text to GIF.
Aliases: -
Usage: *${prefix}ttg* teks

6. *${prefix}stickertoimg*
Konversi stiker ke foto.
Aliases: *stikertoimg toimg*
Usage: Reply sticker dengan caption *${prefix}stickertoimg*.

7. *${prefix}emojisticker*
Konversi emoji ke stiker.
Aliases: *emojistiker*
Usage: *${prefix}emojisticker* emoji

8. *${prefix}stickerwm*
Buat stiker dengan WM.
Aliases: *stcwm*
Usage: Kirim gambar dengan caption *${prefix}stickerwm* pack_name | author_name atau reply gambar dengan caption *${prefix}stickerwm* pack_name | author_name.

9. *${prefix}stickermeme*
Buat sticker meme.
Aliases: *stcmeme*
Usage: Kirim gambar dengan caption *${prefix}stickermeme* teks_atas | teks_bawah atau reply gambar dengan caption *${prefix}stickermeme* teks_atas | teks_bawah.

_Index of [4]_
    `
}

exports.menuWeeaboo = () => {
    return `
-----[ WEEABOO ]-----

1. *${prefix}neko*
Mengirim foto neko girl.
Aliases: -
Usage: *${prefix}neko*

2. *${prefix}wallpaper*
Mengirim wallpaper anime.
Aliases: *wp*
Usage: *${prefix}wallpaper*

3. *${prefix}kemono*
Mengirim foto kemonomimi girl.
Aliases: -
Usage: *${prefix}kemono*

4. *${prefix}kusonime*
Mencari info anime dan link download batch di Kusonime.
Aliases: -
Usage: *${prefix}kusonime* judul_anime

5. *${prefix}komiku*
Mencari info manga dan link download di Komiku.
Aliases: -
Usage: *${prefix}komiku* judul_manga

6. *${prefix}wait*
Mencari source anime dari screenshot scene.
Aliases: -
Usage: Kirim screenshot dengan caption *${prefix}wait* atau reply screenshot dengan caption *${prefix}wait*.

7. *${prefix}source*
Mencari source dari panel doujin, ilustrasi, dan gambar yang berhubungan dengan anime.
Aliases: *sauce*
Usage: Kirim gambar dengan caption *${prefix}source* atau reply gambar dengan caption *${prefix}source*.

8. *${prefix}waifu*
Mengirim random foto waifu.
Aliases: -
Usage: *${prefix}waifu*

9. *${prefix}anitoki*
Cek update terbaru Anitoki.
Aliases: -
Usage: *${prefix}anitoki*

10. *${prefix}neonime*
Cek update terbaru Neonime.
Aliases: -
Usage: *${prefix}neonime*

11. *${prefix}anoboy*
Cek on-going anime dari Anoboy.
Aliases: -
Usage: *${prefix}anoboy*

_Index of [5]_
    `
}

exports.menuFun = () => {
    return `
-----[ FUN ]-----

1. *${prefix}hartatahta*
Membuat gambar Harta Tahta Nama.
Aliases: -
Usage: *${prefix}hartatahta* nama

2. *${prefix}calendar*
Membuat kalender dari foto yang dikirim.
Aliases: -
Usage: Kirim gambar dengan caption *${prefix}calendar* atau reply gambar dengan caption *${prefix}calendar*.

3. *${prefix}partner*
Weton jodoh.
Aliases: *pasangan*
Usage: *${prefix}partner* nama | pasangan

4. *${prefix}zodiac*
Ramalan zodiak Mingguan.
Aliases: *zodiak*
Usage: *${prefix}zodiac* zodiak

5. *${prefix}write*
Membuat catatan tulisan di buku.
Aliases: *nulis*
Usage: *${prefix}write* teks

6. *${prefix}missing*
Membuat gambar missing person.
Aliases: -
Usage: Kirim gambar dengan caption *${prefix}missing* teks_atas | teks_tengah | teks_bawah atau reply gambar dengan caption *${prefix}missing* teks_atas | teks_tengah | teks_bawah.

7. *${prefix}valentine*
Membuat gambar valentine.
Aliases: -
Usage: Kirim gambar pasangan dengan caption *${prefix}valentine* nama | pasangan atau reply gambar pasangan dengan caption *${prefix}valentine* nama | pasangan.

8. *${prefix}glitchtext*
Membuat gambar teks glitch.
Aliases: *glitext*
Usage: *${prefix}glitchtext* teks1 | teks2

9. *${prefix}simi*
Chat SimiSimi.
Aliases: -
Usage: *${prefix}simi* teks

10. *${prefix}blackpink*
Membuat teks dengan style logo Blackpink.
Aliases: -
Usage: *${prefix}blackpink* teks

11. *${prefix}phmaker*
Membuat teks dengan style logo Pornhub.
Aliases: -
Usage: *${prefix}phmaker* teks_kiri | teks_kanan

12. *${prefix}galaxy*
Membuat gambar teks galaxy.
Aliases: -
Usage: *${prefix}galaxy* teks

13. *${prefix}tod*
Bermain truth or dare.
Aliases: -
Usage: *${prefix}tod*

14. *${prefix}weton*
Kirim ramalan weton.
Aliases: -
Usage: *${prefix}weton* tanggal | bulan | tahun

15. *${prefix}triggered*
Membuat efek triggered.
Aliases: -
Usage: Kirim gambar dengan caption *${prefix}triggered* atau reply pesan orang dengan *${prefix}triggered* atau bisa gunakan command *${prefix}triggered* langsung.

16. *${prefix}kiss*
Kiss someone ( ͡° ͜ʖ ͡°).
Aliases: -
Usage: Kirim gambar dengan caption *${prefix}kiss* atau reply gambar dengan *${prefix}kiss*.

17. *${prefix}asupan*
Asupan video cewek-cewek.
Aliases: -
Usage: *${prefix}asupan*

17. *${prefix}citacita*
Meme cita-cita.
Aliases: -
Usage: *${prefix}citacita*

17. *${prefix}phcomment*
Membuat capton ala PH comment.
Aliases: -
Usage: *${prefix}phcomment* username | teks

18. *${prefix}ffbanner*
Membuat banner Free Fire.
Aliases: -
Usage: *${prefix}ffbanner* teks1 | teks2

19. *${prefix}fflogo*
Membuat logo karakter Free Fire.
Aliases: -
Usage: *${prefix}fflogo* teks1 | teks2

20. *${prefix}readmore*
Generate teks baca selengkapnya.
Aliases: -
Usage: *${prefix}readmore* teks1 | teks2

21. *${prefix}neontext*
Membuat gambar neon teks.
Aliases: *neon*
Usage: *${prefix}neontext* teks_atas | teks_tengah | teks_bawah

_Index of [6]_
    `
}

exports.menuModeration = () => {
    return `
-----[ MODERATION ]-----

1. *${prefix}add*
Menambah user ke dalam group.
Aliases: -
Usage: *${prefix}add* 628xxxxxxxxxx

2. *${prefix}kick*
Mengeluarkan member dari grup.
Aliases: -
Usage: *${prefix}kick* @member1

3. *${prefix}promote*
Promote member menjadi admin.
Aliases: -
Usage: *${prefix}promote* @member1

4. *${prefix}demote*
Demote member dari admin.
Aliases: -
Usage: *${prefix}demote* @member1

5. *${prefix}leave*
Bot akan meninggalkan grup.
Aliases: -
Usage: *${prefix}leave*

6. *${prefix}everyone*
Mention semua member group.
Aliases: -
Usage: *${prefix}everyone*

7. *${prefix}nsfw*
Mematikan/menyalakan mode NSFW.
Aliases: -
Usage: *${prefix}nsfw* enable/disable

8. *${prefix}groupicon*
Mengganti icon grup.
Aliases: -
Usage: Kirim gambar dengan caption *${prefix}groupicon* atau reply gambar dengan caption *${prefix}groupicon*.

9. *${prefix}antilink*
Mematikan/menyalakan fitur anti-group link.
Aliases: -
Usage: *${prefix}antilink* enable/disable

10. *${prefix}welcome*
Mematikan/menyalakan fitur welcome di grup agar menyambut setiap kedatangan member.
Aliases: -
Usage: *${prefix}welcome* enable/disable

11. *${prefix}autosticker*
Mematikan/menyalakan fitur auto-stiker. Setiap foto yang dikirim akan selalu diubah ke stiker.
Aliases: *autostiker autostik*
Usage: *${prefix}autostiker* enable/disable

12. *${prefix}antinsfw*
Mematikan/menyalakan fitur anti-NSFW link.
Aliases: -
Usage: *${prefix}antinsfw* enable/disable

_Index of [7]_
    `
}

exports.menuNsfw = () => {
    return `
-----[ NSFW ]-----

1. *${prefix}lewds*
Mengirim pict anime lewd.
Aliases: *lewd*
Usage: *${prefix}lewds*

2. *${prefix}multilewds*
Mengirim up to 5 anime lewd pics. (PREMIUM ONLY)
Aliases: *multilewds multilewd mlewd mlewds*
Usage: *${prefix}multilewds*

3. *${prefix}nhentai*
Mengirim info doujinshi dari nHentai.
Aliases: *nh*
Usage: *${prefix}nhentai* kode

4. *${prefix}nhdl*
Mendownload doujin dari nHentai sebagai file PDF. (PREMIUM ONLY)
Aliases: -
Usage: *${prefix}nhdl* kode

5. *${prefix}nekopoi*
Mengirim video link Nekopoi terbaru.
Aliases: -
Usage: *${prefix}nekopoi*

6. *${prefix}multifetish*
Mengirim up to 5 fetish pics. (PREMIUM ONLY)
Aliases: *mfetish*
Usage: *${prefix}multifetish* <armpits/feets/thighs/ass/boobs/belly/sideboobs/ahegao>

7. *${prefix}waifu18*
Mengirim random foto waifu NSFW.
Aliases: -
Usage: *${prefix}waifu18*

8. *${prefix}fetish*
Mengirim fetish pics.
Aliases: -
Usage: *${prefix}fetish* armpits/feets/thighs/ass/boobs/belly/sideboobs/ahegao

9. *${prefix}phdl*
Download video dari Pornhub.
Aliases: -
Usage *${prefix}phdl* link

10. *${prefix}yuri*
Mengirim random foto lewd yuri.
Aliases: -
Usage: *${prefix}yuri*

11. *${prefix}lewdavatar*
Mengirim random avatar lewd.
Aliases: -
Usage: *${prefix}lewdavatar*

12. *${prefix}femdom*
Mengirim random foto ero femdom.
Aliases: -
Usage: *${prefix}femdom*

13. *${prefix}nhsearch*
nHentai search.
Aliases: -
Usage: *${prefix}nhsearch* query

14. *${prefix}nekosearch*
Nekopoi search.
Aliases: -
Usage: *${prefix}nekosearch* query

_Index of [8]_
    `
}

exports.menuOwner = () => {
    return `
-----[ OWNER ]-----
Halo Owner-sama ヽ(・∀・)ﾉ!

1. *${prefix}bc*
Membuat broadcast.
Aliases: -
Usage: *${prefix}bc* <teks> 

2. *${prefix}clearall*
Menghapus semua chat di akun bot.
Aliases: -
Usage: *${prefix}clearall*

3. *${prefix}getses*
Mengambil screenshot sesi dari akun bot.
Aliases: -
Usage: *${prefix}getses*

4. *${prefix}ban*
Menambah/menghapus user yang diban.
Aliases: -
Usage: *${prefix}ban* add/del @user/62812xxxxxxxx

5. *${prefix}leaveall*
Keluar dari semua grup.
Aliases: -
Usage: *${prefix}leaveall*

6. *${prefix}eval*
Evaluate kode JavaScript.
Aliases: *ev*
Usage: *${prefix}eval*

7. *${prefix}shutdown*
Men-shutdown bot.
Aliases: -
Usage: *${prefix}shutdown*

8. *${prefix}premium*
Menambah/menghapus user premium.
*s* - detik
*m* - menit
*h* - jam
*d* - hari
Aliases: -
Usage: *${prefix}premium* add/del @user/62812xxxxxxxx 30d

9. *${prefix}setstatus*
Mengganti status about me.
Aliases: *setstats setstat*
Usage: *${prefix}status* teks

10. *${prefix}serial*
Cek pendaftaran akun via serial.
Aliases: -
Usage: *${prefix}serial* serial_user

11. *${prefix}exif*
Atur WM stiker bot.
Aliases: -
Usage: *${prefix}exif* pack_name | author_name

_Index of [9]_
    `
}

exports.menuLeveling = () => {
    return `
-----[ LEVELING ]-----

1. *${prefix}level*
Untuk melihat level kamu.
Aliases: -
Usage: *${prefix}level*

2. *${prefix}leaderboard*
Untuk melihat leaderboard.
Aliaases: -
Usage: *${prefix}leaderboard*

3. *${prefix}setbackground*
Set background level card.
Aliases: *setbg*
Usage: *${prefix}setbackground* link_foto

_Index of [10]_
    `
}

exports.rules = () => {
    return `
-----[ RULES ]-----

1. Jangan spam bot. 
Sanksi: *WARN/SOFT BLOCK*

2. Jangan telepon bot.
Sanksi: *SOFT BLOCK*

3. Jangan mengeksploitasi bot.
Sanksi: *PERMANENT BLOCK*

Jika sudah dipahami rules-nya, silakan ketik *${prefix}menu* untuk memulai!

    `
}

// Dimohon untuk owner/hoster jangan mengedit ini, terima kasih.
exports.tos = (ownerNumber) => {
    return `

    `
}
