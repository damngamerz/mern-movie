# mern-movie
Minimal full-stack Movie Review Application

Preview available on [Heroku](https://secure-inlet-77830.herokuapp.com/)
## Configuration

Make sure to add your own `MONGOURI` from your [mLab](http://mlab.com) database in `config/default.json`.

```javascript
module.exports = {
  mongoURI: "YOUR_MONGO_URI_HERE",
  "jwtSecret": "sl_myJwtSecret"
};
```

## Quick Start

```javascript
// Install dependencies for server & client
npm install && npm run client-install

// Run client & server with concurrently
npm run dev

// Server runs on http://localhost:5000 and client on http://localhost:3000
```

## Test

For running tests.
```javascript
npm test
```