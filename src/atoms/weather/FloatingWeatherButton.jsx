import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  Sun,
  Droplets,
  Wind,
  MapPin,
  X,
  ChevronDown,
  CloudRain,
  CloudLightning,
  CloudSun,
  Loader2,
  Leaf,
} from "lucide-react";
import { useWeather } from "../../hooks/settings/useWeather";
import { useAirQuality, getAQILevel } from "../../hooks/settings/useAirQuality";
import useWeatherSettings from "../../hooks/settings/useWeatherSettings";

const STORAGE_KEY = "selectedKecamatan";

const getWeatherIcon = (weatherCode, size = 24, forPanel = false) => {
  const colorClass = forPanel ? "text-blue-500" : "text-white";
  const iconProps = { size };

  switch (weatherCode) {
    case 0:
    case 1:
      return <Sun {...iconProps} className={forPanel ? "text-yellow-500" : "text-yellow-300"} />;
    case 2:
      return <CloudSun {...iconProps} className={forPanel ? "text-yellow-500" : "text-yellow-200"} />;
    case 3:
    case 4:
      return <Cloud {...iconProps} className={forPanel ? "text-gray-500" : "text-gray-200"} />;
    case 5:
    case 10:
    case 45:
      return <Cloud {...iconProps} className={forPanel ? "text-gray-400" : "text-gray-400"} />;
    case 60:
    case 61:
    case 63:
      return <CloudRain {...iconProps} className={forPanel ? "text-blue-500" : "text-blue-300"} />;
    case 80:
      return <CloudRain {...iconProps} className={forPanel ? "text-blue-400" : "text-blue-200"} />;
    case 95:
    case 97:
      return <CloudLightning {...iconProps} className={forPanel ? "text-yellow-500" : "text-yellow-400"} />;
    default:
      return <Cloud {...iconProps} className={colorClass} />;
  }
};

export default function FloatingWeatherButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const { kecamatanList } = useWeatherSettings();
  const { data: weatherData, isLoading, isError, refetch } = useWeather(selectedKecamatan?.adm4 || null);

  const {
    data: airQualityData,
    isLoading: isAQILoading,
  } = useAirQuality(
    selectedKecamatan?.lat || null,
    selectedKecamatan?.lon || null
  );

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSelectedKecamatan(JSON.parse(stored));
      } catch {
        setSelectedKecamatan(kecamatanList[0]);
      }
    } else {
      setSelectedKecamatan(kecamatanList[0]);
    }
  }, [kecamatanList]);

  useEffect(() => {
    if (selectedKecamatan && isClient) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedKecamatan));
    }
  }, [selectedKecamatan, isClient]);

  const handleSelectKecamatan = (kecamatan) => {
    setSelectedKecamatan(kecamatan);
    setIsDropdownOpen(false);
  };

  const currentWeather = weatherData?.data?.[0]?.cuaca?.[0]?.[0] || null;
  const forecast = weatherData?.data?.[0]?.cuaca?.[0]?.slice(0, 4) || [];

  const aqiLevel = airQualityData?.current?.us_aqi
    ? getAQILevel(airQualityData.current.us_aqi)
    : null;

  const [showAQI, setShowAQI] = useState(false);

  useEffect(() => {
    if (!currentWeather || !airQualityData?.current) return;

    const interval = setInterval(() => {
      setShowAQI((prev) => !prev);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentWeather, airQualityData]);

  if (!isClient) return null;

  const renderButtonContent = () => {
    const hasWeather = !!currentWeather;
    const hasAQI = !!airQualityData?.current && !!aqiLevel;

    if (hasWeather && hasAQI) {
      return (
        <div className="relative w-[70px] h-5 overflow-hidden">
          <AnimatePresence mode="wait">
            {showAQI ? (
              <motion.div
                key="aqi"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center gap-1.5"
              >
                <Leaf size={16} className={aqiLevel.color} />
                <span className={`font-semibold text-sm ${aqiLevel.color}`}>
                  AQI {airQualityData.current.us_aqi}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="weather"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center gap-1.5"
              >
                {getWeatherIcon(currentWeather.weather, 16, true)}
                <span className="text-gray-700 font-semibold text-sm">
                  {currentWeather.t}°C
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    if (hasWeather) {
      return (
        <>
          {getWeatherIcon(currentWeather.weather, 18, true)}
          <span className="text-gray-700 font-semibold text-sm">
            {currentWeather.t}°C
          </span>
        </>
      );
    }

    if (hasAQI) {
      return (
        <>
          <Leaf size={18} className={aqiLevel.color} />
          <span className={`font-semibold text-sm ${aqiLevel.color}`}>
            AQI {airQualityData.current.us_aqi}
          </span>
        </>
      );
    }

    if (isLoading || isAQILoading) {
      return (
        <>
          <Loader2 size={18} className="text-blue-500 animate-spin" />
          <span className="text-gray-500 font-semibold text-sm">...</span>
        </>
      );
    }

    return (
      <>
        <Cloud size={18} className="text-blue-500" />
        <span className="text-gray-700 font-semibold text-sm">Cuaca</span>
      </>
    );
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-28 right-4 z-50 flex items-center gap-1.5 px-3.5 py-2.5 rounded-full shadow-lg border border-gray-200 transition-all duration-300 sm:bottom-36 sm:right-5 sm:px-4 sm:py-3"
        style={{ backgroundColor: '#ffffff', color: '#374151' }}
        whileHover={{ scale: 1.05, backgroundColor: '#f9fafb' }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {renderButtonContent()}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-44 right-4 z-50 rounded-2xl shadow-2xl overflow-hidden bg-white border border-gray-200 sm:bottom-52 sm:right-5"
            style={{
              width: "min(calc(100vw - 2rem), 360px)",
              maxHeight: "min(calc(100dvh - 12rem), 520px)",
            }}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-gray-800 font-bold text-base flex items-center gap-2">
                <Cloud size={18} className="text-blue-500" />
                Cuaca & Kualitas Udara
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 bg-white rounded-full hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: "min(calc(100dvh - 18rem), 400px)" }}>
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-sm"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <MapPin size={16} className="text-blue-500" />
                      <span className="truncate">
                        {selectedKecamatan?.kecamatan || "Pilih Kecamatan"}
                      </span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-40 overflow-y-auto z-10"
                      >
                        {kecamatanList.map((kec) => (
                          <button
                            key={kec.adm4}
                            onClick={() => handleSelectKecamatan(kec)}
                            className={`w-full bg-white hover:bg-blue-100 text-left px-4 py-2.5 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${
                              selectedKecamatan?.adm4 === kec.adm4
                                ? "bg-blue-100 text-blue-700 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            <div className="font-medium">{kec.kecamatan}</div>
                            <div className="text-xs text-gray-500">{kec.kelurahan_desa}</div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="p-4">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-6">
                    <Loader2 size={32} className="text-blue-500 animate-spin" />
                    <p className="text-gray-500 mt-2 text-sm">Memuat data cuaca...</p>
                  </div>
                ) : isError ? (
                  <div className="flex flex-col items-center justify-center py-6">
                    <Cloud size={32} className="text-gray-300" />
                    <p className="text-gray-500 mt-2 text-sm text-center">
                      Gagal memuat data cuaca
                    </p>
                    <button
                      onClick={() => refetch()}
                      className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-sm transition-colors"
                    >
                      Coba Lagi
                    </button>
                  </div>
                ) : currentWeather ? (
                  <>
                    <div className="text-center mb-4">
                      <div className="flex justify-center mb-2">
                        {currentWeather.image ? (
                          <img
                            src={currentWeather.image}
                            alt={currentWeather.weather_desc}
                            className="w-14 h-14"
                          />
                        ) : (
                          getWeatherIcon(currentWeather.weather, 56, true)
                        )}
                      </div>
                      <div className="text-4xl font-bold text-gray-800 mb-1">
                        {currentWeather.t}°C
                      </div>
                      <div className="text-gray-600 text-base">
                        {currentWeather.weather_desc}
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        {weatherData?.lokasi?.desa}, {weatherData?.lokasi?.kecamatan}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-2">
                        <Droplets size={18} className="text-blue-500" />
                        <div>
                          <div className="text-gray-500 text-xs">Kelembapan</div>
                          <div className="text-gray-800 font-semibold text-sm">{currentWeather.hu}%</div>
                        </div>
                      </div>
                      <div className="bg-cyan-50 rounded-xl p-3 flex items-center gap-2">
                        <Wind size={18} className="text-cyan-500" />
                        <div>
                          <div className="text-gray-500 text-xs">Angin</div>
                          <div className="text-gray-800 font-semibold text-sm">{currentWeather.ws} km/h</div>
                        </div>
                      </div>
                    </div>

                    {isAQILoading ? (
                      <div className="flex items-center justify-center py-3">
                        <Loader2 size={20} className="text-green-500 animate-spin" />
                        <span className="text-gray-500 text-xs ml-2">Memuat kualitas udara...</span>
                      </div>
                    ) : airQualityData?.current && aqiLevel && (
                      <div className={`rounded-xl p-3 mb-4 border ${aqiLevel.bgColor} ${aqiLevel.borderColor}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Leaf size={16} className={aqiLevel.color} />
                          <span className="text-gray-700 text-sm font-medium">Kualitas Udara</span>
                          <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${aqiLevel.bgColor} ${aqiLevel.color}`}>
                            {aqiLevel.label}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-center">
                            <div className={`text-lg font-bold ${aqiLevel.color}`}>
                              {airQualityData.current.us_aqi}
                            </div>
                            <div className="text-gray-500 text-xs">AQI</div>
                          </div>
                          <div className="text-center border-l border-r border-gray-200">
                            <div className="text-lg font-bold text-gray-700">
                              {airQualityData.current.pm2_5.toFixed(1)}
                            </div>
                            <div className="text-gray-500 text-xs">PM2.5</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-700">
                              {airQualityData.current.pm10.toFixed(1)}
                            </div>
                            <div className="text-gray-500 text-xs">PM10</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {forecast.length > 1 && (
                      <div>
                        <h4 className="text-gray-500 text-xs font-medium mb-2">
                          Prakiraan Hari Ini
                        </h4>
                        <div className="grid grid-cols-4 gap-2">
                          {forecast.map((item, index) => {
                            const time = new Date(item.local_datetime).toLocaleTimeString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                            });
                            return (
                              <div key={index} className="bg-gray-50 rounded-xl p-2 text-center">
                                <div className="text-gray-500 text-xs mb-1">{time}</div>
                                <div className="flex justify-center mb-1">
                                  {item.image ? (
                                    <img src={item.image} alt={item.weather_desc} className="w-7 h-7" />
                                  ) : (
                                    getWeatherIcon(item.weather, 20, true)
                                  )}
                                </div>
                                <div className="text-gray-700 font-semibold text-sm">{item.t}°</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    <MapPin size={32} className="text-gray-300" />
                    <p className="text-gray-500 mt-2 text-sm text-center">
                      Pilih kecamatan untuk melihat cuaca
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-gray-400 text-xs">Data: BMKG & Open-Meteo</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
