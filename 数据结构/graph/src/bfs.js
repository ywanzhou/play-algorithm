const graph = require('./graph')

// 记录已经访问的节点
const visited = new Set()
// 将根节点记录为已经访问过
visited.add('A')

// 定义一个队列
const q = ['A']
while (q.length) {
  // 队头出队
  const n = q.shift()
  console.log(n)
  // 相邻节点依次入队
  graph[n].forEach(c => {
    if (!visited.has(c)) {
      q.push(c)
      visited.add(c)
    }
  })
}
/** 结果
 * A B D C E G F H
 */
