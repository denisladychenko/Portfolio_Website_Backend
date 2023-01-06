const express = require ("express");

const router = express.Router();

// router.get("/projects", (req, res, next) => {
//     res.json({text: "It actually works!"});
// });

router.get("/projects/:projectId", (req, res, next) => {
    res.json({text: "It actually works!"});
});

module.exports = router; 