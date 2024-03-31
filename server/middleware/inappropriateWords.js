const inappropriateWords = ['word1', 'word2', /* Your list of words here */];

module.exports = (req, res, next) => {
    const username = req.body.username;
    if (inappropriateWords.some(word => username.toLowerCase().includes(word))) {
        res.status(400).json({ error: 'Username contains inappropriate words' });
    } else {
        next();
    }
}
