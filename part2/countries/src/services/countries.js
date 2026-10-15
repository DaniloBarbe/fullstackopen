import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const weatherBaseUrl = `https://api.openweathermap.org/data/2.5/weather`
const apiKey = import.meta.env.VITE_SOME_KEY

const getWeather = (city) =>{
    return axios.get(`${weatherBaseUrl}?q=${city}&appid=${apiKey}&units=metric`)
}

const getAll = () => {
    return axios.get(baseUrl)
}

export default{
    getAll: getAll,
    getWeather: getWeather
}