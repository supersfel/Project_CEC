let Co2Amount = JSON.parse(localStorage.getItem("Co2A"));
var context = document.getElementById("myChart").getContext("2d");
const $resultContents = document.getElementById("result-contents");
var text = Co2Amount;

$resultContents.innerHTML = text;

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
