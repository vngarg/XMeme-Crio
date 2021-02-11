const express = require("express");
const { PostMeme } = require("../Controllers/Post-Meme");
const { GetAllMemes } = require("../Controllers/GetAll-Memes");
const { GetMemeById } = require("../Controllers/GetMeme-ById");
const { DeleteMeme } = require("../Controllers/DeleteMeme");
const { UpdateMeme } = require("../Controllers/UpdateMeme");
const router = express.Router();

router.get("/", (req, res) => {
    return res.status(200).json({
        message: "Server running fine."
    })
})
router.post('/memes', PostMeme)
router.get('/memes', GetAllMemes);
router.get('/memes/:id', GetMemeById)
router.delete('/delete-meme/:id', DeleteMeme);
router.patch('/update-meme/:id', UpdateMeme);

module.exports = router;
