const fileSelector = document.getElementById('file-selector');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const fileName = document.getElementById('file-name');
let index = 0;

fileSelector.addEventListener('change', (event) => {
    const fileArray = Array
        .from(event.target.files)
        .sort((o1, o2) => {
            return Date.parse(getNameWithoutExtension(o1)) - Date.parse(getNameWithoutExtension(o2));
        });

    displayImage(fileArray);

    document.onkeydown = (event) => {
        if ('ArrowLeft' === event.key) {
            if (index > 0) {
                index -= 1;
                displayImage(fileArray);
            }
        } else if ('ArrowRight' === event.key) {
            if (index >= 0 && index < fileArray.length - 1) {
                index += 1;
                displayImage(fileArray);
            }
        }
    };
});

function drawImage(file) {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        let drawing = new Image();
        drawing.src = reader.result;
        drawing.onload = function () {
            context.drawImage(drawing, 0, 0, 1500, 800);
        };
    });

    reader.readAsDataURL(file);
}

function getNameWithoutExtension(file) {
    return file.name.slice(0, -4);
}

function displayImage(fileArray) {
    if (index >= 0 && index < fileArray.length) {
        const selectedFile = fileArray[index];
        fileName.innerHTML = 'File name: ' + selectedFile.name;
        drawImage(selectedFile);
    }
}