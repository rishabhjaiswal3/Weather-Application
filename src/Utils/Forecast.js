const request = require('postman-request')

const Forecast  = (latitude,longitude,callback)=>{
    url = 'http://api.weatherstack.com/current?access_key=145395a4b1ae0b2b69371b7c60197312&query='+latitude+","+longitude+'&units=f'

    request({url:url,json:true},(error,{body}={})=>{
    
        if(error){
            callback('Unable to connect to the server',undefined);            
        }
        else if( body.error){
            callback('Unable to find the latitude & longitude',undefined);
        }
        else{
            callback(undefined,{
                temperature:   body.current.temperature,
                description :   body.current.weather_descriptions[0]
            });
        }

    })
}


module.exports = Forecast;