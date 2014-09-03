'use strict';
;(function(){
  var App = {
    findElements: function(){
      this.contentWrapper = document.getElementById('content').children[0];
      this.content = this.contentWrapper.children[0];
      this.fileInput = document.getElementById('file');
      this.fakeContent = document.getElementById('fake');
      this.progress = document.getElementById('progress');
      this.progressBar = document.getElementById('progress-bar');
      this.prevBtn = document.getElementById('prev');
      this.nextBtn = document.getElementById('next');
      this.reader = new FileReader();
      this.textRegex = /(<([^>]+)>)/ig;
    },
    attachEvents: function(){
      var self = this;

      this.fileInput.addEventListener('change', function(){
        if(this.files && this.files[0]){
          self.reader.readAsText(this.files[0], 'utf-8');
        }
      }, false);

      this.reader.addEventListener('load', function(e){
        this.originalText = e.target.result.replace(this.textRegex, '');
        this.calculatePageSize();
      }.bind(this), false);

      this.reader.addEventListener('error', function(){
        alert('Failed to open Book');
      }, false);

      this.prevBtn.addEventListener('click', function(e){
        if(this.contentWrapper.scrollTop > 0){
          this.contentWrapper.scrollTop -=  this.contentWrapperNewHeight;
          this.updatePagination();
        }
      }.bind(this), false);

      this.nextBtn.addEventListener('click', function(e){
        this.contentWrapper.scrollTop +=  this.contentWrapperNewHeight;
        this.updatePagination();
      }.bind(this), false);

      window.addEventListener('resize', function(){
        if(this.originalText){
          this.calculatePageSize();
        }
      }.bind(this), false);
    },
    calculatePageSize: function(){
      this.content.innerHTML = this.originalText;
      this.charSize = {
        height: this.fakeContent.offsetHeight,
        width: this.fakeContent.offsetWidth
      };
      this.contentWrapper.scrollTop = 0;
      this.contentWrapper.style.height = '';
      this.contentWrapperHeight = this.contentWrapper.offsetHeight;
      this.rowsSize = Math.floor(this.contentWrapperHeight/this.charSize.height);
      this.contentHeight = this.content.offsetHeight;
      this.contentWrapperNewHeight = this.contentWrapperHeight - this.contentWrapperHeight%(this.rowsSize*this.charSize.height);
      this.contentWrapper.style.height = this.contentWrapperNewHeight + 'px';

      this.updatePagination();
    },
    updatePagination: function(){
      var progress = ((this.contentWrapper.scrollTop + this.contentWrapperNewHeight)/this.contentHeight*100).toFixed(2) + '%';
      this.progress.innerHTML = progress;
      this.progressBar.style.width = progress;
    },
    init: function(){
      this.findElements();
      this.attachEvents();
    }
  }

  App.init();
})();