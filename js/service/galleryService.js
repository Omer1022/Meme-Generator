"use strict";

var gKeywords = [
  { key: "Politic", clicks: 3 },
  { key: "Animal", clicks: 2 },
  { key: "Baby", clicks: 6 },
  { key: "Movie", clicks: 11 },
  { key: "Sport", clicks: 2 },
];

var gImgs = [
  { id: 1, url: "img/1.jpg", keywords: ["politic"] },
  { id: 2, url: "img/2.jpg", keywords: ["animal"] },
  { id: 3, url: "img/3.jpg", keywords: ["baby"] },
  { id: 4, url: "img/4.jpg", keywords: ["animal"] },
  { id: 5, url: "img/5.jpg", keywords: ["baby"] },
  { id: 6, url: "img/6.jpg", keywords: ["movie"] },
  { id: 7, url: "img/7.jpg", keywords: ["baby"] },
  { id: 8, url: "img/8.jpg", keywords: ["movie"] },
  { id: 9, url: "img/9.jpg", keywords: ["baby"] },
  { id: 10, url: "img/10.jpg", keywords: ["politic"] },
  { id: 11, url: "img/11.jpg", keywords: ["sport"] },
  { id: 12, url: "img/12.jpg", keywords: ["movie"] },
  { id: 13, url: "img/13.jpg", keywords: ["movie"] },
  { id: 14, url: "img/14.jpg", keywords: ["movie"] },
  { id: 15, url: "img/15.jpg", keywords: ["movie"] },
  { id: 16, url: "img/16.jpg", keywords: ["movie"] },
  { id: 17, url: "img/17.jpg", keywords: ["politic"] },
  { id: 18, url: "img/18.jpg", keywords: ["movie"] },
  { id: 19, url: "img/19.png", keywords: ["movie"] },
  { id: 20, url: "img/20.png", keywords: ["sport"] },
  { id: 21, url: "img/21.png", keywords: ["baby"] },
  { id: 22, url: "img/22.png", keywords: ["movie"] },
  { id: 23, url: "img/23.jpg", keywords: ["movie"] },
  { id: 24, url: "img/24.jpg", keywords: ["baby"] },
];

function getImgStrHtml(key) {
  var imgs = gImgs;
  if (key) {
    imgs = gImgs.filter((img) => {
      return img.keywords.some(function (keyword) {
        return keyword.includes(key);
      });
    });
  }
  var strHTML = imgs.map((img) => {
    return `<img onclick="openCanvas(${img.id})" src="${img.url}"></img>`;
  });
  return strHTML.join("");
}

function getImgById(imgId) {
  return gImgs.find((img) => img.id === imgId);
}
