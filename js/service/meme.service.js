"use strict";

var gSavedMemes = [];

const STORAGE_KEY = "savedMemes";

function loadMemes() {
  var memes = getMemesFromStorage();
  if (!memes) return;
  gSavedMemes = memes;
  return gSavedMemes;
}

function getMemesFromStorage() {
  var memes = loadFromStorage(STORAGE_KEY);
  return memes;
}

function saveMemesToStorage(memes) {
  addToStorage(STORAGE_KEY, memes);
}
