<!DOCTYPE html>
<html>
<head>
    <script type="text/javascript" src="phaser/phaser.min.js"></script>
    <script src="https://cdn.firebase.com/js/client/2.2.9/firebase.js"></script>
    <script type="text/javascript" src="models/game.js"></script>
    <script type="text/javascript" src="models/session.js"></script>
    <script type="text/javascript" src="models/tank.js"></script>
    <script type="text/javascript" src="scripts/main.js"></script>
</head>
<body>
<script type="text/javascript">

    window.onload = function() {

        var upKey;
        var downKey;
        var leftKey;
        var rightKey;
        var spaceKey;
        var projectails;
        var bricks;
        var map = [
            ''
        ]

        var game = new Phaser.Game(1024, 768, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

        function preload () {
            game.load.tilemap('map', 'map.csv', null, Phaser.Tilemap.CSV);
            game.load.image('tiles', 'images/sprite.png');

//            game.load.image('logo', 'images/logo.png');
            game.load.image('tank', 'images/tank.png')
            game.load.image('projectail', 'images/projectile.gif')
            game.load.image('bricks', 'images/bricks.png')

        }

        function create () {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.startSystem(Phaser.Physics.P2JS);

            projectails = game.add.group();
            projectails.outOfBoundsKill = true;

            map = game.add.tilemap('map', 64, 64);
            map.addTilesetImage('tiles');
            layer = map.createLayer(0);
//            layer.resizeWorld();
            map.setTileIndexCallback(16, function(){console.log('fsda')})


            tank = game.add.sprite(game.world.centerX, game.world.centerY, 'tank', 2);
            tank2 = game.add.sprite(game.world.centerX, game.world.centerY-150, 'tank', 2);
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

        function update () {

            game.physics.arcade.collide(tank, tank2);

            game.physics.arcade.overlap(projectails, tank2, killTank);
            tank.speed = 0;

            if (spaceKey.isDown) {
                shoot(tank);
            }

            if (upKey.isDown)
            {
                tank.angle = 270;
                tank.speed = 50;
            }
            else if (downKey.isDown)
            {
                tank.angle = 90;
                tank.speed = 50;
            }

            else if (leftKey.isDown)
            {
                tank.angle = 180;
                tank.speed = 50;
            }
            else if (rightKey.isDown)
            {
                tank.angle = 0;
                tank.speed = 50;
            }
            game.physics.arcade.velocityFromRotation(tank.rotation, tank.speed, tank.body.velocity);
            projectails.forEach(moveProcjtails, this);

        }
        function render() {


        }

        function shoot(tank)
        {
            if (tank.can_shoot) {
                var projectail = projectails.create(tank.x, tank.y, 'projectail');
                projectail.speed = 200;
                projectail.angle = tank.angle;
                game.physics.arcade.enable(projectail, Phaser.Physics.ARCADE);

                projectail.body.enable = true;
                projectail.physicsBodyType = Phaser.Physics.ARCADE;

                tank.can_shoot = false;


                shootTimeout();
            }

        }

        function moveProcjtails(projectail)
        {
            game.physics.arcade.velocityFromRotation(projectail.rotation, projectail.speed, projectail.body.velocity);
        }

        function killTank(projectile, tank)
        {
            projectile.kill();
            tank.kill();
        }

        var shootTimeout = function(){

            setTimeout(function(){
                tank.can_shoot = true;
            }, 100);
        }

    var firebase = new Firebase("https://koralis-tanks.firebaseio.com/"),
        sessionId = Session.getId(),
        userSession = firebase.child('sessions/' + sessionId),
        sessionData,
        game,
        tank,
        tanks = {};

    window.onload = function() {
        initApp();

        firebase.child('sessions').on('value', function(snapshot) {
            sessionData = snapshot.val();

            Game.updateView(sessionData);
        });
    };

</script>
</body>
</html>

