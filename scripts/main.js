function initApp() {
    var upKey;
    var downKey;
    var leftKey;
    var rightKey;
    var spaceKey;
    var projectails;
    var explosion;
    var shot;

    game = new Phaser.Game(1024, 768, Phaser.AUTO, 'gameWrapper', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    function preload() {

//            game.load.image('logo', 'images/logo.png');
        game.load.image('tank', 'images/tank.png');
        game.load.image('projectail', 'images/projectile.gif');
        game.load.audio('explosion', 'images/sentry_explode.wav');
        game.load.audio('shot', 'images/shot1.wav');
        game.stage.backgroundColor = '#000';


        game.load.tilemap('map', 'map.csv', null, Phaser.Tilemap.CSV);
        game.load.image('tiles', 'images/sprite.png');

    }

    function create() {

        explosion = game.add.audio('explosion');
        shot = game.add.audio('shot');

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.startSystem(Phaser.Physics.P2JS);

        projectails = game.add.group();
        projectails.outOfBoundsKill = true;

        tanks = game.add.group();
        tanksMe =game.add.group();

        map = game.add.tilemap('map', 64, 64);
        map.addTilesetImage('tiles');

        map.setCollisionBetween(0, 100);
        map.setCollision(16);
        //map.setTileIndexCallback(16, function(){console.log('fsda')})
        layer = map.createLayer(0);
        layer.resizeWorld();

        tank = tankModel.createMyTank(sessionId, null);
        tankModel.sendData();

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

        // Collides
        game.physics.arcade.collide(tank, tanks);
        game.physics.arcade.collide(tanks, layer);
        game.physics.arcade.collide(tanksMe, layer);
        game.physics.arcade.collide(projectails, layer, destroyWall);
        game.physics.arcade.collide(projectails, game.world, destroyWall);
        //

        // Overlaps
        game.physics.arcade.overlap(projectails, tanks, killTank);
        //

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
            shot.play();
            var positions = [];
            positions [0] = [33, 0];
            positions [90] = [0, -33];
            positions [-90] = [0, 33];
            positions [-180] = [-33, 0];

            var projectail = projectails.create(tank.x + positions[tank.angle][0], tank.y - positions[tank.angle][1], 'projectail');
            projectail.speed = 200;
            projectail.angle = tank.angle;
            game.physics.arcade.enable(projectail, Phaser.Physics.ARCADE);

            projectail.body.collideWorldBounds = false;
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
        explosion.play();
        projectile.kill();
        tank.kill();
        tankModel.killTankSession(tank.session);
    }

    var shootTimeout = function () {

        setTimeout(function () {
            tank.can_shoot = true;
        }, 100);
    }

    function destroyWall (projectile, layer) {
        projectile.kill();
        removeTile(layer);
        
        //console.log(layer);
    }

    function removeTile(tile){
        map.removeTile(tile.x, tile.y);
    };
}