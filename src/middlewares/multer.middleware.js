import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)     ye islie h ,ki bohot sarifiles hoti h to unhe differentitate krne ko
    // cb(null, file.fieldname + '-' + uniqueSuffix)

    cb(null , file.originalname)
  }
})

export const upload = multer({ storage})
