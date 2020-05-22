var ctx = document.getElementById("canvas").getContext("2d");//canvas context
var canW = ctx.canvas.width;//ตัวแปร ของcanW
var canH = ctx.canvas.height;//ตัวแปร ของcanH
var food;
var snakeSize = 12; //squares size
var snake;
var score = 0;//ตัวแปร score เริ่มต้น =0

  
  function moveup(){//function ขยับขึ้น
    dir = "up";
  }
  function movedown(){//function ขยับลง
    dir = "down"
  }
  function moveleft(){//function ขยับซ้าย
    dir = "left"
  }
  function moveright(){//function  ขยับขวา
    dir = "right"
  }

var gameOver = function () {//ตัวแปร gameover
  ctx.fillStyle = "BurlyWood";//สีพื้นหลัง
  ctx.fillRect(0, 0, canW, canH);//แสดงผลสี่เหลี่ยม
  ctx.fillStyle = "CornSilk";//สีพื้นหลัง
  ctx.font = "bold 56px Courier, serif";//ขนาดตัวอักษรและฟอนต์
  ctx.fillText("Sorry! Game Over!!", 175, 150, 300);//แสดงผลขึ้นพร้อมกำหนดตำแหน่ง
  ctx.fillText(score_ins = score, 320, 240, 300)//แสดงผลคะแนน กำหนดตำแหน่ง
  ctx.strokeStyle = "Black";
  ctx.strokeRect(0, 0, canW, canH);
  score = 0;
};

// ประกาศตัวแปร
var drawModule = (function () {
  var body = function (x, y) {//ตัวงู
    ctx.fillStyle = "springGreen"; //สีตัวงู=springgreen
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = "DarkGreen"; //สีขอบตัวงู= dark green
    ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
  };
  var snakeFood = function (x, y) {//อาหารงู
    ctx.fillStyle = "black"; //สีของอาหาร color= black
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = "Black"; //สัขอบของอาหาร color =Black
    ctx.strokeRect(
      x * snakeSize + 1,
      y * snakeSize + 1,
      snakeSize - 2,
      snakeSize - 2
    );
  };
  var scText = function () {//ข้อความ
    var score_ins = score + " ladybugs eaten"; //แสดงผลคะแนน
    ctx.font = "10px Arial, sans-serif";//ขนาดและฟอนต์ของข้อความ
    ctx.fillStyle = "whitesmoke"; //ตัวอักษร color = grey blue
    ctx.fillText(score_ins, canW - 103, canH - 30); //ตำแหน่งของคะแนนที่แสดงผลที่หน้าเกม
  };
  var drawSnake = function () {//การเริ่มต้นของงู
    var length = 3; //ความยาวเริ่มต้น =3
    snake = [];
    for (var i = length - 1; i >= 0; i--) {
      snake.push({ x: i, y: 0 });
    }
  };
  var drawGame = function () {//การเริ่มต้นของเกม
    ctx.fillStyle = "BurlyWood"; //สีพื้นหลัง color = light blue
    ctx.fillRect(0, 0, canW, canH);
    ctx.strokeStyle = "red"; //สีขอบของพื้นหลัง color = black
    ctx.strokeRect(0, 0, canW, canH);
    btn.setAttribute("disabled", true); //เมื่อเริ่มเกมจะไม่สามารถใช่งานปุ่มได้
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    /* การเคลื่อนไหวของงู */
    if (dir == "right") {
      snakeX++;
    } else if (dir == "left") {
      snakeX--;
    } else if (dir == "up") {
      snakeY--;
    } else if (dir == "down") {
      snakeY++;
    }
    if (
      snakeX <= -1 ||
      snakeX >= canW / snakeSize ||
      snakeY <= -1 ||
      snakeY >= canH / snakeSize ||
      isCollision(snakeX, snakeY, snake)
    ) {
      btn.removeAttribute("disabled", true); //เมื่อเกมหยุด ปุ่มจะสามารถใช้งานได้
      gameloop = clearInterval(gameloop);
      gameOver();
      return;
    }
    //งูกินอาหาร
    if (snakeX == food.x && snakeY == food.y) {
      var tail = { x: snakeX, y: snakeY }; //เพิ่มความยาวของตัวงู
      score++;
      createFood(); //สร้างอาหารใหม่
    } else {
      var tail = snake.pop();
      tail.x = snakeX;
      tail.y = snakeY;
    }
    snake.unshift(tail); // เพิ่มความยาวของงูที่ส่วนแรก
    for (var i = 0; i < snake.length; i++) {
      body(snake[i].x, snake[i].y);
    }
    snakeFood(food.x, food.y); //paint food
    scText(); //paint score
  };
  var createFood = function () {//การสร้างอาหารของงู
    food = {
      x: Math.floor(Math.random() * 50 + 1),
      y: Math.floor(Math.random() * 39 + 1)
    };
    for (var i = 0; i > snake.length; i++) {
      var snakeX = snake[i].x;
      var snakeY = snake[i].y;
      if (
        (food.x === snakeX && food.y === snakeY) ||
        (food.y === snakeY && food.x === snakeX)
      ) {
        food.x = random;
        food.y = random;
      }
    }
  };
  var isCollision = function (x, y, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].x === x && array[i].y === y) return;
    }
    return false;
  };

  var init = () => {
    dir = "down";
    drawSnake();
    createFood();
    gameloop = setInterval(drawGame, 85);
  };

  return {
    init: init
  };
})();

(function (window, document, drawModule, undefined) {
  var btn = document.getElementById("btn");
  btn.addEventListener("click", function () {
    drawModule.init();

  });

  document.onkeydown = function (event) {
    keyCode = window.event.keyCode;
    keyCode = event.keyCode;

    switch (keyCode) {//การควบคุมด้วยคีย์บอร์ด
      case 37:
        if (dir != "right") {//ซ้าย
          dir = "left";
        }
        console.log("left");
        break;

      case 39:
        if (dir != "left") {//ขวา
          dir = "right";
          console.log("right");
        }
        break;

      case 38:
        if (dir != "down") {//ขึ้น
          dir = "up";
          console.log("up");
        }
        break;

      case 40:
        if (dir != "up") {//ลง
          dir = "down";
          console.log("down");
        }
        break;
    }

  };
})(window, document, drawModule);
