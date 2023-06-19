const $fuelCheckbox1 = document.querySelector(".fuel-checkbox1");
const $fuelCheckbox2 = document.querySelector(".fuel-checkbox2");
const $resultButtonBackground = document.querySelector(
  ".result-button-background"
);

let fuel = 1;
let distance = 0;
let fuelEfficiency = 0;
let Co2Amount = 0;

//경유 체크박스 클릭했을 때
$fuelCheckbox1.addEventListener("click", function (e) {
  $fuelCheckbox1.style.backgroundImage = "url(image/check1.png)";
  $fuelCheckbox2.style.backgroundImage = "url(image/check.png";
  fuel = 1;
});

//휘발유 체크박스 클릭했을 떄
$fuelCheckbox2.addEventListener("click", function (e) {
  $fuelCheckbox1.style.backgroundImage = "url(image/check.png";
  $fuelCheckbox2.style.backgroundImage = "url(image/check1.png)";
  fuel = 2;
});

function valueBring() {
  distance = document.getElementById("distance").value;
  fuelEfficiency = document.getElementById("fuel-efficiency").value;
}

$resultButtonBackground.addEventListener("click", function (e) {
  valueBring();
  console.log(distance);
  Co2EmissionsCalculate(fuel, distance, fuelEfficiency);
  console.log(Co2Amount);
  console.log(Math.pow(10, -9));
});

function Co2EmissionsCalculate(fuel, distance, fuelEfficiency) {
  let fever = 0;
  let emissionsFactor = 0;
  let fuelUsage = 0;

  if (fuel == 1) {
    fever = 35.4;
    emissionsFactor = 74100;
  } else if (fuel == 2) {
    fever = 31.0;
    emissionsFactor = 69300;
  }

  fuelUsage = distance / fuelEfficiency;
  Co2Amount = fuelUsage * fever * emissionsFactor * Math.pow(10, -9) * 1;
}
