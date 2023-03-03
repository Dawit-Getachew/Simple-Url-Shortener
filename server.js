const express = require('express')
const mongoose = require('mongoose')
const shortUrl = require('./models/shortUrls')

const app = express()


mongoose.connect('mongodb+srv://dawit:Databasepassword123,@cluster0.0hboh.gcp.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology:true
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))

app.get('/', async (req, res) => {
    const shortUrls = await shortUrl.find()
    res.render('index', {shortUrls: shortUrls});
})

app.post('/shortUrls', async (req, res)=> {
    const resp = {
        author: req.body.author,
        full: req.body.fullUrl
    }
    await shortUrl.create(resp)
    res.redirect('/')
})

app.get('/:shortUrlss', async (req, res) => {
    const shortUrls = await shortUrl.findOne({short: req.params.shortUrlss})
    if(shortUrls == null) return res.redirect('/')


    shortUrls.clicks++
    shortUrls.save()

    res.redirect(shortUrls.full)
})

app.listen(process.env.PORT || 5000);