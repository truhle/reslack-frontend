module.exports = {
  loggedIn() {
    return !!localStorage.current_user;
  },
  
  logOut(cb) {
    delete localStorage.current_user;
    delete localStorage.group_id;
    if (cb) cb();
  }
}
