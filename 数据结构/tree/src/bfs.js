const tree = {
  value: 'A',
  children: [
    {
      value: 'B',
      children: [
        { value: 'E', children: null },
        { value: 'F', children: null },
      ],
    },
    {
      value: 'C',
      children: [{ value: 'G', children: null }],
    },
    {
      value: 'D',
      children: [
        { value: 'H', children: null },
        { value: 'I', children: null },
      ],
    },
  ],
}
function bfs(root) {
  // 1. 新建队列 跟节点入队
  const q = [root]
  // 4 重复执行
  while (q.length > 0) {
    const node = q.shift() // 2 队头出队
    console.log(node.value)
    // 3 队头 children 依次入队
    node.children &&
      node.children.forEach(child => {
        q.push(child)
      })
  }
}
bfs(tree)
/* 结果
A
B
C
D
E
F
G
H
I
*/
