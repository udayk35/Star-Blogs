// script.js
document.getElementById('addField').addEventListener('click', function() {
    addField();
});


document.getElementById('alignLeft').addEventListener('click', function() {
    setTextAlign('left');
});

document.getElementById('alignCenter').addEventListener('click', function() {
    setTextAlign('center');
});

document.getElementById('alignRight').addEventListener('click', function() {
    setTextAlign('right');
});

function addField(type) {
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'field-container';

    let subtitle;
        subtitle = document.createElement('input');
        subtitle.type = 'text';
        subtitle.placeholder = 'subtitle';
        subtitle.className = 'subtitle';
        subtitle.name = 'subtitle';
    let para;
        para = document.createElement('textarea');
        para.placeholder = 'Write Your Content .....';
        para.className = 'paragraph';
        para.name = 'para';


        fieldContainer.appendChild(subtitle);
        fieldContainer.appendChild(para);
    document.getElementById('blogContent').appendChild(fieldContainer);
}



function setTextAlign(alignment) {
    let elements = document.querySelectorAll('.field-container');
    elements.forEach(element => {
        element.style.textAlign = alignment;
    });
}
