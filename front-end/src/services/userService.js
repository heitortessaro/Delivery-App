const verifyLastUser = (user) => {
  const oldUser = JSON.parse(window.localStorage.getItem('user')) || {};
  if (oldUser === {} || oldUser.name === user.name) {
    localStorage.setItem('checkoutProducts', JSON.stringify([]));
  }
};

module.exports = { verifyLastUser };
