class Message {
  constructor({ isSuccess, message, ...props }) {
    this.isSuccess = isSuccess;
    this.message = message;
    Object.assign(this, props);
  }
}

export default Message;