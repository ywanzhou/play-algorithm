const graph = require('./graph')

// 记录已经访问的节点
const visited = new Set()

const dfs = n => {
  console.log(n)
  // 把已经当问的节点加入集合
  visited.add(n)
  // 访问所有节点
  graph[n].forEach(c => {
    if (!visited.has(c)) {
      dfs(c)
    }
  })
}
dfs('A')
/** 结果
 * A B C E F G H D
 */
