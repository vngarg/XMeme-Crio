const XMeme = require('../Models/XMeme')

// This API requires meme id & then finds it in the database & returns it if found otherwise returns 400.
exports.GetMemeById = (req, res) => {
    const id = req.params.id;
    
    XMeme.find({ id }).then(data => {
        if(data.length == 0) {
            return res.status(404).json({
                message: "No meme with this id exist"
            })
        }

        return res.status(200).json({
            message: data
        })
    }).catch(error => {
        console.log('Error: ', error)
        return res.status(400).json({
            message: "Error. Please try again."
        })
    })
}