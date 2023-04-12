const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {

  constructor() {
    this.bts_root = null;
  }

  root() {
    return this.bts_root;
  }

  add(data) {

    const addData = (node, data) => {
      if(!node){
        node = new Node(data);
        return node;
      }

      if(data === node.data){
        return node;
      } else if (data > node.data){
        node.right = addData(node.right, data);
      } else {
        node.left = addData(node.left, data);
      }
      return node;
    }

    this.bts_root = addData(this.bts_root, data);
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    
    const findData = (node, data) => {
      if(!node){
        return null;
      }

      if(node.data === data){
        return node;
      } else if(node.data > data){
        return findData(node.left, data);
      } else {
        return findData(node.right, data);
      }
    }

    return findData(this.bts_root, data);
  }

  remove(data) {
    const removeData = (node, data) => {
      if(!node) {
        return null;
      }

      if(data > node.data){
        node.right = removeData(node.right, data);
        return node;
      } else if(data < node.data){
        node.left = removeData(node.left, data);
        return node;
      } else {

        if((!node.right) && (!node.left)) {
          return null;
        } else if(!node.left){
          node = node.right;
          return node;
        } else if(!node.right){
          node = node.left;
          return node;
        } else {

          let left_max = node.left;
          for(;;){
            if(left_max.right){
              left_max = left_max.right;
            } else {
              break;
            }            
          }
          
          node.data = left_max.data;
          
          node.left = removeData(node.left, left_max.data);

          return node;
        }
      }
    }

    this.bts_root = removeData(this.bts_root, data);
  }

  min() {
    const findMin = (node) => {
      if(node.left){
        return findMin(node.left);
      } else{
        return node.data;
      }
    }

    if(!this.bts_root){
      return null;
    } else {
      return findMin(this.bts_root);
    }
  }

  max() {
    const findMax = (node) =>{
      if(node.right){
        return findMax(node.right);
      } else{
        return node.data;
      }
    }

    if(!this.bts_root){
      return null;
    } else {
      return findMax(this.bts_root);
    }
  }
}

module.exports = {
  BinarySearchTree
};