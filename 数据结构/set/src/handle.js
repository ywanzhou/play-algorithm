// 求两个集合的并集
export function union(setA, setB) {
  let _union = new Set(setA)
  for (let elem of setB) {
    _union.add(elem) // 因为集合中不存在重复元素
  }
  return _union
}

// 求两个集合的交集
export function intersection(setA, setB) {
  let _intersection = new Set()
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem)
    }
  }
  return _intersection
}

// 求两个集合的差集
export function difference(setA, setB) {
  let _difference = new Set(setA)
  for (let elem of setB) {
    _difference.delete(elem)
  }
  return _difference
}
