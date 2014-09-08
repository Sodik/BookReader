var extend = require('./extend');
var win = global.nw.Window.get();
win.isMaximized = false;

module.exports = function(document){
  return {
    init: function(opts){
      this.options = extend({}, opts);
      this.findElements();
      this.attachEvents();
    },
    findElements: function(){
      this.btnClose = document.getElementById('window-close');
      this.btnMinimize = document.getElementById('window-minimize');
      this.btnMaximize = document.getElementById('window-maximize');
      this.isMaximize = false;
    },
    attachEvents: function(){
      this.btnClose.addEventListener('click', function(){
        if(this.options.onBeforeClose && typeof this.options.onBeforeClose === 'function'){
          this.options.onBeforeClose();
        }
        win.close();
      }.bind(this), false);

      this.btnMinimize.addEventListener('click', function(){
        win.minimize();
      }, false);

      this.btnMaximize.addEventListener('click', function(){
        if(win.isMaximized){
          win.unmaximize();
        }else{
          win.maximize();
        }
      }.bind(this), false);

      win.on('maximize', function(){
        win.isMaximized = true;
      });

      win.on('unmaximize', function(){
        win.isMaximized = false;
      });
    }
  };
}