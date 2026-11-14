import { useState, useEffect, useRef } from "react";
import personService from "./services/persons";

const App = () => {
  //Hooks de estado
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchField, setSearchField] = useState("");
  const [notification, setNotification] = useState(null);
  const notificationTimeout = useRef(null);

  //Función para gestionar el tiempo de la notificacion
  const showNotification = (text, type = "success") => {
    setNotification({ text, type });
    clearTimeout(notificationTimeout.current);
    notificationTimeout.current = setTimeout(() => {
      setNotification(null);
      notificationTimeout.current = null;
    }, 5000);
  };

  useEffect(() => {
    return () => clearTimeout(notificationTimeout.current);
  }, []);

  //Manejador de eventos
  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const changedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson,
              ),
            );
            showNotification("Phone number updated successfully!");
          })
          .catch(() => {
            showNotification(
              `Information of ${existingPerson.name} was already removed from server`,
              "error",
            );
            personService
              .remove(existingPerson)
              .then(() =>
                setPersons(persons.filter((person) => person.id !== id)),
              );
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        showNotification(`${newName} added successfully!`);
      });
    }
  };

  //Manejador de eventos
  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        showNotification(`${name} removed successfully!`);
      });
    }
  };

  //Effect hook para obtener estado inicial de los datos.
  useEffect(() => {
    console.log("Effect");
    personService.getAll().then((inicialPerson) => {
      console.log("promise fulfilled");
      setPersons(inicialPerson);
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

  //Renderizado del App
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchField} onChange={handleFilterChange} />
      <Notification notification={notification} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onRemove={removePerson} />
    </div>
  );
};

//Componente Filter
const Filter = (props) => {
  return (
    <div>
      Filter shown with: <input value={props.value} onChange={props.onChange} />
    </div>
  );
};

//Componente PersonForm
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

//Componente Persons
const Persons = (props) => {
  return (
    <ul>
      {props.personsToShow.length > 0 ? (
        props.personsToShow.map((person) => (
          <li key={person.id}>
            {person.name}, {person.number}{" "}
            <button onClick={() => props.onRemove(person.id, person.name)}>
              Delete
            </button>
          </li>
        ))
      ) : (
        <li>No se encontraron resultados</li>
      )}
    </ul>
  );
};

//Componente de notificacion
const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return <div className={notification.type}>{notification.text}</div>;
};

export default App;
