# Calendar Reminder

Live Demo: [Calendar Reminder](https://cranky-bohr-4dedce.netlify.com/)

## Pre-requisites

Remember install the last version of  [Angular CLI](https://angular.io/guide/setup-local)

## ## Development

1. Run  `git clone git@github.com:CristianTurcios/Calendar-Reminder.git` in your console.
2. Run  `cd calendar-reminder`.
3. Run  `npm i`.
4. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
5. Run `ng test` to run test

## Mandatory Features Completed:

 1. Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city.
 2. Display reminders on the calendar view in the correct time order.
 3. Allow the user to select color when creating a reminder and display it appropriately.
 4. Ability to edit reminders – including changing text, city, day, time and color.
 5. Add a weather service call from a free API such as Open Weather Map, and get the weather forecast (ex. Rain) for the date of the calendar reminder based on the city.
 6. Unit test the functionality: Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city.

## Bonus Features Completed:

1. Expand the calendar to support more than the current month.
2. Properly handle overflow when multiple reminders appear on the same date.
3. Functionality to delete one or ALL the reminders for a specific day.

## Considerations

- State Management was managed with [ngrx](https://ngrx.io/)
- To retrieve weather data from cities was managed with [weatherbit.io](https://www.weatherbit.io/)
- App is hosted in [Netlify](https://www.netlify.com/).
- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.
- Test were managed with karma and Jasmine.
- Browser compatibility: Google Chrome, Firefox, Microsoft Edge. Not Support IE.

## Calendar Reminder Screenshots

![App whitout Reminder](src/img/calendar.png)

![Modal Reminder](https://photos.app.goo.gl/9iKyR3PHkmXrnzy57)

![Calendar with Reminders](https://photos.app.goo.gl/xmN3xJCFSyFTCgFh8)

![Test](https://photos.app.goo.gl/qeCNRHujDizzqq4s8)