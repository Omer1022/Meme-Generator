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
