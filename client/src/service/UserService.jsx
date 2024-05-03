import axios from 'axios';

const fetchAllUser = () =>{
    return axios.get("/api/users?page=2");
}
export {fetchAllUser}