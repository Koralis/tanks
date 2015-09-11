function initApp() {
    var upKey;
    var downKey;
    var leftKey;
    var rightKey;
    var spaceKey;
    var projectails;

    game = new Phaser.Game(1024, 768, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    var audioJSON = {
        spritemap: {
            'alien death': {
                start: 1,
                end: 2,
                loop: false
            },
            'boss hit': {
                start: 3,
                end: 3.5,
                loop: false
            },
            'escape': {
                start: 4,
                end: 7.2,
                loop: false
            },
            'meow': {
                start: 8,
                end: 8.5,
                loop: false
            },
            'numkey': {
                start: 9,
                end: 9.1,
                loop: false
            },
            'ping': {
                start: 10,
                end: 11,
                loop: false
            },
            'death': {
                start: 12,
                end: 16.2,
                loop: false
            },
            'shot': {
                start: 17,
                end: 18,
                loop: false
            },
            'squit': {
                start: 19,
                end: 19.3,
                loop: false
            }
        }
    };

    var fx;

    function preload() {

//            game.load.image('logo', 'images/logo.png');
        game.load.image('tank', 'images/tank.png');
        game.load.image('projectail', 'images/projectile.gif');
        game.load.audiosprite('sfx', 'images/fx_mixdown.ogg', null, audioJSON);
        game.stage.backgroundColor = '#000';


        game.load.tilemap('map', 'map.csv', null, Phaser.Tilemap.CSV);
        game.load.image('tiles', 'images/sprite.png');

    }

    function create() {

        fx = game.add.audioSprite('sfx');
        console.debug(fx);
        fx.allowMultiple = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.startSystem(Phaser.Physics.P2JS);

        projectails = game.add.group();
        projectails.outOfBoundsKill = true;

        tanks = game.add.group();

        map = game.add.tilemap('map', 64, 64);
        map.addTilesetImage('tiles');
        layer = map.createLayer(0);
//            layer.resizeWorld();
        map.setTileIndexCallback(16, function(){console.log('fsda')})

        tank = tankModel.createTank(sessionId, null);
        tankModel.sendData();

        game.physics.arcade.enable(tanks, Phaser.Physics.ARCADE);
        tanks.collideWorldBounds = true;
        tanks.enable = true;
        tanks.physicsBodyType = Phaser.Physics.ARCADE;



        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

//            game.camera.follow(tank);

    }

    function update() {

        if (killed)
            return false;

        game.physics.arcade.collide(tank, tanks);


        game.physics.arcade.overlap(projectails, tanks, killTank);
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
        if (tank && tank.can_shoot) {
            fx.play('shot');
            var positions = [];
            positions [0] = [100, 0];
            positions [90] = [0, -100];
            positions [-90] = [0, 100];
            positions [-180] = [-100, 0];

            var projectail = projectails.create(tank.x + positions[tank.angle][0], tank.y - positions[tank.angle][1], 'projectail');
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
        tankModel.killTankSession(tank.session);
    }

    var shootTimeout = function () {

        setTimeout(function () {
            tank.can_shoot = true;
        }, 100);
    }
}