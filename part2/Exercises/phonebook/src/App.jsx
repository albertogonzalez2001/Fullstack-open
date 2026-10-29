import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  //Hooks de estado
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchField, setSearchField] = useState("");

  //Manejador de eventos
  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => newName === person.name)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  useEffect(() => {
    console.log("Effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log(`${persons.length} Persons`);

  //Funcion de filtrado personalizado
  const personsToShow = persons.filter((person) => {
    const nameToLower = person.name.toLowerCase();
    const searchToLower = searchField.toLowerCase();

    return nameToLower.includes(searchToLower);
  });

  //Manejador de Nombres
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  //Manejador de Número de telefono
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  //Manejador de Filtrado personalizado
  const handleFilterChange = (event) => {
    setSearchField(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchField} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

const Filter = (props) => {
  return (
    <div>
      Filter shown with: <input value={props.value} onChange={props.onChange} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        Name:{" "}
        <input
          value={props.newName}
          onChange={props.onNameChange}
          type="text"
        />
      </div>
      <br />
      <div>
        Number:{" "}
        <input
          value={props.newNumber}
          onChange={props.onNumberChange}
          type="tel"
        />
      </div>
      <div>
        <br />
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return (
    <ul>
      {props.personsToShow.length > 0 ? (
        props.personsToShow.map((person) => (
          <li key={person.id}>
            {person.name}, {person.number}
          </li>
        ))
      ) : (
        <li>No se encontraron resultados</li>
      )}
    </ul>
  );
};

export default App;
