import elements from './elements';
import MoveElement from './MoveElement';
import ResizeElement from './ResizeElement';
import Element from './models/Element';

const { imgElement, imgOrigin, canvas, offsetImgElem } = elements;

let elementModel = new Element(offsetImgElem);

new MoveElement(imgElement, imgOrigin, canvas, elementModel).bindEvent();
new ResizeElement(imgElement, elementModel).bindEvent();
