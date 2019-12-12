class ResizeElement {
  constructor(element, offSetsModel, isText) {
    this.element = element;
    this.offSetsModel = offSetsModel;
    this.resizers = this.element.children;
    this.startX = null;
    this.startY = null;
    this.startWidth = null;
    this.tartHeight = null;
    this.currentResizer = null;
    this.textElem = { isText: isText, textContent: '', fontSpaceRatio: null };

    if (this.textElem.isText) {
      //Find the original font size and div width of the text element
      const font = window.getComputedStyle(this.element, null).getPropertyValue('font-size');
      const width = window.getComputedStyle(this.element, null).getPropertyValue('width');

      this.textElem.fontSpaceRatio = parseFloat(font) / parseFloat(width);
    }
  }

  bindEvent = () => {
    for (const resizer of this.resizers) {
      resizer.addEventListener('mousedown', this.resizerMouseDown);
      resizer.addEventListener('mouseup', this.onMouseUp);
    }
    // Cancel default ondragstart
    this.element.ondragstart = function() {
      return false;
    };
  };

  resizerMouseDown = e => {
    this.currentResizer = e.target;

    // If the element isn't a resizer element, cancel.
    if (!this.currentResizer.classList.contains('resizer')) return;

    this.startX = e.clientX;
    this.startY = e.clientY;
    this.startRec = this.element.getBoundingClientRect();
    document.addEventListener('mousemove', this.startResizing);
  };

  onMouseUp = e => {
    document.removeEventListener('mousemove', this.startResizing);
    this.offSetsModel.displayOffset();
  };

  startResizing = e => {
    if (this.currentResizer.classList.contains('se')) {
      this.element.style.width = this.startRec.width - (this.startX - e.clientX) + 'px';
      this.element.style.height = this.startRec.height - (this.startY - e.clientY) + 'px';
    } else if (this.currentResizer.classList.contains('ne')) {
      this.element.style.width = this.startRec.width - (this.startX - e.clientX) + 'px';
      this.element.style.height = this.startRec.height + (this.startY - e.clientY) + 'px';
      this.element.style.top = this.startRec.top - (this.startY - e.clientY) + 'px';
    } else if (this.currentResizer.classList.contains('sw')) {
      this.element.style.width = this.startRec.width + (this.startX - e.clientX) + 'px';
      this.element.style.height = this.startRec.height - (this.startY - e.clientY) + 'px';
      this.element.style.left = this.startRec.left - (this.startX - e.clientX) + 'px';
    } else if (this.currentResizer.classList.contains('nw')) {
      this.element.style.width = this.startRec.width + (this.startX - e.clientX) + 'px';
      this.element.style.height = this.startRec.height + (this.startY - e.clientY) + 'px';
      this.element.style.top = this.startRec.top - (this.startY - e.clientY) + 'px';
      this.element.style.left = this.startRec.left - (this.startX - e.clientX) + 'px';
    }
    if (this.textElem.isText) {
      const fontSize = this.element.style.width.split('px')[0] * this.textElem.fontSpaceRatio;
      this.element.style.fontSize = fontSize + 'px';
    }
    this.offSetsModel.setOffsetX(this.element.offsetLeft);
    this.offSetsModel.setOffsetY(this.element.offsetTop);
  };
}

export default ResizeElement;
