class Element {
  constructor(element, elOrigin, canvas, offSetsModel, isText) {
    this.element = element;
    this.offSetsModel = offSetsModel;
    this.elemOrigin = elOrigin;
    this.canvas = canvas;
    this.windowResizeEvent = false;

    // Attributes for moving
    this.origX = this.element.getBoundingClientRect().left;
    this.origY = this.element.getBoundingClientRect().top;
    this.shfitX = null;
    this.shiftY = null;
    this.status = 0; //1 - moving, 2 - resizing

    // Attributes for resizing
    this.resizers = this.element.children;
    this.startX = null;
    this.startY = null;
    this.currentResizer = null;
    this.canvas = canvas;
    this.textElem = { isText: isText, textContent: '', fontSpaceRatio: null };

    if (this.textElem.isText) {
      //Find the original font size and div width of the text element
      const font = window.getComputedStyle(this.element, null).getPropertyValue('font-size');
      const width = window.getComputedStyle(this.element, null).getPropertyValue('width');

      this.textElem.fontSpaceRatio = parseFloat(font) / parseFloat(width);
    }
  }

  bindEvent = () => {
    this.element.addEventListener('mousedown', this.onMouseDown);
    this.element.addEventListener('mouseup', this.onMouseUp);

    for (const resizer of this.resizers) {
      resizer.addEventListener('mousedown', this.onMouseDown);
      resizer.addEventListener('mouseup', this.onMouseUp);
    }

    if (!this.windowResizeEvent) {
      window.addEventListener('resize', this.onWindowResize);
      this.windowResizeEvent = true;
    }

    // Cancel default ondragstart
    this.element.ondragstart = function() {
      return false;
    };
  };

  unBindEvent = () => {
    this.element.removeEventListener('mousedown', this.onMouseDown);
    this.element.removeEventListener('mouseup', this.onMouseUp);

    for (const resizer of this.resizers) {
      resizer.removeEventListener('mousedown', this.onMouseDown);
      resizer.removeEventListener('mouseup', this.onMouseUp);
    }
  };

  onWindowResize = () => {
    if (this.offSetsModel.isInCanvas(this.canvas, this.element)) {
      const shiftedCoords = this.offSetsModel.calculateShiftedCoords(this.canvas);
      this.moveTo(shiftedCoords.x, shiftedCoords.y);
    }
    if (this.textElem.isText) {
      const width = window.getComputedStyle(this.element, null).getPropertyValue('width');
      const fontSize = width * this.textElem.fontSpaceRatio;
      this.element.style.fontSize = Math.round(fontSize) + 'px';
    }
  };

  onMouseDown = e => {
    const target = e.target;

    // Check status
    if (target.classList.contains('resizer')) {
      this.status = 2;
    } else if (target.classList.contains('source')) {
      this.status = 1;
    } else {
      this.status = 0;
    }

    // 1=Moving, 2=Resizing
    if (this.status === 1) {
      this.currentResizer = null;
      this.shiftX = e.clientX - this.element.getBoundingClientRect().left;
      this.shiftY = e.clientY - this.element.getBoundingClientRect().top;
      document.addEventListener('mousemove', this.startMoving);
    } else if (this.status === 2) {
      this.currentResizer = target;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startRec = this.element.getBoundingClientRect();
      document.addEventListener('mousemove', this.startResizing);
    }
  };

  onMouseUp = e => {
    if (this.status === 1) {
      document.removeEventListener('mousemove', this.startMoving);
      this.offSetsModel.calculateOffsetToParent(this.canvas, this.element);
    } else if (this.status === 2) {
      document.removeEventListener('mousemove', this.startResizing);
    }
    this.offSetsModel.displayOffset();
  };

  startMoving = e => {
    if (this.status === 1) {
      if (Math.abs(e.pageX - this.origX) < 160.0) {
        this.moveBackToOrigin();
      } else {
        this.moveTo(Math.round(e.pageX - this.shiftX), Math.round(e.pageY - this.shiftY));
      }
    }
  };

  moveTo = (pageX, pageY) => {
    this.element.style.left = pageX + 'px';
    this.element.style.top = pageY + 'px';

    if (!this.element.parentElement.classList.contains('canvas')) {
      this.canvas.append(this.element);
    }
  };

  moveBackToOrigin = e => {
    this.element.style.left = this.origX + 'px';
    this.element.style.top = this.origY + 'px';
    this.elemOrigin.append(this.element);
  };

  startResizing = e => {
    if (this.currentResizer.classList.contains('se')) {
      this.element.style.width = Math.round(this.startRec.width - (this.startX - e.clientX)) + 'px';
      this.element.style.height =
        Math.round(this.startRec.height - (this.startY - e.clientY)) + 'px';
    } else if (this.currentResizer.classList.contains('ne')) {
      this.element.style.width = Math.round(this.startRec.width - (this.startX - e.clientX)) + 'px';
      this.element.style.height =
        Math.round(this.startRec.height + (this.startY - e.clientY)) + 'px';
      this.element.style.top = Math.round(this.startRec.top - (this.startY - e.clientY)) + 'px';
    } else if (this.currentResizer.classList.contains('sw')) {
      this.element.style.width = Math.round(this.startRec.width + (this.startX - e.clientX)) + 'px';
      this.element.style.height =
        Math.round(this.startRec.height - (this.startY - e.clientY)) + 'px';
      this.element.style.left = Math.round(this.startRec.left - (this.startX - e.clientX)) + 'px';
    } else if (this.currentResizer.classList.contains('nw')) {
      this.element.style.width = Math.round(this.startRec.width + (this.startX - e.clientX)) + 'px';
      this.element.style.height =
        Math.round(this.startRec.height + (this.startY - e.clientY)) + 'px';
      this.element.style.top = Math.round(this.startRec.top - (this.startY - e.clientY)) + 'px';
      this.element.style.left = Math.round(this.startRec.left - (this.startX - e.clientX)) + 'px';
    }
    if (this.textElem.isText) {
      const fontSize = this.element.style.width.split('px')[0] * this.textElem.fontSpaceRatio;
      this.element.style.fontSize = Math.round(fontSize) + 'px';
    }
    this.offSetsModel.calculateOffsetToParent(this.canvas, this.element);
  };
}

export default Element;
