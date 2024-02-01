/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}


class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    return this._depth(this.root, Math.min);
  }


  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    return this._depth(this.root, Math.max);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let maxSum = Number.MIN_SAFE_INTEGER;

    const findMaxSum = (node) => {
      if (!node) return 0;
      const leftSum = Math.max(0, findMaxSum(node.left));
      const rightSum = Math.max(0, findMaxSum(node.right));
      maxSum = Math.max(maxSum, node.val + leftSum + rightSum);
      return node.val + Math.max(leftSum, rightSum);
    };

    findMaxSum(this.root);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let result = null;

    const traverse = (node) => {
      if (!node) return;
      if (node.val > lowerBound && (result === null || node.val < result)) {
        result = node.val;
      }
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (this.root === null || node1 === node2) return false;
  
    let found = 0; // Counter for the number of nodes found
    let parent1 = null, parent2 = null;
  
    // Helper function to traverse the tree and update parent references
    const traverse = (node, parent, depth, targetDepth) => {
      if (!node || found === 2) return depth - 1;
      if (node === node1 || node === node2) {
        found++;
        if (node === node1) parent1 = parent;
        if (node === node2) parent2 = parent;
        return targetDepth;
      }
      const leftDepth = traverse(node.left, node, depth + 1, targetDepth);
      const rightDepth = traverse(node.right, node, depth + 1, targetDepth);
  
      return Math.max(leftDepth, rightDepth);
    };
  
    const depth = traverse(this.root, null, 0, -1);
    return found === 2 && parent1 !== parent2 && depth !== -1;
  }
  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const values = [];
  
    const traverse = (node) => {
      if (!node) {
        values.push('null');
        return;
      }
      values.push(node.val);
      traverse(node.left);
      traverse(node.right);
    };
  
    traverse(tree.root);
    return values.join(',');
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if (!stringTree) return null;
  
    const values = stringTree.split(',');
    let index = 0;
  
    const buildTree = () => {
      if (index >= values.length || values[index] === 'null') {
        index++;
        return null;
      }
  
      const node = new BinaryTreeNode(parseInt(values[index], 10));
      index++;
      node.left = buildTree();
      node.right = buildTree();
      return node;
    };
  
    const root = buildTree();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */
  lowestCommonAncestor(node1, node2) {
    const findLCA = (node) => {
      if (!node || node === node1 || node === node2) return node;
  
      const left = findLCA(node.left);
      const right = findLCA(node.right);
  
      if (left && right) return node; // If both children return a node, this is the LCA
      return left || right; // Otherwise, return the non-null child (if any)
    };
  
    return findLCA(this.root);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
