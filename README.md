# juno-cheerio
Simple Express template engine for unobtrusive templating with cheerio.

## Idea
Using tipical template engines involves learning the template language and process html base in order to accomplish template engine requirements.

Why not an unobtrusive way to work with html base?

In frontend side, jQuery helps to work in an unobtrusive way. What if we could apply this idea in backend side?

Cheerio provides jQuery functionalities for Node.

This is an example of how to work with cheerio to provide unobtrusive templating.

With juno-cheerio, you can use your jQuery skills to template Express in an unobtrusive way.

## Example of use
https://github.com/akobashikawa/express-unobtrusive-template-engine/tree/juno

app.js
```javascript
var juno = require('juno-cheerio');

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

```javascript
router.get('/', function(req, res, next) {
    res.render('index', {
        replaces: function($) {
            $('title').text('Home');
            $('h1.title').text('Home');
            $('.content').text('¡Hola Mundo!');
        }
    });
});
```

## Using remote url
You can use option **url** to indicate remote url as source of html template.

```javascript
router.get('/', function(req, res, next) {
    url: 'http://somedomain.com/sometemplate.html',
    res.render('index', {
        replaces: function($) {
            $('title').text('Home');
            $('h1.title').text('Home');
            $('.content').text('¡Hola Mundo!');
        }
    });
});
```
