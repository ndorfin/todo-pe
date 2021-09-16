module.exports = class ToDo {
  constructor() {
    this.list = [];
    this.newestId = -1;
  }

  getLength() {
    return this.list.length;
  }

  getAll() {
    return this.list;
  }

  getItem(id) {
    return this.list.filter( (item) => {
      return item.id == id;
    })[0];
  }

  getItemIndex(id) {
    return this.list.findIndex( (item) => {
      return item.id == id;
    });
  }

  getNewId() {
    this.newestId = this.newestId + 1;
    return this.newestId;
  }

  createItem(todoObj) {
    if (todoObj.id === null || todoObj.id === undefined) {
      todoObj.id = this.getNewId();
    }
    this.list.push(todoObj);
  }

  deleteItem(targetId) {
    const targetIndex = this.getItemIndex(targetId);
    if (targetIndex > -1) {
      this.list.splice(targetIndex, 1);
    }
  }

  editItem(targetId, todoObj) {
    console.log('todoObj', todoObj)
    this.deleteItem(targetId);
    this.createItem(todoObj);
  }
};