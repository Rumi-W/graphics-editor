import elements from './elements';
import Element from './Element';
import Offsets from './models/Offsets';

const { imgElement, imgOrigin, textElement, textOrigin, canvas, offsetDisplayElem } = elements;

// Image Element
let isText = false;

let newOffsetElemImg = document.createElement('div');
newOffsetElemImg.classList.add('offset-img');
offsetDisplayElem.append(newOffsetElemImg);
const offsetsModelImg = new Offsets(newOffsetElemImg, 'Image Offset');

const agileImage = new Element(imgElement, imgOrigin, canvas, offsetsModelImg, isText).bindEvent();

// Text Element
isText = true;

let newOffsetElemText = document.createElement('div');
newOffsetElemText.classList.add('offset-text');
offsetDisplayElem.append(newOffsetElemText);
const offsetsModelText = new Offsets(newOffsetElemText, 'Text Offset');

const agileText = new Element(
  textElement,
  textOrigin,
  canvas,
  offsetsModelText,
  isText
).bindEvent();
