$(function () {
  console.log('blah');
  var $phone = $('.device');
  $('#rotate').click(function () {
    $phone.toggleClass('landscape');
  });


});