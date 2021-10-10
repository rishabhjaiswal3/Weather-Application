const { response } = require('express')
const request = require('postman-request')

const GeoCode=(location,callback)=>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) +'.json?access_token=pk.eyJ1Ijoicmo4Mzg0ODYiLCJhIjoiY2t1OWNoeWdnMDVoaTJucGdkM293MnlxcCJ9.smzfKzYBrf6V27WVVMmzGA'
    request({url:url,json:true},(error,{body}={})=>{

        if(!body||error){
            callback("Unable to connect to the server",undefined)
        }
        else{
            if(body.features.length === 0 ){
                callback("Unable to find Location Please try another location",undefined);
            }
            else if( body.message === "Not Found"){
                callback("Unable to find the name of the Location",undefined);
            }    
            else{
                callback(undefined,{
                    Latitude:body.features[0].center[0],
                    Longitude: body.features[0].center[1],
                    Location: body.features[0].place_name
                });
            }
        }
    })
}

module.exports = GeoCode;