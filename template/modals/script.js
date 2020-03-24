// Buttons
const basicBtn = document.getElementById("basic-modalBtn");
const imageBtn = document.getElementById("image-modalBtn");
const cardBtn = document.getElementById("card-modalBtn");

// Modals
const basicModal = document.getElementById("basic-modal");
const imageModal = document.getElementById("image-modal");
const cardModal = document.getElementById("card-modal");

function openModal(element) {
  document.documentElement.classList.add("is-clipped");
  element.classList.add("is-active");
}

// Open Events
basicBtn.addEventListener("click", function() {
  openModal(basicModal);
});

imageBtn.addEventListener("click", function() {
  openModal(imageModal);
});

cardBtn.addEventListener("click", function() {
  openModal(cardModal);
});

//////////////////////////////////////////////////////////////////////

function closeModal(element) {
  document.documentElement.classList.remove("is-clipped");
  element.classList.remove("is-active");
}

// Close Events
document.querySelectorAll(".modal-background").forEach(function(el) {
  el.addEventListener("click", function() {
    closeModal(this.parentElement);
  });
});

document.querySelectorAll(".modal-close").forEach(function(el) {
  el.addEventListener("click", function() {
    closeModal(this.parentElement);
  });
});

document.querySelectorAll(".close").forEach(function(el) {
  el.addEventListener("click", function() {
    closeModal(this.parentElement);
  });
});
