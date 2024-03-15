import { useState, useEffect } from 'react'
import Contacts from "./components/Contacts.jsx"
import NewPerson from "./components/NewPerson.jsx"
import Input from "./components/Input.jsx"
import Notif from "./components/Notif.jsx"
import personsService from "./services/personsService"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [showingFilter, setFilter] = useState("")
  //first element is the msg and the second is a bool to  tell if its a warn or nfo msg
  const [notificationMsg, setNotificationMsg] = useState([null,true])
  const notifTime = 4000

  useEffect(()=>{
    personsService.getAll()
      .then(personsList => setPersons(personsList))
      .catch(error => alert('Error we can retrive data from server'))
  },[])

  let resetInputs = () => {
    setNewName("")
    setNewNumber("")
  }

  let showingPersons = showingFilter
    ? persons.filter(person => person.name.toLowerCase().startsWith(showingFilter.toLowerCase()))
    : persons

  let addNewName = (e) => {
    e.preventDefault()
    let toUpdate = persons.filter(person => person.name === newName)
    if (toUpdate.length > 0) {
      toUpdate = {...toUpdate[0], number: newNumber}
      if (window.confirm(`${newName} alaready exist on phonebook,
        replace the old number with a new one?`)){
        personsService.updatePerson(toUpdate)
          .then(updated => {
            setPersons(persons.filter(prsn => prsn.id != updated.id).concat(updated))
            setNotificationMsg([`${updated.name} has updated.`,false])
          })
          .catch(error => {
            setNotificationMsg([`cant update has the contact, may be it actually does not exist on phonebook. please try again later.`,true])
            setPersons(persons.filter(prsn => prsn.name != toUpdate.name))
          })
        resetInputs()
      }
    } else {
      personsService.createNew({ name: newName, number: newNumber })
        .then(created => {
          setPersons([...persons].concat(created))
          setNotificationMsg([`${created.name} contact has added to your phonebook.`,false])
        })
        .catch(error => setNotificationMsg([`contact cannot be created.`,true]))
      resetInputs()
    }
    setTimeout(() => setNotificationMsg(["",false]),notifTime)
  }

  let deletePerson = (idToDelete) => {
    let deleting = persons.filter(prsn => prsn.id == idToDelete)[0]
    if (window.confirm(`Sure to delete ${deleting.name}?.`)){
      personsService.deletePerson(idToDelete)
        .then(deleted => {
          console.log("deleted",deleted)
          setPersons(persons.filter(prsn => prsn.id != idToDelete))
          setNotificationMsg([`${deleting.name} has been deleted.`,true])
          setTimeout(() => setNotificationMsg(""),notifTime)
        })
        .catch(error => setNotificationMsg([`contact cannot be deleted, try again later.`,true]))
      }
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notif conf={notificationMsg}/>
        <Input label="Filter shown with: " onInput={setFilter} value={showingFilter} />
      <h2>Add new contact</h2>
        <NewPerson onChangeName={setNewName} name={newName} onChangeNumber={setNewNumber} number={newNumber} onClick={addNewName}/>
      <h2>Numbers</h2>
      <Contacts contacts={showingPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App

