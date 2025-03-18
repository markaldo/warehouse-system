// ======================
// Security Configuration
// ======================
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

// Add after initializing Express app
const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Session configuration
app.use(session({
  secret: 'my-local-dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true in production with HTTPS
    httpOnly: true
  }
}));

// Routes
const salesRoutes = require('./routes/sales');
const logisticsRoutes = require('./routes/logistics');
app.use('/sales', salesRoutes);
app.use('/logistics', logisticsRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const authRoutes = require('./routes/auth');
const { authorize } = require('./middleware/auth');

app.use('/auth', authRoutes);

// Apply authorization middleware to sales and logistics routes
const salesRoutes = require('./routes/sales');
const logisticsRoutes = require('./routes/logistics');

app.use('/sales', authorize(['sales', 'admin']), salesRoutes);
app.use('/logistics', authorize(['logistics', 'admin']), logisticsRoutes);

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const server = https.createServer(options, app);

const PORT_1 = 3443; // Use a different port for HTTPS
server.listen(PORT_1, () => {
  console.log(`Server running on https://localhost:${PORT_1}`);
});