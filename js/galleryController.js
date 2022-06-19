"use strict";

let gCanvas;
let gCtx;

function init() {
  gCanvas = document.querySelector("#meme-canvas");
  gCtx = gCanvas.getContext("2d");
  renderImgs();
  renderMemes();
}

function renderImgs(key) {
  var strHTML = getImgStrHtml(key);
  document.querySelector(".img-gallery").innerHTML = strHTML;
}

function renderMemes() {
  var memes = getMeme();
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
  var memeDisplay = "none";
  var aboutDisplay = "none";
  switch (pageName) {
    case "gallery":
      galleryDisplay = "flex";
      renderImgs();
      break;
    case "meme":
      memeDisplay = "flex";
      break;
    case "about":
      aboutDisplay = "flex";
      break;
    default:
      break;
  }
  document.querySelector(".gallery-container").style.display = galleryDisplay;
  document.querySelector(".meme-container").style.display = memeDisplay;
  document.querySelector(".about-container").style.display = aboutDisplay;
}

function renderImgByStr(str) {
  var key = str.toLowerCase();
  renderImgs(key);
}
