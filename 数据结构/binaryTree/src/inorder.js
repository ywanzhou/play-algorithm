const bt = require('./tree')

// 递归版
function inorder(root) {
  if (!root) return
  inorder(root.left)
  console.log(root.val)
  inorder(root.right)
}
// 非递归版
function inorder(root) {
  if (!root) return
  const stack = []
  // 定义一个指针
  let p = root
  // 如果栈中有数据或者p不是null，则继续遍历
  while (stack.length || p) {
    // 如果p存在则一致将p入栈并移动指针
    while (p) {
      // 将 p 入栈，并以移动指针
      stack.push(p)
      p = p.left
    }

    const node = stack.pop()
    console.log(node.val)
    p = node.right
  }
}
inorder(bt)
/** 结果
D B E A H F I C G
*/
