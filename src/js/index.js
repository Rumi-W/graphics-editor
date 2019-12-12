import elements from './elements';
import MoveElement from './MoveElement';
import ResizeElement from './ResizeElement';
import Offsets from './models/Offsets';

const { imgElement, imgOrigin, textElement, textOrigin, canvas, offsetDisplayElem } = elements;

// Image Element
let isText = false;

let newOffsetElemImg = document.createElement('div');
newOffsetElemImg.classList.add('offset-img');
offsetDisplayElem.append(newOffsetElemImg);
const offsetsModelImg = new Offsets(newOffsetElemImg, 'Image Offset');

console.log('hrere');
const imgMove = new MoveElement(imgElement, imgOrigin, canvas, offsetsModelImg).bindEvent();
const imgResize = new ResizeElement(imgElement, offsetsModelImg, canvas, isText).bindEvent();

// Text Element
isText = true;

let newOffsetElemText = document.createElement('div');
newOffsetElemText.classList.add('offset-text');
offsetDisplayElem.append(newOffsetElemText);
const offsetsModelText = new Offsets(newOffsetElemText, 'Text Offset');

const textMove = new MoveElement(textElement, textOrigin, canvas, offsetsModelText).bindEvent();
const textResize = new ResizeElement(textElement, offsetsModelText, canvas, isText).bindEvent();
