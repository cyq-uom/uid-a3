// script.js

// get necessary DOM elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const cart = document.getElementById('cart');
const cartContent = document.getElementById('cartContent');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// add event listener for search button
searchBtn.addEventListener('click', () => {
	const searchTerm = searchInput.value.trim();
	if (searchTerm !== '') {
		alert('You searched for: ' + searchTerm);
		// Perform search or other actions here
	} else {
		alert('Please enter a search term.');
	}
});

// add event listener for cart icon to toggle cart content
cart.addEventListener('click', () => {
	cartContent.classList.toggle('show');
});

// search box animation
searchBtn.addEventListener('click', () => {
	searchInput.classList.toggle('show');
});

// add event listener for menu toggle button
menuToggle.addEventListener('click', () => {
	navLinks.classList.toggle('show');
});
// code for carousel
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const carouselInner = document.querySelector('.carousel-inner');

let currentIndex = 0;

// ok im gonna scream here so
// nextBtn.addEventListener('click', () => {
// 	currentIndex++;
// 	if (currentIndex > 2) {
// 		currentIndex = 0;
// 	}
// 	updateCarousel();
// });

// prevBtn.addEventListener('click', () => {
// 	currentIndex--;
// 	if (currentIndex < 0) {
// 		currentIndex = 2;
// 	}
// 	updateCarousel();
// });

function updateCarousel() {
	const offset = currentIndex * -100;
	carouselInner.style.transform = `translateX(${offset}%)`;
}

function filterProducts() {
	var input, filter, cards, card, title, i, txtValue;
	input = document.querySelector('.search-input');
	filter = input.value.toUpperCase();
	cards = document.querySelectorAll('.product-card');

	// check all carts hide everything but input
	for (i = 0; i < cards.length; i++) {
		card = cards[i];
		title = card.querySelector('h2');
		txtValue = title.textContent || title.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			card.style.display = ""; // show input
		} else {
			card.style.display = "none"; // hide non input
		}
	}
}
document.addEventListener("DOMContentLoaded", function () {
    var searchBtn = document.getElementById("searchBtn");
    var searchInput = document.querySelector(".search-input");

    searchBtn.addEventListener("click", function () {
        searchInput.classList.toggle("active"); // CHANGE
    });
});
