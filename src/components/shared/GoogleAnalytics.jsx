import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useGoogleAnalyticsSettings from '../../hooks/settings/useGoogleAnalyticsSettings';

export default function GoogleAnalytics() {
  const { gaId } = useGoogleAnalyticsSettings();
  const location = useLocation();

  useEffect(() => {
    if (!gaId) return;

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', {
        page_path: window.location.pathname,
      });
    `;
    document.head.appendChild(inlineScript);

    // Initial page view
    if (window.gtag) {
      window.gtag('config', gaId, {
        page_path: window.location.pathname,
      });
    }

    // Cleanup scripts on unmount
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      if (document.head.contains(inlineScript)) {
        document.head.removeChild(inlineScript);
      }
    };
  }, [gaId]);

  // Track page path changes
  useEffect(() => {
    if (!gaId || !window.gtag) return;

    window.gtag('config', gaId, {
      page_path: location.pathname + location.search,
    });
  }, [location, gaId]);

  return null;
}
