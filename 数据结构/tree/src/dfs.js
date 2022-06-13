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
function dfs(root) {
  console.log(root.value)
  root.children && root.children.forEach(dfs) // 与下面一致
  // if (root.children) {
  //   root.children.forEach(child => {
  //     dfs(child)
  //   })
  // }
}
dfs(tree)
/* 结果
A
B
E
F
C
G
D
H
I
*/
