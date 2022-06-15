class BinarySearchTree {
  constructor() {
    // 初始化根节点
    this.root = null
  }

  // 创建一个节点
  Node(val) {
    return {
      left: null, // 左子树
      right: null, // 右子树
      parent: null, // 父节点
      val,
    }
  }
  /**
   * 创建要给插入节点的方法
   * @param {number | array[number]} val
   * @returns
   */
  insertNode(val) {
    const that = this
    // 允许接受一个数组，批量插入
    if (Object.prototype.toString.call(val) === '[object Array]') {
      val.forEach(function (v) {
        that.insertNode(v)
      })
      return
    }

    if (typeof val !== 'number') throw Error('插入的值不是一个数字')

    const newNode = this.Node(val)
    if (this.root) {
      // 根节点非空
      this.#insertNode(this.root, newNode)
    } else {
      // 根节点是空的，直接创建
      this.root = newNode
    }
  }

  /**
   * 私有方法，插入节点
   * @param {Object{Node}} root
   * @param {Object{Node}} newNode
   */
  #insertNode(root, newNode) {
    if (newNode.val < root.val) {
      // 新节点比根节点小，左子树
      if (root.left === null) {
        // 如果左子树上没有内容，则直接插入，如果有，寻找下一个插入位置
        root.left = newNode
        root.left.parent = root
      } else {
        this.#insertNode(root.left, newNode)
      }
    } else {
      // 新节点比根节点大，右子树
      if (root.right === null) {
        root.right = newNode
        root.right.parent = root
      } else {
        this.#insertNode(root.right, newNode)
      }
    }
  }
  /**
   * 根据 val 查找节点
   * @param {number} val 需要查找的数值
   * @returns 如果找到返回当前节点的引用，如果未找到返回 undefined
   */
  find(val) {
    if (typeof val !== 'number') throw Error('插入的值不是一个数字')
    let node = this.root
    while (node) {
      if (node.val < val) {
        // 进入右子树
        node = node.right
      } else if (node.val > val) {
        // 进入左子树
        node = node.left
      } else {
        return node
      }
    }
    return
  }
  // /**
  //  * 根据 val 查找节点 递归版
  //  * @param {number} val 需要查找的数值
  //  * @returns 如果找到返回当前节点的引用，如果未找到返回 undefined
  //  */
  // find(val) {
  //   if (typeof val !== 'number') throw Error('插入的值不是一个数字')
  //   function r(node, val) {
  //     // console.log(node)
  //     if (!node) return
  //     if (node.val < val) {
  //       return r(node.right, val)
  //     } else if (node.val > val) {
  //       return r(node.left, val)
  //     } else {
  //       return node
  //     }
  //   }
  //   return r(this.root, val)
  // }
  remove(val) {
    // 1. 删除节点
    const cur = this.find(val)
    if (!val) return false // 未找到需要删除的节点

    if (!cur.left && !cur.right) {
      // 1. 当前节点是叶子节点的情况
      this.#removeLeaf(cur)
    } else if (cur.left && cur.right) {
      // 2. 当前节点存在两个子节点
      // 2.1 找到当前节点的后继节点
      const successorNode = this.#minNode(cur.right)
      // 2.2 将后继节点的值赋值给当前值
      cur.val = successorNode.val
      if (!successorNode.left && !successorNode.right) {
        // 2.3 后继节点是叶子节点，直接删除
        this.#removeLeaf(successorNode)
      } else {
        // 2.4 后继节点不是叶子节点
        // 2.4.1记录该节点的子节点，
        let child =
          successorNode.left !== null ? successorNode.left : successorNode.right
        // 2.4.2 记录该节点的父节点
        let parent = successorNode.parent
        // 2.4.3 如果当前父节点的left是后继结点，则把后继结点的父节点的left指向后继结点的子节点
        if (parent.left === successorNode) {
          parent.left = child
        } else {
          // 2.4.4 如果不是，则让父节点的right指向后继结点的子节点
          parent.right = child
        }
        // 2.4.5 修改子节点的parent指针
        child.parent = parent
      }

      // 2.3 删除后继节点
    } else {
      // 记录当前节点的是否是父节点的左子树
      const isLeft = cur.val < cur.parent.val
      // 3. 仅存在一个子节点
      if (cur.left) {
        // 3.1 当前节点存在左子树
        cur.parent[isLeft ? 'left' : 'right'] = cur.left
        cur.left.parent = cur.parent
      } else if (cur.right) {
        // 3.2 当前节点存在右子树
        cur.parent[isLeft ? 'left' : 'right'] = cur.right
        cur.right.parent = cur.parent
      }
    }
  }
  // 删除叶子节点
  #removeLeaf(node) {
    if (!node) return
    const parent = node.parent
    if (node.val < parent.val) {
      // 当前要删除的叶子节点是左节点
      parent.left = null
    } else {
      // 当前要删除的叶子节点是右节点
      parent.right = null
    }
  }
  #minNode(node) {
    if (!node) return
    if (!node.left) return node
    let p = node.left
    while (p.left) {
      p = p.left
    }
    return p
  }
  // 中序遍历这个树
  static inorder(root) {
    if (!root) return
    const result = []
    const stack = []
    // 定义一个指针
    let p = root
    // 如果栈中有数据或者p不是null，则继续遍历
    while (stack.length || p) {
      // 如果p存在则一致将p入栈并移动指针
      while (p) {
        // 将 p 入栈，并以移动指针
        stack.push(p)
        p = p.left
      }

      const node = stack.pop()
      result.push(node.val)
      p = node.right
    }
    return result
  }
}
const tree = new BinarySearchTree()

tree.insertNode([71, 35, 80, 22, 53, 46, 66, 81, 82, 83, 88, 98])

console.log(BinarySearchTree.inorder(tree.root)) // [ 22, 35, 46, 53, 66,71, 78, 87, 98 ]
tree.remove(71)
console.log(BinarySearchTree.inorder(tree.root)) // [ 22, 35, 46, 53, 66,71, 78, 87, 98 ]
// tree.remove(35)
// console.log(BinarySearchTree.inorder(tree.root)) // [ 22, 35, 46, 53, 66,71, 78, 87, 98 ]
// console.log(tree.find(35))
