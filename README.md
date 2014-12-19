## reapp Hacker News App

This is a demo app built on reapp, for reading HackerNews. It shows of a few things:

- Flux + immutable data management with the data helpers
- Nesting multiple different types of ViewLists
- Themeing

### TODO

reapp
  - uses all the utils together to provide a simpler setup
  - auto-DI's mixins, stores, actions
    either looks for:
      actions.js or actions/*
      stores.js or stores/*
      mixins.js or mixins/*

reapp-utils
  - reapp-di
  - reapp-reducer
  - reapp-cached-request
  - reapp-flux (fynx based just adds some syntax)