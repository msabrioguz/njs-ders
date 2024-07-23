const indexPage = (req, res) => {
    res.send("Hoşgeldiniz");
};

const testPage = (req, res) => {
    res.send("Test");
};

const merhabaPage = (req, res) => {
    res.send("Merhaba");
};

module.exports = { indexPage, testPage, merhabaPage };