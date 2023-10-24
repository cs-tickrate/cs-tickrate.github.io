let cursorX;
let cursorY;
let tickrate_delay;
let simulated_tickrate;
var box = document.createElement("div");
box.className = "box";
var box2 = document.createElement("div");
box2.className = "box2";
let worst_case_scenario = false;
let last_delay;
updateSettings();

function updateSettings() {
  let tickrate = document.querySelector('input[name="tickrate"]:checked').value;
  if (tickrate == 64 || tickrate == 128) {
  } else tickrate = document.getElementById("custom_tickrate").value;
  document.getElementById("simulated_tick_output").innerHTML = tickrate;
  let delay = Math.round((1 / tickrate) * 100000) / 100;
  document.getElementById("simulated_delay").innerHTML = delay + " ms";
  if (document.getElementById("worst_case_scenario").checked) {
    worst_case_scenario = true;
    document.getElementById("worst_case_scenario_output").innerHTML = "ON";
  } else {
    document.getElementById("worst_case_scenario_output").innerHTML = "OFF";
    worst_case_scenario = false;
  }
  simulated_tickrate = tickrate;
  tickrate_delay = delay;
}
function createBox() {
  box.style.opacity = "0";
  box2.style.opacity = "0";
  box.style.left = cursorX + "px";
  box.style.top = cursorY + "px";
  document.body.appendChild(box);
  if (worst_case_scenario) last_delay = tickrate_delay;
  else {
    last_delay = Math.round(Math.random() * tickrate_delay * 100) / 100;
  }
  setTimeout(createBox2, last_delay);
}
function createBox2() {
  box.style.opacity = "1";
  box2.style.opacity = "1";
  box2.style.left = cursorX + "px";
  box2.style.top = cursorY + "px";
  document.body.appendChild(box2);
  document.getElementById("used_set").innerHTML =
    "Used delay: " + last_delay + " ms";
}
function setPos(event) {
  cursorX = event.pageX;
  cursorY = event.pageY;
}
