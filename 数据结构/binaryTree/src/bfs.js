const bt = {
  val: 'A',
  left: {
    val: 'B',
    left: { val: 'D', left: null, right: null },
    right: { val: 'E', left: null, right: null },
  },
  right: {
    val: 'C',
    left: {
      val: 'F',
      left: { val: 'H', left: null, right: null },
      right: { val: 'I', left: null, right: null },
    },
    right: { val: 'G', left: null, right: null },
  },
}

function bfs(root) {
  if (!root) return
  const queue = [root]
  while (queue.length) {
    const node = queue.shift()
    console.log(node.val)
    node.left && queue.push(node.left)
    node.right && queue.push(node.right)
  }
}
bfs(bt)
/** 结果
A B C D E F G H I
 */
