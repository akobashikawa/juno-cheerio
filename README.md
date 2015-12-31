# Juno
Simple Express template engine for unobtrusive templating with cheerio.

# Example of use
https://github.com/akobashikawa/express-unobtrusive-template-engine/tree/juno

app.js
```javascript
var juno = require('juno');

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');
app.engine('html', juno);

app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
    res.status(err.status || 500);console.log(err.status);
    res.render('error', {
        replaces: function($) {
            $('title').text('Error');
            $('h1.title').text('Error');
            $('.content .message').text(err.message);
            $('.content .status').text(err.status.toString());
            $('.content .stack').text(err.stack);
        }
    });
});

```

- ```public/*.html``` are templates. Templates are simple html. No template language is required. Note than middleware for static files in public appear *after* routes to allow public contains templates.

- ```routes/index.js``` implements actions for defined routes, as usual in Express.