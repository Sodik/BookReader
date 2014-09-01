'use strict';

var content = document.querySelector('#content').querySelector('div');
//var async = require('async');
var file = document.getElementById('file');
var fs = require('fs');
var path = require('path');
var module_path = path.join(path.dirname(process.execPath), 'node_modules', 'async');
var async = require(module_path);
var reader = new FileReader();
var regex = /(<([^>]+)>)/ig;
var currentPageNum = 0;
var currentPage;
var pages;
var text;
var pagination = document.querySelector('#pagination');
var fake = document.querySelector('#fake');
var charHeight = fake.offsetHeight;
var charWidth = fake.offsetWidth;
var charsSize;
var colsSize;
var rowsSize;
var formatedText = '';

file.addEventListener('change', function(){
  if(this.files && this.files[0]){
    reader.readAsText(this.files[0], 'utf-8');
  }
}, false);

reader.onload = function(e){
  text = e.target.result.replace(regex, '').replace(/\s{2,}/g, ' ').split(' ');
  calculatePageSize(text);
}

reader.onerror = function(){
  console.log('Error');
}

document.querySelector('footer').addEventListener('click', function(e){
  var target = e.target;
  if(target.id && target.id === 'prev'){
    if(currentPageNum > 0){
      currentPageNum--;
      switchPage();
    }
  }
  if(target.id && target.id === 'next'){
    console.log(pages, currentPageNum)
    if(currentPageNum < pages){
      currentPageNum++;
      switchPage();
    }
  }
}, false);

function calculatePageSize(text){
  var page = document.createElement('div');
  var contentHeight = content.offsetHeight;
  var contentWidth = content.offsetWidth;
  rowsSize = Math.floor(contentHeight/charHeight);
  colsSize = Math.floor(contentWidth/charWidth);
  charsSize = rowsSize*colsSize;
  console.log(contentHeight, contentWidth, rowsSize, colsSize, charsSize)
  formatingText(text);
  switchPage();
  /*content.innerHTML = '';
  content.appendChild(page);
  async.each(items, function(page){
    page.appendChild(items[i]);
    if(page.offsetHeight > document.documentElement.clientHeight){
      var lastItem = page.lastChild;
      page.removeChild(page.lastChild);
      page = document.createElement('div');
      field.appendChild(page);
      page.appendChild(lastItem);
    }
  });
  for(var i = 0; i < words.length - 1; i++){
    page.appendChild(items[i]);
    if(page.offsetHeight > content.offsetHeight){
      var lastItem = page.lastChild;
      page.removeChild(page.lastChild);
      page = document.createElement('div');
      content.appendChild(page);
      page.appendChild(lastItem);
    }
  }*/

  /*pages = content.children;
  Array.prototype.slice.call(pages, 0).forEach(function(page){
    page.style.display = 'none';
  });
  currentPage = pages[currentPageNum];
  currentPage.style.display = 'block';
  updatePagination(pages.length - 1);*/
}

function updatePagination(){
  pagination.innerHTML = (currentPageNum + 1) + '/' + pages;
}

function switchPage(){
  content.innerHTML = formatedText[currentPageNum].join('');
  updatePagination();
}

function formatingText(text){
  formatedText = [[]];
  var arrIndex = 0;
  var counter = 0;
  var rowCount = 0;
  var arr = formatedText[arrIndex];
  var flag = false;
  formatedText.push(arr);
  while(text.length){
    var word = text.splice(0, 1)[0] + ' ';
    if(flag){
      counter = 0;
      flag = false;
    }
    counter += word.length;
    if(counter >= colsSize){
      flag = true;
      rowCount++;
      if(rowCount >= rowsSize){
        rowCount = 0;
        formatedText.push([]);
        arrIndex++;
        arr = formatedText[arrIndex];
      }
    }
    arr.push(word);
  }
  console.log(formatedText)
  pages = formatedText.length - 1;
}