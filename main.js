'use strict';
;(function(){
  global.nw = require('nw.gui');
  var path = require('path');
  var appPath = path.dirname(process.execPath);
  var Panel = require(appPath + '/modules/panel')(document);
  var Reader = require(appPath + '/modules/reader')(document);

  Reader.init();
  Panel.init({
    onBeforeClose: function(){
      Reader.saveProgress();
    }
  });
})();