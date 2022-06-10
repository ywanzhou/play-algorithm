const arr = [1, 2, 3, 2, 3, 4, 5]
// 利用set实现去重
const set = new Set(arr) // [1, 2, 3, 4, 5]

// 往集合中添加元素
set.add(3) // [1, 2, 3, 4, 5] 添加失败，集合中不允许出现重复元素
set.add(6) // [1, 2, 3, 4, 5, 6]

// 判断元素是否在集合中
set.has(2) // true
set.has(7) // false

// 删除集合中的元素
set.delete(1) // [2, 3, 4, 5, 6]

// 清空集合
set.clear()
