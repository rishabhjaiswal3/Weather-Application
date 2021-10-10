const weatherForm  = document.querySelector('form')
const search = document.querySelector('input')
let messageOne = document.querySelector('.message-1')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const address = search.value;
    messageOne.textContent='Loading...'

    url = '/weather?address='+encodeURIComponent(address); 
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                console.log(data.error)
                messageOne.textContent = data.error;
            }
            else
            {
                console.log(data.forecast)
                messageOne.textContent = "Temperature is "+data.forecast.temperature+" and the day is "+data.forecast.description + " in "+data.location;
            }
        })
    })

})