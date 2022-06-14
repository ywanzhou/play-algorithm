const bt = require('./tree')

// 递归版
function postorder(root) {
  if (!root) return
  postorder(root.left)
  postorder(root.right)
  console.log(root.val)
}
// 非递归版
function postorder(root) {
  if (!root) return
  const outputStack = []
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    outputStack.push(node)
    // 这里先入left需要保证left后出，在stack中后出，就是在outputStack栈中先出
    node.left && stack.push(node.left)
    node.right && stack.push(node.right)
  }
  while (outputStack.length) {
    const node = outputStack.pop()
    console.log(node.val)
  }
}
postorder(bt)
/** 结果
D E B H I F G C A
*/
