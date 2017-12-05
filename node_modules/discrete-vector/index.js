/**
 * Defining of Discrete Vector class
 * Min value -- 0
 * Max value is set by 'range' parameter
 * Default range -- 1 (binary vector)
 */

class DiscreteVector extends Array {
  constructor(origin, range = 1) {
    super();

    if (Array.isArray(origin)) {
      origin.forEach((item, i) => this[i] = 0);
    } else if (typeof origin === 'number') {
      this.push(...Array(origin).fill(0));
    } else {
      throw(new Error('Argument is neither array nor number!'));
    }

    Object.defineProperty(this, 'range', {
      value: range,
      enumerable: false
    });
    Object.defineProperty(this, 'combinations', {
      value: Math.pow(range + 1, this.length),
      enumerable: false
    });
  }

  // Finds next combination for discrete vector
  // Imperative implementation:
  next(exactNumber) {
    for (let i = 0; i < this.length; i++) {
      if (this[i] < this.range) {
        this[i]++;
        break;
      } else {
        this[i] = 0;
      }
    }
    if (exactNumber && this.sumOfItems() !== exactNumber) this.next(exactNumber);
    return this;
  }

  // Functional implementation:
  next_(exactNumber) {
    this.some((item, i) => item < this.range ? ++this[i] : this[i] = 0);
    if (exactNumber && this.sumOfItems() !== exactNumber) this.next_(exactNumber);
    return this;
  }

  // Fills the vector with random values
  // Can invoke an 'Range error: Maximum call stack size exceeded' for rare combinations
  randomize(exactNumber) {
    this.forEach((item, i) => this[i] = Math.floor(Math.random() * (this.range + 1)));
    if (exactNumber && this.sumOfItems() !== exactNumber) this.randomize(exactNumber);
    return this;
  }
  // Deprecated (duplicates this.randomize())
  random() {
    this.forEach((item, i) => this[i] = Math.floor(Math.random() * (this.range + 1)));
    return this;
  }

  // Reset the discrete vector
  reset() {
    this.forEach((item, i) => this[i] = 0);
    return this;
  }

  // Coerces (range + 1)-ary number given in discrete vector to the decimal value
  index() {
    return this.reduce((prev, item, i) => prev + item * Math.pow(this.range + 1, i), 0);
  }

  // Fills new array with proper amount of origin's array items
  // Imperative implementation:
  fillWith(origin) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this[i]; j++) result.push(origin[i]);
    }
    return result;
  }

  // Functional implementation:
  fillWith_(origin) {
    return this.reduce((prev, item, i) => [...prev, ...Array(item).fill(origin[i])], []);
  }

  // Returns sum of items in current combination
  sumOfItems() {
    return this.reduce((sum, item) => sum + item, 0);
  }

  // Returns all posible combinations in new array
  allCombinations(origin, exactNumber) {
    const startIndex = this.next(exactNumber).index()
    console.log(startIndex);
    const variants = [this.fillWith(origin)];
    for (this.next(exactNumber); this.index() !== startIndex; this.next(exactNumber)) {
      variants.push(this.fillWith(origin));
      console.log(this.index(), '?=', startIndex, this.fillWith(origin));
    }
    return variants;
  }

  // allCombinations(origin) {
  //   return Array(this.combinations).fill().
  //     map(() => this.next().fillWith(origin));
  // }
}

module.exports = DiscreteVector;
