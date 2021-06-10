import images from './images/index.js';

let activeElementIndex = 0;

// Shortening the title string
const shortenTitle = (title) => {
    const length = title.length;
    if (length > 33) {
        title = title.slice(0, 15) + '...' + title.slice(length-15, length);
    }
    return title;
};

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
        <span>${shortenTitle(image.title)}</span>
    `;
};

// Creating sidebar with list of all the images
const imageList = images.map(image => {
    const listElement = document.createElement('div');
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
document.addEventListener('keyup', (event) => {
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