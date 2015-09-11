var Game = {
    updateView: function(sessions) {
        var timestamp = new Date()
            expired = timestamp.getTime() / 1000 - 30;

        for (var session in sessions) {
            if (sessions.hasOwnProperty(session)) {
                if (session != sessionId) {
                    //create tank
                    if (typeof tanksSessions[session] == "undefined") {
                        tankModel.createTank(session, sessions[session]);
                    }
                    //update tank data
                    else {
                        tankModel.setTankData(tanksSessions[session], sessions[session]);
                    }
                }
            }
        }
    }
};