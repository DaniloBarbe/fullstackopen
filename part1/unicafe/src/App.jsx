import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = ({good,neutral,bad,all}) =>{
 return (
  <div>
    <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={(good-bad)/all}/>
        <StatisticLine text="positive" value={(good/all)*100}/>
      </table>
  </div>
)
}
const StatisticLine = ({text,value}) => 
  
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  

const Condicao = ({good,neutral,bad,all}) => {
  if(all === 0){
    return(
      <div>
        the app is used by pressing the buttons
      </div>)
  }else{
    return <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
  } 
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const goodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const neutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const badClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

 


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodClick} text='good'/>
      <Button onClick={neutralClick} text='neutral'/>
      <Button onClick={badClick} text='bad'/>
      <Condicao good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App