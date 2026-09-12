//Componente Padre
const App = () => {
  //Header
  const course = "Half Stack application development";
  //Content
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const total = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <Header name={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total exercise={total} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercise={props.exercises1} />
      <Part part={props.part2} exercise={props.exercises2} />
      <Part part={props.part3} exercise={props.exercises3} />
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Total = (props) => {
  return <p>Number of exercises: {props.exercise}</p>;
};

export default App;

//Ejercicios de la parte 1
