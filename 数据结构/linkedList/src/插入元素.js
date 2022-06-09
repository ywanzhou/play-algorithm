// 随意定义一些元素
const [a, b, c, d] = [
  { value: 'a', next: null },
  { value: 'b', next: null },
  { value: 'c', next: null },
  { value: 'd', next: null },
]
const e = { value: 'e', next: null }

// 实现链表
a.next = b
b.next = c
c.next = d
