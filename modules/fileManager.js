var fs = require('fs');
var path = require('path');

module.exports = function(document){
  var proto = {
    init: function(opts){
      this.path = opts.path;
      this.holder = opts.holder;
      this.doc = opts.doc;
      this.attachEvents();
      return this;
    },
    buildLevel: function(){
      var frag = this.doc.createDocumentFragment();
      if(this.hasParentFolder()){
        var up = document.createElement('li');
        up.id = 'up';
        up.innerHTML = 'up';
        frag.appendChild(up);
      }
      fs.readdirSync(this.path).forEach(function(item){
        var el = this.doc.createElement('li');
        el.innerHTML = item;
        frag.appendChild(el);
      }.bind(this));
      return frag;
    },
    showContent: function(){
      this.holder.innerHTML = '';
      this.holder.appendChild(this.buildLevel());
    },
    hasParentFolder: function(){
      return path.dirname(this.path) !== this.path;
    },
    getContent: function(path){
      return fs.readdirSync(path);
    },
    folderUp: function(){
      this.path = path.dirname(this.path);
      this.showContent();
    },
    folderDown: function(){
      this.showContent();
    },
    attachEvents: function(){
      this.holder.addEventListener('click', function(e){
        var target = e.target;
        if(target.id && target.id === 'up'){
          this.folderUp();
        }else{
          var newPath = path.join(this.path, target.innerHTML);
          if(fs.lstatSync(newPath).isDirectory()){
            this.path = newPath;
            this.folderDown();
          }
        }
      }.bind(this), false);
    },
    show: function(){
      this.showContent();
      this.holder.style.display = 'block';
    },
    hide: function(){
      this.holder.style.display = 'none';
    }
  };

  return Object.create(proto);
};