const $fuelCheckbox1 = document.querySelector(".fuel-checkbox1");
const $fuelCheckbox2 = document.querySelector(".fuel-checkbox2");
const $resultButtonBackground = document.querySelector(
  ".result-button-background"
);

let fuel = 1; //연료 종류
let distance = 0; //이동 거리
let fuelEfficiency = 0; //연비
let Co2Amount = 0; //이산화탄소 배출량

//경유 체크박스를 클릭했을 때
$fuelCheckbox1.addEventListener("click", function (e) {
  $fuelCheckbox1.style.backgroundImage = "url(image/check1.png)";
  $fuelCheckbox2.style.backgroundImage = "url(image/check.png";
  fuel = 1;
});

//휘발유 체크박스를 클릭했을 떄
$fuelCheckbox2.addEventListener("click", function (e) {
  $fuelCheckbox1.style.backgroundImage = "url(image/check.png";
  $fuelCheckbox2.style.backgroundImage = "url(image/check1.png)";
  fuel = 2;
});

//이동거리와 연비 입력값 불러오기
function valueBring() {
  distance = document.getElementById("distance").value;
  distance = distance.replace(/,/g, "");
  fuelEfficiency = document.getElementById("fuel-efficiency").value;
}

//결과 버튼을 클릭했을 때
$resultButtonBackground.addEventListener("click", function (e) {
  let link = "Result.html"; //결과창 주소
  valueBring();
  if (distance > 0 && fuelEfficiency > 0) {
    location.href = link;
    Co2EmissionsCalculate(fuel, distance, fuelEfficiency);
    console.log(Co2Amount);
  }
});

//이산화탄소 발생량 계산기 식
function Co2EmissionsCalculate(fuel, distance, fuelEfficiency) {
  let fever = 0; //순발열량
  let emissionsFactor = 0; //배출계수
  let fuelUsage = 0; //연료 사용량

  if (fuel == 1) {
    //경유 일때
    fever = 0.845;
    emissionsFactor = 0.837;
  } else if (fuel == 2) {
    //휘발유 일때
    fever = 0.74;
    emissionsFactor = 0.783;
  }

  fuelUsage = distance / fuelEfficiency; //연료 사용량 계산식
  Co2Amount = (fuelUsage * fever * emissionsFactor * (44 / 12) * 1).toFixed(2); //이산화탄소 배출량 계산식
  Co2Amount = Math.round(Co2Amount * 10) / 10; //소수 첫째 자리까지 반올림
}
