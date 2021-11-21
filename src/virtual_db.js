import { v4 as uuidv4 } from 'uuid';

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
    const newItem = {
      ...item,
      id: uuidv4(),
    };

    this.data = [...this.data, newItem];
  }

  updateItem(id, item) {
    let itemForUpdate = this.data.find((item) => item.id === id);
    itemForUpdate = {
      ...itemForUpdate,
      ...item,
    };
  }

  removeItem(id) {
    this.data = this.data.filter((item) => item.id !== id);
  }
}
