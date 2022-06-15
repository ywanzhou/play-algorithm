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

tree.insertNode([71, 35, 87, 22, 53, 46, 66, 78, 98])

const arr = BinarySearchTree.inorder(tree.root)
console.log(arr) // [ 22, 35, 46, 53, 66,71, 78, 87, 98 ]
