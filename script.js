let turn = "X";
let isGameOver = false;
let audioTurn = new Audio("ting.mp3"); // Make sure this file exists

const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

const checkWin = () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  let wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  wins.forEach(e => {
    if (
      boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[1]].innerText === boxtexts[e[2]].innerText &&
      boxtexts[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText = boxtexts[e[0]].innerText + " Won";
      isGameOver = true;
    //   document.querySelector(".imgbox").classList.add("show");
     let img = document.querySelector(".imgbox img");
      img.src = "";               // Remove src to clear GIF
      img.src = "excited.gif";   // Re-assign to force reload
      document.querySelector(".imgbox").classList.add("show");
    }
  });
};

const checkDraw = () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  let filled = Array.from(boxtexts).every(box => box.innerText !== "");
  if (filled && !isGameOver) {
    document.querySelector(".info").innerText = "It's a Draw!";
    isGameOver = true;
  }
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
  element.addEventListener("click", function () {
    let boxtext = this.querySelector(".boxtext");
    if (boxtext.innerText === "" && !isGameOver) {
      boxtext.innerText = turn;
      audioTurn.play();
      checkWin();
      checkDraw();
      if (!isGameOver) {
        turn = changeTurn();
        document.querySelector(".info").innerText = "Turn for " + turn;
      }
    }
  });
});

document.querySelector("#reset").addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach(e => e.innerText = "");
  turn = "X";
  isGameOver = false;
  document.querySelector(".info").innerText = "Turn for " + turn;
  document.querySelector(".imgbox").classList.remove("show");
});
