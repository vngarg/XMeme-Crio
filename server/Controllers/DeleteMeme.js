const XMeme = require("../Models/XMeme");

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
