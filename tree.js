class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */
  sumValues() {
    if (!this.root) return 0;

    let total = 0;
    const stack = [this.root];

    while (stack.length) {
      const current = stack.pop();
      total += current.val;
      for (const child of current.children) {
        stack.push(child);
      }
    }

    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */
  countEvens() {
    if (!this.root) return 0;

    let count = 0;
    const stack = [this.root];

    while (stack.length) {
      const current = stack.pop();
      if (current.val % 2 === 0) count++;
      for (const child of current.children) {
        stack.push(child);
      }
    }

    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */
  numGreater(lowerBound) {
    if (!this.root) return 0;

    let count = 0;
    const stack = [this.root];

    while (stack.length) {
      const current = stack.pop();
      if (current.val > lowerBound) count++;
      for (const child of current.children) {
        stack.push(child);
      }
    }

    return count;
  }
}

module.exports = { Tree, TreeNode };