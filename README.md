# Welcome to the Mobile Challenge 👋
Pleo is all about expenses. So of cause we though that working on a little expense feed app would be a suitable challenge for you. 
## App Description
The app is a simple Expense-list app, where the user can see a feed of recent expenses, a bit like they can in the actual Pleo app. The user can also open a detail view for an expense, and add more information, such as receipt images and a note.

We've created the MVP, but we need your help to turn this into something more scalable. 🚀

## Potential Improvements 
Here's a few ideas of improvements for you to get started. We don't expect you to complete all of these, feel free to tackle any you'd like or some other improvements you feel is important. Or leave a description of what you _would do_ if you had more time... 

### Seperation of Concern 👐
Our MVP has almost all it's code in it's View structs. It would be great to separate business logic from UI code, inorder to make code more testable, usuable, and easier to maintain. Split your code into small building blocks, showcase your software architecture skills. We're looking for clean, maintainable and reusable code.
_hint: Create ViewModels for each view, which hold the views mutable state and is in charge to fetching data_
_hint: Move networking code into separate files_

### Testing 🧪
Why does a car have brakes? ... so it can drive faster! 🚗💨
We need good test coverage on our code base, because this will give us the confidence that the app is still working as expected, when we do changes. This will ultimately help us build _faster_ while maintaining _quality_.
_consider: How should dependencies be handled to allow good testability?_
_consider: Add Unit test and/or UI test? why?_

### State management 🪡
Currently all data lives in the ExpenseFeed. This is not great, because we've very limited in where the data can be accessed from. Fx, we needed invoke a callback from the detail view to the list, in order to update the data. If would be great if there were another more central solution to handling expense data.

### Modularization 🧩
We're convinced that this MVP will soon turn into a large scale app, so we better get started on [modularizing](https://en.wikipedia.org/wiki/Modular_programming) into separate modules. Create separate modules (Swift Packages/Android Libraries) for different areas of the app, that you see fit. It could be sepatate modules for the ExpenseList, ExpenseDetail and other shared code.
_consider: how is navigation handled?_
_consider: how are dependencies handled?_

### Error handling 💥
All API calls completely ignore potential errors. Maybe if would be nice to show an alert to the user, allow the user to retry or log errors to the console or some remote logging service (of just a mock for now..)

### More features! ✨
Actually, the MVP is not really where we want it to be. We've considered adding:
- Filters to the expense list
- Localization
- Support for Dark mode
- A share extension, that'll allow the user to attach a receipt directly from another app.

### CI/CD 🤖
At Pleo we use GitHub actions to automate many development workflows. Descrive how you'd setup something similar for this app.

## General requirements
_**Componentize your code:**_ Split your code into small building blocks, showcase your software architecture skills. We're looking for clean, maintainable and reusable code.


_**Add a brief project description:**_ Tell us a bit about your project, such as:
- Why you took a specific approach.
- How long did it take? 
- Which part was the hardest to implement? 
- What functionalities are you most proud of?
## Starting point
In this repo we're provided you with a node server, that you can use get expenses and update their details. See the [API details](https://github.com/pleo-io/mobile-challenge/tree/master/api) for implementation.


