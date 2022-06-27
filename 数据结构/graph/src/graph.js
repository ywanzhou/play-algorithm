const graph = {
  A: ['B', 'D'],
  B: ['A', 'C'],
  C: ['B', 'E', 'G'],
  D: ['A'],
  E: ['C', 'F'],
  F: ['E', 'G'],
  G: ['C', 'F', 'H'],
  H: ['G'],
}
module.exports = graph
