class MoveElement {
  constructor(element, imgOrigin, canvas, offSetsModel, offsetImgElem) {
    this.element = element;
    this.offSetsModel = offSetsModel;
    this.offsetImgElem = offsetImgElem;
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

      this.offSetsModel.setOffsetX(this.element.offsetLeft);
      this.offSetsModel.setOffsetY(this.element.offsetTop);
      this.offSetsModel.displayOffset();
    }
  };

  onDocMouseMove = e => {
    if (this.active) {
      if (Math.abs(e.pageX - this.origX) < 160.0) {
        this.moveBackToOrigin();
      } else {
        this.moveTo(e.pageX, e.pageY);
      }
    }
  };

  moveTo = (pageX, pageY) => {
    this.element.style.left = pageX - this.shiftX + 'px';
    this.element.style.top = pageY - this.shiftY + 'px';
    this.canvas.append(this.element);
  };

  moveBackToOrigin = e => {
    this.element.style.left = this.origX + 'px';
    this.element.style.top = this.origY + 'px';
    this.elemOrigin.append(this.element);
  };
}

export default MoveElement;
