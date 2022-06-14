const bt = require('./tree')

// 递归版
function preorder(root) {
  if (!root) return
  console.log(root.val)
  preorder(root.left)
  preorder(root.right)
}
// 非递归版
function preorder(root) {
  if (!root) return
  // 定义一个栈，用于存储数据
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    console.log(node.val)
    /* 由于栈存在先入后出的特性，所以需要先入右子树才能保证先出左子树 */
    node.right && stack.push(node.right)
    node.left && stack.push(node.left)
  }
}
preorder(bt)
/** 结果
A B D E C F H I G
*/
