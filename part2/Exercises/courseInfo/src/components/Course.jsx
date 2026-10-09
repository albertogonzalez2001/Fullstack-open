//Component
const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  );
};

//Component
const Header = (props) => {
  return <h2>{props.course.name}</h2>;
};

//Component for parts
const Content = (props) => {
  return (
    <div>
      <ul>
        {props.course.parts.map((part) => (
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        ))}
      </ul>
    </div>
  );
};

//Component
const Total = (props) => {
  const totalExercises = props.course.parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <p>
      Total of <strong>{totalExercises}</strong> exercises.
    </p>
  );
};

export default Course;
