let tickrate_delay;
let simulated_tickrate;
let last_delay;
let loop;
let guessing_mode;
let loopON = false;
let box = document.querySelector("#clickable_area");
const colors = ["#A0217A", "black"];
let colornum = false;
updateSettings();

function updateSettings() {
  let tickrate = document.querySelector('input[name="tickrate"]:checked').value;
  if (tickrate == 64 || tickrate == 128) {
  } else tickrate = document.getElementById("custom_tickrate").value;
  document.getElementById("simulated_tick_output").innerHTML = tickrate;
  let delay = Math.round((1 / tickrate) * 100000) / 100;
  document.getElementById("simulated_delay").innerHTML = delay + " ms";
  if (document.getElementById("loop").checked) {
    loop = true;
    document.getElementById("loop_output").innerHTML = "ON";
  } else {
    loop = false;
    document.getElementById("loop_output").innerHTML = "OFF";
  }
  if (document.getElementById("guessing").checked) {
    guessing_mode = true;
    document.getElementById("guessing_mode_output").innerHTML = "ON";
  } else {
    guessing_mode = false;
    document.getElementById("guessing_mode_output").innerHTML = "OFF";
  }
  simulated_tickrate = tickrate;
  tickrate_delay = delay;
  guessingModeSetup();
}

function guessingModeSetup() {
  const pole = [
    document.getElementById("64"),
    document.getElementById("128"),
    document.getElementById("custom"),
    document.getElementById("64s"),
    document.getElementById("128s"),
    document.getElementById("customs"),
    document.getElementById("custom_tickrate"),
    document.getElementById("simulated_tick_output"),
    document.getElementById("simulated_delay"),
    document.getElementById("simulated_tick_outputs"),
    document.getElementById("simulated_delays"),
  ];
  const pole2 = [
    document.getElementById("guesss"),
    document.getElementById("guessss"),
    document.getElementById("guesssss"),
  ];

  if (guessing_mode) {
    for (let i = 0; i < pole.length; i++) {
      pole[i].style.color = "gray";
      pole[i].disabled = true;
      pole[i].style.userSelect = "none";
    }
    for (let i = 0; i < pole2.length; i++) {
      pole2[i].style.color = "black";
      if (i == 0) {
        pole2[i].style.color = "white";
      }
      pole2[i].disabled = false;
      pole2[i].style.userSelect = "auto";
    }
  } else {
    for (let i = 0; i < pole.length; i++) {
      pole[i].style.color = "white";
      pole[i].disabled = false;
      pole[i].style.userSelect = "auto";
      if (i == 6) {
        pole[i].style.color = "black";
      }
    }
    for (let i = 0; i < pole2.length; i++) {
      pole2[i].style.color = "gray";
      pole2[i].disabled = true;
      pole2[i].style.userSelect = "none";
    }
  }
}

function flash() {
  if (!guessing_mode) {
    if (loop || loopON) {
      flashLoop(tickrate_delay);
    } else flashOnce(tickrate_delay);
  } else {
    if (Math.floor(Math.random() * 2) == 0 && !loopON) {
      last_delay = Math.round((1 / 64) * 100000) / 100;
    } else if (!loopON) {
      last_delay = Math.round((1 / 128) * 100000) / 100;
    }
    if (loop || loopON) {
      flashLoop(last_delay);
    } else {
      flashOnce(last_delay);
    }
    document.getElementById("asdfg").innerHTML = last_delay;
  }
}

function flashOnce(time) {
  document.getElementById("clickable_area").style.backgroundColor = "#A0217A";
  document.getElementById("text").style.color = "#e273c1";
  setTimeout(changeColorOnce, time);
}

function flashLoop(time) {
  if (loopON == false) {
    document.getElementById("clickable_area").style.backgroundColor = "#A0217A";
    document.getElementById("text").style.color = "#e273c1";
    myVar = setInterval(changeColor, time);
  } else {
    clearTimeout(myVar);
  }
  loopON = !loopON;
  document.getElementById("clickable_area").style.backgroundColor = "black";
  document.getElementById("text").style.color = "#404040";
}

function changeColor() {
  if (!colornum) {
    document.getElementById("clickable_area").style.backgroundColor = "black";
    document.getElementById("text").style.color = "#404040";
  } else {
    document.getElementById("clickable_area").style.backgroundColor = "#A0217A";
    document.getElementById("text").style.color = "#e273c1";
  }
  colornum = !colornum;
}
function changeColorOnce() {
  document.getElementById("clickable_area").style.backgroundColor = "black";
  document.getElementById("text").style.color = "#404040";
}

function checkGuess() {
  guess = document.getElementById("guessss").value;
  output = document.getElementById("result");
  if (guess == last_delay) {
    output.innerHTML = "Correct!";
    output.style.color = "#94ff9d";
  } else {
    output.innerHTML = "Incorrect :(";
    output.style.color = "#ff4040";
  }
}
