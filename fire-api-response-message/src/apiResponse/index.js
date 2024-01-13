import Message from "../message";

class ApiResponse {
  static success(message, ...args) {
    return new Message(Object.assign({ isSuccess: true, message }, ...args));
  }

  static error(message, ...args) {
    return new Message(Object.assign({ isSuccess: false, message }, ...args));
  }
}

export default ApiResponse;
