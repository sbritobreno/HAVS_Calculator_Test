"use strict";

const resultContainer = document.querySelector(".result_container");
const resultString = document.querySelector(".result_string");
const limitExcededString = document.querySelector(".limit_exceded_string");
const submitBtn = document.querySelector('input[type="submit"]');
const tool = document.querySelector("#tool");
const output = document.querySelector("#output");
const minutes = document.querySelector("#minutes");
let limitPointsExceded = false;
let limitPointsExcededBy = 0;

submitBtn.addEventListener("click", calculate);

function calculate(e) {
  e.preventDefault();
  const toolName = tool.value;
  const outputValue = +output.value;
  const minutesValue = +minutes.value;

  if (!toolName || !outputValue || !minutesValue) {
    alert("You need to enter all the inputs!");
    return;
  }

  const eavTime = calculateEAV(outputValue);
  const elvTime = calculateELV(outputValue);

  resultString.innerHTML = `A ${toolName} with a vibration output of ${outputValue}m/s² reaches the EAV (Exposure
    Action Value) in ${eavTime} and the ELV (Exposure Limit Value) in
    ${elvTime}.`;

  if (limitPointsExceded) {
    limitExcededString.innerHTML = `You have exceded the maximum daily allowance by ${limitPointsExcededBy} points.`;
  }

  resultContainer.classList.remove("hidden");
}

function calculateEAV(output) {
  return calculation(100, output);
}

function calculateELV(output) {
  return calculation(400, output);
}

function calculation(pointsPerDay, output) {
  const pointsPerHour = output * output * 2;
  const hoursInMinutes = (pointsPerDay / pointsPerHour) * 60;
  const hours = Math.floor(hoursInMinutes / 60);
  const min = Math.floor(hoursInMinutes % 60);

  if (pointsPerDay === 400) checkLimitPoints(hoursInMinutes, +minutes.value);

  return `${hours}hrs:${min}mins`;
}

function checkLimitPoints(maxHoursInMinutes, minutes) {
  const pointsPerDay = 400;
  const pointsMade = (pointsPerDay * minutes) / maxHoursInMinutes;

  if (pointsMade > pointsPerDay) {
    limitPointsExceded = true;
    limitPointsExcededBy = Math.floor(pointsMade - pointsPerDay);
  } else {
    limitPointsExceded = false;
    limitPointsExcededBy = 0;
    limitExcededString.innerHTML = "";
  }
}
