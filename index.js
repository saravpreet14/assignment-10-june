import images from './images/index.js';

let activeElementIndex = 0;

// Creating preview image element for given index of image
const previewImage = (index) => {
    const previewArea = document.querySelector('.previewArea');
    previewArea.innerHTML = `
        <div class='previewImage'>
            <img src='${images[index].previewImage}'>
        </div>
        <p>${images[index].title}</p>
    `;
}

// Creating list element for the given image
const imageElement = (image) => {
    return `
        <div class='imageIcon'>
            <img src='${image.previewImage}'>
        </div>
        <span>${image.title}</span>
    `;
};

// Creating sidebar with list of all the images
const imageList = images.map(image => {
    const listElement = document.createElement('li');
    listElement.classList.add('listElement');
    listElement.innerHTML = imageElement(image);
    return listElement;
});

// Changing selected image
const updateSelected = (index) => {
    if (index == activeElementIndex) {
        return;
    }
    imageList[activeElementIndex].classList.toggle('active');
    imageList[index].classList.toggle('active');
    previewImage(index);
    activeElementIndex = index;
}

// Make first image selected initially
imageList[0].classList.add('active');
previewImage(0);

// Adding event listener for updating the preview image through click
for ( let i=0; i < imageList.length; i++ ) {
    imageList[i].addEventListener('click', () => {
        updateSelected(i);
    })
}

// Adding event listener for updating the preview image through arrow keys
document.addEventListener('key', (event) => {
    if (event.code === 'ArrowDown') {
        const newIndex = Math.min(images.length-1, activeElementIndex + 1);
        updateSelected(newIndex);
    }
    else if (event.code === 'ArrowUp') {
        const newIndex = Math.max(0, activeElementIndex-1);
        updateSelected(newIndex);
    }
})

document.querySelector('.sidebar').append(...imageList);

// Function to handle overflow in title
const dynamicTitle = () => {
    for ( let i=0; i < imageList.length; i++ ) {
        const titleElement = imageList[i].querySelector('span');
        const title = images[i].title;
        titleElement.innerText = title;
        if(titleElement.scrollWidth > titleElement.clientWidth) {
            for (let length=1; length<title.length/2; length++) {
                titleElement.innerText = title.slice(0, length) + '...' + title.slice(title.length-length, title.length);
                if (titleElement.scrollWidth > titleElement.clientWidth) {
                    titleElement.innerText = title.slice(0, length-1) + '...' + title.slice(title.length-(length-1), title.length);
                    break;
                }
            }
        }
    }
}

// Initial title overflow handling
dynamicTitle();

// Title overflow handling on window resize 
window.addEventListener('resize', dynamicTitle);