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
