import images from './images/index.js';

let activeElementIndex = 0;

const shortenTitle = (title) => {
    const length = title.length;
    if (length > 33) {
        title = title.slice(0, 15) + '...' + title.slice(length-15, length);
    }
    return title;
};

const previewImage = (index) => {
    const previewArea = document.querySelector('.previewArea');
    previewArea.innerHTML = `
        <div class='previewImage'>
            <img src='${images[index].previewImage}'>
        </div>
        <p>${images[index].title}</p>
    `;
}

const imageElement = (image) => {
    return `
        <div class='imageIcon'>
            <img src='${image.previewImage}'>
        </div>
        <span>${shortenTitle(image.title)}</span>
    `;
};

const imageList = images.map(image => {
    const listElement = document.createElement('div');
    listElement.classList.add('listElement');
    listElement.innerHTML = imageElement(image);
    return listElement;
});

const updateSelected = (index) => {
    if (index == activeElementIndex) {
        return;
    }
    imageList[activeElementIndex].classList.toggle('active');
    imageList[index].classList.toggle('active');
    previewImage(index);
    activeElementIndex = index;
}

imageList[0].classList.add('active');
previewImage(0);

for ( let i=0; i < imageList.length; i++ ) {
    imageList[i].addEventListener('click', () => {
        updateSelected(i);
    })
}

document.addEventListener('keyup', (event) => {
    if (event.keyCode == 40) {
        const newIndex = Math.min(images.length-1, activeElementIndex + 1);
        updateSelected(newIndex);
    }
    else if (event.keyCode == 38) {
        const newIndex = Math.max(0, activeElementIndex-1);
        updateSelected(newIndex);
    }
})

const sidebar = document.querySelector('.sidebar');
sidebar.append(...imageList);