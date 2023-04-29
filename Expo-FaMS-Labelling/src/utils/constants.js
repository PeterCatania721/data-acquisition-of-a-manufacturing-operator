
const Constants = {
    LOGGED_USER_KEY: 'loggedUser',
    OFFLINE_DATA_KEY: 'offlineData',
    OFFLINE_DATA_ISTANCE:  (idUser, fatugue, currentActivity, comment) => { 
        return {
            idUser: idUser,
            fatugue: fatugue,
            currentActivity: currentActivity,
            comment: comment,
            createAt: Date.now(),
        }
    },
    UUID_REGEX: new RegExp('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$'),
    API_BASE_URL: 'http://192.168.1.122:4000/api/v1/',
}

export default Constants;