var request = require('request')
var cheerio = require('cheerio')
const fs = require('fs')
path = require('path')
// const download = require('node-image-downloader')
// const express = require('express')
// const url = require('url')


// request('https://www.imdb.com/chart/moviemeter?sort=ir,desc&mode=simple&page=1', function(err, res, body) {
//     if (err) console.log('Erro: ' + err)

//     var $ = cheerio.load(body)
    
//     $('.lister-list tr').each(function() {   
//         var title = $(this).find('.titleColumn a').text().trim()
//         var rating = $(this).find('.imdbRating strong').text().trim()

//         fs.appendFile('imdb.txt', title + ' - ' + rating + '\n', function(err, result) {
//             if(err) console.log('error', err)
//         })
//     })
// })

function getImages(uri) {
    request(uri, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            $ = cheerio.load(body)
            imgs = $('.posterColumn a img').toArray()
            console.log("Downloading...")

            imgs.forEach(function (img) {
            process.stdout.write(".")
            img_url = img.attribs.src
            if(/^https?:\/\//.test(img_url)) {
                img_name = path.basename(img.attribs.alt + '.jpg').replace(':', '')
                console.log(img_name)

                request(img_url).pipe(fs.createWriteStream(`./imagens2/${img_name}`))
                }
            })
            console.log("Done!")
        }
    })
}

getImages('https://www.imdb.com/chart/moviemeter?sort=ir,desc&mode=simple&page=1')
