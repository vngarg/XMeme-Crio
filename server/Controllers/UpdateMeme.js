const XMeme = require('../Models/XMeme');

// This API updates the meme. It finds the meme using meme id & then updates the new data. It returns 200 if everything works fine otherwise returns 400.
exports.UpdateMeme = (req, res) => {
    const id = req.params.id;
    const { name, caption, url } = req.body;

    XMeme.findOneAndUpdate({ id }, { name, caption, url }).then(response => {
        console.log('Response: ', response);
        return res.status(200).json({
            message: "Meme updated"
        })
    }).catch(error => {
        console.log('Error: ', error);
        return res.status(400).json({
            message: "Cannot update the meme"
        })
    })
}