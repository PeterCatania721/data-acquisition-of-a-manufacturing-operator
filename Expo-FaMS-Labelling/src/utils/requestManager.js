import axios from 'axios';
import Constants from './constants';
const {API_BASE_URL} = Constants;

//get users from db
export const fetchUsers = async () => {
    try {
        let response = await axios.get(`${API_BASE_URL}getUser`);

        if (response.status !== 200) {
            throw new Error("Failed to fetch users");
        }

        let users = await response.data.users;

        let usersList = [];
        users.forEach(user => {
            usersList.push({label: user.idUser, value: user.idUser});
        });

        return usersList;
    } catch (err) {
        if(axios.isCancel(err)){
            console.log('Data fetching cancelled');
        }else{
            console.log("Error while fetching users");
            console.log(err);
        }
    }
}

//post create user, and return idUser of the new user
export const createUser = async () => {
    try {
        let response = await axios.post(`${API_BASE_URL}createUser`);
    
        if (response.status !== 201 && response.status !== 200) {
            throw new Error("Failed to fetch users");
        }

        let idUser = await response.data.user.idUser;

        return idUser;
    } catch (err) {
        if(axios.isCancel(err)){
            console.log('Data fetching cancelled');
        }else{
            console.log("Error while creating user");
            console.log(err);
        }
    }
}

export const getTasksInProgress = async (userId) => {
    try {
        let response = await axios.get(`${API_BASE_URL}${userId}/getTaskInProgress`);
    
        if (response.status !== 201 && response.status !== 200) {
            throw new Error("Failed to fetch users");
        }

        let tasks = await response.data.tasks;

        if (tasks !== null && tasks !== undefined && tasks.length > 0) {
            return tasks;
        }

        return [];
    } catch (err) {
        if(axios.isCancel(err)){
            console.log('Data fetching cancelled');
        }else{
            console.log("Error while fetching tasks in progress");
            console.log(err);
        }
    }
}

export const closeTask = async (userId) => {
    try {
        let response = await axios.post(`${API_BASE_URL}${userId}/closeTask`);
    
        if (response.status !== 201 && response.status !== 200) {
            throw new Error("Failed to fetch users");
        }

        let data = await response.data;

        return data;
    } catch (err) {
        if(axios.isCancel(err)){
            console.log('Data fetching cancelled');
        }else{
            console.log("Error while closing task");
            console.log(err);
        }
    }
}