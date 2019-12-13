import elements from './elements';
import Element from './Element';
import Offsets from './models/Offsets';

// DOM elements
const {
  imgElement,
  imgOrigin,
  textElement,
  textOrigin,
  canvas,
  offsetDisplayElem,
  buttonDone,
  buttonEdit,
  resizers
} = elements;

window.addEventListener('resize', function() {
  // Adjust font size of the text in the side bar when window size changes.
  const width = window.getComputedStyle(textElement, null).getPropertyValue('width');
  const fontSpaceRatio = parseFloat(47) / parseFloat(200);
  const fontSize = parseFloat(width) * fontSpaceRatio;
  textElement.style.fontSize = Math.round(fontSize) + 'px';
});

// Create Image Element
let isText = false;

let newOffsetElemImg = document.createElement('div');
newOffsetElemImg.classList.add('offset-img');
newOffsetElemImg.classList.add('select-diabled');
offsetDisplayElem.append(newOffsetElemImg);
const offsetsModelImg = new Offsets(newOffsetElemImg, 'Image Offset');

const agileImage = new Element(imgElement, imgOrigin, canvas, offsetsModelImg, isText);
agileImage.bindEvent();

// Create Text Element
isText = true;

let newOffsetElemText = document.createElement('div');
newOffsetElemText.classList.add('offset-text');
newOffsetElemText.classList.add('select-diabled');
offsetDisplayElem.append(newOffsetElemText);
const offsetsModelText = new Offsets(newOffsetElemText, 'Text Offset');

const agileText = new Element(textElement, textOrigin, canvas, offsetsModelText, isText);
agileText.bindEvent();

// Done/Edit button events
buttonDone.addEventListener('click', onDoneClick);
buttonEdit.addEventListener('click', onEditClick);

// When it's done, hide the resizers (small black handles) and unbind events.
function onDoneClick() {
  for (const resizer of resizers) {
    resizer.classList.add('hidden');
  }
  agileImage.unBindEvent();
  agileText.unBindEvent();
}

// To continue edit, show the resizers (small black handles) and bind events.
function onEditClick() {
  for (const resizer of resizers) {
    if (resizer.classList.contains('hidden')) {
      resizer.classList.remove('hidden');
    }
  }
  agileImage.bindEvent();
  agileText.bindEvent();
}
