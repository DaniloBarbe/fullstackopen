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


const handleFilterChange = (event)=>{
  setFilterCountrie(event.target.value)
}

const countriesToFilter = countries.filter(countries=>countries.name.common.toLowerCase().includes(filterCountrie.toLowerCase()))
let countriesToShow = countriesToFilter

if( countriesToFilter.length>10 ) {
  countriesToShow = "Too many matches, specify another filter"
}else if(countriesToFilter.length===1){
  countriesToShow =  <div>
  <h2>{countriesToFilter[0].name.common}</h2>
  <p>Capital: {countriesToFilter[0].capital[0]}</p>
  <p>Population: {countriesToFilter[0].population}</p>
  <h2>languages</h2>
  {Object.values(countriesToFilter[0].languages).map(language => <p key={language}>{language}</p>)}
  <img src={countriesToFilter[0].flags.png} alt="Country flag" />
</div>

}else{
   countriesToShow =  countriesToFilter.map(countries => <p key={countries.name.common}>{countries.name.common}</p>)
}


return(
  <div>
    <Filter filterCountrie={filterCountrie} handleFilterChange={handleFilterChange}/> 
    {countriesToShow}
  </div>
  )
}

export default App