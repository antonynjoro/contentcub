export default function generateReadableFileSize(bytes: number) {
    if (bytes === 0) {
      return "0 bytes";
    }

    const k = 1024;
    const dm = 2;
    const sizes = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k)); // get the index of the size
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]; // return the size and the size name
  }