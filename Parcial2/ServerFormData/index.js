const multer = require("multer");
const express = require("express")

const storage = multer.diskStorage({
    destination: "./Parcial2/ServerFormData/uploads/",
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  const app = express();

app.post("/uploads", upload.single("file"),(req,res,next) =>{
res.send("Archivo subido");
});
    
app.use((req, res ,next) =>{
    res.status(404).send("Url not found");
});

app.use((err, req, res ,next) =>{
    res.status(500).json({error: err.message});
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    });