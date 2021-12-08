const sharp = require("sharp");
const uuidv4 = require("uuid").v4;
const path = require("path");
const fs = require("fs");

class Resize {
  constructor() {
    this.folder = path.join(__dirname, "../../public/user_images");
    if (!fs.existsSync(this.folder)) {
      console.log(
        "Image Storage path not exists! Creating Image Storage directory (" +
          this.folder +
          ")"
      );
      fs.mkdirSync(this.folder, { recursive: true });
    }
  }
  async save(buffer) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);
    await sharp(buffer)
      .resize(1024, 1024, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(filepath);
    return filename;
  }
  static filename() {
    return `${uuidv4()}.png`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`);
  }

  deleteFile(filename) {
    let filePath = this.filepath(filename);
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.log(
        "While deleting file named (" +
          filename +
          ") from path (" +
          filePath +
          ") causing error! Error: ",
        err.message
      );
    }
  }
}
module.exports = Resize;
