function initApp() {
    var upKey;
    var downKey;
    var leftKey;
    var rightKey;
    var spaceKey;
    var projectails;

    game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    function preload() {

//            game.load.image('logo', 'images/logo.png');
        game.load.image('tank', 'images/tank.png')
        game.load.image('projectail', 'images/projectile.gif')
        game.stage.backgroundColor = '#EEEEEE';

    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        projectails = game.add.group();

        tank = game.add.sprite(game.world.centerX, game.world.centerY, 'tank', 2);
        tank2 = game.add.sprite(game.world.centerX, game.world.centerY - 150, 'tank', 2);
        tank.anchor.setTo(0.5, 0.5);
        tank.can_shoot = true;

        game.physics.arcade.enable([tank, tank2], Phaser.Physics.ARCADE);
        tank.body.collideWorldBounds = true;
        tank.body.enable = true;
        tank.physicsBodyType = Phaser.Physics.ARCADE;


        tank2.body.enable = true;
        tank2.physicsBodyType = Phaser.Physics.ARCADE;
        tank2.body.collideWorldBounds = true;
        tank2.body.bounce.y = 0.95;

        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

//            game.camera.follow(tank);

    }

    function update() {

        game.physics.arcade.collide(tank, tank2);


        game.physics.arcade.overlap(projectails, tank2, killTank);
        tank.speed = 0;

        if (spaceKey.isDown) {
            shoot(tank);
            tankModel.sendData();
        }

        if (upKey.isDown) {
            tank.angle = 270;
            tank.speed = 50;
        }
        else if (downKey.isDown) {
            tank.angle = 90;
            tank.speed = 50;
        }

        else if (leftKey.isDown) {
            tank.angle = 180;
            tank.speed = 50;
        }
        else if (rightKey.isDown) {
            tank.angle = 0;
            tank.speed = 50;
        }

        game.physics.arcade.velocityFromRotation(tank.rotation, tank.speed, tank.body.velocity);
        projectails.forEach(moveProcjtails, this);

        //update DB
        if (tank.speed) {
            tankModel.sendData();
        }
    }

    function render() {


    }

    function shoot(tank) {
        if (tank.can_shoot) {
            var projectail = projectails.create(tank.x, tank.y, 'projectail');
            projectail.speed = 200;
            projectail.angle = tank.angle;
            game.physics.arcade.enable(projectail, Phaser.Physics.ARCADE);

            projectail.body.collideWorldBounds = true;
            projectail.body.enable = true;
            projectail.physicsBodyType = Phaser.Physics.ARCADE;

            tank.can_shoot = false;


            shootTimeout();
        }

    }

    function moveProcjtails(projectail) {
        game.physics.arcade.velocityFromRotation(projectail.rotation, projectail.speed, projectail.body.velocity);
    }

    function killTank(projectile, tank) {
        projectile.kill();
        tank.kill();
    }

    var shootTimeout = function () {

        setTimeout(function () {
            tank.can_shoot = true;
        }, 100);
    }
}