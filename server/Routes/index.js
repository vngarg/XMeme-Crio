// Contains all the API end-points

const express = require("express");
const { PostMeme } = require("../Controllers/Post-Meme");
const { GetAllMemes } = require("../Controllers/GetAll-Memes");
const { GetMemeById } = require("../Controllers/GetMeme-ById");
const { DeleteMeme } = require("../Controllers/DeleteMeme");
const { UpdateMeme } = require("../Controllers/UpdateMeme");
const router = express.Router();

// Basic end-point to check whether the API is working fine or not.  
router.get("/", (req, res) => {
    return res.status(200).json({
        message: "Server running fine."
    })
})

router.post('/memes', PostMeme) // Add a meme
router.get('/memes', GetAllMemes); // Get all the memes
router.get('/memes/:id', GetMemeById) // Get a meme by Id
router.delete('/delete-meme/:id', DeleteMeme); // Delete a Meme
router.patch('/update-meme/:id', UpdateMeme); // Update a Meme

module.exports = router;
