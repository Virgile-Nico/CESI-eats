# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Components

## Avatar Component

Le composant Avatar affiche une image d'utilisateur avec son prénom et son nom.

### Props

- `src` (optionnel) : Chemin de l'image de l'utilisateur. Si aucun chemin n'est spécifié, une image par défaut sera utilisée.
- `firstname` : Prénom de l'utilisateur.
- `lastname` : Nom de famille de l'utilisateur.

### Utilisation

```javascript
import Avatar from './components/Avatar';

// Exemple d'utilisation
<Avatar 
  src="/chemin/vers/image.jpg"
  firstname="John"
  lastname="Doe"
/>
```

## BackBtn Component

Le composant BackBtn affiche un bouton permettant de revenir en arrière dans l'historique du navigateur.

### Props

- `text` (optionnel) : Texte à afficher à côté de la flèche. Par défaut, le texte est "Retour".

### Utilisation

```javascript
import BackBtn from './components/BackBtn';

// Exemple d'utilisation avec texte personnalisé
<BackBtn text="Retourner en arrière" />

// Exemple d'utilisation sans texte personnalisé
<BackBtn />
```

## CartBtn Component

Le composant CartBtn affiche un bouton représentant un panier avec un compteur d'articles.

### Props

- `articlesCount` : Nombre d'articles dans le panier.
- `onClick` (optionnel) : Fonction à exécuter lors du clic sur le bouton.

### Utilisation

```javascript
import CartBtn from './components/CartBtn';

// Exemple d'utilisation avec nombre d'articles spécifié
<CartBtn articlesCount={5} onClick={handleClick} />

// Exemple d'utilisation sans gestion du clic
<CartBtn articlesCount={3} />
```

## MobileConnexion Component

Le composant MobileConnexion est utilisé pour afficher un formulaire de connexion sur des appareils mobiles, avec la possibilité de saisir un mot de passe, de réinitialiser le mot de passe et de gérer les notifications de connexion.

### Props

- `firstname` : Prénom de l'utilisateur.
- `forgetPassword` : Fonction à appeler lorsque l'utilisateur souhaite réinitialiser son mot de passe.
- `onSignIn` : Fonction à appeler lorsque l'utilisateur se connecte.
- `showNotif` : Boolean indiquant si la notification de connexion doit être affichée.

### Utilisation

```javascript
import MobileConnexion from './components/MobileConnexion';

// Exemple d'utilisation
<MobileConnexion
  firstname="John"
  forgetPassword={handleForgetPassword}
  onSignIn={handleSignIn}
  showNotif={false}
/>
```

## NextBtn Component

Le composant NextBtn affiche un bouton avec une flèche vers la droite, souvent utilisé pour passer à l'étape suivante ou pour une action de progression.

### Props

- `onClick` (optionnel) : Fonction à exécuter lors du clic sur le bouton.
- `text` (optionnel) : Texte à afficher à côté de la flèche.

### Utilisation

```javascript
import NextBtn from './components/NextBtn';

// Exemple d'utilisation avec gestion du clic et texte personnalisé
<NextBtn onClick={handleNext} text="Suivant" />

// Exemple d'utilisation sans gestion du clic
<NextBtn text="Continuer" />
```

## SignInBtn Component

Le composant SignInBtn affiche un bouton permettant à l'utilisateur de se connecter.

### Props

- `onClick` (optionnel) : Fonction à exécuter lors du clic sur le bouton.

### Utilisation

```javascript
import SignInBtn from './components/SignInBtn';

// Exemple d'utilisation avec gestion du clic
<SignInBtn onClick={handleLogin} />

// Exemple d'utilisation sans gestion du clic
<SignInBtn />
```

## SignUpBtn Component

Le composant SignUpBtn affiche un bouton permettant à l'utilisateur de s'inscrire.

### Props

- `onClick` (optionnel) : Fonction à exécuter lors du clic sur le bouton.

### Utilisation

```javascript
import SignUpBtn from './components/SignUpBtn';

// Exemple d'utilisation avec gestion du clic
<SignUpBtn onClick={handleSignUp} />

// Exemple d'utilisation sans gestion du clic
<SignUpBtn />
```