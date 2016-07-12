var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    index = require('./routes/index'),
    api   = require('./routes/api');

// === Middleware === //
app.use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:false}))
  .use(methodOverride('_method'))
  .use(express.static('public'));

app.set('view engine', 'ejs')
  .set('views', 'views');


// === Routes === //
app.use('/', index);
app.use('/api', api);


// === Listen === //
app.listen(3000, function(){
  console.log('Server is listening.');
});
