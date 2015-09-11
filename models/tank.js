var tankModel = {
    sendData: function () {
        var timestamp = new Date();

        userSession.set({
            "x": tank.x,
            "y": tank.y,
            "angle": tank.angle,
            time: timestamp.getTime() / 1000
        });
    },

    createTank: function(session, params) {
        var newTank = game.add.sprite(game.world.centerX, game.world.centerY - 150, 'tank', 2);
        game.physics.arcade.enable([newTank], Phaser.Physics.ARCADE);

        newTank.anchor.setTo(0.5, 0.5);
        newTank.can_shoot = true;


        newTank.body.enable = true;
        newTank.physicsBodyType = Phaser.Physics.ARCADE;
        newTank.body.collideWorldBounds = true;
        newTank.body.bounce.y = 0.95;

        tanks[session] = newTank;

        this.setTankData(tanks[session], params);
    },

    setTankData: function(tank, params) {
        tank.x = params.x;
        tank.y = params.y;
        tank.angle = params.angle;
    }
};