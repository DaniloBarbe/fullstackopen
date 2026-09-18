const Course = ({course}) => { 
  
  const total = course.parts.reduce((acumulador,part) => acumulador += part.exercises, 0)
  return(
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((part) => <Parts key={part.id} part={part}/>)}
      <p>total of {total} exercises</p>
    </div>
  ) 
}

const Parts = ({part : {name,exercises}}) => {
  return(
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

export default Course