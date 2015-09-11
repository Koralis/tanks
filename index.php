<!DOCTYPE html>
<html>
<head>
    <script type="text/javascript" src="phaser/phaser.min.js"></script>
    <script type="text/javascript" src="scripts/main.js"></script>
</head>
<body>
<script type="text/javascript">

    window.onload = function() {

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });

        function preload () {

            game.load.image('logo', 'images/logo.png');

        }

        function create () {

            var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);

        }

    };

</script>
</body>
</html>

