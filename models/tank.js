var tankModel = {
    sendData: function () {
        if (!tank || killed)
            return false;
        var timestamp = new Date();

        userSession.child("x").set(tank.x);
        userSession.child("y").set(tank.y);
        userSession.child("angle").set(tank.angle);
        userSession.child("time").set(timestamp.getTime() / 1000);
    },

    createTank: function(session, params) {
        var newTank = tanks.create(game.world.centerX, game.world.centerY - 150, 'tank', 2);
        newTank.session = session;
        game.physics.enable(newTank);
        game.physics.arcade.enable(newTank, Phaser.Physics.ARCADE);
        newTank.anchor.setTo(0.5, 0.5);
        newTank.scale.setTo(0.75, 0.75);
        newTank.can_shoot = true;


        newTank.body.enable = true;
        newTank.physicsBodyType = Phaser.Physics.ARCADE;
        newTank.body.collideWorldBounds = true;
        newTank.body.bounce.y = 0.95;
        newTank.body.linearDamping = 1;
        game.camera.follow(newTank);

        tanksSessions[session] = newTank;

        return this.setTankData(tanksSessions[session], params);
    },

    createMyTank: function(session, params) {
        var newTank = tanksMe.create(game.world.centerX, game.world.centerY - 150, 'tank', 2);
        newTank.session = session;
        game.physics.enable(newTank);
        game.physics.arcade.enable(newTank, Phaser.Physics.ARCADE);
        newTank.anchor.setTo(0.5, 0.5);
        newTank.scale.setTo(0.75, 0.75);
        newTank.can_shoot = true;


        newTank.body.enable = true;
        newTank.physicsBodyType = Phaser.Physics.ARCADE;
        newTank.body.collideWorldBounds = true;
        newTank.body.bounce.y = 0.95;
        newTank.body.linearDamping = 1;
        game.camera.follow(newTank);

        tanksSessions[session] = newTank;

        return this.setTankData(tanksSessions[session], params);
    },

    setTankData: function(newTank, params) {
        if (!newTank)
            return false;
        if (params) {
            newTank.x = params.x;
            newTank.y = params.y;
            newTank.angle = params.angle;
        }
        //generate random location
        else {
            var positioned = false;
            do {
                var x = Math.floor((Math.random() * map.width));
                var y = Math.floor((Math.random() * map.height));
                if (!map.hasTile(x, y, layer)) {
                    newTank.x = x * map.tileWidth + (map.tileWidth / 2);
                    newTank.y = y * map.tileHeight + (map.tileHeight / 2);
                    positioned = true;
                }
            }
            while(!positioned);
        }


        return newTank;
    },

    killTankSession: function(session) {
        firebase.child('sessions/' + session + '/killed').set(true);
    }
};