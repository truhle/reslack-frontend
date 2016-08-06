import $ from 'jquery';

module.exports = {
  loggedIn() {
    return !!localStorage.current_user;
  },
  
  login(email, password, cb) {
    $.ajax({
      url: "http://localhost:3000/sessions/create",
      data: {email: email, password: password},
      success: (response) => {
        cb(true, response);
      },
      error: (response) => {
        cb(false, response);
      }
    });
  },
  
  logout(cb) {
    delete localStorage.current_user;
    delete localStorage.token;
    if (cb) cb();
  }
}
