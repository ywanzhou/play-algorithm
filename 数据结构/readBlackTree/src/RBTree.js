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
   * 给定一个节点，修改节点的颜色 这是一个私有静态方法
   * @author ywanzhou
   * @param {Node} node 需要改变的颜色
   * @param {string} color 需要节点改变后的颜色
   */
  static #changeColor(node, color) {
    if (color !== this.RED && color !== this.BLACK)
      throw new Error('color can only be RED or BLACK')
    node.color = color
  }
}
