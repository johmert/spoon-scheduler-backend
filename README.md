# Spoon Scheduler

## Website URL: https://spoon-scheduler.vercel.app

## Table of Contents

* [General Information](#general-information)
* [Technologies](#technologies)
* [Installation](#installation)
* [Features](#features)
* [API](#api)

## General Information

This is a project that allows a user to plan daily events according to mental stamina (aka "spoons") as well as time and importance constraints.

To learn more about spoon theory, check out: https://en.wikipedia.org/wiki/Spoon_theory

## Technologies

### Front End ( https://github.com/johmert/spoon-scheduler-frontend )

* React.js
* react-bootstrap
* CSS

### Back End ( https://github.com/johmert/spoon-scheduler-backend )

* Node.js
* Express.js
* Knex.js
* PostgreSQL

## Installation

1. Fork and clone this repository.
2. Fork and clone the repository for the frontend (https://github.com/johmert/spoon-scheduler-frontend)
3. Run `cp .env.sample .env`.
4. Update the `.env` file with the connection URL to your postgreSQL database, such as an ElephantSQL database instance.
5. Run `npm install` to install project dependencies.
6. Run `npm run start:dev` to start your server in development mode.

## Features

### User Login / Registration

Each user begins at the login screen, with the option to register if they don't already have an account.

![user login screen](https://i.imgur.com/GRRjgOC.jpg)

![user registration screen](https://i.imgur.com/ZYJKSuA.jpg)

### Schedule Overview

The Schedule Overview allows a user to view a list of days, how many events are scheduled that day, the total number of spoons scheduled, and the user's set "maximum spoons" for that day. If no days are in the list, a message and link to get started are displayed instead.

![schedule overview](https://i.imgur.com/sr6MtJ3.jpg)

### Add / Edit Day

Depending on if a user is creating or editing an day, the form will appear slightly different. When creating, users can choose a date as well as set a "maximum spoons" value for the day. When editing, the date is displayed but disabled as this is not something the user can edit.

![create day form](https://i.imgur.com/3SICmSn.jpg)

![edit day form](https://i.imgur.com/coPeWdd.jpg)


### Day View

Viewing a day allows a user to view a list of events scheduled on that particular day. The total scheduled spoons and day's set "maximum spoons" are also displayed prominantly. From here, a user can add, edit, and delete events. Events are listed with a name, description, tagged as important or not, the duration of the event, and number of spoons.

![day view, events listed](https://i.imgur.com/vHe2X2w.jpg)

## Add / Edit Event

The event form looks identical whether a user is creating or updating an event, with the exception of the form's label at the top of the page. A user can set the name, importance, number of spoons, description, and time duration of an event. When the user checks the "All-day" switch, the hours/minutes dropdown menus are disabled, and the event's duration is set for 24 hours.

![create event form](https://i.imgur.com/XBya1u7.jpg)

![edit event form](https://i.imgur.com/LwVN77N.jpg)

## API

* POST `/users/` - creates a new user
* POST `/users/:username` - logs in a user
* GET `/users/:userId` - reads user, attaching an array of dates associated with the user.
* GET `/users/:userId/days/` - lists days associated with a user
* GET `/users/:userId/days/:date` - reads a specific day
* PUT `/users/:userId/days/:date` - updates a day
* GET `/users/:userId/days/:date/events/` - lists events associated with a specific user & day
* POST `/users/:userId/days/:date/events` - creates an event
* GET `/users/:userId/days/:date/events/:eventId` - reads a specific event
* PUT `/users/:userId/days/:date/events/:eventId` - updates a specific event
* DELETE `/users/:userId/days/:date/events/:eventId` - deletes a specific event

### Parameters

| Parameter | Type |
|-----------|------|
| `user_id` | `uuid` |
| `username` | `string`|
| `date` | `date` |
| `event_id` | `uuid` |
