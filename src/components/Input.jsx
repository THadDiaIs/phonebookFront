
const Input = ({label, onChange, onInput, value}) => {
    return (
        <div>
            <label>
                {label}: <input onChange={onChange ? (e) => onChange(e.target.value) : undefined} value={value}
                    onInput={onInput ? (e) => onInput(e.target.value) : undefined}/>
            </label>
        </div>
    )
}

export default Input
