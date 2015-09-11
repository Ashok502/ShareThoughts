// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require fancybox
//= require jquery_ujs
//= require twitter/bootstrap
//= require private_pub
//= require jquery-fileupload
//= require jquery.remotipart
//= require jquery.jcrop
//= require papercrop
//= require_tree .

$(function () {
    $('.pagination a').click(function () {
        $.get(this.href, null, null, 'script');
        return false;
    });
});

$(document).ready(function () {
    $('#selecctall').click(function (event) {  //on click
        if (this.checked) { // check select status
            $('.check_all').each(function () { //loop through each checkbox
                this.checked = true;  //select all checkboxes with class "checkbox1"
            });
        } else {
            $('.check_all').each(function () { //loop through each checkbox
                this.checked = false; //deselect all checkboxes with class "checkbox1"
            });
        }
    });
});
