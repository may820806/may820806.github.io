var score; //總分

//題目 ques.food[0]
var ques = [
  { food: "愛吃肉愛吃菜?", opt: ["愛吃肉", "愛吃菜", "其他"] },
  { food: "香菜", opt: ["吃", "不吃", "其他"] },
  { food: "鳳梨披薩", opt: ["吃", "不吃", "其他"] },
  { food: "火鍋加芋頭", opt: ["可以", "不行", "其他"] },
  { food: "雞蛋", opt: ["全熟", "半熟", "其他"] },
  { food: "OREO", opt: ["直接吃", "分層吃", "其他"] },
  { food: "水餃", opt: ["連皮帶肉吃", "皮肉分開吃", "其他"] },
  { food: "酥皮濃湯", opt: ["酥皮和湯混著吃", "酥皮和湯分開吃", "其他"] },
  { food: "車輪餅", opt: ["奶油", "紅豆", "其他"] },
  { food: "皮蛋豆腐", opt: ["攪拌吃", "直接吃", "其他"] },
  { food: "咖哩飯", opt: ["攪拌吃", "直接吃", "其他"] },
  { food: "玉米片", opt: ["先倒牛奶", "先倒麥片", "其他"] },
  { food: "豆漿", opt: ["有糖", "無糖", "其他"] },
  { food: "湯圓", opt: ["鹹的", "甜的", "其他"] },
  { food: "麵線", opt: ["大腸派", "蚵仔派", "其他"] },
  { food: "鐵板麵", opt: ["黑胡椒醬", "蘑菇醬", "其他"] },
  { food: "薯條", opt: ["沾番茄醬", "不沾番茄醬", "其他"] },
  { food: "芭樂", opt: ["去籽", "不准去籽", "其他"] },
  { food: "番茄", opt: ["喜歡", "討厭", "其他"] },
  { food: "酒", opt: ["喝", "不喝", "其他"] },
]

var currentObjIndex = 0;
var answerArr = [];

function topic() {
  // H2 become to food(topic)
  var H2var = document.querySelector("H2");
  H2var.textContent = ques[currentObjIndex].food;
  // hide start button
  var buttonBye = document.querySelector("#start");
  buttonBye.style.display = "none";
  // display three option buttons
  var optBtnVar = document.querySelectorAll('.optBtn');
  for (var i = 0; i < optBtnVar.length; i++) {
    optBtnVar[i].style.display = "inline";
    //assign answer value to button
    optBtnVar[i].textContent = ques[0].opt[i];
  }
}

function next(clicked_id) {
  currentObjIndex += 1;
  // if 20 topic done go finish()
  if (currentObjIndex > 19) {
    finish();
  }
  else {
    //push answer to an array (get which button has clicked)
    answerArr.push(clicked_id);
    //go next, change topic
    var currentTopic = document.querySelector("H2");
    currentTopic.textContent = ques[currentObjIndex].food;
    //go next, change three options button
    var optBtnVar = document.querySelectorAll('.optBtn');
    for (var i = 0; i < optBtnVar.length; i++) {
      optBtnVar[i].textContent = ques[currentObjIndex].opt[i];
    }
  }

}
function copyUrl() {
  document.getElementById('urlText').select();
  document.execCommand('copy');
}

function finish() {
  //if url have query string
  if (window.location.href.indexOf('?') != -1) {
    alert(calcScore(answerArr));
  }

  else {
    var url = window.location.href + "?answer=" + answerArr.join(",");
    console.log(url);
    //generate url which contains query string
    //show url let user copy
    var showUrlText = document.querySelector("#urlText");
    var showUrlBtn = document.querySelector("#urlBtn");
    showUrlText.style.display = "inline";
    showUrlBtn.style.display = "inline";
    //put url into urlText for copy
    document.querySelector("#urlText").value = url;
  }


  function calcScore(answer1) {
    oAnswer = getParameter('answer', window.location.href);
    var originAnswer = oAnswer.split(',');
    var diffCount = 0;
    //compare two array
    for (var i = 0; i < answer1.length; i++) {
      if (answer1[i] != originAnswer[i]) {
        diffCount++;
      }
    }
    //calculate score
    var score = (1 - (diffCount / answer1.length)) * 100;
    var roundScore = Math.round(score);
    return '相似度' + roundScore + '%';
  }


  //getParameter
  function getParameter(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
  }
}
/*菜鳥寫法
var no1 = ["愛吃肉愛吃菜?", "愛吃菜", "愛吃肉", "其他"];
var no2 = ["香菜", "吃", "不吃", "其他"];
var no3 = ["鳳梨披薩", "吃", "不吃", "其他"];
var no4 = ["火鍋加芋頭", "吃", "不吃", "其他"];
var no5 = ["雞蛋", "全熟", "不熟", "其他"];
var no6 = ["OREO", "直接吃", "分層吃", "其他"];
var no7 = ["水餃", "皮肉一起吃", "皮肉分開吃", "其他"];
var no8 = ["酥皮濃湯", "酥皮和湯混著吃", "酥皮和湯分開吃", "其他"];
var no9 = ["車輪餅", "奶油", "紅豆", "其他"];
var no10 = ["皮蛋豆腐", "攪拌吃", "分開吃", "其他"];
var no11 = ["咖哩飯", "攪拌吃", "直接吃", "其他"];
var no12 = ["玉米片", "愛吃菜", "愛吃肉", "其他"];
var no13 = ["豆漿", "有糖", "無糖", "其他"];
var no14 = ["湯圓", "鹹的", "甜的", "其他"];
var no15 = ["麵線", "大腸派", "蚵仔派", "其他"];
var no16 = ["鐵板麵", "黑胡椒醬", "蘑菇醬", "其他"];
var no17 = ["薯條", "加番茄醬", "不加番茄醬", "其他"];
var no18 = ["芭樂", "去籽", "不準去籽", "其他"];
var no19 = ["番茄", "喜歡", "不喜歡", "其他"];
var no20 = ["酒", "喝", "不喝", "其他"];*/