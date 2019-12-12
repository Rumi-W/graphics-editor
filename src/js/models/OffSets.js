class OffSets {
  constructor(offsetImgElem, label) {
    this.offsetImgElem = offsetImgElem;
    this.offset = {
      x: null,
      y: null
    };
    this.label = label;
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
    this.offsetImgElem.innerHTML = `${this.label}: X ${this.offset.x}, Y ${this.offset.y}`;
  };
}

export default OffSets;
