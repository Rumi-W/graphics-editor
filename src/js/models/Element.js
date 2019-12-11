class Element {
  constructor(offsetImgElem) {
    this.offsetImgElem = offsetImgElem;
    this.offset = {
      x: null,
      y: null
    };
  }

  setOffsetX = x => {
    this.offset = { ...this.offset, x };
  };

  setOffsetY = y => {
    this.offset = { ...this.offset, y };
  };

  getOffset = () => {
    return this.offset;
  };

  displayOffset = () => {
    this.offsetImgElem.innerHTML = `Image Offset: X ${this.offset.x}, Y ${this.offset.y}`;
  };
}

export default Element;
