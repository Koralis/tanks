var Game = {
    updateView: function(sessions) {
        var timestamp = new Date(),
            expired = timestamp.getTime() / 1000 - 30,
            tankKilled = true;

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
                    if (!sessions[session].killed)
                        tankKilled = false;
                    else {

                    }
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

        if (tankKilled) {
            killed = true;
            if (tank) {
                tank.kill();
                tank = null;
            }
        }
    }
};