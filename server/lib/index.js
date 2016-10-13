var path = require('path');
var index = {
  renderIndex: function(req, res) {
    res.sendFile(path.resolve('app/index.html'));
  }

};
 
module.exports = index;