export class VirtualDB {
  constructor(data = []) {
    this.data = data;
  }

  getAllItems() {
    return this.data;
  }

  getItem(id) {
    return this.data.find((item) => item.id === id);
  }

  addItem(item) {
    this.data = [...this.data, item];
  }

  removeItem(id) {
    this.data = this.data.filter((item) => item.id !== id);
  }
}
