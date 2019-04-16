// require our libs

const axios = require('axios');

//1st Function

//getExchangeRate- async function we can assign data to a function 
const getExchangeRate =  async (fromCurrency, toCurrency) => {

    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');

    const rate = response.data.rates;
    const usd = 1 / rate[fromCurrency];
    const exchangeRate = usd * rate[toCurrency];

    //error handling
    if(isNaN(exchangeRate)){
        throw new Error (`Whoops! unable to get the currency ${fromCurrency} to ${toCurrency}`);
    }

    return exchangeRate;

}

//2nd function
const getCountries = async (toCurrency) => {

    //Error handling with tye n catch
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`)

        return response.data.map(country => country.name);

    } catch (error) {
        throw new Error (`Whoops! Unable to get Countries that use ${toCurrency}`);
    }
    
}

//3rd function
const convertCurrency =  async (fromCurrency, toCurrency, amount) =>{
    const countries = await getCountries(toCurrency);
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. \nYou can Ball with this mulla in the following Countries ${countries}`
}

//call converted currency
convertCurrency('USD','EUR',50)
    .then((message) => {
        console.log(message);
    }).catch((error) => {
        console.log(error.message);
    })
