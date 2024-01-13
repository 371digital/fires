import mongoose from "mongoose";

class FireMongo {
  constructor() {}

  connect = async ({ connectionUrl }) => {
    mongoose.set("strictQuery", true);
    await mongoose.connect(connectionUrl);
  };

  fire = ({} = {}) => {
    return {
      ...mongoose,
      connect: this.connect,
    };
  };
}

export default new FireMongo().fire;
