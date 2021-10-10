const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const Geocode = require('./Utils/Geocode')
const Forecast = require('./Utils/Forecast') 

// Define Paths for Express Config
const PublicDirectoryPath = path.join(__dirname,'../public'); 
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')


// Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(PublicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Rishabh Jaiswal'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:"Please enter a address"})
    }

    Geocode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{
        if(error){
            return res.send({error:error});
        }
        Forecast( Latitude, Longitude,(error,forecast)=>{
            if(error){
                return res.send({error:error})
            }
            return res.send({                
                forecast:forecast,
                location:Location,
                address:req.query.address
            })
        })
    })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({error:'you must enter a search key value pair'})
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpline:"How can I help you",
        title:'Help',
        name:'Rishabh Jaiswal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Rishabh Jaiswal',
        title:'About'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Error Help',
        name:'Rishabh Jaiswal',
        ErrorMessage:'Help Page Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Rishabh Jaiswal',
        ErrorMessage:'Page Not Found'    
    })
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})