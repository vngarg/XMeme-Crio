const XMeme = require("../Models/XMeme");

// This is the API to delete a meme. It takes meme id from params & then returns status 200 if meme is deleted otherwise returns status 400. 
exports.DeleteMeme = (req, res) => {
  const id = req.params.id;
  
  XMeme.deleteOne({ id })
    .then((response) => {
      return res.status(200).json({
        message: "Meme deleted successfully",
      });
    })
    .catch((error) => {
      console.log("Error: ", error);
      return res.status(400).json({
        message: `Error: $${error}`,
      });
    });
};
