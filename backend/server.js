// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const codeAnalyticsRoutes = require('./routes/codeAnalytics');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection (replace with your actual MongoDB connection string)
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: {
    version: '1', // Ensure the correct version is used
    strict: true,
    deprecationErrors: true,
  },
});

// Middleware
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// GitHub OAuth configuration
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/auth/github/callback'
},
  (accessToken, refreshToken, profile, done) => {
    // Store or retrieve user information from the database
    // Example: Check if the user exists, create if not
    // Save relevant information in the session
    return done(null, profile);
  }
));

// GitHub authentication route
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// GitHub authentication callback route
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to the main page or dashboard
    res.redirect('/');
  }
);

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

passport.serializeUser((user, done) => {
  // Serialize user information for the session
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  // Deserialize user information from the session
  done(null, obj);
});

// Routes (to be implemented)
app.get('/', (req, res) => {
  res.send('GitHub Dev Insights Backend');
});

// Example protected route
app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.send(`Welcome to the dashboard, ${req.user.username}!`);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

app.use('/api', codeAnalyticsRoutes);

app.get('/api/code-metrics', (req, res) => {
  const eslintReport = require('./eslint-report.json');
  res.json(eslintReport);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
