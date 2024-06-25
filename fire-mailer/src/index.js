import Service from "./service";

class FireMailer {
  constructor() {}

  fire({} = {}) {
    return new Service();
  }
}

export default new FireMailer().fire;
