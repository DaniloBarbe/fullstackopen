import { useEffect, useState } from 'react'
import countriesServices from "./services/countries"

const Filter = ({filterCountrie, handleFilterChange}) =>{
  return (
    <div>
      find countries:<input value={filterCountrie} onChange={handleFilterChange}/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountrie, setFilterCountrie] = useState('')
  const [weather, setWeather] = useState([])
 
useEffect(()=>{
  console.log("useEffect executou")
  countriesServices.getAll()
  .then(response => {
    console.log("getAll deu certo")
    console.log(response.data)
    setCountries(response.data)
})
.catch(error => {
    console.log("Erro na requisição:", error)
  })
},[])

const countriesToFilter = countries.filter(country =>
  country.name.common.toLowerCase().includes(filterCountrie.toLowerCase())
)

let city = countriesToFilter.length === 1
  ? countriesToFilter[0].capital?.[0]
  : null

  useEffect(()=>{
    if (!city) return
    console.log("clima executou")
    countriesServices.getWeather(city)
    .then(response => {
      console.log(response.data)
      console.log("getWeather deu certo")
      setWeather(response.data)
    })
  },[city])

const showcountrie = (i) => {
 return( countriesToShow =  <div>
  <h2>{countriesToFilter[i].name.common}</h2>
  <p>Capital: {countriesToFilter[i].capital[0]}</p>
  <p>Population: {countriesToFilter[i].population}</p>
  <h2>languages</h2>
  {Object.values(countriesToFilter[i].languages).map(language => <p key={language}>{language}</p>)}
  <img src={countriesToFilter[i].flags.png} alt="Country flag" />
  <h2>weather in {countriesToFilter[i].capital[0]}</h2>
  <p>Temperature {weather?.main?.temp} Celsius</p>
  <img src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`} alt="tempo" />
  <p>Wind {weather?.wind?.speed} m/s </p>
</div>)

}

const handleFilterChange = (event)=>{
  setFilterCountrie(event.target.value)
}


let countriesToShow = countriesToFilter


if( countriesToFilter.length>10 ) {
  countriesToShow = "Too many matches, specify another filter"
}else if(countriesToFilter.length===1){
  showcountrie(0)
}else{
   countriesToShow =  countriesToFilter.map((countries,) => <p key={countries.name.common}>{countries.name.common} 
   <button onClick={() => setFilterCountrie(countries.name.common)}>Show</button></p>)
}



return(
  <div>
    <Filter filterCountrie={filterCountrie} handleFilterChange={handleFilterChange}/> 
    {countriesToShow}
  </div>
  )
} 

export default App