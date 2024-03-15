import Input from "./Input.jsx"

export default function NewPerson({onChangeName, name, onChangeNumber, number, onClick}){
    return(
        <form>
            <Input label="Name" onChange={onChangeName} value={name}/>
            <Input label="Number" onChange={onChangeNumber} value={number}/>
            <div>
            <button onClick={onClick} type="submit">add</button>
            </div>
      </form>
    )
}
