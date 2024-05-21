export default class User {
  constructor(id) {
    this.name = null;
    this.id = id;
  }
  updateName(name) {
    this.name = name;
  }
}