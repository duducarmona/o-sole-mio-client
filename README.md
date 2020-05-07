# O Sole Mio (Client)

## Instructions how to start

create `.env` file like the example `.env.sample`

start with `npm run start-dev`

## Description

The project is an app to search for bars and restaurants with sunny terraces.

## Motivation

The motivation is caused by the difficulty of finding sunny terraces with free tables, a good atmosphere, cheap beers and delicious tapas in Barcelona.

## User Stories

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

**Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup

**Sign up** - As a user I want to sign up on the webpage so that I can see all the terraces that I could visit

**Login** - As a user I want to be able to log in on the webpage so that I can get back to my account

**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

**Terraces – list** - As a user I want to see all the terraces available so that I can choose which ones I want to visit

**Terrace – create** - As a user I want to insert new terraces so that they remain in the app so that I can remember them and other users can see them too

**Terrace – detail** - As a user, I want to see the details of the terrace and its characteristics to decide if I want to visit it

**Terrace – delete** - As a user, I want to delete the terraces that I have created and they no longer interest me

**Terrace – edit** - As a user I want to edit a terrace

## Backlog

List of other features outside of the MVPs scope

**User profile:** - see my profile - upload my profile picture - see other users profile - list of terraces created by the user - list of terraces that the user has visited

**Geo Location:** - add geolocation to terraces when creating - show terraces in a map

**Check Sun:** Find a system to automatically check if it's sunny

**Chat:** So that users can interact with each other

## ROUTES:

### Endpoints

| Method | Path                   | Description                                                  | End View               |
| :----: | ---------------------- | ------------------------------------------------------------ | ---------------------- |
|  GET   | `/`                    | Login                                                        | `/login`               |
|  GET   | `/signup`              | Signup                                                       | `/signup`              |
|  GET   | `/logout`              | Logs out the user and redirects to login                     | `/`                    |
|  POST  | `/login`               | Send user information, logged in and redirects to Terraces list | `/terraces`            |
|  POST  | `/signup`              | Send user information, register and redirects to Terraces list | `/terraces`            |
|  GET   | `/terraces`            | Terraces list page                                           | `/terraces`            |
|  GET   | `/terraces/add`        | Show the form to add a terrace                               | `/terraces/add`        |
|  POST  | `/terraces`            | Create a terrace and redirects to Terraces list              | `/terraces`            |
|  POST  | `/terraces/:id/delete` | Delete a terrace and redirects to Terraces list              | `/terraces`            |
|  GET   | `/terraces/:id/update` | Get the information to update a terrace                      | `/terraces/:id/update` |
|  POST  | `/terraces/:id`        | Update a terrace and redirects to Terrace detail             | `/terraces/:id`        |
|  GET   | `/terraces/:id`        | A terrace detail                                             | `/terraces/:id`        |

### Auth

| Method | Path      | description    | Body                     |
| :----: | --------- | -------------- | ------------------------ |
|  GET   | `/whoami` | who am i       |                          |
|  POST  | `/signup` | signup a user  | `{ username, password }` |
|  POST  | `/login`  | login a user   | `{ username, password }` |
|  GET   | `/logout` | logout session |                          |

## Models

User model

```javascript
{
	_id: ObjectId,
  username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
}
```

Terrace model

```javascript
{
  _id: { type: ObjectId, required: true, unique: true },
	userId: { type: ObjectId<User>, required: true },
	name: { type: String, required: true },
	description: String,
	address: { type: String, required: true },
	phone: String,
  email: String,
  pictures: [String],
  freeTables: Number,
  beerPrice: Number,
  bestTapa: String,
	type: { type: String, enum: ['bar', 'restaurant'] },
  liveMusic: Boolean,
  petFriendly: Boolean,
  menuPictures: [String],
  sunAmount: { type: String, enum: ['totallySunny', 'partlySunny', 'notSunny'] },
  sunRegisterTime: Date,
  starsNumber: Number
}
```

Opinion model

```javascript
{
  _id: { type: ObjectId, required: true, unique: true },
  userId: { type: ObjectId<User>, required: true },
  terraceId: { type: ObjectId<Terrace>, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  rating: Number
}
```



## Links

### Trello

https://trello.com/b/LN9YSuKF/o-sole-mio

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com/)

[Deploy Link](http://heroku.com/)

### Slides

[Slides Link](http://slides.com/)
