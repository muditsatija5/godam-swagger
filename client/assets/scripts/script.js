/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(function() {
  $('.more_icon_ellipsis').click(function() {
    if (!$(this).hasClass('disabled')) {
    $(this).toggleClass('active');
  }
  return false;
  });

  var mousedownHappened = false;

  $('.more_icon_ellipsis').blur(function() {
    if (mousedownHappened) // cancel the blur event
    {
      $(this).focus();
      mousedownHappened = false;
    } else // blur event is okay
    {
      $(this).removeClass('active');
    }
  });

  $('.more_icon_ellipsis a.menu').mousedown(function() {
    mousedownHappened = true;
  });

  $(function () {

      jQuery('.left-menu-toggle').click(function () {
          toggle_click();
      });

      jQuery(".grey_background").click(function () {
          toggle_click();
      });



  });

});

function toggle_click() {
    $('.main').toggleClass('full', 1000);
    $('#sidebar-wrapper').toggleClass('collapsed', 1000);
    $('.grey_background').toggleClass('visible', 1000);
}
