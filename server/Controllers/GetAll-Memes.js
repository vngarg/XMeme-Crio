const XMeme = require('../Models/XMeme');

// This API gets all the memes from the database & returns them with status 200 if everything is good otherwise returns status error.
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