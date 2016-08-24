// npm install -g firebase-tools

// substituir codigos em index.html

// tentar registrar um item
item = {'name': 'Angus', 'price': 30.5}
firebase.database().ref('items/1').push(item)

// o app possui regras de autenticação e autorização configuráveis.
// por padrão, todas funções precisam de autenticação para leitura e escrita.
// https://firebase.google.com/docs/database/security/user-security

// criar usuário
// https://firebase.google.com/docs/auth/web/password-auth

// autenticar
cred = firebase.auth().signInWithEmailAndPassword('abc@gmail.com', 'xyz')

