var Game = {
    updateView: function(sessions) {
        var timestamp = new Date(),
            expired = timestamp.getTime() / 1000 - 30,
            killed = true;

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
                else {
                    killed = false;
                }
            }
        }
        //removed lost sessions
        for (var oldSession in tanksSessions) {
            if (!sessions.hasOwnProperty(oldSession)) {
                tanksSessions[oldSession] = null;
                delete tanksSessions[oldSession];
            }
        }

        if (killed) {
            tank.kill();
            tank = null;
        }
    }
};