// controllers/authController.js
exports.getToken = (req, res) => {
    console.log('getToken started execution..');
    const token = req.session.token;
    if (token) {
        res.json({token});
    }
    else {
        res.status(401).json({message: 'No Token Found'});
    }
};