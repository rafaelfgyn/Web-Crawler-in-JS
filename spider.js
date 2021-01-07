var request = require('request')
var cheerio = require('cheerio')
const fs = require('fs')
path = require('path')

request(`https://www.imdb.com/chart/moviemeter?sort=ir,desc&mode=simple&page=1`, function (err, res, body) {
                if (err) console.log('Erro: ' + err)
                var $ = cheerio.load(body)

                $('td.titleColumn').each(function () {
                    content = $(this).find('a').text().trim().replace(/"/g, "'")
                    rate = $(this).next().text().trim() 
                    console.log(content)
                    console.log(rate) 
                    fs.appendFileSync('./Filmes.txt', content + ': ' + rate + '\n')
                })
            })
