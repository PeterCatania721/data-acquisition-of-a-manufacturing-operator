
const Constants = {
    LOGGED_USER_KEY: 'loggedUser',
    OFFLINE_DATA_KEY: 'offlineData',
    OFFLINE_DATA_START_TASK_ISTANCE:  (idUser,  currentActivity, startedAt, sentToServer) => { 
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
    OFFLINE_GROUP_TASKS_KEY: 'offlineGroupTasks',
    OFFLINE_USERS_KEY: 'offlineUsers',
    UUID_REGEX: new RegExp('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$'),
    API_BASE_URL: 'http://192.168.1.122:4000/api/v1/',
}

export default Constants;