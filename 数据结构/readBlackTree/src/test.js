/**
 *  RedBlackTreeNode.js
 *  红黑树的节点实现，比普通的二叉树节点多了color属性
 */
class RedBlackTreeNode {
  constructor(data, color, lchild, rchild) {
    // validate color
    if (!Color[color]) {
      throw new Error(`color can only be RED or BLACK`)
    }

    this.color = color
    this.data = data
    this.lchild = lchild
    this.rchild = rchild
  }
}

const Color = {
  RED: 'RED',
  BLACK: 'BLACK',
}

module.exports = {
  RedBlackTreeNode,
  Color,
}
/**
 * @file 红黑树实现
 * @author YDSS
 *
 * Created on Sun May 27 2018
 */

const { RedBlackTreeNode, Color } = require('./RedBlackTreeNode')

class RedBlackTree {
  constructor(arr) {
    this._initialize()
    this.create(arr)
  }

  _initialize() {
    // init NullNode
    this.NullNode = new RedBlackTreeNode(
      Number.NEGATIVE_INFINITY,
      Color.BLACK,
      null,
      null
    )
    this.NullNode.lchild = this.NullNode
    this.NullNode.rchild = this.NullNode
    // extra attr for recognizing the NullNode
    this.NullNode.type = 'null'
    // init header
    this.header = new RedBlackTreeNode(
      Number.NEGATIVE_INFINITY,
      Color.BLACK,
      this.NullNode,
      this.NullNode
    )
    // init nodes to store parent, grandparent and grandgrandparent
    this.X = null
    this.P = null
    this.GP = null
    this.GGP = null
    // X's sister
    this.S = null
  }

  create(arr) {
    arr.forEach(item => {
      this.header = this.insert(item)
    })
  }

  find(val) {
    return this._find(val, this.header)
  }

  _find(val, T) {
    if (!T) {
      return null
    }

    if (val === T.data) {
      return T
    }
    if (val > T.data) {
      return this._find(val, T.rchild)
    }
    if (val < T.data) {
      return this._find(val, T.lchild)
    }
  }

  insert(data) {
    this.X = this.P = this.GP = this.GGP = this.header

    this.NullNode.data = data
    while (data !== this.X.data) {
      this.GGP = this.GP
      this.GP = this.P
      this.P = this.X

      if (data < this.X.data) {
        this.X = this.X.lchild
      } else {
        this.X = this.X.rchild
      }
      if (
        this.X.lchild.color === Color.RED &&
        this.X.rchild.color === Color.RED
      )
        this._handleReorient(data)
    }

    // duplicate
    if (this.X !== this.NullNode) {
      return this.NullNode
    }

    this.X = new RedBlackTreeNode(data, Color.RED, this.NullNode, this.NullNode)
    if (data < this.P.data) {
      this.P.lchild = this.X
    } else {
      this.P.rchild = this.X
    }
    this._handleReorient(data)

    return this.header
  }

  _handleReorient(data) {
    this.X.color = Color.RED
    this.X.lchild.color = Color.BLACK
    this.X.rchild.color = Color.BLACK

    if (this.P.color === Color.RED) {
      this.GP.color = Color.RED

      if (data < this.GP.data !== data < this.P.data)
        this.P = this._rotate(data, this.GP)
      this.X = this._rotate(data, this.GGP)
      this.X.color = Color.BLACK
    }
    this.header.rchild.color = Color.BLACK
  }

  /**
   * single rotate
   *
   * @param {*} data
   * @param {RedBlackTreeNode} Parent Parent Node of the subtree will rotate
   */
  _rotate(data, Parent) {
    if (data < Parent.data) {
      return (Parent.lchild =
        data < Parent.lchild.data
          ? this._singleRotateWithLeft(Parent.lchild)
          : this._singleRotateWithRight(Parent.lchild))
    } else {
      return (Parent.rchild =
        data > Parent.rchild.data
          ? this._singleRotateWithRight(Parent.rchild)
          : this._singleRotateWithLeft(Parent.rchild))
    }
  }

  _singleRotateWithLeft(T) {
    let root = T.lchild

    T.lchild = root.rchild
    root.rchild = T

    return root
  }

  _singleRotateWithRight(T) {
    let root = T.rchild

    T.rchild = root.lchild
    root.lchild = T

    return root
  }

  /**
   * find precursor node of this node
   *  if this node doesn't have the left subtree, return null
   *
   * @param {*} data data of current node
   * @return {BinaryTreeNode|Null}
   */
  findPrecursor(node) {
    // let node = this.find(data);

    // if (!node) {
    //     throw new Error(`node with data(${data}) is not in the tree`);
    // }

    if (!node.lchild) {
      return null
    }

    let pre = node.lchild
    let tmp
    while (!this._isNilNode((tmp = pre.lchild))) {
      pre = tmp
    }

    return pre
  }

  /**
   * find successor node of this node
   *  if this node doesn't have the right subtree, return null
   *
   * @param {BinaryTreeNode} current node
   * @return {BinaryTreeNode|Null}
   */
  findSuccessor(node) {
    // let node = this.find(data);

    // if (!node) {
    //     throw new Error(`node with data(${data}) is not in the tree`);
    // }

    if (!node.rchild) {
      return null
    }

    let suc = node.rchild
    let tmp
    while (!this._isNilNode((tmp = suc.lchild))) {
      suc = tmp
    }

    return suc
  }

  /**
   * delete node by means of top to down
   *
   * @param {*} val
   */
  delete(val) {
    // prepare for deleting
    this.header.color = Color.RED
    this.GP = null
    this.P = this.header
    this.X = this.header.rchild
    this.S = this.header.lchild

    this._delete(val)
  }

  _delete(val) {
    if (
      this.X.lchild.color === Color.BLACK &&
      this.X.rchild.color === Color.BLACK
    ) {
      // S has two black children
      if (
        this.S.lchild.color === Color.BLACK &&
        this.S.rchild.color === Color.BLACK
      ) {
        this._handleRotateSisterWithTwoBlackChildren()
        // judge if X.data is what we are looking for
        this._handleDeleteXWhenXhasTwoBlackChildren(val)
      }
      // S has at last one red children
      else {
        // single rotate when S with it's red child in a line,
        // reference to avl rotate
        // 2.3
        if (this.S.data > this.P.data === (this.S.rchild.color === Color.RED)) {
          this._rotate(this.S.data, this.GP)
          // change color
          this.P.color = Color.BLACK
          this.X.color = Color.RED
          this.S.color = Color.RED
          this.S.lchild.color = Color.BLACK
          this.S.rchild.color = Color.BLACK
          // judge if X.data is what we are looking for
          this._handleDeleteXWhenXhasTwoBlackChildren(val)
          // double rotate when S with it's red child in a z-shape line
          // 2.2
        } else {
          let firstData =
            this.S.data < this.P.data ? this.S.rchild.data : this.S.lchild.data
          this._rotate(firstData, this.P)
          this._rotate(this.S.data, this.GP)
          // change color
          this.P.color = Color.BLACK
          this.X.color = Color.RED
          // judge if X.data is what we are looking for
          this._handleDeleteXWhenXhasTwoBlackChildren(val)
        }
      }
    } else {
      this._handleDeleteXWhenXhasAtLastOneRedChild(val)
    }
  }

  // 2.1
  _handleRotateSisterWithTwoBlackChildren() {
    this.P.color = Color.BLACK
    this.X.color = Color.RED
    this.S.color = Color.RED
  }

  _handleDeleteXWhenXhasTwoBlackChildren(val) {
    if (this.X.data === val) {
      if (this._hasChild(this.X)) {
        val = this._replaceWithSuccessorOrPrecursor(val)
        this._descend(val)
        this._delete(val)
      } else {
        // delete X when it's a leaf
        this._deleteLeafNode(val, this.P)
      }
    } else {
      this._descend(val)
      this._delete(val)
    }
  }

  _handleDeleteXWhenXhasAtLastOneRedChild(val) {
    if (this.X.data === val) {
      val = this._replaceWithSuccessorOrPrecursor(val)
      this._descend(val)
    } else {
      this._descend(val)
    }
    // X is red, enter the phase of judging X's data
    if (this.X.color === Color.RED) {
      this._handleDeleteXWhenXhasTwoBlackChildren(val)
    } else {
      this._handleRotateWhenXIsBlackAndSisterIsRed()
      this._delete(val)
    }
  }

  // 3.1.2
  _handleRotateWhenXIsBlackAndSisterIsRed() {
    let curGP = this._rotate(this.S.data, this.GP)
    // change color
    this.S.color = Color.BLACK
    this.P.color = Color.RED
    // fix pointer of S and GP
    this.S = this.X.data > this.P.data ? this.P.lchild : this.P.rchild
    this.GP = curGP
  }

  _deleteLeafNode(val, parent) {
    if (parent.rchild.data === val) {
      parent.rchild = this.NullNode
    } else {
      parent.lchild = this.NullNode
    }
  }

  _hasChild(node) {
    return !this._isNilNode(node.lchild) || !this._isNilNode(node.rchild)
  }

  _isNilNode(node) {
    return node === this.NullNode
  }

  /**
   * replace X with it's successor,
   *  if it has no successor, instead of it's precursor
   * @param {*} val the delete data
   *
   * @return {*} updated delete data
   */
  _replaceWithSuccessorOrPrecursor(val) {
    let child = this.findSuccessor(this.X)
    if (!child) {
      child = this.findPrecursor(this.X)
    }
    this.X.data = child.data

    return child.data
  }

  /**
   * descend one floor
   *
   * @param {*} val the val of node will be deleted
   */
  _descend(val) {
    this.GP = this.P
    this.P = this.X

    if (val < this.X.data) {
      this.S = this.X.rchild
      this.X = this.X.lchild
    } else if (val > this.X.data) {
      this.S = this.X.lchild
      this.X = this.X.rchild
    }
    // val === this.X.data when X's successor or precursor
    //  is it's child, in this situation it's wrong to choise
    //  where X to go down by comparing val, cause X.data is equal
    //  with new delete value
    else {
      if (val === this.X.lchild) {
        this.S = this.X.rchild
        this.X = this.X.lchild
      } else {
        this.S = this.X.lchild
        this.X = this.X.rchild
      }
    }
  }
}

module.exports = RedBlackTree
