class RBTree {
  constructor() {
    this.root = null
  }

  static RED = 'RED'
  static BLACK = 'BLACK'

  /**
   * 创建一个新的节点
   * @author ywanzhou
   * @param {number} val 要插入的数值
   * @param {Node} parent 父节点
   * @param {Node} left 左子树
   * @param {Node} right 右子树
   * @param {string} color 颜色
   * @returns 一个新的节点
   */
  static createNode(val, parent, left, right, color) {
    if (color !== this.RED && color !== this.BLACK)
      throw new Error('color can only be RED or BLACK')
    return {
      val,
      parent,
      left,
      right,
      color,
    }
  }
  /**
   * 给定一个节点，修改节点的颜色 这是一个私有方法
   * @author ywanzhou
   * @param {Node} node 需要改变的颜色
   * @param {string} color 需要节点改变后的颜色
   */
  #changeColor(node, color) {
    if (color !== this.RED && color !== this.BLACK)
      throw new Error('color can only be RED or BLACK')
    node.color = color
  }
  /**
   * 围绕 node 进行左旋
   * 效果如下
   *         node           ->           pr(r)
   *        /   \           ->         /   \
   *       pl   pr(r)       ->       node   cr
   *           / \          ->       /  \
   *          cl  cr        ->      pl   cl
   * @author ywanzhou
   * @param {Node} node 需要旋转的节点
   */
  #leftRotate(node) {
    if (!node) return
    // 缓存一下 node 的右节点
    const r = node.right
    // 将 pr 的右节点 pr 重新赋值为 cl
    node.right = r.left
    if (r.left !== null) {
      // 将 cl 的父节点指向 node
      r.left.parent = node
    }
    // 将节点r连接node节点的父节点
    r.parent = node.parent
    if (node.parent === null) {
      // 如果需要旋转的节点是根节点，则将根节点从node修改为r
      this.root = r
    } else if (node.parent.left === node) {
      // 说明要旋转的node是父节点的左节点
      node.parent.left = r
    } else if (node.parent.right === node) {
      // 说明要旋转的node是父节点的右节点
      node.parent.right = r
    }
    // 处理 r 节点的左节点
    r.left = node
    // 处理 node 的父节点
    node.parent = r
  }
  /**
   * 围绕 node 进行右旋
   * 效果如下
   *           node         ->          pl(l)
   *          /   \         ->        /   \
   *         pl(l) pr       ->       cl   node
   *        /  \            ->           / \
   *       cl   cr          ->          cr  pr
   * @author ywanzhou
   * @param {Node} node 需要旋转的节点
   */
  #rightRotate(node) {
    if (!node) return
    // 1. 修改旋转节点 左节点的右节点 为 旋转节点的左节点
    // 1.1 缓存一下 node 的左节点
    const l = node.left
    // 1.2 修改左节点的右节点为旋转节点的左节点
    node.left = l.right

    // 2. 连接旋转节点的左节点与旋转节点的引用
    if (l.right !== null) {
      l.right.parent = node
    }

    // 3. 修改 l 节点的父节点
    l.parent = node.parent
    if (node.parent === null) {
      // 3.1 如果 node 此时是根节点，则将根节点重新指向 l
      this.root = l
    } else if (node.parent.left === node) {
      // 3.2 如果 node 是父节点的左节点，则更换左节点
      node.parent.left = l
    } else if (node.parent.right === node) {
      // 3.3 如果 node 是父节点的右节点，则更换右节点
      node.parent.left = r
    }
    // 4. 将旋转节点作为旋转节点左节点的右节点
    l.right = node
    // 4.1 重新建立parent引用
    node.parent.l
  }
}
