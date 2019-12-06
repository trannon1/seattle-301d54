'use strict';

// constructor
const allHorns = [];

function Horns(horn){
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;

  allHorns.push(this);
}
const uniqueKeywords = [];

// render prototype
Horns.prototype.render = function(){
  const myTemplate = $('#photo-template').html();
  const $newSection = $('<section></section>');
  $newSection.html(myTemplate);
  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.description);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('class', this.keyword);
  $('main').append($newSection);
};


// $.get to get the things from the .json
$.get('page-1.json', horns => {
  horns.forEach(horn => {
    new Horns(horn).render();
  })

  
    allHorns.forEach(hornedBeast => {
      if(!uniqueKeywords.includes(hornedBeast.keyword)){
        uniqueKeywords.push(hornedBeast.keyword);
      }
    })
  
    uniqueKeywords.forEach(keyword => {
      const $newSection = $(`<option value='${keyword}'>${keyword}</option>`);

      $('select').append($newSection);
    })

    $('select').on('change', function(){
      event.preventDefault()
      // find the thing that was clicked on
      let currentSelection = $(this).val();

      // hide everything
      $('h2').hide();
      $('img').hide();
      $('p').hide();

      // show the thing that was clicked on
      $(`.${currentSelection}`).show();

    })
})


// turn off everything except for the thing that was  clicked on




