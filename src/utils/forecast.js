const request = require('request') 

const forecast = ({latitude, longtitude, location},callback)=>{
    const url = 'https://api.darksky.net/forecast/8dab63083ab9111ba7ae0ed6a2d564d9/' + latitude +',' + longtitude + '?units=si&lang=tr'

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable To Connect Wheather Service',undefined) 
        }else if ( body.error) {
            callback(body.error,undefined)  
        }else{ 
            callback(undefined,{
                summary: body.daily.data[0].summary,
                forecast: 'Temperture is ' + body.currently.temperature + ' and rain probability is ' + body.currently.precipProbability 
            }) 
        }
    })
}

module.exports = forecast