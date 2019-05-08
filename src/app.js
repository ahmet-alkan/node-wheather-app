const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views directory
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory for express
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Ahmet'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Ahmet Alkan'
    },)
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title: 'Help',
        message: 'Here I am to help!',
        name: 'Ahmet'
    },)
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error,data)=>{
        if(error){
           return res.send({
                error: error
            })
        }   

        forecast(data,(error,forecastData)=>{
            if(error){
                return res.send({
                     error: error
                 })
            }
            
            res.send({
               location: data.location,
               weather: forecastData.forecast ,
               address: req.query.address
            })
            
        })
    })

})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Help Page Not Found',
        name: 'Ahmet Alkan',
        msg: 'Article could not found you are looking for'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: 'Page Not Found',
        name: 'Ahmet Alkan',
        msg: 'Page Not Found'
    })
})

app.listen(3000,() => {
    console.log('listening Port: 3000')
})