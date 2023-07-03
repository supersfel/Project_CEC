let Co2Amount = JSON.parse(localStorage.getItem("Co2A"));
console.log(Co2Amount);
var context = document.getElementById("myChart").getContext("2d");
const $resultContents1 = document.getElementById("result-contents1");
const $resultContents2 = document.getElementById("result-contents2");
var text2;
$resultContents1.innerHTML = Co2Amount;

function comparison() {
  let minus = Math.round((270.8 - Co2Amount) * 10) / 10;
  if (minus > 0) {
    text2 =
      "당신은 다른 집보다 " +
      minus +
      "kg을 덜 배출하고 있습니다. " +
      "앞으로도 이산화탄소 배출량을 줄이기 위해 노력해주세요.";
  } else {
    minus = minus * -1;
    text2 =
      "당신은 다른 집보다 " +
      minus +
      "kg을 더 배출하고 있습니다. " +
      "앞으로는 이산화탄소 배출량을 줄이기 위해 노력해보세요.";
  }
}
comparison();
$resultContents2.innerHTML = text2;

var myChart = new Chart(context, {
  type: "bar", // 차트의 형태
  data: {
    // 차트에 들어갈 데이터
    labels: [
      //x 축
      "다른 사람",
      "나",
    ],
    datasets: [
      {
        //데이터
        label: "이산화탄소 배출량 그래프", //차트 제목
        fill: false, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
        data: [270.8, Co2Amount],
        backgroundColor: [
          //색상
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          //경계선 색상
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1, //경계선 굵기
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});
