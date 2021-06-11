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

// Creating sidebar with list of all the images
const imageList = images.map(image => {
    const listElement = document.createElement('li');
    listElement.classList.add('listElement');
    listElement.innerHTML = `
        <div class='imageIcon'>
            <img src='${image.previewImage}'>
        </div>
        <span>${image.title}</span>
    `;
    return listElement;
});

// Changing selected image
const updateSelected = (index) => {
    // no change required
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

// Checks if title overflows and updates title
const willTitleOverflow = (index, length) => {
    const titleElement = imageList[index].querySelector('span');
    const title = images[index].title;
    if (length*2 < title.length) {
        titleElement.innerText = title.slice(0, length-1) + '...' + title.slice(images[index].title.length-(length-1), title.length);
    }
    else {
        titleElement.innerText = title;
    }
    return titleElement.clientHeight < titleElement.scrollHeight;
}

// Function to handle overflow in title
const dynamicTitle = () => {
    for ( let i=0; i < imageList.length; i++ ) {
        const title = images[i].title;
        if(willTitleOverflow(i, title.length)) {
            let minLength = 0, maxLength = title.length/2, maxLengthWithoutOverflow = 0;
            while (minLength <= maxLength) {
                let length = Math.floor((minLength + maxLength) / 2);
                if (willTitleOverflow(i, length)) {
                    maxLength = length - 1;
                }
                else {
                    maxLengthWithoutOverflow = length;
                    minLength = length + 1;
                }
            }
            willTitleOverflow(i, maxLengthWithoutOverflow);
        }
    }
}

// Initial title overflow handling
dynamicTitle();

// Title overflow handling on window resize 
window.addEventListener('resize', dynamicTitle);