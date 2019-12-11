class ResizeElement {
  constructor(imgElement, elementModel, offsetImgElem) {
    this.element = imgElement;
    this.elementModel = elementModel;
    this.offsetImgElem = offsetImgElem;
    this.resizers = this.element.children;
    this.startX = null;
    this.startY = null;
    this.startWidth = null;
    this.tartHeight = null;
    this.currentResizer = null;
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
    if (!this.currentResizer.classList.contains('resizer')) return;

    this.startX = e.clientX;
    this.startY = e.clientY;
    this.startRec = this.element.getBoundingClientRect();
    document.addEventListener('mousemove', this.startResizing);
  };

  onMouseUp = e => {
    document.removeEventListener('mousemove', this.startResizing);
    this.elementModel.displayOffset();
  };

  startResizing = e => {
    if (this.currentResizer.classList.contains('se')) {
      //console.log('se');
      this.element.style.width = this.startRec.width - (this.startX - e.clientX) + 'px';
      this.element.style.height = this.startRec.height - (this.startY - e.clientY) + 'px';
    } else if (this.currentResizer.classList.contains('ne')) {
      //console.log('ne');
      this.element.style.width = this.startRec.width - (this.startX - e.clientX) + 'px';
      this.element.style.height = this.startRec.height + (this.startY - e.clientY) + 'px';
      this.element.style.top = this.startRec.top - (this.startY - e.clientY) + 'px';
    } else if (this.currentResizer.classList.contains('sw')) {
      //console.log('sw');
      this.element.style.width = this.startRec.width + (this.startX - e.clientX) + 'px';
      this.element.style.height = this.startRec.height - (this.startY - e.clientY) + 'px';
      this.element.style.left = this.startRec.left - (this.startX - e.clientX) + 'px';
    } else if (this.currentResizer.classList.contains('nw')) {
      //console.log('nw');
      this.element.style.width = this.startRec.width + (this.startX - e.clientX) + 'px';
      this.element.style.height = this.startRec.height + (this.startY - e.clientY) + 'px';
      this.element.style.top = this.startRec.top - (this.startY - e.clientY) + 'px';
      this.element.style.left = this.startRec.left - (this.startX - e.clientX) + 'px';
    }

    this.elementModel.setOffsetX(this.element.offsetLeft);
    this.elementModel.setOffsetY(this.element.offsetTop);
  };
}

export default ResizeElement;
