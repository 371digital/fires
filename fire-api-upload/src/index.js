import { FireUuid } from "371fire";
import multer from "multer";

class FireApiUpload {
  constructor() {}

  imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      return cb(null, false);
    }
    cb(null, true);
  };

  async fire({ path, filter = "image" } = {}) {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path);
      },
      filename: function (req, file, cb) {
        cb(null, `${FireUuid()}${path.extname(file.originalname)}`);
      },
    });

    const upload = multer({
      storage: storage,
      fileFilter: this[filter],
    });

    return upload;
  }
}

export default new FireApiUpload().fire;
