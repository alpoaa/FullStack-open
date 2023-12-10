const Course = ({course}) => {
    return (
      <div>
        <Header header={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({header}) => {
    return (
      <div>
        <h3>{header}</h3>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part} />
          )}
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const countExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
      <div>
        <h4>Total of exercises: {countExercises}</h4>
      </div>
    )
}

export default Course