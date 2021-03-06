"use strict";

var gBorderColor = "black";

function openCanvas(imgId) {
  openPage("meme");
  resizeCanvas();
  createMeme(imgId);
  renderCanvas();
}

function renderCanvas() {
  var meme = getMeme();
  var img = new Image();
  var currImg = getImgById(meme.selectedImgId);
  img.src = currImg.url;
  img.onload = function () {
    clearCanvas();
    setInputText();
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    meme.lines.forEach((line) => {
      drawText(line, line.pos.x, line.pos.y);
      drawRect();
    });
    meme.isPrint = false;
  };
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function setInputText() {
  var meme = getMeme();
  document.querySelector(".input-meme-text").value =
    meme.lines[meme.selectedLineIdx].txt;
}

function drawText(line, x, y) {
  gCtx.lineWidth = 3;
  gCtx.strokeStyle = gBorderColor;
  gCtx.fillStyle = line.color;
  gCtx.font = `${line.size}px ${line.font}`;
  gCtx.textAlign = line.align;
  gCtx.fillText(line.txt, x, y);
  gCtx.strokeText(line.txt, x, y);
}

function drawRect() {
  var meme = getMeme();
  if (meme.isPrint) return;
  var currLine = getCurrLine();
  gCtx.strokeStyle = "black";
  gCtx.strokeRect(
    5,
    currLine.pos.y - currLine.size,
    gCanvas.width - 10,
    currLine.size + 10
  );
}

function onSetText(txt) {
  setText(txt);
  renderCanvas();
}

function onAddLine() {
  addLine();
  renderCanvas();
}

function onSwitchLine() {
  switchLine();
  renderCanvas();
}

function onRemoveLine() {
  removeLine();
  renderCanvas();
}

function onChangeFontSize(diff) {
  changeFontSize(diff);
  renderCanvas();
}

function onSetTextAlign(pos) {
  setTextAlign(pos);
  renderCanvas();
}

function onSetFont(font) {
  setFont(font);
  renderCanvas();
}

function onChangeColor(id) {
  var color = document.getElementById(id).value;
  changeColor(color);
  renderCanvas();
}

function onChangeColorClicked() {
  document.getElementById("tc").click();
  renderCanvas();
}

function onChangeBorderColor(id) {
  var borderColor = document.getElementById(id).value;
  gBorderColor = borderColor;
  renderCanvas();
}

function onChangeBorderClicked() {
  document.getElementById("td").click();
  renderCanvas();
}

function onDownloadImg(elLink) {
  var imgContent = gCanvas.toDataURL("image/jpeg");
  elLink.href = imgContent;
}

function resizeCanvas() {
  gCanvas.style.width = "100%";
  gCanvas.style.height = "100%";
}
