// 随意定义一些元素
const a = { value: 'a', next: null }
const b = { value: 'b', next: null }
const c = { value: 'c', next: null }
const d = { value: 'd', next: null }

// 实现链表
a.next = b
b.next = c
c.next = d

let p = a // p 指向链表的头部
while (p) {
  console.log(p.value)
  p = p.next
}
var deleteDuplicates = function (head) {
  let p = head
  while (p && p.next) {
    // 判断p是否为null以及p.next是否存在，p.next不存在说明他是最后一个节点
    if (p.val === p.next.val) {
      p.next = p.next.next
    } else {
      p = p.next
    }
  }
  return head
}
