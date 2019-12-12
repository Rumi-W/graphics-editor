class MoveElement {
  constructor(element, imgOrigin, canvas, offSetsModel) {
    this.element = element;
    this.offSetsModel = offSetsModel;
    this.elemOrigin = imgOrigin;
    this.canvas = canvas;
    this.origX = this.element.getBoundingClientRect().left;
    this.origY = this.element.getBoundingClientRect().top;
    this.shfitX = null;
    this.shiftY = null;
    this.active = false;
  }

  bindEvent = () => {
    this.element.addEventListener('mousedown', this.onMouseDown);
    this.element.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('resize', this.onWindowResize);
  };

  onWindowResize = () => {
    if (this.offSetsModel.isInCanvas(this.canvas, this.element)) {
      const shiftedCoords = this.offSetsModel.calculateShiftedCoords(this.canvas);
      this.moveTo(shiftedCoords.x, shiftedCoords.y);
    }
  };

  onMouseDown = e => {
    const classes = e.target.classList;
    if (classes.contains('resizer')) {
      this.active = false;
    } else if (classes.contains('source')) {
      this.active = true;
    } else {
      this.active = false;
    }
    if (this.active) {
      this.shiftX = e.clientX - this.element.getBoundingClientRect().left;
      this.shiftY = e.clientY - this.element.getBoundingClientRect().top;
      document.addEventListener('mousemove', this.onDocMouseMove);
    }
  };

  onMouseUp = e => {
    if (this.active) {
      document.removeEventListener('mousemove', this.onDocMouseMove);

      this.offSetsModel.calculateOffsetToParent(this.canvas, this.element);
      this.offSetsModel.displayOffset();
    }
  };

  onDocMouseMove = e => {
    if (this.active) {
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

    console.log('moved', this.element.parentElement.classList.contains('canvas'));
    if (!this.element.parentElement.classList.contains('canvas')) {
      this.canvas.append(this.element);
    }
  };

  moveBackToOrigin = e => {
    this.element.style.left = this.origX + 'px';
    this.element.style.top = this.origY + 'px';
    this.elemOrigin.append(this.element);
  };
}

export default MoveElement;
