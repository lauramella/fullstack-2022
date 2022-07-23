const Header = ({ name }) => {
    return (
        <h2>{name}</h2>
    )
  }

  const Content = ({ course }) => {
    return (
      <>
        {course.parts.map(part =>
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        )}
      </>
    )
  }

  const Part = ({ part, exercises }) => {
    return (
      <p>{part} {exercises}</p>
    )
  }

  const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises)

    return (
        <p><b>Number of exercises {exercises.reduce((a, b) => a + b, 0)} </b></p>
    )
  }

  const Course = ({ course }) => {

    return (
        <><h1>Web development curriculum</h1>
          {course.map((course) => {
            return (
              <div key={course.id}>
              <Header name={course.name} />
              <Content course={course} />
              <Total parts={course.parts} />
              </div>
            )
          })}
       </>
      )
    }
  
  
  export default Course