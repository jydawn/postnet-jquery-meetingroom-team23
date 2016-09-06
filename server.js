let express = require('express');
let app = express();

let BarToZipCore=require('./bar-to-zip-core');
let ZipToBarCore=require('./zip-to-bar-core');

app.use(express.static('./', {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['html', 'js', 'css'],
  index: ['index.html'], // or `false`
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}));

app.get('/zipcode-to-barcode/:zipcode', function(req, res) {
  // TODO
  let zipCode = req.params.zipcode;
  let zipToBarCore =new ZipToBarCore();
  let  result =zipToBarCore.do(zipCode);
  //console.log(result);
  res.send(result);

});

app.get('/barcode-to-zipcode/:barcode', function(req, res) {
  // TODO
  let barCode = req.params.barcode;
  let barToZipCore =new BarToZipCore();
  let  result =barToZipCore.do(barCode);
 // console.log(result);
  res.send(result);
});

app.listen(3000, function() {
  console.log('server is listening on 3000');
});