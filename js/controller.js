"use strict";

let gCanvas;
let gCtx;

function init() {
  gCanvas = document.querySelector("#editor-canvas");
  gCtx = gCanvas.getContext("2d");
  renderImgs();
  renderMemes();
}

function renderImgs(key) {
  var strHTML = getImgStrHtml(key);
  document.querySelector(".img-gallery").innerHTML = strHTML;
}

function renderMemes() {
  var memes = loadMemes();
  if (!memes) return;

  var strHTMLs = memes.map(function (meme) {
    return `
            <div class="meme-card flex column">
                <img src="${meme.imgContent}">
            </div>
        `;
  });
  var strHTML = strHTMLs.join("");
  document.querySelector(".meme-container").innerHTML = strHTML;
}

function openPage(pageName) {
  var galleryDisplay = "none";
  var editorDisplay = "none";
  switch (pageName) {
    case "gallery":
      var galleryDisplay = "flex";
      addActive(document.querySelector(".btn-gallery"));
      renderImgs();
      break;
    case "editor":
      var editorDisplay = "flex";
      addActive(document.querySelector(".btn-editor"));
      break;
    default:
      break;
  }
  document.querySelector(".gallery-container").style.display = galleryDisplay;
  document.querySelector(".editor-container").style.display = editorDisplay;
}

function renderImgByStr(str) {
  var key = str.toLowerCase();
  renderImgs(key);
}

function addActive(elBtn) {
  var elBtns = document.querySelectorAll(".header-btn");
  elBtns.forEach(function (elBtn) {
    elBtn.classList.remove("active");
  });
  elBtn.classList.add("active");
}

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
      drowSticker();
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

function drowSticker() {
  var meme = getMeme();
  if (!meme.sticker.id) return;
  const img = new Image();
  img.src = `img/sticker-${meme.sticker.id}.png`;
  img.onload = () => {
    gCtx.drawImage(img, meme.sticker.pos.x, meme.sticker.pos.y, 100, 100);
  };
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

function onDrowSticker(stickerId) {
  setSticker(stickerId);
  renderCanvas();
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
