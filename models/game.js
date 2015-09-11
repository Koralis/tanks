var Game = {
    updateView: function(sessions) {
        var timestamp = new Date(),
            expired = timestamp.getTime() / 1000 - 30,
            tankKilled = true;

        for (var session in sessions) {
            if (sessions.hasOwnProperty(session)) {
                if (session != sessionId) {
                    if (!sessions[session].killed && sessions[session].time > expired) {
                        //create tank
                        if (typeof tanksSessions[session] == "undefined" || !tanksSessions[session]) {
                            tankModel.createTank(session, sessions[session]);
                        }
                        //update tank data
                        else {
                            tankModel.setTankData(tanksSessions[session], sessions[session]);
                        }
                    }
                    else if (typeof tanksSessions[session] != "undefined" && tanksSessions[session]) {
                        tanksSessions[session].kill();
                        tanksSessions[session] = null;
                    }
                }
                else {
                    if (!sessions[session].killed)
                        tankKilled = false;
                    else {
                        killed = true;
                    }
                }
            }
        }
        //removed lost sessions
        for (var oldSession in tanksSessions) {
            if (!sessions.hasOwnProperty(oldSession)) {
                tanksSessions[oldSession].kill();
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