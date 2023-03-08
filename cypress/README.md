# Cypress testing

### Links
- https://www.youtube.com/watch?v=LcGHiFnBh3Y&t=545s
- https://github.com/cypress-io
- https://github.com/cypress-io/cypress-example-recipes
- https://www.cypress.io/

### Notes
None of this code has been tested. Just take the ideas and google it, ignore the syntax.

<b> Creating tasks</b>

```js
// cypress/plugins/index.js
module.exports = (on, config) => {
  on("task", {
    "db:reboot": () => {
      // ... do something ...
    }
  })
}

// mytest.cy.ts
context('login', () => {
  beforeEach(() => {
    cy.task('db:reboot');
  });

  it('your test here', () =>{
    // ... your assertions here ...
  })
})
```
<hr>

<b>Creating commands</b>

```js
// Define the comamnd inside cupress/support/commands.js
Cypress.Commmands.add('loginWithUI', (email, password) => {
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.get('#login-button').click();
})

// Using the command (inside yourtest.cy.ts)
cy.loginWithUI('email@example.com', 'pwd123');
```
<hr>

<b> Creating custom commands</b>

You can basicly call functions of your application from cypress.
```js
// Define the comamnd inside cupress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  return cy.window().then(win => {
    return win.app.$store.dispatch('login', {
      email: email,
      password: password
    })
  })
});
```

<hr>

<b> Stubbing network respose </b>

You can start a server that fakes a backend and return your fixtures. [link](https://youtu.be/LcGHiFnBh3Y?t=1519)