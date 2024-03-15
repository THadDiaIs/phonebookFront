import Contact from "./Contact"

const Contacts = ({ contacts, deletePerson }) => {
    if (contacts.length > 0) {
        return (
            <div>
                {contacts.map(contact => <Contact key={contact.name} person={contact} deletePerson={deletePerson} />)}
            </div>
        )
    }
    return (<div><p>No contacts</p></div>)

}

export default Contacts
