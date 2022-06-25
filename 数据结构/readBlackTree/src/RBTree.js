const RED = 'RED'
const BLACK = 'BLACK'
class RBNode {
  /**
   * 创建一个新的节点
   * @author ywanzhou
   * @param {number} val 要插入的数值
   * @param {RBNode} parent 父节点
   * @param {RBNode} left 左子树
   * @param {RBNode} right 右子树
   * @param {string} color 颜色
   * @returns {RBNode} 一个新的节点
   */
  constructor(val, parent, left = null, right = null, color = RED) {
    if (color !== RED && color !== BLACK)
      throw new Error('color can only be RED or BLACK')
    this.val = val
    this.parent = parent
    this.left = left
    this.right = right
    this.color = color
  }
}

class RBTree {
  /**
   * @author ywanzhou
   * @param {number[]} list 创建对象时节点中的数据
   */
  constructor(list) {
    this.root = null
    if (Object.prototype.toString.call(list) === '[object Array]') {
      list.forEach(v => {
        this.insert(v)
      })
    }
  }
  /**
   * 给定一个节点，修改节点的颜色 这是一个私有方法
   * @author ywanzhou
   * @param {RBNode} node 需要改变的颜色
   * @param {string} color 需要节点改变后的颜色
   */
  #setColor(node, color) {
    if (color !== RED && color !== BLACK)
      throw new Error('color can only be RED or BLACK')
    if (!node) throw new Error('node is a empty RBNode')
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
   * @param {RBNode} node 需要旋转的节点
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
   * @param {RBNode} node 需要旋转的节点
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
    node.parent = l
  }
  /**
   * 往红黑树中插入一个节点
   * @author ywanzhou
   * @param {number} val 要插入的值
   * @return {RBNode} RBTree的根节点
   */
  insert(val) {
    // 只允许插入数值
    if (typeof val !== 'number')
      throw new TypeError('insert value is not a number')
    let t = this.root
    // 情况一：红黑树中不存在任何节点，插入收据后直接作为根节点
    if (t === null) {
      this.root = new RBNode(val, null, null, null, BLACK)
      return this.root
    }

    // 1. 寻找插入位置
    // parent 指针用于记录当前要插入的节点位置
    let parent = t.parent
    do {
      parent = t
      // 当前值与根节点的值进行比较，如果当前值大则 cmp 大于 0
      let cmp = val - t.val
      // 判断 cmp 的值 如果大于 0 则插入右子树
      if (cmp > 0) {
        t = t.right
      }
      // 如果小于0则插入左子树
      else if (cmp < 0) {
        t = t.left
      }
      // 如果等于0则说明已经存在，抛出异常
      else {
        throw new Error('insert value already exists')
      }
      /**
       * 当循环结束，此时已经到达末尾节点，t 的值为null，parent表示最后的末尾节点
       */
    } while (t !== null)

    // 2. 将节点插入树中
    // 2.1 创建节点
    const newNode = new RBNode(val, parent)
    // 2.2 根据节点的值来判断是插入右子树还是左子树
    if (newNode.val > parent.val) {
      parent.right = newNode
    } else {
      parent.left = newNode
    }

    // 3. 调整节点位置和颜色，维持红黑树的特性
    this.#fixAfterInsertNode(newNode)
    return this.root
  }
  /**
   * 给定一个节点，调整在红黑树的位置和颜色
   * @author ywanzhou
   * @param {RBNode} node 要调整的节点
   */
  #fixAfterInsertNode(node) {
    // * 需要调整的情况由博文中的图五到图九
    // 新增的节点为红色
    node.color = RED
    // * 博文中图二、三、四都是不需要调整的情况，这三个图都具有一个特点，就是父亲节点的颜色为黑色
    while (node !== null && node !== this.root && node.parent.color === RED) {
      // 1. 首先处理图七和图九的前两种情况（先处理图七和图五无所谓，只是换个方向）
      // 1.1 判断 node 的父节点是爷爷节点的左孩子
      if (
        this.#getParent(node) ===
        this.#getLeft(this.#getParent(this.#getParent(node))) // 当前节点的父节点的父节点的左节点与当前节点的父节点是否相等
      ) {
        // 如果满足条件，已经对应图七和图九中的前两种情况
        // 1.2 获取叔叔节点
        let uncle = this.#getRight(this.#getParent(this.#getParent(node)))
        // 1.3 判断叔叔节点的颜色是否为红色，如果是则变色
        if (this.#getColor(uncle) === RED) {
          // * 如果进入则说明存在叔叔节点，也就是进入图九的前两种情况，按照途中的步骤，通过代码实现
          const grandpa = this.#getParent(this.#getParent(node))
          // 1.3.1 将父节点和叔叔节点修改为黑色，将爷爷节点修改为红色
          this.#setColor(this.#getParent(node), BLACK)
          this.#setColor(uncle, BLACK)
          this.#setColor(grandpa, RED)
          // 将爷爷节点赋值给node，这里对应图九的最后一句话
          node = grandpa
        }
        // * 处理图七和图八的情况
        // 1.4 说明没有叔叔节点或者叔叔节点是黑色，则不需要操作叔叔节点，只需要操作父节点和爷爷节点
        else {
          // 1.7 处理图八的情况
          // 1.7.1 判断插入的节点是否为父节点右节点
          if (node === this.#getRight(this.#getParent(node))) {
            // 1.7.2 将节点的父节点赋值给当前节点
            node = this.#getParent(node)
            // 1.7.3 对 node 进行左旋 转换为图七的情况
            this.#leftRotate(node)
            // 接下来就可以按照图七进行操作
          }
          // 1.5 父节点变黑色 爷爷节点变红色
          const grandpa = this.#getParent(this.#getParent(node))
          this.#setColor(this.#getParent(node), BLACK)
          this.#setColor(grandpa, RED)
          // 1.6 对爷爷节点进行右旋操作
          this.#rightRotate(grandpa)
        }
      } else {
        // 如果不满足条件，已经对应图五和图九中的后两种情况，与上面的代码基本类似
        // 1.2 获取叔叔节点
        let uncle = this.#getLeft(this.#getParent(this.#getParent(node)))
        // 1.3 判断叔叔节点的颜色是否为红色，如果是则变色
        if (this.#getColor(uncle) === RED) {
          // * 如果进入则说明存在叔叔节点，也就是进入图九的后两种情况，按照途中的步骤，通过代码实现
          const grandpa = this.#getParent(this.#getParent(node))
          // 1.3.1 将父节点和叔叔节点修改为黑色，将爷爷节点修改为红色
          this.#setColor(this.#getParent(node), BLACK)
          this.#setColor(uncle, BLACK)
          this.#setColor(grandpa, RED)
          // 将爷爷节点赋值给node，这里对应图九的最后一句话
          node = grandpa
        }
        // * 处理图五和图六的情况
        // 1.4 说明没有叔叔节点或者叔叔节点是黑色，则不需要操作叔叔节点，只需要操作父节点和爷爷节点
        else {
          // 1.7 处理图六的情况
          // 1.7.1 判断插入的节点是否为父节点右节点
          if (node === this.#getLeft(this.#getParent(node))) {
            // 1.7.2 将节点的父节点赋值给当前节点
            node = this.#getParent(node)
            // 1.7.3 对 node 进行右旋 转换为图五的情况
            this.#rightRotate(node)
            // 接下来就可以按照图五进行操作
          }
          // 1.5 父节点变黑色 爷爷节点变红色
          const grandpa = this.#getParent(this.#getParent(node))
          this.#setColor(this.#getParent(node), BLACK)
          this.#setColor(grandpa, RED)
          // 1.6 对爷爷节点进行左旋操作
          this.#leftRotate(grandpa)
        }
      }
    }
    // 将根节点变成黑色
    this.#setColor(this.root, BLACK)
  }
  /**
   * 获取指定节点的父节点
   * @author ywanzhou
   * @param {RBNode} node
   * @returns {RBNode}
   */
  #getParent(node) {
    return node !== null ? node.parent : null
  }
  /**
   * 获取指定节点的左节点
   * @author ywanzhou
   * @param {RBNode} node
   * @returns {RBNode}
   */
  #getLeft(node) {
    return node !== null ? node.left : null
  }
  /**
   * 获取指定节点的右节点
   * @author ywanzhou
   * @param {RBNode} node
   * @returns {RBNode}
   */
  #getRight(node) {
    return node !== null ? node.right : null
  }
  /**
   * 获取指定节点的颜色
   * @author ywanzhou
   * @param {RBNode} node
   * @returns {string}
   */
  #getColor(node) {
    return node === null ? BLACK : node.color
  }
  /**
   * 根据val查找指定节点
   * @author ywanzhou
   * @param {number} val 要查找的节点的值
   * @returns {RBNode} 找到的节点
   */
  findNode(val) {
    if (typeof val !== 'number') throw new TypeError('val is not a number')
    let p = this.root
    while (p) {
      if (val < p.val) {
        p = p.left
      } else if (val > p.val) {
        p = p.right
      } else {
        break
      }
    }
    return p
  }
  /**
   * 查找node的前驱节点
   * @author ywanzhou
   * @param {RBNode} node
   * @returns {RBNode} 前驱节点
   */
  predecessor(node) {
    if (!node) return null
    else if (node.left) {
      let p = node.left
      while (p.right) {
        p = p.right
      }
      return p
    } else {
      // 如果删除寻找前驱节点是保证左右子树都存在的时候才找前驱或者后继
      // 这里的 else 只是为了寻找节点的前驱节点
      let p = node.parent
      let c = node
      while (p.left === c && p) {
        c = p
        p = p.parent
        return p
      }
      return null
    }
  }
  /**
   * 查找node的后继节点
   * @author ywanzhou
   * @param {RBNode} node
   * @returns {RBNode} 后继节点
   */
  sucessor(node) {
    if (!node) return null
    else if (node.right) {
      let p = node.right
      while (p.left) {
        p = p.left
      }
      return p
    } else {
      let p = node.parent
      let c = node
      while (p.right === c && p) {
        c = p
        p = p.parent
        return p
      }
      return null
    }
  }
  /**
   * 根据 val 删除红黑树中的节点
   * @author ywanzhou
   * @param {number} val 要删除的节点的值
   * @returns {number} 删除的节点中的val值
   */
  remove(val) {
    const node = this.findNode(val)
    if (!node) {
      return null
    }
    const oldVal = node.val
    // 删除节点
    this.deleteNode(node)
    return oldVal
  }
  /**
   *
   * @param {RBNode} node 要删除的节点
   */
  deleteNode(node) {
    // 删除节点
    // 1 存在左右子树的情况
    if (node.left && node.right) {
      // 1.1 找到前驱或者后继节点
      const sucessor = this.sucessor(node)
      // 1.2 将我们找到节点的值赋值给要被删除的节点
      node.val = sucessor.val
      // 1.3 将 node 指向后继节点，删除 node 即可（也就是删除前驱或者后继）
      node = sucessor
    }
    // 1.1 删除的节点是根节点，直接将 root 置为 null
    if (node.parent === null) {
      this.root = null
    }
    // 2 找到替换节点
    // 如果前面使用前驱节点则存在左子树，后继存在右子树，这里这么写可以兼容前驱或者后继
    let replacement = node.left ? node.left : node.right
    if (replacement) {
      // 2.1 说明存在左子树或者右子树，则不是叶子节点
      // 2.1.1 将 replacement 的 parent 指向 node 的 parent（认爹）
      replacement.parent = node.parent
      // 2.1.2 建立 left 或者 right 的引用（认儿子）
      if (node.parent.left === node) {
        node.parent.left = replacement
      } else {
        node.parent.right = replacement
      }
      // 2.1.3 清空node节点的所有指针（抛弃了所有人，等待被垃圾机制回收）
      node.left = null
      node.right = null
      node.parent = null

      // 2.1.4 调整红黑树的平衡
      if (this.#getColor(node) === BLACK) {
        // 只有删除黑色节点才需要调整平衡
        /**
         * 这里的replacement节点一定是红色，原因：
         * 红黑树中删除的节点对应 2-3-4 树中的叶子节点
         * 叶子节点只存在三种情况，也就是2节点3节点和4节点
         * 如果是2节点，则 replacement 不存在
         * 如果是3或者4节点，则 replacement 一定为红色节点
         */
        this.#fixAfterDeleteNode(replacement) // 基于前驱或者后继节点进行调整
      }
    }
    // 3 删除叶子节点
    else {
      // 3.1 说明不存在前驱或者后继，也就是叶子节点
      if (this.#getColor(node) === BLACK) {
        // 3.2 如果叶子节点是黑色，则需要调整红黑树的平衡
        this.#fixAfterDeleteNode(node)
      }
      // 3.3 删除叶子节点
      // 3.3.1 不认儿子
      if (node.parent.left === node) {
        node.parent.left = null
      } else if (node.parent.right === node) {
        node.parent.right = null
      }
      // 3.3.2 不认老爹
      node.parent = null
    }
  }
  /**
   * 删除时调整树结构
   * @param {RBNode} x
   */
  #fixAfterDeleteNode(x) {
    // 1. 如果 x 节点不是根节点且颜色时黑色
    while (x !== this.root && this.#getColor(x) === BLACK) {
      // x 是左孩子，也就是使用前驱节点替换
      if (x == this.#getLeft(this.#getParent(x))) {
        // 1.1 寻找兄弟节点
        let rNode = this.#getRight(this.#getParent(x))
        // 1.1.1 如果兄弟节点为红色，则说明它不是真正的兄弟节点
        if (this.#getColor(rNode) === RED) {
          // 1.1.2 将该节点染黑 父节点染红
          this.#setColor(rNode, BLACK)
          this.#setColor(this.#getParent(rNode), RED)
          // 1.1.3 将x节点的父节点左旋
          this.#leftRotate(this.#getParent(x))
          // 1.1.4 找到真正的兄弟节点
          rNode = this.#getRight(this.#getParent(x))
        }
        // 1.2 x 节点转换为2-3-4树，对应的兄弟节点为3节点或者4节点的情况
        if (this.#getLeft(rNode) !== null || this.#getRight(rNode) !== null) {
          // 如果存在左子树或者右子树则说明转换为2-3-4树为3节点或者4节点
          // 1.2.1 判断是否存在左子树，如果存在则变色旋转
          // 1.2.1.1 因为进入这个说明左右子树必须存在一个，如果右子树不存在则说明左子树一定存在
          if (this.#getRight(rNode) === null) {
            // 1.2.1.2 说明存在，先将左子树变黑
            this.#setColor(this.#getLeft(rNode), BLACK)
            // 1.2.1.3 将原本的黑色节点变红
            this.#setColor(rNode, RED)
            // 1.2.1.4 右旋
            this.#rightRotate(rNode)
            // 1.2.1.5 调整rNode
            rNode = this.#getRight(this.#getParent(x))
          }
          // 1.2.2 将兄弟节点变成父亲的颜色
          this.#setColor(rNode, this.#getColor(this.#getParent(x)))
          // 1.2.3 将父节点变成黑色
          this.#setColor(this.#getParent(x), BLACK)
          // 1.2.4 将兄弟节点的右节点变成黑色
          this.#setColor(this.#getRight(rNode), BLACK)
          // 1.2.5 沿着 x 节点的父节点进行左旋
          this.#leftRotate(this.#getParent(x))
          // 1.2.6 跳出循环
          break
        }
        // 1.3 x 节点转换为2-3-4树，对应的兄弟节点为2节点
        else {
          // 1.3.1 将兄弟节点变成红色
          this.#setColor(rNode, RED)
          // 1.3.2 移动x递归变色
          x = this.#getParent(x)
          // 1.3.3 如果 x 的节点不为黑色，则不会进入循环，而是执行 2 将其变成黑色，然后黑色继续保存平衡
        }
      }
      // x 是右孩子，也就是使用后继节点替换
      else {
        // 代码与上面一致，只是方向换了一下，为了兼容前驱和后继节点
        let lNode = this.#getLeft(this.#getParent(x))
        if (this.#getColor(lNode) === RED) {
          this.#setColor(lNode, BLACK)
          this.#setColor(this.#getParent(lNode), RED)
          this.#rightRotate(this.#getParent(x))
          lNode = this.#getLeft(this.#getParent(x))
        }
        if (this.#getLeft(lNode) !== null || this.#getRight(lNode) !== null) {
          if (this.#getLeft(lNode) === null) {
            this.#setColor(this.#getRight(lNode), BLACK)
            this.#setColor(lNode, RED)
            this.#leftRotate(lNode)
            lNode = this.#getLeft(this.#getParent(x))
          }
          this.#setColor(lNode, this.#getColor(this.#getParent(x)))
          this.#setColor(this.#getParent(x), BLACK)
          this.#setColor(this.#getLeft(lNode), BLACK)
          this.#rightRotate(this.#getParent(x))
          break
        } else {
          this.#setColor(lNode, RED)
          x = this.#getParent(x)
        }
      }
    }
    // 2. 替换节点为x，也就是 deleteNode 中的 2.4.1 中的调用
    this.#setColor(x, BLACK)
  }
}
/**
 * 中序遍历红黑树，打印结果，查看插入操作是否正确
 * @param {RBNode} root
 * @param {number} deep
 * @returns
 */
function inorder(root, deep = 1) {
  if (!root) return
  let tab = ''
  for (let i = 1; i < deep; i++) {
    tab += '\t'
  }
  root.left && inorder(root.left, deep + 1)
  console.log(
    '%c' + tab + root.val,
    root.color[0] === 'R' ? 'color:red' : 'color:black'
  )
  root.right && inorder(root.right, deep + 1)
}
let arr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 1]
const tree = new RBTree(arr)
// arr.forEach(v => {
//   console.log(`------插入数据${v}------`)
//   tree.insert(v)
//   inorder(tree.root)
//   console.log('--------------------')
// })
// const n = tree.remove(8)

// console.log(n)
// inorder(tree.root)
// let node4 = tree.findNode(4)
// let s = tree.sucessor(node4)

// 测试删除
inorder(tree.root)
tree.remove(5)
inorder(tree.root)
tree.remove(6)
inorder(tree.root)
tree.remove(7)
inorder(tree.root)
tree.remove(8)
inorder(tree.root)
tree.remove(9)
inorder(tree.root)
