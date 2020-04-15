const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Setting up paths
const staticpath = path.join(__dirname, '../public')
const templatespath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//Setting up handlebars
app.set('view engine', 'hbs')
app.set('views', templatespath)
hbs.registerPartials(partialspath)

//Telling express to use static files path
app.use(express.static(staticpath))

app.get("", (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Om Shanker'
    })
})

app.get("/about", (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Om Shanker'
    })
})

app.get("/help", (req, res) => {
    res.render('help', {
        message: "For help mail at: mailto:test@example.com",
        title: 'Help',
        name: 'Om Shanker'
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { //With Destructuring
        if(error) {
                return res.send({
                    error: error
                })
        }
        geocode.weather(latitude,longitude, (error, {description, temperature, feelslike, humidity} = {})=> { // With Destructuring
                if(error) {
                        return res.send({
                            error: error
                        })
                }
                res.send({
                    description: description,
                    statement: "It is currently " + temperature + " degrees out, and feels like " + feelslike + " degrees, Humidity is at: " + humidity +" in " + req.query.address
                })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.status(404).render('404', {
        title: '404',
        errormessage: "No help found for this topic",
        name: 'Om Shanker'
    })
})

app.get("*", (req, res) => {
    res.status(404).render('404', {
        title: '404',
        errormessage: "The page you are trying to find doesnot exist",
        name: 'Om Shanker'
    })
})

app.listen(port, () => {
    console.log("Server running at port " + port)
})