/*
 * customRadioCheck: jQuery plguin for checkbox and radio replacement
 * Usage: $('input[type=checkbox], input[type=radio]').customRadioCheck();
 * Author: Cedric Ruiz
 * Modifier: Alexander Kravchenko <modder.modding@gmail.com>
 * License: MIT
*/
;(function($){
$.fn.customRadioCheck = function() {

  return this.each(function() {

    var $this = $(this);
    var $span = $('<span/>');
    var type = $this.is(':checkbox') ? 'check' : ($this.is(':radio') ? 'radio' : '');
    if ( ! type) return;

    $span.addClass('custom-'+ type);
    $this.is(':checked') && $span.addClass('checked'); // init
    $span.insertAfter($this);

    $this.parent('label').addClass('custom-label')
      .attr('onclick', ''); // Fix clicking label in iOS
    // hide by shifting left
    $this.css({ position: 'absolute', left: '-9999px' });

    // Events
    $this.on({
      change: function() {
        if (type === 'radio') {
          var $elem = $this.closest('form');
          if ($elem.length) {
            $elem = $elem.find('input[name="' + $this.attr('name') + '"]:radio');
          } else {
            $elem = $('input[name="' + $this.attr('name') + '"]:radio').filter(function() {
                return ! $(this).closest('form').length;
            });
          }
          $elem.next(".custom-radio").removeClass('checked');
        }
        
        if ($(this).attr('checked')) {
            $(this).removeAttr('checked');
        } else {
            $(this).attr('checked', true);
        }
        $span.toggleClass('checked', $this.is(':checked'));
      },
      focus: function() { $span.addClass('focus'); },
      blur: function() { $span.removeClass('focus'); }
    });
  });
};
}(jQuery));


