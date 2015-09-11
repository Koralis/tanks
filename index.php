<!DOCTYPE html>
<html>
<head>
    <script type="text/javascript" src="phaser/phaser.min.js"></script>
    <script src="https://cdn.firebase.com/js/client/2.2.9/firebase.js"></script>
    <script type="text/javascript" src="models/game.js"></script>
    <script type="text/javascript" src="models/session.js"></script>
    <script type="text/javascript" src="models/tank.js"></script>
    <script type="text/javascript" src="scripts/main.js"></script>
    <style type="text/css">
        * {
            margin: 0;
        }
        body {
            background: #000;
            position: relative;
            text-align: center;
        }
        #gameWrapper {
            width: 1024px;
            height: 768px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <br>
    <img src="images/logo.png" />
    <br><br>
    <div id="gameWrapper"></div>
    <script type="text/javascript">

    var firebase = new Firebase("https://koralis-tanks2.firebaseio.com/"),
        sessionId = Session.getId(),
        userSession = firebase.child('sessions/' + sessionId),
        sessionData,
        game,
        tank,
        tanksSessions = {},
        tanks,
        killed = false;

        window.onload = function () {
            initApp();

            firebase.child('sessions').on('value', function (snapshot) {
                sessionData = snapshot.val();

                Game.updateView(sessionData);
            });
        };

    </script>
</body>
</html>

