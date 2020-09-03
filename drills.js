class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    }
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  myFind(key) {
    if (this.key === key) {
      return this.value;
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

module.exports = BinarySearchTree;

const BinarySearch = require("./bst");

const BST = new BinarySearch();

BST.insert(3, 3);
BST.insert(1, 1);
BST.insert(4, 4);
BST.insert(6, 6);
BST.insert(9, 9);
BST.insert(2, 2);
BST.insert(5, 5);
BST.insert(7, 7);

function tree(t) {
  if (!t) {
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}

console.log(tree(BST));

4. What does this program do?

This function returns the sum of all values in the tree. O(n) is the runtime.

5. Height of a BST

function findBstHeight(t) {
  if (!t) {
    return 0;
  }
  if (!t.left && !t.right) {
    return 1;
  }
  let height = 0;
  if (t.right) {
    let rightHeight = 1 + findBstHeight(t.right);
    if (rightHeight > height) height = rightHeight;
  }
  if (t.left) {
    let leftHeight = 1 + findBstHeight(t.left);
    if (leftHeight > height) height = leftHeight;
  }
  return height;
}

console.log(findBstHeight(BST));

6. Is it a BST?

function isItBST(t) {
  if (!t) return false;

  if (t.right) {
    if (t.right.key > t.key) {
      isItBST(t.right);
    } else {
      return false;
    }
  }

  if (t.left) {
    if (t.left.key < t.key) {
      isItBST(t.left);
    } else {
      return false;
    }
  }

  return true;
}

console.log(isItBST(BST));

7. 3rd largest node

function findThirdNode(t) {
  const height = findBstHeight(t);
  if (height < 2) {
    return null;
  } else if (height < 3) {
    if (t.left && t.right) {
      return t.left.value;
    } else return null;
  } else if (height > 3) {
    return findThirdNode(t.right);
  } else return t.key;
}

console.log(findThirdNode(BST));

8. Balanced BST

function isBalanced(t) {
  if (!t) return false;
  if (!t.right && !t.left) return true;
  if (Math.abs(findBstHeight(t.right) - findBstHeight(t.left)) > 1)
    return false;
  return true;
}

console.log(isBalanced(BST));

9. Are they the same BSTs?

