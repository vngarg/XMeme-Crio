const XMeme = require('../Models/XMeme');
const uuid = require('uuid');

// This API adds a meme to the database. It creates a unique id & then returns it if meme is added successfully, otherwise returns 400. It also checks whether the database is empty or not.
exports.PostMeme = async (req, res) => {
    const { name, url, caption } = req.body;
    const id = uuid.v4();

    if(!name) {
        return res.status(400).json({
            error: 'Name is required'
        })
    }
    if(!url) {
        return res.status(400).json({
            error: 'URL is required'
        })
    }
    if(!caption) {
        return res.status(400).json({
            error: 'Caption is required'
        })
    }

    const MemeAdded = await XMeme.find({ url });
    if(MemeAdded.length > 0) {
        console.log('Meme present: ', MemeAdded)
        return res.status(200).json({
            message: "This meme is already present"
        })
    }

    const meme = new XMeme({
        name, url, caption, id
    })

    meme.save((error, data) => {
        if(error) {
            return res.status(400).json({
                message: error
            })
        }

        return res.status(200).json({
            id
        })
    })
}