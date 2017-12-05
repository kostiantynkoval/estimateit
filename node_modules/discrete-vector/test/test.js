const expect = require('chai').expect;
const DiscreteVector = require('../index.js');

const origin = ['a', 'b', 'c'];
const vector = new DiscreteVector(origin);

describe('#DiscreteVector', () => {
  it('should create zero-filled array coerced to string', () => {
    const result = vector.join('');
    expect(result).to.equal('000');
  });
  it('should find next combination with imperative method coerced to string', () => {
    const result = vector.next().join('');
    expect(result).to.equal('100');
  });
  it('should find next combination with functional method coerced to string', () => {
    const result = vector.next_().join('');
    expect(result).to.equal('010');
  });
  it('should fill next combination with origin (imperative method) coerced to string', () => {
    const result = vector.next().fillWith(origin).join('');
    expect(result).to.equal('ab');
  });
  it('should fill next combination with origin (functional method) coerced to string', () => {
    const result = vector.next_().fillWith_(origin).join('');
    expect(result).to.equal('c');
  });
  it('should fill (functionally) next combination (imperative) with origin coerced to string', () => {
    const result = vector.next().fillWith_(origin).join('');
    expect(result).to.equal('ac');
  });
  it('should fill (imperatively) next combination (functional) with origin coerced to string', () => {
    const result = vector.next_().fillWith(origin).join('');
    expect(result).to.equal('bc');
  });
  it('should find next (the last) combination with imperative method & coerce it to string', () => {
    const result = vector.next().join('');
    expect(result).to.equal('111');
  });
  it('should return last combination (imperative method) coerced to string', () => {
    for (let i = 0; i < vector.combinations; i++) {
      vector.next();
    }
    const result = vector.join('');
    expect(result).to.equal('111');
  });
  it('should return last combination (functional method) coerced to string', () => {
    for (let i = 0; i < vector.combinations; i++) {
      vector.next();
    }
    const result = vector.join('');
    expect(result).to.equal('111');
  });
  it('should reset vector & coerce it to string', () => {
    const result = vector.reset().join('');
    expect(result).to.equal('000');
  });
  it('should return next combination with exact number of items equal to 2 with imperative method', () => {
    const result = vector.next(2).join('');
    console.log('#', vector.index(), vector, vector.fillWith(origin), '~', vector.fillWith_(origin));
    expect(result).to.equal('110');
  });
  it('should return next combination with exact number of items equal to 2 with functional method', () => {
    const result = vector.next_(2).join('');
    console.log('#', vector.index(), vector, vector.fillWith(origin), '~', vector.fillWith_(origin));
    expect(result).to.equal('101');
  });
  it('should return all possible combinations of origin', () => {
    const result = JSON.stringify(vector.reset().allCombinations(origin));
    console.log(result);
    expect(result).to.equal('[["a"],["b"],["a","b"],["c"],["a","c"],["b","c"],["a","b","c"],[]]');
  });
  it('should return all possible combinations of origin with exact number of items equal to 2', () => {
    const result = JSON.stringify(vector.reset().allCombinations(origin, 2));
    console.log(result);
    expect(result).to.equal('[["a","b"],["a","c"],["b","c"]]');
  });

  it('should return all possible combinations of TWO PAIR OF origin with exact number of items equal to 3', () => {
    const result = JSON.stringify((new DiscreteVector(origin, 2)).allCombinations(origin, 3));
    console.log(result);
    expect(result).to.equal('[["a","a","b"],["a","b","b"],["a","a","c"],["a","b","c"],["b","b","c"],["a","c","c"],["b","c","c"]]');
    // expect(result).to.equal('[["a","a"],["a","b"],["b","b"],["a","c"],["b","c"],["c","c"]]');
  });

  it('should compare random array filled with origin imperatively and functionally', () => {
    const random = (new DiscreteVector(origin, 4)).randomize();
    const result = random.fillWith(origin).join() === random.fillWith_(origin).join();
    expect(result).to.equal(true);
  });
  it('should compare random array next operations done imperatively and functionally', () => {
    const random = (new DiscreteVector(origin, 4)).randomize();
    const result = random.next().index() - random.next_().index();
    expect(result).to.equal(-1);
  });
  it('should return number of possible combinations', () => {
    const result = (new DiscreteVector(7, 3)).combinations;
    expect(result).to.equal(16384);
  });
});
