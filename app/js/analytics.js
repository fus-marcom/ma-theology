<!-- Facebook Conversion Code for MA Theology Microsite -->
<script>(function() {
  var _fbq = window._fbq || (window._fbq = []);
  if (!_fbq.loaded) {
    var fbds = document.createElement('script');
    fbds.async = true;
    fbds.src = 'https://connect.facebook.net/en_US/fbds.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(fbds, s);
    _fbq.loaded = true;
  }
})();
window._fbq = window._fbq || [];
window._fbq.push(['track', '6053812137643', {'value':'0.01','currency':'USD'}]);
</script>
<noscript><img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?ev=6053812137643&amp;cd[value]=0.01&amp;cd[currency]=USD&amp;noscript=1" /></noscript>

<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-5819863-10', 'auto');
    ga('send', 'pageview');

  </script>

  <!-- GA Click tracking -->
<script type="text/javascript">
    function _gaLt(event) {

        /* If GA is blocked or not loaded then don't track */
        if (!ga.hasOwnProperty("loaded") || ga.loaded != true) {
            return;
        }

        var el = event.srcElement || event.target;

        /* Loop up the DOM tree through parent elements if clicked element is not a link (eg: an image inside a link) */
        while (el && (typeof el.tagName == 'undefined' || el.tagName.toLowerCase() != 'a' || !el.href)) {
            el = el.parentNode;
        }

        /* if a link has been clicked */
        if (el && el.href) {

            var link = el.href;

            /* Only if it is an external link */
            if (link.indexOf(location.host) == -1 && !link.match(/^javascript\:/i)) {
                /* Is target set and not _(self|parent|top)? */
                var target = (el.target && !el.target.match(/^_(self|parent|top)$/i)) ? el.target : false;

                var hbrun = false; // tracker has not yet run

                /* HitCallback to open link in same window after tracker */
                var hitBack = function() {
                    /* run once only */
                    if (hbrun) return;
                    hbrun = true;
                    window.location.href = link;
                };

                /* If target opens a new window then just track */
                if (el.target && !el.target.match(/^_(self|parent|top)$/i)) {
                    ga(
                        "send", "event", "Outgoing Links", link,
                        document.location.pathname + document.location.search
                    );
                } else {
                    /* send event with callback */
                    ga(
                        "send", "event", "Outgoing Links", link,
                        document.location.pathname + document.location.search, {
                            "hitCallback": hitBack
                        }
                    );

                    /* Run hitCallback if GA takes too long */
                    setTimeout(hitBack, 1000);

                    /* Prevent standard click */
                    event.preventDefault ? event.preventDefault() : event.returnValue = !1;
                }
            }

        }
    }

    /* Attach the event to all clicks in the document after page has loaded */
    var w = window;
    w.addEventListener ? w.addEventListener("load", function() {
        document.body.addEventListener("click", _gaLt, !1)
    }, !1) : w.attachEvent && w.attachEvent("onload", function() {
        document.body.attachEvent("onclick", _gaLt)
    });
</script>

<!-- Google Code for Fran.Univ Apply Conversion Page
In your html page, add the snippet and call
goog_report_conversion when someone clicks on the
chosen link or button. -->
<script type="text/javascript">
  /* <![CDATA[ */
  goog_snippet_vars = function() {
    var w = window;
    w.google_conversion_id = 998238672;
    w.google_conversion_label = "TaYoCKvbs2YQ0NP_2wM";
    w.google_conversion_value = 5.00;
    w.google_conversion_currency = "USD";
    w.google_remarketing_only = false;
  }
  // DO NOT CHANGE THE CODE BELOW.
  goog_report_conversion = function(url) {
    goog_snippet_vars();
    window.google_conversion_format = "3";
    var opt = new Object();
    opt.onload_callback = function() {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  }
  var conv_handler = window['google_trackConversion'];
  if (typeof(conv_handler) == 'function') {
    conv_handler(opt);
  }
}
/* ]]> */
</script>

<!-- Google Code for Fran.Univ Login Conversion Page
In your html page, add the snippet and call
goog_report_conversion when someone clicks on the
chosen link or button. -->
<script type="text/javascript">
  /* <![CDATA[ */
  goog_snippet_varsL = function() {
    var w = window;
    w.google_conversion_id = 998238672;
    w.google_conversion_label = "F2_ACOfgvmYQ0NP_2wM";
    w.google_conversion_value = 4.00;
    w.google_conversion_currency = "USD";
    w.google_remarketing_only = false;
  }
  // DO NOT CHANGE THE CODE BELOW.
  goog_report_conversionL = function(url) {
    goog_snippet_varsL();
    window.google_conversion_format = "3";
    var opt = new Object();
    opt.onload_callback = function() {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  }
  var conv_handler = window['google_trackConversion'];
  if (typeof(conv_handler) == 'function') {
    conv_handler(opt);
  }
}
/* ]]> */
</script>

<!-- Google Code for Fran.Univ Request Conversion Page
In your html page, add the snippet and call
goog_report_conversion when someone clicks on the
chosen link or button. -->
<script type="text/javascript">
  /* <![CDATA[ */
  goog_snippet_varsR = function() {
    var w = window;
    w.google_conversion_id = 998238672;
    w.google_conversion_label = "H5EmCJbbu2YQ0NP_2wM";
    w.google_conversion_value = 3.00;
    w.google_conversion_currency = "USD";
    w.google_remarketing_only = false;
  }
  // DO NOT CHANGE THE CODE BELOW.
  goog_report_conversionR = function(url) {
    goog_snippet_varsR();
    window.google_conversion_format = "3";
    var opt = new Object();
    opt.onload_callback = function() {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  }
  var conv_handler = window['google_trackConversion'];
  if (typeof(conv_handler) == 'function') {
    conv_handler(opt);
  }
}
/* ]]> */
</script>
<script type="text/javascript"
  src="//www.googleadservices.com/pagead/conversion_async.js">
</script>
