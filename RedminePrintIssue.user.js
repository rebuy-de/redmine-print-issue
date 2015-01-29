// ==UserScript==
// @name         Redmine Story printing on A5 story cards
// @namespace    http://www.rebuy.de
// @version      0.2
// @description  Removes all unnecessary elements to print the redmine issue as a scrum story
// @author       Ota Mareš <ota.mares@rebuy.de>, Moritz Schmidt <mo.schmidt@rebuy.de
// @match        http://*/issues/*
// @grant        none
// ==/UserScript==

(function ($) {

    var $body,
        adjustBodySize = function () {
            var headerHeight = $('header').height();
            if (($body.height() / pxPerCm) > 15) {
                $('section').height(pxPerCm * 13 - headerHeight);
            }
        },
        print = function(event) {

            var
                $content = $('#content'),
                ticketHeadline = $content.children('h2').text(),
                ticketNumber = '#' + ticketHeadline.split('#')[1].trim(),
                ticketType = ticketHeadline.split('#')[0].trim(),
                subject = $content.find('.subject h3').text(),
                description = $content.find('.description .wiki').html();

            event.preventDefault();

            $('head link[rel=stylesheet]').remove();
            $body.html(
                '<style>' +
                'body { font-size: 1.2em; max-width: 21cm; }' +
                '@page {margin: 0;}' +
                'header {border-bottom: 1px solid black; }' +
                'section {overflow: hidden; }' +
                'h1 {margin-bottom: 0; margin-top: 0;}' +
                '.ticket-number { margin-right: 1em;}' +
                '.ticket-type { margin-bottom: 0;}' +
                '</style>' +
                '<header>' +
                '<h3 class="ticket-type">'+ ticketType + '</h3>' +
                '<table><tr><td><h1 class="ticket-number">' + ticketNumber + '</h1></td><td>' +
                '<h1 class="subject">' + subject + '</h1></td>' +
                '</tr></table></header>' +
                '<section>' +
                description +
                '</section>'
            );

            $body.find('.wiki-anchor').remove();

            adjustBodySize();


            window.print();
        };

    var pxPerCm;

    $(function () {
        var $foo;

        $body = $('body');

        $body.append('<div id="foo" style="height: 1cm; width: 1cm;"></div>');

        $foo = $('#foo');
        pxPerCm = $foo.height();
        $foo.remove();
    });

    $(function() {

        var printLink = $('<a href="#" class="icon icon-copy">Print as Story</a>').on('click', print);
        $('#content').children('.contextual:first-child').append(printLink);
    });
})(jQuery);
