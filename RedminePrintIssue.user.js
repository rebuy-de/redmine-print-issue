// ==UserScript==
// @name         Redmine Story printing
// @namespace    http://www.rebuy.de
// @version      0.1
// @description  Removes all unnecessary elements to print the redmine issue as a scrum story
// @author       Ota Mares <o.mares@rebuy.de>
// @match        http://*/issues/*
// @grant        none
// ==/UserScript==

(function ($) {

    var print = function() {
        window.print();
    };

    var addPrintRules = function() {
        $('body').append("<style type='text/css'>@media only print {  #top-menu, #header, #footer, #sidebar, hr, .author, .attributes, #issue_tree, #relations, #history, .contextual, .other-formats {display: none;} div.issue {background: none; border:none; } }</style>");
    };

    $().ready(function() {
        addPrintRules();

        var printLink = $('<a href="#" class="icon icon-copy">Print as Story</a>').on('click', print);
        $('#content .contextual').append(printLink);
    });
})(jQuery);

