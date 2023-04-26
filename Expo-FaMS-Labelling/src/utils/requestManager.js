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
    
        if (response.status !== 200) {
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

        //console.log("Close Task Responce: ",response);
    
        if (response.status !== 200 && response.status !== 201) {
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

// add and star a new task
export const addTask = async (userId,taskName) => {
    try {
        let response = await axios.post(
            `${API_BASE_URL}${userId}/addTask`,
            {
                nameTask: taskName,
            }
        );
        //console.log("addTask",response);

        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Failed to fetch users");
        }

        let data = await response.data;

        return data;
    } catch (err) {
        if(axios.isCancel(err)){
            console.log('Data fetching cancelled');
        }else{
            console.log("Error while adding task");
            console.log(err);
        }
    }
}

// add the fatigue value and optional comment
export const addFatigue = async (userId,fatigue,comment) => {
    try {
        let response = await axios.post(
            `${API_BASE_URL}${userId}/addFatigue`,
            {
                fatigue: fatigue,
                comment: comment,
            }
        );
        //console.log("addFatigue",response);
    
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Failed to fetch users");
        }

        let data = await response.data;

        return data;
    } catch (err) {
        if(axios.isCancel(err)){
            console.log('Data fetching cancelled');
        }else{
            console.log("Error while adding fatigue");
            console.log(err);
        }
    }
}

// add the fatigue value and optional comment and save/start the related task
export const addSurvey = async (userId, fatigue, taskName, comment) => {
    try {
        let tasksInProgress = await getTasksInProgress(userId);
        //console.log("Add Survay Task in Progres: ",tasksInProgress);
        
        // check if askInProgress array is empty
        if (tasksInProgress.length > 0) {
            // close the task in progress
            await closeTask(userId)
                .then((response) => {
                    //console.log(response);
                })
                .catch((error) => {console.log(error);});
        }

        const addTaskResult = await addTask(userId, taskName);
        const addFatigueResult = await addFatigue(userId, fatigue, comment);
    } catch (err) {
        console.log("Error while adding survey");
        console.log(err);
    }
}