import axios from "axios"
const baseURL = "/api/persons"
//const baseURL = "http://localhost:3490/api/persons"


const getAll = () => {
    return axios.get(baseURL).then(response => response.data)
}

const createNew = (newPerson) => {
    return axios.post(baseURL, newPerson).then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseURL}/${id}`).then(response => response.data)
}

const updatePerson = (person) => {
    return axios.put(`${baseURL}/${person.id}`,person).then(response => response.data)
}

export default { getAll, createNew, deletePerson, updatePerson }
