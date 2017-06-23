const express          = require('express'),
      mongoose         = require('mongoose'),
      bodyParser       = require('body-parser'),
      morgan           = require('morgan'),
      expressValidator = require('express-validator'),
      passport         = require('passport'),
      session          = require('express-session');

const port = process.env.PORT || 8008;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bookroomAPI', (err) => {
  if(err) throw err;
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(session({ secret: 'wannalookorbook', resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => res.send('Welcome to the "BOOK ROOM" API'));

require('./server/passport/local-signup')(passport);
require('./server/passport/local-login')(passport);

require('./server/authRouter')(app, passport);

const roomRouter = require('./server/roomRouter');
app.use('/api/rooms', roomRouter);

const meetingRouter = require('./server/meetingRouter');
app.use('/api/meetings', meetingRouter);

const bookingRouter = require('./server/bookingRouter');
app.use('/api/bookings', bookingRouter);

app.listen(port, () => console.log(`Server running on PORT: ${port}`));
