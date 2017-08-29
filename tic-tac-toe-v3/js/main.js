var module = (function() {

    const start = document.getElementById("start");//variable for div with start screen
    const startClick = document.getElementById("click");//variable for start screen button
    const board = document.getElementById("board");//variable for board screen
    const finish = document.getElementById("finish");//variable for finish board
    const o = document.getElementById('player1');//variable for player one
    const x = document.getElementById('player2');//variable for player 2
    const boxes = document.getElementsByClassName("box");//variable for tic-tac-toe boxes

    $(board).hide();//hide game board
    $(finish).hide()//hide ending board

    $(document).ready(function() {
        $(startClick).click(function() {//when start button is clicked
            $(start).hide();//hide start screen
            $(board).show();//show game board
            $(o).addClass("active");//player o has the class of "active"
        });
        $(boxes).mouseover(mouseoverImage);//mousover calls mouseoverImage function
        $(boxes).mouseout(mouseoutImage);//mouseout calls mouseoutImage function
        $(boxes).click(playMove);//when tic tac toe box clicked, run playMove function
    });


    //when box is clicked have it display "o" and vice versa.
    function playMove() {
        if (this.classList.contains("box-filled-1") || this.classList.contains("box-filled-2")) {
            return false;
        }//if box is already clicked and has one of two classes, don't change it
        if (o.classList.contains("active")) {
            $(this).addClass("box-filled-1");
            $(this).unbind("mouseover mouseout");//mouseover and mouseout effects disabled after selection
        } else {
            $(this).addClass("box-filled-2");
            $(this).unbind("mouseover mouseout");
        }
        checkwin();//when player takes turn run the checkwin function
        switchPlayer();//run switchPlayer function
    }

    function switchPlayer() {
        if (o.classList.contains("active")) {//if player o has the class of active
            $(o).removeClass("active");//remove the class
            $(x).addClass("active");//add the class to player x
        } else {
            $(x).removeClass("active");//and vice versa
            $(o).addClass("active");
        }
    }

    //setting styles when boxes are moused over depending on active player

    function mouseoverImage() {
        if (o.classList.contains("active")) {
            this.style.backgroundImage = 'url("img/o.svg")';
        } else {
            this.style.backgroundImage = 'url("img/x.svg")';
        }
    }

    //makes sure mouseover image goes away when pointer isn't on one of the boxes.

    function mouseoutImage() {
        this.style.backgroundImage = '';
    }

    //function to check for a winner

    function checkwin() {
        // empty array of moves
        var winning = [];
        //Loop over boxes and push placed peices into array.
        $(boxes).each(function() {
            if ($(this).hasClass('box-filled-1')) {
                winning.push("player1");
            } else if ($(this).hasClass('box-filled-2')) {
                winning.push("player2");
            } else {
                winning.push("empty");
            }
        });
        // Check the array to find the winner or the tie.
        if (winning[0] !== "empty" && winning[0] === winning[1] && winning[1] === winning[2]) {
            winner = winning[0];
            showWinner();
        } else if (winning[3] !== "empty" && winning[3] === winning[4] && winning[4] === winning[5]) {
            winner = winning[3];
            showWinner();
        } else if (winning[6] !== "empty" && winning[6] === winning[7] && winning[7] === winning[8]) {
            winner = winning[6];
            showWinner();
        } else if (winning[0] !== "empty" && winning[0] === winning[3] && winning[3] === winning[6]) {
            winner = winning[0];
            showWinner();
        } else if (winning[1] !== "empty" && winning[1] === winning[4] && winning[4] === winning[7]) {
            winner = winning[1];
            showWinner();
        } else if (winning[2] !== "empty" && winning[2] === winning[5] && winning[5] === winning[8]) {
            winner = winning[2];
            showWinner();
        } else if (winning[0] !== "empty" && winning[0] === winning[4] && winning[4] === winning[8]) {
            winner = winning[0];
            showWinner();
        } else if (winning[2] !== "empty" && winning[2] === winning[4] && winning[4] === winning[6]) {
            winner = winning[2];
            showWinner();
        } else if (winning.includes("empty") === false) {
            winner = "Tie Game";
            showWinner();
        }
        console.log(winning);
    };

    // function that displays appropriate screen according to checkwin results

    function showWinner() {
        if (winner === "player1") {
            $("#finish").removeClass("screen-win-two");
            $("#finish").removeClass("screen-win-tie");
            $(".message").html("Player 1 wins!");
            $("#finish").addClass("screen-win-one");
            $("#finish").show();
            $("#board").hide();
        } else if (winner === "player2") {
            $("#finish").removeClass("screen-win-one");
            $("#finish").removeClass("screen-win-tie");
            $(".message").html("Player 2 wins!");
            $("#finish").addClass("screen-win-two");
            $("#finish").show();
            $("#board").hide();
        } else if (winner === "Tie Game") {
            $("#finish").removeClass("screen-win-one");
            $("#finish").removeClass("screen-win-two");
            $(".message").html("It's a Tie!");
            $("#finish").addClass("screen-win-tie");
            $("#finish").show();
            $("#board").hide();
        }
    };

}());//ending of modular pattern
