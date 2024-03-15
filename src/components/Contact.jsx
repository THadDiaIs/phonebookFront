
const Contact = ({ person:{name, id, number}, deletePerson }) => {
    return (
        <div><label>{name} : {number}</label> <button  id={id} onClick={(event)=> deletePerson(event.target.id)}>Delete</button> </div>
    )
}

export default Contact
