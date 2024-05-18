const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        res.send("  port 7777 ")
    } catch (error) {
        console.log(error.message);
        res.send(error.message)
    }
})

module.exports = router
