import { useEffect, useState } from 'react';
import useGmapsSettings from '../../hooks/settings/useGmapsSettings';

const StreetViewChecker = ({ lat, lng }) => {
  const { gmapsApiKey } = useGmapsSettings();
  const [isAvailable, setIsAvailable] = useState(null);

  useEffect(() => {
    const resolvedKey = gmapsApiKey || import.meta.env.VITE_GMAPS_API_KEY;
    if (!resolvedKey) {
      setIsAvailable(false);
      return;
    }

    const loadGoogleMapsScript = () => {
      const existingScript = document.getElementById('googleMapsScript');

      if (!existingScript) {
        if (!document.getElementById('googleMapsScript')) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${resolvedKey}&libraries=places`;
          script.id = 'googleMapsScript';
          script.async = true;
          script.defer = true;
          script.onload = () => checkStreetViewAvailability(lat, lng);
          script.onerror = () => setIsAvailable(false);
          document.body.appendChild(script);
        }
      } else {
        checkStreetViewAvailability(lat, lng);
      }
    };

    const checkStreetViewAvailability = (lat, lng) => {
      if (window.google && window.google.maps) {
        const sv = new window.google.maps.StreetViewService();
        const location = { lat, lng };
        sv.getPanorama({ location, radius: 50 }, (_ , status) => {
          if (status === window.google.maps.StreetViewStatus.OK) {
            setIsAvailable(true);
          } else {
            setIsAvailable(false);
          }
        });
      }
      
    };

    loadGoogleMapsScript();
  }, [lat, lng, gmapsApiKey]);

  return isAvailable;
};

export default StreetViewChecker;

