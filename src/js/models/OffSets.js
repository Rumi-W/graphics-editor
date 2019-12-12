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
    this.offset = { ...this.offset, x };
  };

  setOffsetY = y => {
    this.offset = { ...this.offset, y };
  };

  getOffset = () => {
    return this.offset;
  };

  calculateOffsetToParent = (parentElem, elem) => {
    console.log(parentElem.getBoundingClientRect().left - elem.getBoundingClientRect().left);
    this.setOffsetX(
      Math.round(elem.getBoundingClientRect().left - parentElem.getBoundingClientRect().left)
    );

    this.setOffsetY(
      Math.round(elem.getBoundingClientRect().top - parentElem.getBoundingClientRect().top)
    );
  };

  displayOffset = () => {
    this.offsetImgElem.innerHTML = `${this.label}: X ${this.offset.x}, Y ${this.offset.y}`;
  };
}

export default Offsets;
