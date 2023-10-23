import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename
  },
});

const upload = multer({ storage: storage, limits: { files: 5 } }).array(
  "imageUrl",
  5
);

export default upload;
