const index = (req, res) => {
  res.render('users', { title: 'Kullanıcılar' });
}

module.exports = { index };
