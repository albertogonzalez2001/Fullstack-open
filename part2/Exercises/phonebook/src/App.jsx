import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 1, number: "8723498" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  //Manejador de Nombres
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  //Manejador de Número de telefono
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name:{" "}
          <input value={newName} onChange={handleNameChange} type="text" />
        </div>
        <div>
          Number:{" "}
          <input value={newNumber} onChange={handleNumberChange} type="tel" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name}, {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
