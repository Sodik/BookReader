'use strict';
;(function(){
  var App = {
    findElements: function(){
      this.content = document.getElementById('content').children[0];
      this.fileInput = document.getElementById('file');
      this.fakeContent = document.getElementById('fake');
      this.prevBtn = document.getElementById('prev');
      this.nextBtn = document.getElementById('next');
      this.pageInput = document.getElementById('set-page');
      this.pagination = document.getElementById('pagination');
      this.reader = new FileReader();
      this.textRegex = /(<([^>]+)>)/ig;
    },
    setSettings: function(){
      this.currentPageNum = 0;
      this.charSize = {
        height: this.fakeContent.offsetHeight,
        width: this.fakeContent.offsetWidth
      };
    },
    attachEvents: function(){
      var self = this;

      this.fileInput.addEventListener('change', function(){
        if(this.files && this.files[0]){
          self.reader.readAsText(this.files[0], 'utf-8');
        }
      }, false);

      this.reader.addEventListener('load', function(e){
        this.originalText = e.target.result.replace(this.textRegex, '')/*.replace(/\s{2,}/g, ' ')*/.split(' ');
        this.copiedText = this.originalText.slice(0);
        this.calculatePageSize();
      }.bind(this), false);

      this.reader.addEventListener('error', function(){
        alert('Failed to open Book');
      }, false);

      this.prevBtn.addEventListener('click', function(e){
        if(this.currentPageNum > 0){
          this.currentPageNum--;
          this.switchPage();
        }
      }.bind(this), false);

      this.nextBtn.addEventListener('click', function(e){
        if(this.pagesSize && this.currentPageNum < this.pagesSize - 1){
          this.currentPageNum++;
          this.switchPage();
        }
      }.bind(this), false);

      this.pageInput.addEventListener('keyup', function(e){
        if(e.keyCode === 13){
          console.log(Math.min(Math.min(this.value.replace(/[^\d,]/g, '') - 1, 0), self.pagesSize - 1))
          return;
          self.currentPageNum = Math.min(Math.min(this.value.replace(/[^\d,]/g, '') - 1, 0), self.pagesSize - 1);
          self.switchPage();
        }
      }, false);

      window.addEventListener('resize', function(){
        if(this.originalText){
          this.copiedText = this.originalText.slice(0);
          this.calculatePageSize();
        }
      }.bind(this), false);
    },
    calculatePageSize: function(){
      this.contentHeight = this.content.offsetHeight;
      this.contentWidth = this.content.offsetWidth;
      this.rowsSize = Math.floor(this.contentHeight/this.charSize.height);
      this.colsSize = Math.floor(this.contentWidth/this.charSize.width);

      this.formatingText();
    },
    updatePagination: function(){
      this.pagination.innerHTML = (this.currentPageNum + 1) + '/' + this.pagesSize;
    },
    switchPage: function(){
      this.content.innerHTML = this.formatedText[this.currentPageNum].join('');
      this.getLastPosition();
      this.updatePagination();
    },
    formatingText: function(){
      this.formatedText = [[]];
      var arrIndex = 0;
      var counter = 0;
      var rowCount = 1;
      var arr = this.formatedText[arrIndex];
      while(this.copiedText.length){
        var word = this.copiedText.splice(0, 1)[0] + ' ';
        counter += word.length;
        //console.log(counter, colsSize, word, word.length)
        if(counter - 1 > this.colsSize){
          counter = word.length;
          rowCount++;
          //console.log(counter, rowCount, 'Column', word)
          if(rowCount > this.rowsSize){
            rowCount = 1;
            //console.log( counter, '----Row----')
            this.formatedText.push([]);
            arrIndex++;
            arr = this.formatedText[arrIndex];
          }
        }
        arr.push(word + ' ');
      }
      this.pagesSize = this.formatedText.length;
      this.switchPage();
    },
    getLastPosition: function(){
      console.log(this.formatedText[this.currentPageNum])
      console.log(this.formatedText.indexOf(this.formatedText[this.currentPageNum][0]))
    },
    init: function(){
      this.findElements();
      this.setSettings();
      this.attachEvents();
    }
  }

  App.init();
})();