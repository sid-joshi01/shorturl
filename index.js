const express = require('express'); 
const connectDB = require('./connect');
const path = require('path');
const cookieParser = require('cookie-parser');
const { restrictoLoggedinUserOnly } = require('../SHORT URL/middleware/auth')
const urlRoutes = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRoutes = require('./routes/user');
const app = express();
const port = 8001;

connectDB('mongodb://127.0.0.1:27017/short-url');

// required for SSR
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

// Middleware to serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/test', (req, res) => {
  const allUrls = [
    { shortId: 'abc123', redirectUrl: 'http://example.com' },
    { shortId: 'xyz789', redirectUrl: 'http://example.org' }
  ];
  return res.render('home', { urls: allUrls });
});
app.use('/url', restrictoLoggedinUserOnly, urlRoutes);
app.use('/', staticRouter);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});