const XMeme = require('../Models/XMeme');

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