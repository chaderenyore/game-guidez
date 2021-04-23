// listen for auth status changes
auth.onAuthStateChanged(user => {
      if (user) {
            db.collection('guidez').onSnapshot((snapshot) => {
                  setupGuides(snapshot.docs)
                  setupUI(user);
            }, err => {
                  console.log(err.message)
            })
      } else {
            setupUI();
            setupGuides([]);
      }
})

// create new guide
const createFORM = document.querySelector('#create-form');
createFORM.addEventListener('submit', (e) => {
      e.preventDefault(); 

      db.collection('guidez').add({
            title: createFORM['title'].value,
            content: createFORM['content'].value
      }).then(() => {
            //close the modal
            const modal = document.querySelector('#modal-create');
            M.Modal.getInstance(modal).close();
            createFORM.reset()
      }).catch((error) => {
            console.log(error.message)
      });
});

// signup 
const signupForm = document.querySelector('#signup-form') 
signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = signupForm['signup-email'].value;
      const password = signupForm['signup-password'].value;
      const bio = signupForm['signup-bio'].value;
      
     // signup user
     auth.createUserWithEmailAndPassword(email, password).then(cred => {
       return db.collection('users').doc(cred.user.uid).set({
             bio: bio
       })

     }).then(() => {
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset()
     });
})

// logout
const logout = document.querySelector('#logout')
logout.addEventListener('click', (event) => {
      event.preventDefault();
      auth.signOut();
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

      // close signin modal and reset the form
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset()
      })  
})