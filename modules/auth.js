import $ from 'jquery';

module.exports = {
  getToken() {
    return localStorage.token;
  },
  
  loggedIn() {
    return !!localStorage.token;
  },
  
  login(email, password, cb) {
    $.ajax({
      url: "http://localhost:3000/sessions",
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
    let url = "http://localhost:3000/sessions" + "?" 
              + $.param({"token": this.getToken(), 
                         "user_id": JSON.parse(localStorage.current_user).id});
    $.ajax({
      url: url,
      type: 'DELETE',
      success: (response) => {
        console.log(response);
      },
      error: (response) => {
        console.log(response);
      }
    });
    delete localStorage.current_user;
    delete localStorage.token;
    if (cb) cb();
  }
}
