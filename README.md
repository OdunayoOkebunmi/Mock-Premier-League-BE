# Mock-Premier-League-BE
[![Build Status](https://travis-ci.org/OdunayoOkebunmi/Mock-Premier-League-BE.svg?branch=develop)](https://travis-ci.org/OdunayoOkebunmi/Mock-Premier-League-BE)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Server side hosted on Heroku
https://mock-premier-league-be.herokuapp.com/

## API Documentation
https://documenter.getpostman.com/view/10230743/T1DjiybW

## Table of Content
 * [Getting Started](#getting-started)

* [Prerequisites for installation](#prerequisites-for-installation)
 
 * [Installation](#installation)

 * [Test](#test)
 
 * [API End Points Test Using Postman](#api-end-points-test-using-postman)

 * [Linting Style](#linting-style)
 
 * [Features](#features)
 
 * [Built With](#built-with)
 
 * [Author](#author)


## Getting Started

### Tools/Stacks
1. Node js
2. Express
4. MongoDB
5. Docker
6. Redis
7. Postman
8. Jest


### Setting up
1. Clone this repository into your local machine:
```
e.g git clone https://github.com/OdunayoOkebunmi/Mock-Premier-League-BE
```
2. cd into the folder
```
e.g cd Mock-Premier-League-BE
```

3. Create `.env` file and fill out the required information 
```
e.g cp .env.example .env
```
4. Install dependencies

```
e.g npm install
```
5. Start the application by running the server script.

```
e.g npm run server
```

6. Install postman to test all endpoints on port 5000.

7. Run `docker-compose up`

8. Rate Limiting has been set up to manage requests made to the APIs.

### Test
run test using ```npm test```.

### Linting Style
* ESLint with Airbnb style guide. 

## Features

 ### Admin
 * Admin can signup/login
 * Admin can manage teams (add, remove, edit, view) 
 * Admin can create fixtures (add, remove, edit, view)
 * Admin can Generate unique links for fixture 

 ### Users
 * A user can signup/login
 * A user can sview teams
 * A user can view completed fixtures
 * A user can view pending fixtures
 * A user can robustly search fixtures/teams
 
 * Only the search API should be availble to the public.
 


## Author
*  [Odunayo Olajumoke Okebunmi](https://twitter.com/OdunayoO_)

## License
This project is licensed under the MIT license - see the LICENSE.md file for details.
