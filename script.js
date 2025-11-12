const searchInput = document.getElementsById('searchInput');
const galleryContainer = document.getElementById('galleryContainer');

const accessKey = 'd1pMWhEoi7JGL65rOhEbhYPompMWW-c_TRprM3OFvAk';

searchInput.addEventListener('keydown', (Event) => {
    if(Event.key === 'Enter'){
        const query = searchInput.value;
        if(query){
            searchImages(query);
        }
    }
} );

async function searchImages(query){
    galleryContainer.innerHTML = '';

const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=10&client_id=${accessKey}`;

    try{
        const response = await fetch(url);
        const data = await response.json();

        displayImages(data.results);
    
     } catch(error){
        console.error('error fetching images: ', error);
        galleryContainer.innerHTML = '<p> Sorry, something went wrong.</p>';

    }
    }

    function displayImages(images){
        if(images.length === 0){
            galleryContainer.innerHTML = '<p> No images found.</p>';
            return;
        }

        images.forEach(image => {
            const imgElement = document.createElement('img');

            imgElement.src = image.urls.small;
            imgElement.alt = image.alt_description;
            
            galleryContainer.appendChild(imgElement);
        });
    }


    


9493602222

