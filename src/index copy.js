console.log("Index.js loaded");

import { initAnimations } from './animations';
import { initModals } from './modals';
import { initScroll } from './scroll';
import { initNav } from './nav';
import { initEventListeners } from './eventListeners';

document.addEventListener("DOMContentLoaded", () => {
  try {
    console.log("Document is ready, 'script.js' from sandbox Loaded! UPDATE");

    initAnimations();
    initModals();
    initScroll();
    initNav();
    initEventListeners();
  } catch (error) {
    console.error("An error occurred:", error);
    alert("ERROR");
  }
});
