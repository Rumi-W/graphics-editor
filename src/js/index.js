import elements from './elements';
import MoveElement from './MoveElement';
import ResizeElement from './ResizeElement';
import OffSets from './models/OffSets';

const { imgElement, imgOrigin, textElement, textOrigin, canvas, offsetDisplayElem } = elements;

// Image Element
let isText = false;

let newOffsetElemImg = document.createElement('div');
newOffsetElemImg.classList.add('offset-img');
offsetDisplayElem.append(newOffsetElemImg);
const offsetsModelImg = new OffSets(newOffsetElemImg, 'Image Offset');

console.log('hrere');
const imgMove = new MoveElement(imgElement, imgOrigin, canvas, offsetsModelImg).bindEvent();
const imgResize = new ResizeElement(imgElement, offsetsModelImg, isText).bindEvent();

// Text Element
isText = true;

let newOffsetElemText = document.createElement('div');
newOffsetElemText.classList.add('offset-text');
offsetDisplayElem.append(newOffsetElemText);
const offsetsModelText = new OffSets(newOffsetElemText, 'Text Offset');

const textMove = new MoveElement(textElement, textOrigin, canvas, offsetsModelText).bindEvent();
const textResize = new ResizeElement(textElement, offsetsModelText, isText).bindEvent();
