// External imports
import AsyncStorage from "@react-native-async-storage/async-storage";

// Intrenal imports
import Constants from './constants';
import {
    fetchUsers,
    getGroupTasks, 
    uploadStartTask,
    uploadFatigue,
    uploadEndTask,
} from "./requestManager";

// Global variables
const { 
    LOGGED_USER_KEY, OFFLINE_DATA_KEY, 
    OFFLINE_DATA_START_TASK_ISTANCE, 
    OFFLINE_DATA_ADD_FATIGUE_ISTANCE, 
    OFFLINE_DATA_END_TASK_ISTANCE,
    OFFLINE_GROUP_TASKS_KEY,
    OFFLINE_USERS_KEY,
} = Constants;

// Save data to async storage
// save everithing in array, the last operation is the last element of the array
// when the user is online, send all the data to the server, from the first to the last element of the array
// and delete from the array  only if the releted task is ended
// the data is saved ad stringified json, like this: 

/*OFFLINE_DATA_START_TASK_ISTANCE:  (idUser,  currentActivity, startedAt, sentToServer) => { 
        return { startTask: {
            idUser: idUser,
            currentActivity: currentActivity,
            startedAt: startedAt,
            sendedToServer: sentToServer,
        }}
    },
    OFFLINE_DATA_ADD_FATIGUE_ISTANCE: (idUser, fatigue, currentActivity, comment, createdAt, sentToServer) => {
        return { addFatigue: {
            idUser: idUser,
            fatigue: fatigue,
            currentActivity: currentActivity,
            comment: comment,
            createdAt: createdAt,
            sendedToServer: sentToServer,
        }}
    },
    OFFLINE_DATA_END_TASK_ISTANCE:  (idUser,  currentActivity, finishedAt, sentToServer) => {
        return { endTask: {
            idUser: idUser,
            currentActivity: currentActivity,
            finishedAt: finishedAt,
            sendedToServer: sentToServer,
        }}
    },

// if the user is offline, sentToServer will be set to false, and the data will be saved in the array
// if the user is online, sentToServer will be set to true, also the data will be saved in the array but only if is a task not ended
*/

// save in localstorage that a task is started
export const saveStartTask = async (currentActivity, sentToServer) => {
    try {
        const data = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        const userId = await AsyncStorage.getItem(LOGGED_USER_KEY);
        let dataParsed = JSON.parse(data);

        if (!dataParsed)
            dataParsed = [];

        dataParsed.push(OFFLINE_DATA_START_TASK_ISTANCE(
            userId, 
            currentActivity, 
            Date.now(), 
            sentToServer
        ));

        console.log("Save start task");
        console.log(dataParsed);
        await AsyncStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(dataParsed));
    } catch (error) {
        console.log("error while saving start task in local storage");
        console.log(error);
    }
}

// save in localstorage that a fatigue is added
export const saveAddFatigue = async (fatigue, currentActivity, comment, sentToServer) => {
    try {
        const data = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        const userId = await AsyncStorage.getItem(LOGGED_USER_KEY);
        let dataParsed = JSON.parse(data);

        if (!dataParsed)
            dataParsed = [];

        dataParsed.push(OFFLINE_DATA_ADD_FATIGUE_ISTANCE(
            userId,
            fatigue,
            currentActivity,
            comment,
            Date.now(),
            sentToServer
        ));

        console.log("Save add fatigue");
        console.log(dataParsed);
        await AsyncStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(dataParsed));
    } catch (error) {
        console.log("error while saving add fatigue in local storage");
        console.log(error);
    }
}

// save in localstorage that a task is ended
export const saveEndTask = async (currentActivity, sentToServer) => {
    try {
        const data = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        const userId = await AsyncStorage.getItem(LOGGED_USER_KEY);
        let dataParsed = JSON.parse(data);

        if (!dataParsed)
            dataParsed = [];

        dataParsed.push(OFFLINE_DATA_END_TASK_ISTANCE(
            userId,
            currentActivity,
            Date.now(),
            sentToServer
        ));

        console.log("Save end task");
        console.log(dataParsed);
        await AsyncStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(dataParsed));
    } catch (error) {
        console.log("error while saving end task in local storage");
        console.log(error);
    }
}

// save survaey data in localstorage
export const saveSurveyData = async (fatigue, currentActivity, comment, sentToServer) => {
    try {
        const data = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        const userId = await AsyncStorage.getItem(LOGGED_USER_KEY);
        let dataParsed = JSON.parse(data);

        if (!dataParsed)
            dataParsed = [];

        let start;
        let end;
        let startedDifferent;
        let endedDifferent;
        
        for (let i = dataParsed.length - 1; i >= 0; i--) {
            if (dataParsed[i].startTask && dataParsed[i].startTask.idUser === userId) {
                if(dataParsed[i].startTask.currentActivity === currentActivity) {
                    start = dataParsed[i];
                    break;
                }

                startedDifferent = dataParsed[i];
                break;
                
            } else if (dataParsed[i].endTask && dataParsed[i].endTask.idUser === userId) {
                if(dataParsed[i].endTask.currentActivity === currentActivity) 
                    end = dataParsed[i];
                else
                    endedDifferent = dataParsed[i];
            } 
        }

        if(startedDifferent && !endedDifferent) {
            dataParsed.push(OFFLINE_DATA_END_TASK_ISTANCE(
                userId,
                startedDifferent.startTask.currentActivity,
                Date.now(),
                sentToServer
            ));
            dataParsed.push(OFFLINE_DATA_START_TASK_ISTANCE(
                userId,
                currentActivity,
                Date.now(),
                sentToServer
            ));
        } else if (!start && !end) {
            dataParsed.push(OFFLINE_DATA_START_TASK_ISTANCE(
                userId,
                currentActivity,
                Date.now(),
                sentToServer
            ));
        }

        dataParsed.push(OFFLINE_DATA_ADD_FATIGUE_ISTANCE(
            userId,
            fatigue,
            currentActivity,
            comment,
            Date.now(),
            sentToServer
        ));

        console.log("Save survey data");
        console.log(dataParsed);
        await AsyncStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(dataParsed));
    } catch (error) {
        console.log("error while save survey data");
        console.log(error);
    }
}

        

// get all offline data
export const getData = async () => {
    try {
        const data = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        const dataParsed = JSON.parse(data);
        return dataParsed;
    } catch (error) {
        console.log("error while get local data");
        console.log(error);
    }
}

// send data to server
// if the data is sent to the server and the task is ended, delete the data from the array
// otherwise, if the data is sent to the server and the task is not ended, set sentToServer to true
export const sendData = async () => {
    console.log("send data");
    try {
        const data = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        const dataParsed = JSON.parse(data);
        let newData = [];

        if (!dataParsed)
            return;

        dataParsed.forEach(async item => {
            if (item.startTask && item.startTask.sendedToServer === false) {
                await uploadStartTask(item.startTask.idUser, item.startTask.currentActivity, item.startTask.startedAt);
                item.startTask.sendedToServer = true;
                newData.push(item);

            } else if (item.addFatigue && item.addFatigue.sendedToServer === false) {

                await uploadFatigue(item.addFatigue.idUser, item.addFatigue.fatigue, item.addFatigue.comment, item.addFatigue.createdAt, item.addFatigue.currentActivity);
                item.addFatigue.sendedToServer = true;
                newData.push(item);

            } else if (item.endTask && item.endTask.sendedToServer === false) {

                await uploadEndTask(item.endTask.idUser, item.endTask.currentActivity, item.endTask.endedAt);
                item.endTask.sendedToServer = true;
                newData.push(item);
                
                // delete all data saved of the user that ended the task
                newData = newData.filter(item => item.endTask.idUser !== item.endTask.idUser);
            }
        });

        console.log("new data: ", newData);
        await AsyncStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(newData));
    } catch (error) {
        console.log("error whule sending data to server");
        console.log(error);
    }
}

// get the current activity, that is started but not ended
export const getCurrentActivity = async () => {
    try {
        const data = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        const userId = await AsyncStorage.getItem(LOGGED_USER_KEY);
        const dataParsed = JSON.parse(data);

        // if dataParsed is empty, return null
        if ( !dataParsed || dataParsed.length === 0)
            return null;

        let start;
        let end;
        
        for (let i = dataParsed.length - 1; i >= 0; i--) {
            if (dataParsed[i].startTask && dataParsed[i].startTask.idUser === userId) {
                start = dataParsed[i];
                break;
            } else if (dataParsed[i].endTask && dataParsed[i].endTask.idUser === userId) {
                end = dataParsed[i];
            }
        }

       //console.log("start", start && !end ? "true" : "false", "\n" + start,"\n" + end, "\n" , dataParsed);
        // if there is a start task and there is not an end task, return the current activity
        return start && !end ? start.startTask.currentActivity : null;
    } catch (error) {
        console.log("error while getting current activity");
        console.log(error);
    }
}

// init data for offline mode
export const initOfflineData = async () => {
    try {
        const groupTask =  await getGroupTasks();
        await AsyncStorage.setItem(OFFLINE_GROUP_TASKS_KEY, JSON.stringify(groupTask));

        const users = await fetchUsers();
        await AsyncStorage.setItem(OFFLINE_USERS_KEY, JSON.stringify(users));

        console.log("init offline data");
    } catch (error) {
        console.log("Error while init offline data");
        console.log(error);
    }
}

// get group tasks
export const getOfflineGroupTasks = async () => {
    try {
        const getGroupTasks = await AsyncStorage.getItem(OFFLINE_GROUP_TASKS_KEY);
        const groupTasksParsed = JSON.parse(getGroupTasks);

        return groupTasksParsed && groupTasksParsed.tasks ? groupTasksParsed.tasks : [];
    } catch (error) {
        console.log("error while get group tasks");
        console.log(error);
    }
}

// get group tasks by group 
export const getOfflineGroupTasksByGroup = async (group) => {
    if(gorup === null || group === undefined)
        return [];

    try {
        const getGroupTasks = await AsyncStorage.getItem(OFFLINE_GROUP_TASKS_KEY);
        const groupTasksParsed = JSON.parse(getGroupTasks);

        return groupTasksParsed ? groupTasksParsed.filter(task => task.group === group) : [];
    } catch (error) {
        console.log("error while get group tasks");
        console.log(error);
    }
}

// get users
export const getOfflineUsers = async () => {
    try {
        const getUsers = await AsyncStorage.getItem(OFFLINE_USERS_KEY);
        const usersParsed = await JSON.parse(getUsers);

        return usersParsed;
    } catch (error) {
        console.log("error while get users");
        console.log(error);
    }
}

// clear all data
export const clearAllData = async () => {
    try {
        await AsyncStorage.removeItem(OFFLINE_DATA_KEY);
        await AsyncStorage.removeItem(OFFLINE_GROUP_TASKS_KEY);
        await AsyncStorage.removeItem(OFFLINE_USERS_KEY);
        await AsyncStorage.removeItem(LOGGED_USER_KEY);
    } catch (error) {
        console.log("error while clearing all data");
        console.log(error);
    }
}