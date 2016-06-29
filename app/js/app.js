$(function() {


  //Fix for background image resize on mobile
  // var bg = $('#home::before');
  // $(window).resize(resizeBackground());
  // function resizeBackground() {
  //   bg.height($(window).height() + 60);
  //   console.log('resize');
  //
  // }

//  resizeBackground();

//Fix for modal issues in ios

//If not ios, then remove contact form section
if( navigator.userAgent.match(/iPhone|iPad|iPod/i) === null ) {
  $('#contact').remove();
}

// iOS check...ugly but necessary
if( navigator.userAgent.match(/iPhone|iPad|iPod/i) ) {
  console.log(navigator.userAgent);

  //Remove contact form from modal
  // $('#program-modal #modal-request-info-form').parent().parent().remove();
  // $('#contact-header').parent().remove();
  $('#results-container').remove();

  //Make contact buttons go to new contact section
  $('.contact-modal-btn').attr('href', '#contact').addClass('slow-nav').removeClass('contact-modal-btn');

  //Add class to question modal and footer
  $('#program-modal, footer').addClass('is-ios');
  $('.is-ios #find-program-btn').click(function(){
    scrollToAnchor('#contact');
    $('#program-modal').closeModal();
  });

  //Open modal on submit
  $('#contact #submit-info').click(function(){
    $('#program-modal .container').removeClass('show').addClass('hide');
    $('#program-modal').openModal();
  });

}



// Pop up banner for quiz
var $programSection =  $('#pick-your-program'),
  programPos = $($programSection).offset().top,
  programHeight = $($programSection).height(),
  $bannerSection =  $('#program-banner'),
    bannerPos = $($bannerSection).offset().top,
    scrollPos;

$(window).scroll(function(){
  scrollPos = $('body').scrollTop();

  // TODO: find a way to make this transition smooth like on the devtips videos
  if (scrollPos > programPos - (programHeight/2)) {

    $('#pop-up-banner').css('transform', 'translateY(1%)');
  }

  if (scrollPos > bannerPos - (programHeight/2) || scrollPos < programPos - (programHeight/2)) {
    $('#pop-up-banner').css('transform', 'translateY(100%)');
  }

//console.log($('body').scrollTop());

});

$('#pop-up-banner').click(function(){
  $('#program-modal').openModal();
  $('#program-modal .container').addClass('hide');
  $('.program-question-container').removeClass('hide').addClass('show');
});

var $quoteSection =  $('#quote-banner'),
  quotePos = $($quoteSection).offset().top;

$(window).scroll(function(){
  if (scrollPos > quotePos - 76) {
    $('nav').css('background-color', 'rgba(0, 0, 0, 0.36)');
  }

  if (scrollPos < quotePos - 76) {
    $('nav').css('background-color', 'transparent');
  }
});

  // TODO: add a pause button
  //Background hero video controls
  var $vid = $('#bgvid'),
      $replay = $('#replay'),
      $pause = $('#pause');

  $pause.hide();

  $vid.on('playing',function(){
      $replay.hide();
      $pause.show();

    });

  $vid.on('ended',function(){
      $vid[0].currentTime = '0';
      $pause.hide();
      $replay.show();
    });

    $replay.click(function(){
      $vid[0].play();
      $pause.hide();
      $replay.show();
    });

    $pause.click(function(){
      $vid[0].pause();
      $pause.hide();
      $replay.show();
    });




  // Colors
  $('#green-theme').click(function(){
    $('nav, footer, #why-franciscan, #program-banner, .read-more').css('background-color', '#21412a');
    $('#color-modal').closeModal();
  });

  $('#red-theme').click(function(){
    $('nav, footer, #why-franciscan, #program-banner, .read-more').css('background-color', '#510d0a');
    $('#color-modal').closeModal();
  });

  $('#red-green-theme').click(function(){
    $('nav, footer').css('background-color', '#21412a');
    $('#why-franciscan, #program-banner, .read-more').css('background-color', '#510d0a');
    $('#color-modal').closeModal();

  });

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

  // Question Modal
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
       count++;
     }

     //
     // End Questions Code
     //

     if (count === 0) {
       if ($(this).attr('id') === 'fail-try-again') {
         $('#program-modal .container').addClass('hide');
         $('.results-container').removeClass('hide').addClass('show');
       }

     } else {
       if  (count > 0) {
         //Render results
         $('.results-row, #results-btn-row').show();
         $('.results-container h4').text("You're a great fit for...");
         $('#results-here').html(resultsTemplate);
         $('#results-try-again').show();
       }

        $('#program-modal .container').addClass('hide');
       //Render results
       $('#results-here').html(resultsTemplate);


       $('.program-question-container').removeClass('show').addClass('hide');
       $('.results-container').removeClass('hide').addClass('show');
     }


   });


      // Send to Google Sheet

      // Variable to hold request
      var request, checkLength;

      // Bind to the submit event of our form
      $("#submit-info").click(function(event){

          //Hidden checkbox to help prevent spam submissions
          checkLength = $('#checkbox-2:checked').length === 0;

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
              $formElements = $($form).find("input, select, button, textarea").not('input[type=checkbox]');
            //  $formCheckboxes = $($form).find('input[type=checkbox]');


          // Serialize the data in the form
          var serializedFormElements = '';
          //var serializedCheckboxData = '';
          var serializedData = '';

          // Serialize checkbox data
          // loop through checkboxes
          // for (i = 0; i < $formCheckboxes.length; i++) {
          //   $thisCheckbox = $formCheckboxes[i]; //cache the current checkbox
          //   $name = $($thisCheckbox).attr('name'); // get checkbox name
          //   // Assign checkbox values of yes or '' based on the checked property
          //   if ($($thisCheckbox).prop('checked') === true) {
          //     $($thisCheckbox).val('yes');
          //   }
          //   $val = $($thisCheckbox).val(); //get checkbox val
          //   serializedCheckboxData = serializedCheckboxData + $name + '=' + $val + '&';     // Serialize
          // }

          // Serialize other form data
            for (i = 0; i < $formElements.length; i++) {
              $name = $($formElements[i]).attr('id');
              $val = $($formElements[i]).val();
              serializedFormElements = serializedFormElements + $name + '=' + $val + '&';
            }

          serializedData = serializedFormElements;  //Concat all form input serialized data

          // Let's disable the inputs for the duration of the Ajax request.
          // Note: we disable elements AFTER the form data has been serialized.
          // Disabled form elements will not be serialized.
          $inputs.prop("disabled", true);

          // Fire off the request to /form.php
          request = $.ajax({
              url: "https://script.google.com/macros/s/AKfycbzBnwogNzYZaYnH1iABGfs4G8Pm0dlSraLDtHfW-s3aduwPlnSw/exec",
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
              //$("#modal-request-info-form input:checkbox").prop('checked', "");
              $('#program-modal .container').removeClass('show').addClass('hide');
              $('.success-container').removeClass('hide').addClass('show');

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
                $('.results-container').removeClass('show').addClass('hide');
                $('.success-container').removeClass('hide').addClass('show');
              } else {
                $('.results-container').removeClass('show').addClass('hide');
                $('.failure-container').removeClass('hide').addClass('show');
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
     $('#program-modal .results-container').removeClass('hide').addClass('show');

   });


  //  Apply Modal
  $('.apply-btn').click(function(){
    $('#apply-modal').openModal();
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
