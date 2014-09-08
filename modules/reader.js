'use strict';

module.exports = function(document){
  var localStorage = global.window.localStorage;
  var FileReader = global.window.FileReader;
  return {
    findElements: function(){
      this.contentWrapper = document.getElementById('content').children[0];
      this.content = this.contentWrapper.children[0];
      this.fileInput = document.getElementById('file');
      this.fakeContent = document.getElementById('fake');
      this.progressField = document.getElementById('progress');
      this.progressBar = document.getElementById('progress-bar');
      this.prevBtn = document.getElementById('prev');
      this.nextBtn = document.getElementById('next');
      this.reader = new FileReader();
    },
    attachEvents: function(){
      var self = this;

      this.fileInput.addEventListener('change', function(){
        if(this.files && this.files[0]){
          self.bookName = this.files[0].path;
          self.reader.readAsText(this.files[0], 'utf-8');
        }
      }, false);

      this.reader.addEventListener('load', function(e){
        this.originalText = e.target.result;
        this.contentWrapper.scrollTop = 0;
        this.initBook();
      }.bind(this), false);

      this.reader.addEventListener('error', function(){
        alert('Failed to open Book');
      }, false);

      this.prevBtn.addEventListener('click', function(e){
        if(this.contentWrapper.scrollTop > 0){
          this.currentPage--;
          this.switchPage();
        }
      }.bind(this), false);

      this.nextBtn.addEventListener('click', function(e){
        if(this.currentPage < this.pages){
          this.currentPage++;
          this.switchPage();
        }
      }.bind(this), false);

      global.window.addEventListener('resize', function(){
        if(this.originalText){
          this.initBook();
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
      this.pages = Math.ceil(this.contentHeight/this.contentWrapperNewHeight);
      this.onePagePercent = 100/this.pages;
    },
    updatePagination: function(){
      var progress = this.progress.toFixed(2) + '%'
      this.progressField.innerHTML = progress + ' ' + this.currentPage + '/' + this.pages;
      this.progressBar.style.width = progress;
    },
    saveProgress: function(){
      this.storage[this.bookName].progress = this.progress;
      localStorage.setItem('books', JSON.stringify(this.storage));
    },
    switchPage: function(){
      this.contentWrapper.scrollTop = this.contentWrapperNewHeight*(this.currentPage - 1);

      this.setProgress();
      this.updatePagination();
    },
    getProgress: function(){
      return ((this.contentWrapper.scrollTop + this.contentWrapperNewHeight)/this.contentHeight*100);
    },
    setCurrentPage: function(progress){
      this.currentPage = Math.round(progress/this.onePagePercent);
      this.switchPage();
    },
    setProgress: function(){
      this.progress = this.getProgress();
    },
    initBook: function(){
      this.calculatePageSize();
      if(this.storage[this.bookName]){
        this.setCurrentPage(this.storage[this.bookName].progress);
      }else{
        this.storage[this.bookName] = {};
        this.setCurrentPage(this.getProgress());
      }
    },
    init: function(){
      this.currentPage = 1;
      if(localStorage.getItem('books')){
        this.storage = JSON.parse(localStorage.getItem('books'));
      }else{
        this.storage = {};
      }

      this.findElements();
      this.attachEvents();
    }
  }
}