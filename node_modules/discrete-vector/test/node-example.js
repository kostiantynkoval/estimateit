console.log('');
console.info('Node Example');
console.log('');

const DiscreteVector = require('../index.js');

const embodiment = (a, b) => a.reduce((prev, item, i) => prev + item[b[i]], 0);

const t = [

  [16, 20],
  [35, 90],
//*/
  [115, 175],
  [20, 30],
  [75, 125],
  [40, 50],
  [20, 30],
  [20,45],
/*/
  [120,200],
  [20, 30],
  [100,150],
  [40, 50],
  [20, 30],
  [20,45],
//*/
];

const J = new DiscreteVector(t);
const T = [];
for (let n = 0; n < J.combinations; n++) {
  T.push(embodiment(t, J.next()));
}
console.log(T.sort((a, b) => a - b));
