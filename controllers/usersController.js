const index = (req, res) => {
    console.log('index usersController');
    res.send('respuiesta desde controlador');
};

module.exports = {
    index
}