$(function() {

  //Init side nav
  $(".button-collapse").sideNav({
    closeOnClick: true
  });

  //Testimonial read more button. Shows more content when clicked.
  $('#testimonials .expansion-container').addClass('hide');
  $('#testimonials .read-more').click(function(){
    $('#testimonials .expansion-container').removeClass('hide');
    $('#testimonials .expansion-container').addClass('show');
    $(this).hide();
  });

 //Slider
  $('.slider').slider({'height': 'auto', 'indicators': false, 'interval': 50000});
  $('.slider').slider('pause');

  //adds previous and next functionality to slider buttons
  $('.prev').click(function(){
    $('.slider').slider('prev');
  });
  $('.next').click(function(){
    $('.slider').slider('next');
  });

  // Modal
  var questionArr,
    resultsTemplate = "",
    count = 0;

    //hide results page try again button-collapse
    $('#results-try-again, .results-row, #results-btn-row').hide();
   $('.modal-trigger').leanModal({
     ready: function() {
       $('#program-modal .container').addClass('hide');
       $('.program-question-container').removeClass('hide').addClass('show');
     }
   });

   $('#program-modal .container').addClass('hide');
   $('.program-question-container').removeClass('hide').addClass('show');

   $('#find-program-btn, #fail-try-again').click(function(){
     $('#program-modal .container').addClass('hide');
     resultsTemplate = "";
     // Do the stuff with the questions to get the answer

     //Question 1 (MA Theology)
     if ($('#question-1').prop('checked') === true) {
       resultsTemplate = '<h5 class="program-name">MA Theology</h5>';
       count++;
     }

     //Question 2 (MA Catechetics & Evangelization)
     if ($('#question-2').prop('checked') === true) {
       if(resultsTemplate === "") {
         resultsTemplate = '<h5 class="program-name">MA Catechetics & Evangelization</h5>';
         count++;
       } else {
         resultsTemplate = resultsTemplate + '<h5 class="program-name">or MA Catechetics & Evangelization</h5>';
         count++;
       }
     }

     //Question 3 (MA Theology: Catechetics Specialization)
     if ($('#question-3').prop('checked') === true) {
       if(resultsTemplate === "") {
         resultsTemplate = '<h5 class="program-name">MA Theology: Catechetics Specialization</h5>';
         count++;
       } else {
         resultsTemplate = resultsTemplate + '<h5 class="program-name">or MA Theology: Catechetics Specialization</h5>';
         count++;
       }
     }

     //Question 4 (MA Theology: Canon Law First Cycle)
     if ($('#question-4').prop('checked') === true) {
       if(resultsTemplate === "") {
         resultsTemplate = '<h5 class="program-name">MA Theology: Canon Law First Cycle</h5>';
         count++;
       } else {
         resultsTemplate = resultsTemplate + '<h5 class="program-name">or MA Theology: Canon Law First Cycle</h5>';
         count++;
       }
     }

     //Question 5 (MA Theology: Research Intensive Track)
     if ($('#question-5').prop('checked') === true) {
       if(resultsTemplate === "") {
         resultsTemplate = '<h5 class="program-name">MA Theology: Research Intensive Track</h5>';

       } else if(count === 4){
         // If all questions were checked
         resultsTemplate = '<h5 class="program-name">any of our programs!</h5>';

       } else {
         resultsTemplate = resultsTemplate + '<h5 class="program-name">or MA Theology: Research Intensive Track</h5>';
       }
     }

     //
     // End Questions Code
     //
     console.log(count);
     if  (count > 0) {
       //Render results
       $('.results-row, #results-btn-row').show();
       $('.results-container h4').text("You're a great fit for...");
       $('#results-here').html(resultsTemplate);
       $('#results-try-again').show();
     }
     //Render results
     $('#results-here').html(resultsTemplate);


     $('.program-question-container').removeClass('show').addClass('hide');
     $('.results-container').removeClass('hide').addClass('show');

   });


   // Submit btn on results/more info modal view
   $('#submit-info').click(function(){
     //Get data from form and send it to google sheet

     if ($('#name').val() !== "") {
     //On success
     $('.results-container').removeClass('show').addClass('hide');
     $('.success-container').removeClass('hide').addClass('show');
     } else {
       //On failure
       // maybe try again?
       $('.results-container').removeClass('show').addClass('hide');
       $('.failure-container').removeClass('hide').addClass('show');
      }

      // Send to Google Sheet

      // Variable to hold request
      var request, checkLength;

      // Bind to the submit event of our form
      $("#modal-request-info-form #submit-info").click(function(event){

          //Hidden checkbox to help prevent spam submissions
          checkLength = $('#checkbox-2:checked').length > 0;

          if (checkLength === true) {


          // Abort any pending request
          if (request) {
              request.abort();
          }
          // setup some local variables
          var $form = $('#modal-request-info-form'); //Put the id of the div form container here

          // Let's select and cache all the fields
          var $inputs = $form.find("input, select, button, textarea"),
              $name, $val, i, $thisCheckbox,
              $formElements = $($form).find("input, select, button, textarea").not('input[type=checkbox]'),
              $formCheckboxes = $($form).find('input[type=checkbox]');


          // Serialize the data in the form
          var serializedFormElements = '';
          var serializedCheckboxData = '';
          var serializedData = '';

          // Serialize checkbox data
          // loop through checkboxes
          for (i = 0; i < $formCheckboxes.length; i++) {
            $thisCheckbox = $formCheckboxes[i]; //cache the current checkbox
            $name = $($thisCheckbox).attr('name'); // get checkbox name
            // Assign checkbox values of yes or '' based on the checked property
            if ($($thisCheckbox).prop('checked') === true) {
              $($thisCheckbox).val('yes');
            }
            $val = $($thisCheckbox).val(); //get checkbox val
            serializedCheckboxData = serializedCheckboxData + $name + '=' + $val + '&';     // Serialize
          }

          // Serialize other form data
            for (i = 0; i < $formElements.length; i++) {
              $name = $($formElements[i]).attr('name');
              $val = $($formElements[i]).val();
              serializedFormElements = serializedFormElements + $name + '=' + $val + '&';
            }

          serializedData = serializedFormElements + serializedCheckboxData;  //Concat all form input serialized data

          // Let's disable the inputs for the duration of the Ajax request.
          // Note: we disable elements AFTER the form data has been serialized.
          // Disabled form elements will not be serialized.
          $inputs.prop("disabled", true);

          // Fire off the request to /form.php
          request = $.ajax({
              url: "https://script.google.com/macros/s/AKfycbwLJ4JBN2bJzJHluORmmzDV0DSc71vexNuQA8xtUkoG-ccjWi8a/exec",
              type: "post",
              data: serializedData
          });

          // Callback handler that will be called on success
          request.done(function (response, textStatus, jqXHR){
              // Log a message to the console
              console.log("Hooray, it worked!");
              console.log(response);
              console.log(textStatus);
              console.log(jqXHR);
              $("#modal-request-info-form input, #modal-request-info-form textarea").val("");
              $("#modal-request-info-form input:checkbox").prop('checked', "");
              $('#successModal').modal();

          });

          // Callback handler that will be called on failure
          request.fail(function (jqXHR, textStatus, errorThrown){
              // Log the error to the console
              console.error(
                  "The following error occurred: "+
                  textStatus, errorThrown
              );

              // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
              if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0){
                $('#successModal').modal();
              } else {
                $('#failModal').modal();
              }
          });

          // Callback handler that will be called regardless
          // if the request failed or succeeded
          request.always(function () {
              // Reenable the inputs
              $inputs.prop("disabled", false);
          });

          // Prevent default posting of form
          event.preventDefault();

        } else {
          $('#pgb-container label').css('color', 'red');
        }
      });
      //End Send to Google Sheet

   });

   $('#results-try-again').click(function(){
     count = 0;
     $('#results-try-again, .results-row, #results-btn-row').hide();
     $('.program-question-container').removeClass('hide').addClass('show');
     $(this).parents('.container').removeClass('show').addClass('hide');
     $('#program-modal input[type="checkbox"]').prop('checked', false);
   });


   //Contact Buttons
   $('.contact-modal-btn').click(function(){
     $('#program-modal').openModal();
     $('#program-modal .container').addClass('hide');
     $('.results-container').removeClass('hide').addClass('show');

   });


  //Smooth in page navigation
  function scrollToAnchor(name){
      var aTag = $("div[name='"+ name +"']");
      $('html,body').animate({scrollTop: aTag.offset().top}, 'slow');
  }

  $(".slow-nav").click(function() {
    event.preventDefault();
    var name = $(this).attr('href');
    scrollToAnchor(name);
  });


  //Headroom.js init
  // grab an element
  var myElement = document.querySelector("nav");
  // construct an instance of Headroom, passing the element
  var headroom  = new Headroom(myElement);
  // initialise
  headroom.init();

  // Add current year in footer
  copyrightDate = new Date().getFullYear();

});

/*!
 * headroom.js v0.9.3 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2016 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  }
  else if (typeof exports === 'object') {
    // COMMONJS
    module.exports = factory();
  }
  else {
    // BROWSER
    root.Headroom = factory();
  }
}(this, function() {
  'use strict';

  /* exported features */

  var features = {
    bind : !!(function(){}.bind),
    classList : 'classList' in document.documentElement,
    rAF : !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
  };
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

  /**
   * Handles debouncing of events via requestAnimationFrame
   * @see http://www.html5rocks.com/en/tutorials/speed/animations/
   * @param {Function} callback The callback to handle whichever event
   */
  function Debouncer (callback) {
    this.callback = callback;
    this.ticking = false;
  }
  Debouncer.prototype = {
    constructor : Debouncer,

    /**
     * dispatches the event to the supplied callback
     * @private
     */
    update : function() {
      this.callback && this.callback();
      this.ticking = false;
    },

    /**
     * ensures events don't get stacked
     * @private
     */
    requestTick : function() {
      if(!this.ticking) {
        requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
        this.ticking = true;
      }
    },

    /**
     * Attach this as the event listeners
     */
    handleEvent : function() {
      this.requestTick();
    }
  };
  /**
   * Check if object is part of the DOM
   * @constructor
   * @param {Object} obj element to check
   */
  function isDOMElement(obj) {
    return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
  }

  /**
   * Helper function for extending objects
   */
  function extend (object /*, objectN ... */) {
    if(arguments.length <= 0) {
      throw new Error('Missing arguments in extend function');
    }

    var result = object || {},
        key,
        i;

    for (i = 1; i < arguments.length; i++) {
      var replacement = arguments[i] || {};

      for (key in replacement) {
        // Recurse into object except if the object is a DOM element
        if(typeof result[key] === 'object' && ! isDOMElement(result[key])) {
          result[key] = extend(result[key], replacement[key]);
        }
        else {
          result[key] = result[key] || replacement[key];
        }
      }
    }

    return result;
  }

  /**
   * Helper function for normalizing tolerance option to object format
   */
  function normalizeTolerance (t) {
    return t === Object(t) ? t : { down : t, up : t };
  }

  /**
   * UI enhancement for fixed headers.
   * Hides header when scrolling down
   * Shows header when scrolling up
   * @constructor
   * @param {DOMElement} elem the header element
   * @param {Object} options options for the widget
   */
  function Headroom (elem, options) {
    options = extend(options, Headroom.options);

    this.lastKnownScrollY = 0;
    this.elem             = elem;
    this.tolerance        = normalizeTolerance(options.tolerance);
    this.classes          = options.classes;
    this.offset           = options.offset;
    this.scroller         = options.scroller;
    this.initialised      = false;
    this.onPin            = options.onPin;
    this.onUnpin          = options.onUnpin;
    this.onTop            = options.onTop;
    this.onNotTop         = options.onNotTop;
    this.onBottom         = options.onBottom;
    this.onNotBottom      = options.onNotBottom;
  }
  Headroom.prototype = {
    constructor : Headroom,

    /**
     * Initialises the widget
     */
    init : function() {
      if(!Headroom.cutsTheMustard) {
        return;
      }

      this.debouncer = new Debouncer(this.update.bind(this));
      this.elem.classList.add(this.classes.initial);

      // defer event registration to handle browser
      // potentially restoring previous scroll position
      setTimeout(this.attachEvent.bind(this), 100);

      return this;
    },

    /**
     * Unattaches events and removes any classes that were added
     */
    destroy : function() {
      var classes = this.classes;

      this.initialised = false;
      this.elem.classList.remove(classes.unpinned, classes.pinned, classes.top, classes.notTop, classes.initial);
      this.scroller.removeEventListener('scroll', this.debouncer, false);
    },

    /**
     * Attaches the scroll event
     * @private
     */
    attachEvent : function() {
      if(!this.initialised){
        this.lastKnownScrollY = this.getScrollY();
        this.initialised = true;
        this.scroller.addEventListener('scroll', this.debouncer, false);

        this.debouncer.handleEvent();
      }
    },

    /**
     * Unpins the header if it's currently pinned
     */
    unpin : function() {
      var classList = this.elem.classList,
        classes = this.classes;

      if(classList.contains(classes.pinned) || !classList.contains(classes.unpinned)) {
        classList.add(classes.unpinned);
        classList.remove(classes.pinned);
        this.onUnpin && this.onUnpin.call(this);
      }
    },

    /**
     * Pins the header if it's currently unpinned
     */
    pin : function() {
      var classList = this.elem.classList,
        classes = this.classes;

      if(classList.contains(classes.unpinned)) {
        classList.remove(classes.unpinned);
        classList.add(classes.pinned);
        this.onPin && this.onPin.call(this);
      }
    },

    /**
     * Handles the top states
     */
    top : function() {
      var classList = this.elem.classList,
        classes = this.classes;

      if(!classList.contains(classes.top)) {
        classList.add(classes.top);
        classList.remove(classes.notTop);
        this.onTop && this.onTop.call(this);
      }
    },

    /**
     * Handles the not top state
     */
    notTop : function() {
      var classList = this.elem.classList,
        classes = this.classes;

      if(!classList.contains(classes.notTop)) {
        classList.add(classes.notTop);
        classList.remove(classes.top);
        this.onNotTop && this.onNotTop.call(this);
      }
    },

    bottom : function() {
      var classList = this.elem.classList,
        classes = this.classes;

      if(!classList.contains(classes.bottom)) {
        classList.add(classes.bottom);
        classList.remove(classes.notBottom);
        this.onBottom && this.onBottom.call(this);
      }
    },

    /**
     * Handles the not top state
     */
    notBottom : function() {
      var classList = this.elem.classList,
        classes = this.classes;

      if(!classList.contains(classes.notBottom)) {
        classList.add(classes.notBottom);
        classList.remove(classes.bottom);
        this.onNotBottom && this.onNotBottom.call(this);
      }
    },

    /**
     * Gets the Y scroll position
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
     * @return {Number} pixels the page has scrolled along the Y-axis
     */
    getScrollY : function() {
      return (this.scroller.pageYOffset !== undefined)
        ? this.scroller.pageYOffset
        : (this.scroller.scrollTop !== undefined)
          ? this.scroller.scrollTop
          : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    },

    /**
     * Gets the height of the viewport
     * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
     * @return {int} the height of the viewport in pixels
     */
    getViewportHeight : function () {
      return window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    },

    /**
     * Gets the physical height of the DOM element
     * @param  {Object}  elm the element to calculate the physical height of which
     * @return {int}     the physical height of the element in pixels
     */
    getElementPhysicalHeight : function (elm) {
      return Math.max(
        elm.offsetHeight,
        elm.clientHeight
      );
    },

    /**
     * Gets the physical height of the scroller element
     * @return {int} the physical height of the scroller element in pixels
     */
    getScrollerPhysicalHeight : function () {
      return (this.scroller === window || this.scroller === document.body)
        ? this.getViewportHeight()
        : this.getElementPhysicalHeight(this.scroller);
    },

    /**
     * Gets the height of the document
     * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
     * @return {int} the height of the document in pixels
     */
    getDocumentHeight : function () {
      var body = document.body,
        documentElement = document.documentElement;

      return Math.max(
        body.scrollHeight, documentElement.scrollHeight,
        body.offsetHeight, documentElement.offsetHeight,
        body.clientHeight, documentElement.clientHeight
      );
    },

    /**
     * Gets the height of the DOM element
     * @param  {Object}  elm the element to calculate the height of which
     * @return {int}     the height of the element in pixels
     */
    getElementHeight : function (elm) {
      return Math.max(
        elm.scrollHeight,
        elm.offsetHeight,
        elm.clientHeight
      );
    },

    /**
     * Gets the height of the scroller element
     * @return {int} the height of the scroller element in pixels
     */
    getScrollerHeight : function () {
      return (this.scroller === window || this.scroller === document.body)
        ? this.getDocumentHeight()
        : this.getElementHeight(this.scroller);
    },

    /**
     * determines if the scroll position is outside of document boundaries
     * @param  {int}  currentScrollY the current y scroll position
     * @return {bool} true if out of bounds, false otherwise
     */
    isOutOfBounds : function (currentScrollY) {
      var pastTop  = currentScrollY < 0,
        pastBottom = currentScrollY + this.getScrollerPhysicalHeight() > this.getScrollerHeight();

      return pastTop || pastBottom;
    },

    /**
     * determines if the tolerance has been exceeded
     * @param  {int} currentScrollY the current scroll y position
     * @return {bool} true if tolerance exceeded, false otherwise
     */
    toleranceExceeded : function (currentScrollY, direction) {
      return Math.abs(currentScrollY-this.lastKnownScrollY) >= this.tolerance[direction];
    },

    /**
     * determine if it is appropriate to unpin
     * @param  {int} currentScrollY the current y scroll position
     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
     * @return {bool} true if should unpin, false otherwise
     */
    shouldUnpin : function (currentScrollY, toleranceExceeded) {
      var scrollingDown = currentScrollY > this.lastKnownScrollY,
        pastOffset = currentScrollY >= this.offset;

      return scrollingDown && pastOffset && toleranceExceeded;
    },

    /**
     * determine if it is appropriate to pin
     * @param  {int} currentScrollY the current y scroll position
     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
     * @return {bool} true if should pin, false otherwise
     */
    shouldPin : function (currentScrollY, toleranceExceeded) {
      var scrollingUp  = currentScrollY < this.lastKnownScrollY,
        pastOffset = currentScrollY <= this.offset;

      return (scrollingUp && toleranceExceeded) || pastOffset;
    },

    /**
     * Handles updating the state of the widget
     */
    update : function() {
      var currentScrollY  = this.getScrollY(),
        scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up',
        toleranceExceeded = this.toleranceExceeded(currentScrollY, scrollDirection);

      if(this.isOutOfBounds(currentScrollY)) { // Ignore bouncy scrolling in OSX
        return;
      }

      if (currentScrollY <= this.offset ) {
        this.top();
      } else {
        this.notTop();
      }

      if(currentScrollY + this.getViewportHeight() >= this.getScrollerHeight()) {
        this.bottom();
      }
      else {
        this.notBottom();
      }

      if(this.shouldUnpin(currentScrollY, toleranceExceeded)) {
        this.unpin();
      }
      else if(this.shouldPin(currentScrollY, toleranceExceeded)) {
        this.pin();
      }

      this.lastKnownScrollY = currentScrollY;
    }
  };
  /**
   * Default options
   * @type {Object}
   */
  Headroom.options = {
    tolerance : {
      up : 0,
      down : 0
    },
    offset : 0,
    scroller: window,
    classes : {
      pinned : 'headroom--pinned',
      unpinned : 'headroom--unpinned',
      top : 'headroom--top',
      notTop : 'headroom--not-top',
      bottom : 'headroom--bottom',
      notBottom : 'headroom--not-bottom',
      initial : 'headroom'
    }
  };
  Headroom.cutsTheMustard = typeof features !== 'undefined' && features.rAF && features.bind && features.classList;

  return Headroom;
}));
