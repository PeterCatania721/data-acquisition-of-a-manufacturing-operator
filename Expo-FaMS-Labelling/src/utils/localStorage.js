// External imports
import AsyncStorage from "@react-native-async-storage/async-storage";

// Intrenal imports
import Constants from './constants';
import { startTask, addFatigue, closeTask } from "./requestManager";

// Global variables
const { LOGGED_USER_KEY, OFFLINE_DATA_KEY, OFFLINE_DATA_START_TASK_ISTANCE, OFFLINE_DATA_ADD_FATIGUE_ISTANCE, OFFLINE_DATA_END_TASK_ISTANCE} = Constants;

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
        console.log(error);
    }
}

// send data to server
// if the data is sent to the server and the task is ended, delete the data from the array
// otherwise, if the data is sent to the server and the task is not ended, set sentToServer to true
export const sendData = async () => {
    try {
        const data = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        const dataParsed = JSON.parse(data);
        let newData = dataParsed;

        if (!dataParsed)
            return;

        dataParsed.forEach(async item => {
            if (item.startTask && item.startTask.sendedToServer === false) {

                await startTask(item.startTask.idUser, item.startTask.currentActivity, item.startTask.startedAt);
                item.startTask.sendedToServer = true;

            } else if (item.addFatigue && item.addFatigue.sendedToServer === false) {

                await addFatigue(item.addFatigue.idUser, item.addFatigue.fatigue, item.addFatigue.currentActivity, item.addFatigue.comment, item.addFatigue.createdAt);
                item.addFatigue.sendedToServer = true;

            } else if (item.endTask && item.endTask.sendedToServer === false) {

                await endTask(item.endTask.idUser);

                // delete all data saved of the user that ended the task
                newData = newData.filter(i => {
                    if(i.startTask && i.startTask.idUser === item.endTask.idUser) {
                        return false;
                    } else if (i.addFatigue && i.addFatigue.idUser === item.endTask.idUser) {
                        return false;
                    }

                    return true;
                });
            }
        });

        await AsyncStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(newData));
    } catch (error) {
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

        // if there is a start task and there is not an end task, return the current activity
        return start && !end ? start.startTask.currentActivity : null;
    } catch (error) {
        console.log(error);
    }
}



// create method to save survay ==> saveSurvey(idUser, fatigue, currentActivity, comment, sentToServer)
// create method to save start task ==> saveStartTask(idUser, currentActivity, sentToServer)
// create method to get local data to be sent to server ==> getDataToSent()
// create method to delete data ==> deleteUselessData() ==> delete all data with sendedToServer === true and endedAt !== null
// create method to stop activity started ==> stopActivity(idUser, sendedToServer) ==> set endedAt to Date.now() and if it is not a survey renamete the key from startTask to survey
// create method to start activity ==> startActivity(idUser, currentActivity) ==> set startedAt to Date.now() and endedAt to null, adding the key startTask

// save survey
/*export const saveSurvey = async (idUser, fatigue, currentActivity, comment, sentToServer) => {
    try {
        const data = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        const dataParsed = JSON.parse(data);

        // if is contained a startedTask or a survey with the same idUser and endedAt === null and same currentActivity, update the object
        // if is contained a startedTask or a survey with the same idUser and endedAt === null but different currentActivity, stop the current task, and add a new object to the array
        // else add a new object to the array
        let newItem;
        const sameActivityWasStarted = false;
        const newData = dataParsed.map(item => {
            if (item.startTask && item.startTask.idUser === idUser && item.startTask.endedAt === null && item.startTask.currentActivity === currentActivity) {
                item = OFFLINE_DATA_SURVEY_ISTANCE(
                    idUser, 
                    [fatigue], 
                    [Date.now()], 
                    currentActivity, 
                    comment, 
                    item.startTask.startedAt,
                    sentToServer
                );
                sameActivityWasStarted = true;
            } else if (item.survey && item.survey.idUser === idUser && item.survey.endedAt === null && item.survey.currentActivity === currentActivity) {
                item = OFFLINE_DATA_SURVEY_ISTANCE(
                    idUser, 
                    [...item.survey.fatigue, fatigue],
                    [...item.survey.fatigueTimeStamp, Date.now()],
                    currentActivity, 
                    comment, 
                    item.survey.startedAt, 
                    sentToServer
                );
                sameActivityWasStarted
            } else if (item.startTask && item.startTask.idUser === idUser && item.startTask.endedAt === null && item.startTask.currentActivity !== currentActivity) {
                item.startTask.endedAt = Date.now();
            } else if (item.survey && item.survey.idUser === idUser && item.survey.endedAt === null && item.survey.currentActivity !== currentActivity) {
                item.survey.endedAt = Date.now();
            }

            return item;
        });

        if (!sameActivityWasStarted) {
            dataParsed.push(OFFLINE_DATA_SURVEY_ISTANCE(
                idUser, 
                [fatigue], 
                [Date.now()],
                currentActivity, 
                comment, 
                Date.now(), 
                sentToServer
            ));
        }

        await AsyncStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(newData));
    } catch (err) {
        throw err;
    }
}

// save start task
export const saveStartTask = async (idUser, currentActivity, sentToServer) => {
    try {
        const data = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        const dataParsed = JSON.parse(data);

        // if is contained a startedTask or a survey with the same idUser and endedAt === null and same currentActivity, close the current task and add a new object to the array
        // else add a new object to the array

        let newItem;
        const sameActivityWasStarted = false;
        const newData = dataParsed.map(item => {
            if (item.startTask && item.startTask.idUser === idUser && item.startTask.endedAt === null && item.startTask.currentActivity === currentActivity) {
                item.startTask.endedAt = Date.now();
                sameActivityWasStarted = true;
            } else if (item.survey && item.survey.idUser === idUser && item.survey.endedAt === null && item.survey.currentActivity === currentActivity) {
                item.survey.endedAt = Date.now();
                sameActivityWasStarted = true;
            }

            return item;
        });

        if (!sameActivityWasStarted) {
            dataParsed.push(OFFLINE_DATA_START_TASK_ISTANCE(
                idUser,
                currentActivity,
                Date.now(),
                sentToServer
            ));
        }

        await AsyncStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(newData));
    } catch (err) {
        throw err;
    }
}

// delete data only if the data is sended to server and has a endedAt value
export const deleteUselessData = async () => {
    try {
        const data = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        const dataParsed = JSON.parse(data);

        const newData = dataParsed.filter(item => {
            if (item.sendedToServer === true && item.endedAt !== null) {
                return false; // delete the data that is sended to server and has a endedAt value
            }
            return true;
        });

        await AsyncStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(newData));
    } catch (err) {
        throw err;
    }
}


// get data that can be sended to server, so data with sendedToServer === false and endedAt !== null
export const getDataToSent = async () => {
    try {
        const data = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        const dataParsed = JSON.parse(data);

        const newData = dataParsed.filter(item => {
            if (item.sendedToServer === false && item.endedAt !== null) {
                return true; // return the data that is not sended to server and has a endedAt value
            }
            return false;
        });

        return newData;
    } catch (err) {
        throw err;
    }
}

// stop activity
export const stopActivity = async (idUser, sendedToServer) => {
    try {
        const data = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        const dataParsed = JSON.parse(data);

        // from end of the array to start, the first element that has the same idUser and endedAt === null will be updated
        for (let i = dataParsed.length - 1; i >= 0; i--) {
            if (dataParsed[i].startTask && dataParsed[i].startTask.idUser === idUser && dataParsed[i].startTask.endedAt === null) {

                // OFFLINE_DATA_SURVEY_ISTANCE:  (idUser, fatigue, currentActivity, comment, startedAt, sentToServer) 
                dataParsed[i] = OFFLINE_DATA_SURVEY_ISTANCE(
                    idUser, 
                    null, 
                    dataParsed[i].startTask.currentActivity, 
                    null,
                    dataParsed[i].startTask.startedAt, 
                    sendedToServer
                );

                dataParsed[i].startTask.endedAt = Date.now();
                break;

            } else if (dataParsed[i].survey && dataParsed[i].survey.idUser === idUser && dataParsed[i].survey.endedAt === null) {
                dataParsed[i].survey.endedAt = Date.now();
                dataParsed[i].survey.sendedToServer = sendedToServer;
                break;
            }
        }

        await AsyncStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(dataParsed));
    } catch (err) {
        throw err;
    }
}


// send data
export const sendLocalDataToServer = async (dataInstance) => {
    try {
        // send data to server
        // if the server return a success, delete the data from local storage
        // else, do nothing
    } catch (err) {
        throw err;
    }
}*/