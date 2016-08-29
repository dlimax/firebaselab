# Mini tutorial guiado

1. *Criar conta* em https://firebase.google.com

2. *Instalar NodeJs.* Entre em www.nodejs.org e faça o download e instale o NodeJs (Ou utilize o seu gerenciador de pacotes). Ao terminar essa etapa, você terá instalado o NodeJs e o seu gerenciador de dependências o *npm*.

3. *Instalar **firebase-tools** *. Abra um shell (caso esteja utilizando Windows, sugiro o Git-Bash, que vem na instalação do Git) e rode o seguinte comando:

    ```shell
    npm install -g firebase-tools
    ```

4. *Criar Novo Projeto*. Entre em sua conta em https://firebase.google.com e clique para criar Novo Projeto. 

5. *Copiar e colar credenciais*. Clique em "Adicionar o Firebase ao seu app da Web." Copie o código apresentado e cole em index.html, no local indicado nos comentários.

6. *Iniciar o servidor web com suporte a firebase*. Abra um shell e digite o seguinte comando:

    ```shell
    firebase serve
    ```

7. *Acessar o projeto*. Abra o seu navegador em http://localhost:5000.

8. *Tentar registrar um item no firebase*.  Acesse o console javascript do seu navegador e digite o seguinte comando:
    
    ```javascript  
    item = {'name': 'Angus', 'price': 30.5}
    firebase.database().ref('items/1').push(item)
    ```

9. *Criar usuário*. O comando anterior não funcionará, pois, por padrão, é necessário realizar
autenticação para utilizar o banco de dados do firebase. https://firebase.google.com/docs/database/security/user-security. Vamos então criar um usuário acessando https://firebase.google.com/docs/auth/web/password-auth

10. *Autenticando*. Vamos agora nos autenticar utilizando as credenciar criadas no passo anterior. 

	```javascript
	firebase.auth().signInWithEmailAndPassword('abc@gmail.com', 'xyz')
	```

