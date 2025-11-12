// Get references to ALL the HTML elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const galleryContainer = document.getElementById('galleryContainer');
const loadMoreButton = document.getElementById('loadMoreButton');

// !! PASTE YOUR UNSPLASH ACCESS KEY HERE !!
const accessKey = 'd1pMWhEoi7JGL65rOhEbhYPompMWW-c_TRprM3OFvAk';

// --- State Variables ---
// We need to store the current query and page number
let currentQuery = '';
let currentPage = 1;

// --- Event Listeners ---
// --- Event Listeners ---

// NEW: Load random images when the page first loads
document.addEventListener('DOMContentLoaded', loadRandomImages);

// 1. Search Button Click
searchButton.addEventListener('click', () => {
    performSearch();
});

// 1. Search Button Click
searchButton.addEventListener('click', () => {
    performSearch();
});

// 2. "Enter" Key Press
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// 3. "Load More" Button Click
loadMoreButton.addEventListener('click', () => {
    // Increment the page and search again
    currentPage++;
    searchImages(currentQuery, currentPage);
});

// --- Main Search Function ---
function performSearch() {
    // Get the search term
    currentQuery = searchInput.value;
    
    // Check if the input is empty
    if (currentQuery === '') {
        galleryContainer.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    // This is a NEW search, so reset to page 1
    currentPage = 1;
    // Clear any old images from a previous search
    galleryContainer.innerHTML = '';
    
    // Call the function that fetches images
    searchImages(currentQuery, currentPage);
}

// --- Function to Fetch from API ---
async function searchImages(query, page) {
    // Build the URL with the query AND the page number
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=10&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Pass the results to be displayed
        displayImages(data.results);

    } catch (error) {
        console.error('Error fetching images:', error);
        galleryContainer.innerHTML = '<p>Sorry, something went wrong.</p>';
    }
}

// --- Function to Display Images ---
function displayImages(images) {
    // Check if we got any results
    if (images.length === 0) {
        // If it was the first page, show "No images"
        if (currentPage === 1) {
            galleryContainer.innerHTML = '<p>No images found.</p>';
        }
        // Hide the "Load More" button if there are no more results
        loadMoreButton.classList.add('hidden');
        return;
    }

    // Loop through each image result
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description;

        // Append the new <img> element (adds to the grid)
        galleryContainer.appendChild(imgElement);
    });

    // Show the "Load More" button now that we have results
    loadMoreButton.classList.remove('hidden');
}

// --- Function to Load Initial Random Images ---
async function loadRandomImages() {
    // This API endpoint gets 10 random photos
    const url = `https://api.unsplash.com/photos/random?count=10&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const images = await response.json();

        // Check for API errors (e.g., rate limit)
        if (!response.ok) {
            throw new Error(`API Error: ${images.errors[0]}`);
        }

        // Display these images WITHOUT showing the "Load More" button
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.urls.small;
            imgElement.alt = image.alt_description;
            galleryContainer.appendChild(imgElement);
        });

    } catch (error) {
        console.error('Error fetching random images:', error);
        galleryContainer.innerHTML = '<p>Welcome! Try searching for an image.</p>';
    }
}