
// No new imports are required for this fix

//https://html5.digi.ninja/challenge.html

if (typeof(SERVER_DOMAIN) === 'undefined') {
	window.location.replace("/unconfigured.html");
}

const RECEIVE_URL = SERVER_DOMAIN + "/challenge_scoreboard.html" + "?origin=" + get_domain();

var window_ref = null;

document.getElementById("username").focus();

function store_username() {
	var username;
	var username_obj;

	username_obj = document.getElementById("username");
	username = username_obj.value

	var welcome;
	welcome = document.getElementById("welcome");
	welcome.innerHTML = "Welcome " + html_encode (username);

	var set_username;
	set_username = document.getElementById("set_username");
	set_username.style.display="none";

	var game;
	game = document.getElementById("game");
	game.style.display="inline";

	start_game();
	// have to do time out so the window can open
	setTimeout (function () {send_username(username);}, 1000);

	return false;
}

function check_guess() {
	var guess_obj = document.getElementById("guess");
	var guess = guess_obj.value;
	var res = document.getElementById("result");

	send_message("guess:" + guess);

	document.getElementById("guess").focus();
	document.getElementById("guess").value = "";
}

function html_encode (html) {
	return document.createElement( 'a' ).appendChild( 
		document.createTextNode( html ) ).parentNode.innerHTML;
}

function send_message(message) {
	if (window_ref == null) {
		return;
	}
	if (window_ref.closed) {
		return;
	}

	window_ref.postMessage(message, "*");
	// window_ref.postMessage(message, RECEIVE_URL);
}

function start_game() {
	open_window();
	document.getElementById("guess").focus();
}

function send_username(username) {
	message = "user:" + html_encode(username);
	send_message(message);
}

function get_domain() {
	var url = window.location.href
	var arr = url.split("/");
	return arr[0] + "//" + arr[2]
}


function open_window() {
    if (window_ref == null || window_ref.closed) {
        // Create the options string with noopener and noreferrer
        const windowOptions = "height=260,width=550,noopener,noreferrer";

        // Open the window with the updated options
        window_ref = window.open(RECEIVE_URL, "score board", windowOptions);

        if (window_ref == null) {
            alert("Failed to open window. You must allow pop-ups.");
        } else {
            // Additional security measure: set opener to null
            if (window_ref.opener) {
                window_ref.opener = null;
            }
        }
    }
}


const usernameButton = document.getElementById("setUsername");
usernameButton.addEventListener("click", store_username, false);

const guessButton = document.getElementById("checkGuess");
guessButton.addEventListener("click", check_guess, false);

start_game();
