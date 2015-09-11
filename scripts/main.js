var world = {
        height: 2000,
        width: 1366
    },
    player1,
    cursors,
    last;

window.onload = function () {

    var game = new Phaser.Game(1366, 768, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    function preload() {

        game.stage.backgroundColor = '#EEEEEE';

        game.load.image('tank', 'images/tank1.png');

    }

    function create() {
        game.world.setBounds(0, 0, world.width, world.height);

        player1 = game.add.sprite(0, 0, 'tank');
        //player1.scale.setTo(0.5, 0.5);

        //player1.fixedToCamera = true;
        player1.cameraOffset.setTo(world.width / 2 - (player1.width / 2), 50);

        //game.add.tween(player1.cameraOffset).to( { y: 400 }, 2000, Phaser.Easing.Back.InOut, true, 0, 2000, true);

        cursors = game.input.keyboard.createCursorKeys();
    }

    function update() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            player1.x -= 4;
            player1.x = Math.max(0, player1.x);
            player1.angle = 270;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            player1.x += 4;
            player1.x = Math.min(world.width - player1.width, player1.x);
            player1.angle = 90;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            player1.y -= 4;
            player1.y = Math.max(0, player1.y);
            player1.angle = 0;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            player1.y += 4;
            player1.y = Math.min(world.height - player1.height, player1.y);
            player1.angle = 180;
        }

    }

    function render() {
        game.debug.spriteInfo(player1, 20, 32);
    }

};