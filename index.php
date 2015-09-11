<!DOCTYPE html>
<html>
<head>
    <script type="text/javascript" src="phaser/phaser.min.js"></script>
    <script type="text/javascript" src="scripts/main.js"></script>
</head>
<body>
<script type="text/javascript">

    window.onload = function() {

        var upKey;
        var downKey;
        var leftKey;
        var rightKey;

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

        function preload () {

//            game.load.image('logo', 'images/logo.png');
            game.load.image('tank', 'images/tank.png')

        }

        function create () {

            tank = game.add.sprite(game.world.centerX, game.world.centerY, 'tank');
            tank.anchor.setTo(0.5, 0.5);

            upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        }

        function update () {

            if (upKey.isDown)
            {
                tank.y--;
                tank.angle = 270;
            }
            else if (downKey.isDown)
            {
                tank.y++;
                tank.angle = 90;
            }

            else if (leftKey.isDown)
            {
                tank.x--;
                tank.angle = 180;
            }
            else if (rightKey.isDown)
            {
                tank.x++;
                tank.angle = 0;
            }

        }

    };

</script>
</body>
</html>

