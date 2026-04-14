(function() {
  'use strict';

  // Find all ShortSelect widget script tags
  var scripts = document.querySelectorAll('script[data-widget-id]');

  for (var i = 0; i < scripts.length; i++) {
    (function(script) {
      var widgetId = script.getAttribute('data-widget-id');
      if (!widgetId) return;

      // Determine base URL from script src
      var baseUrl = '';
      if (script.src) {
        baseUrl = script.src.replace('/embed/widget.js', '');
      } else {
        // Fallback: look for the original script that loaded this
        var allScripts = document.querySelectorAll('script[src*="widget.js"]');
        for (var j = 0; j < allScripts.length; j++) {
          if (allScripts[j].src.indexOf('widget.js') !== -1) {
            baseUrl = allScripts[j].src.replace('/embed/widget.js', '');
            break;
          }
        }
      }

      // The embeddable app lives on app.shortselect.com. If the script was loaded
      // from the marketing domain (shortselect.com / www.shortselect.com), rewrite
      // so the iframe points to the app, not the marketing 404.
      if (/^https?:\/\/(www\.)?shortselect\.com$/.test(baseUrl)) {
        baseUrl = 'https://app.shortselect.com';
      }

      // Find or create container
      var containerId = 'shortselect-widget-' + widgetId;
      var container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        script.parentNode.insertBefore(container, script.nextSibling);
      }

      // Prevent double initialization
      if (container.getAttribute('data-initialized')) return;
      container.setAttribute('data-initialized', 'true');

      // Create iframe
      var iframe = document.createElement('iframe');
      iframe.src = baseUrl + '/embed/widget/' + widgetId;
      iframe.style.width = '100%';
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.style.minHeight = '200px';
      iframe.style.height = '400px';
      iframe.style.transition = 'height 0.2s ease';
      iframe.style.display = 'block';
      iframe.setAttribute('title', 'ShortSelect Jobs');
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('allow', 'clipboard-write');
      iframe.setAttribute('scrolling', 'no');

      container.appendChild(iframe);

      // Listen for resize messages from iframe
      window.addEventListener('message', function(event) {
        // Validate the message comes from our iframe
        if (event.source !== iframe.contentWindow) return;

        if (event.data && event.data.type === 'shortselect-resize') {
          var height = Math.ceil(event.data.height);
          if (height > 0) {
            iframe.style.height = height + 'px';
          }
        }
      });

      // SEO: Inject JSON-LD JobPosting structured data (non-blocking, fail-safe)
      (function() {
        var seoId = 'shortselect-seo-' + widgetId;
        if (document.getElementById(seoId)) return;

        var endpoint = 'https://aztqhtluvomqnxdavjxp.supabase.co/functions/v1/widget-seo?widget_id=' + encodeURIComponent(widgetId);

        try {
          fetch(endpoint)
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(data) {
              if (!data || !data.jsonLd || !data.jsonLd.length) return;
              var el = document.createElement('script');
              el.type = 'application/ld+json';
              el.id = seoId;
              el.textContent = JSON.stringify(data.jsonLd);
              document.head.appendChild(el);
            })
            .catch(function() {});
        } catch (e) {}
      })();
    })(scripts[i]);
  }
})();
