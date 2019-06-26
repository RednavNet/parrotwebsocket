### Parrot Web Socket
- Aplicativo que utiliza a implementação pública do web socket ([ws://echo.websocket.org](https://www.websocket.org/echo.html))

#### Módulos utilizados
1. [React Native Elements](https://react-native-training.github.io/react-native-elements/)
    * Utilizado o ListItem para mostrar cada mensagem no chat junto com seu avatar.
2. [Spinner](https://github.com/joinspontaneous/react-native-loading-spinner-overlay)
    * Utilizado para mascarar o chat quando enviar a mensagem para o websocket
    
#### Instalação

>#Instalar react-native-elements

1.`npm i react-native-elements --saved`

>#Instalar react-native-vector-icons.

2.`npm i --save react-native-vector-icons`

>#Linkar

3.`react-native link react-native-vector-icons`

>#Instalar react-native-loading-spinner-overlay.
4.`npm install react-native-loading-spinner-overlay`

### Desenvolvimento do Projeto
1. Para a comunicação com o websocket segui o exemplo do próprio site do websocket e criei a tela PapagaioView utilizando o FlatList com ListItem do React Native elements que tem a facilidade do avatar.
2. A cada mensagem enviada é inserido no array para mostrar as mensagens.
3. A cada mensagem a tela é bloqueada com a máscaras loading esperando os eventos serem feitos e apresentando resultado para o usuário
    - Caso de certo é adicionado novo item no Flatlist
    - Caso de erro mostrará a mensagem para o usuário

