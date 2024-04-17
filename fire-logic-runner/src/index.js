import Builder from "./builder";

class FireLogicRunner {
  constructor() {}

  fire({} = {}) {
    return new Builder();
  }
}

export default new FireLogicRunner().fire;
