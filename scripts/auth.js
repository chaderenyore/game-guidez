// signup 
const signupForm = document.querySelector('#signup-form') 
signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = signupForm['signup-email'].value;
      const password = signupForm['signup-password'].value;
      
     // signup user
     auth.createUserWithEmailAndPassword(email, password).then(cred => {
       console.log(cred.user)

       const modal = document.querySelector('#modal-signup');
       M.Modal.getInstance(modal).close();
       signupForm.reset()
     })
})

// logout
const logout = document.querySelector('#logout')
logout.addEventListener('click', (event) => {
      event.preventDefault();
      auth.signOut().then(() => {
            console.log('User signed out');
      });
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // get user info
      const email = loginForm['login-email'].value;
      const password = loginForm['login-password'].value;

      // sign the user in now
      auth.signInWithEmailAndPassword(email, password).then(cred => {
            console.log(cred.user);
      })

      // close signin modal and reset the form
      const modal = document.querySelector('#modal-login');
       M.Modal.getInstance(modal).close();
       loginForm.reset()
})