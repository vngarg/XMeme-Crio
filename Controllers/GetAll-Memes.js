const XMeme = require('../Models/XMeme');

exports.GetAllMemes = (req, res) => {
    XMeme.find().then(response => {
        return res.status(200).json({
            message: response
        })
    }).catch(error => {
        console.log('Error: ', error)
        return res.json({
            message: "Can't get the memes"
        })
    })
}