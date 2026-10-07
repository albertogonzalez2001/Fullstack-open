//Father component
const App = () => {
  //Object
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

//Component
const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
    </div>
  );
};

//Component
const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

//Component for parts
const Content = (props) => {
  return (
    <div>
      <h3>Course Parts:</h3>
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
  const total =
    props.course.parts[0].exercises +
    props.course.parts[1].exercises +
    props.course.parts[2].exercises;

  return <p>Number of exercises {total}</p>;
};

export default App;
