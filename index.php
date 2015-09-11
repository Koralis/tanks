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

    var firebase = new Firebase("https://koralis-tanks2.firebaseio.com/"),
        sessionId = Session.getId(),
        userSession = firebase.child('sessions/' + sessionId),
        sessionData,
        game,
        tank,
        tanksSessions = {},
        tanks;

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

