class Offsets {
  constructor(offsetImgElem, label) {
    this.offsetImgElem = offsetImgElem;
    this.offset = {
      x: null,
      y: null
    };
    this.label = label;
  }

  setOffsetX = x => {
    this.offset = { ...this.offset, x: Math.round(x) };
  };

  setOffsetY = y => {
    this.offset = { ...this.offset, y: Math.round(y) };
  };

  getOffset = () => {
    return this.offset;
  };

  calculateOffsetToParent = (parentElem, elem) => {
    console.log(parentElem.getBoundingClientRect().left, this.offset.x);
    this.setOffsetX(
      Math.round(elem.getBoundingClientRect().left - parentElem.getBoundingClientRect().left)
    );

    this.setOffsetY(
      Math.round(elem.getBoundingClientRect().top - parentElem.getBoundingClientRect().top)
    );
  };

  calculateShiftedCoords = parentElem => {
    return {
      x: Math.round(parentElem.getBoundingClientRect().left) + this.offset.x,
      y: Math.round(parentElem.getBoundingClientRect().top) + this.offset.y
    };
  };

  isInCanvas = (parentElem, elem) => {
    return (
      Math.round(elem.getBoundingClientRect().left) >=
      Math.round(parentElem.getBoundingClientRect().left)
    );
  };

  displayOffset = () => {
    this.offsetImgElem.innerHTML = `${this.label}: X ${this.offset.x}, Y ${this.offset.y}`;
  };
}

export default Offsets;
