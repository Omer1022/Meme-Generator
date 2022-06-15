"use strict";

function openCanvas(imgId) {
  openPage("editor");
  resizeCanvas();
  createMeme(imgId);
  renderCanvas();
  selectInput();
  focusInput();
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
  gCtx.strokeStyle = "black";
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
  gCtx.strokeStyle = "#363636";
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
  focusInput();
}

function focusInput() {
  var elInput = document.querySelector(".input-meme-text");
  elInput.focus();
}

function selectInput() {
  var elInput = document.querySelector(".input-meme-text");
  elInput.select();
}

function onSwitchLine() {
  switchLine();
  renderCanvas();
  focusInput();
}

function onRemoveLine() {
  removeLine();
  renderCanvas();
  focusInput();
}

function onChangeFontSize(diff) {
  changeFontSize(diff);
  renderCanvas();
}

function onSetTextAlign(alignKey) {
  setTextAlign(alignKey);
  renderCanvas();
}

function onSetFont(font) {
  setFont(font);
  renderCanvas();
}

function onChangeTextPosY(diff) {
  ChangeTextPosY(diff);
  renderCanvas();
}

function onChangeTextPosX(diff) {
  ChangeTextPosX(diff);
  renderCanvas();
}

function removeRect() {
  var meme = getMeme();
  meme.isPrint = true;
  renderCanvas(meme);
}

function onDownloadImg(elLink) {
  var imgContent = gCanvas.toDataURL("image/jpeg");
  elLink.href = imgContent;
}

function resizeCanvas() {
  gCanvas.style.width = "100%";
  gCanvas.style.height = "100%";
}
