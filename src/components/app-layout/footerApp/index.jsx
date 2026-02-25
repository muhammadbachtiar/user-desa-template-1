import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import Logo from "../../../atoms/logo";
import useSetting from "../../../hooks/settings/useSettings";
import Refetch from "../../../atoms/refetch";
import sosmed from "../../../atoms/icons/sosmed.js";

const GMAPS_API_KEY = import.meta.env.VITE_GMAPS_API_KEY;

const FooterApp = () => {
  const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`footer-${import.meta.env.VITE_VILLAGE_ID}`, {});

  const contactUs = setting?.value?.contactUs;
  const socialMedia = setting?.value?.socialMedia;
  const lat = contactUs?.latitude;
  const lon = contactUs?.longitude;

  const hasCoordinates = lat && lon;
  const googleMapsUrl = hasCoordinates
    ? `https://www.google.com/maps?q=${lat},${lon}`
    : null;
  const mapsEmbedUrl = hasCoordinates && GMAPS_API_KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${GMAPS_API_KEY}&q=${lat},${lon}&zoom=15`
    : hasCoordinates
      ? `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`
      : null;

  return (
    <footer className="w-full mt-8 bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="w-full flex justify-center">
        <div className="w-full px-5 sm:px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl py-8 lg:py-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Left Column: Logo + Contact + Social */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Logo */}
              <div className="flex justify-start">
                <Logo textColor="text-gray-900" hoverBgColor="bg-gray-100" />
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-3">
                {isSettingLoading || isSettingFetching ? (
                  <ContactSkeleton />
                ) : isSettingError && !isSettingFetching ? (
                  <Refetch refetch={refetchSetting} />
                ) : (
                  <>
                    {/* Address */}
                    <ContactItem
                      icon={<FaLocationDot className="w-4 h-4 text-[#113F67] flex-shrink-0 mt-0.5" />}
                      content={
                        googleMapsUrl ? (
                          <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-600 hover:text-[#113F67] hover:underline transition-colors leading-relaxed"
                          >
                            {contactUs?.address ?? "[Alamat belum diatur]"}
                          </a>
                        ) : (
                          <span className="text-sm text-gray-600 leading-relaxed">
                            {contactUs?.address ?? "[Alamat belum diatur]"}
                          </span>
                        )
                      }
                    />

                    {/* Phone */}
                    <ContactItem
                      icon={<FaPhone className="w-3.5 h-3.5 text-[#113F67] flex-shrink-0" />}
                      content={
                        contactUs?.phone ? (
                          <a
                            href={`tel:${contactUs.phone}`}
                            className="text-sm text-gray-600 hover:text-[#113F67] hover:underline transition-colors"
                          >
                            {contactUs.phone}
                          </a>
                        ) : (
                          <span className="text-sm text-gray-400 italic">[Nomor telepon belum diatur]</span>
                        )
                      }
                    />

                    {/* Email */}
                    <ContactItem
                      icon={<MdEmail className="w-4 h-4 text-[#113F67] flex-shrink-0" />}
                      content={
                        contactUs?.email ? (
                          <a
                            href={`mailto:${contactUs.email}`}
                            className="text-sm text-gray-600 hover:text-[#113F67] hover:underline transition-colors break-all"
                          >
                            {contactUs.email}
                          </a>
                        ) : (
                          <span className="text-sm text-gray-400 italic">[Email belum diatur]</span>
                        )
                      }
                    />
                  </>
                )}
              </div>

              {/* Social Media */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Ikuti Kami</span>
                <div className="flex flex-wrap gap-2">
                  {isSettingLoading || isSettingFetching ? (
                    <SocialSkeleton />
                  ) : isSettingError && !isSettingFetching ? (
                    <Refetch refetch={refetchSetting} />
                  ) : !socialMedia || Object.keys(socialMedia).length === 0 ? (
                    <p className="text-sm text-gray-400 italic">[Sosial media belum diatur]</p>
                  ) : (
                    Object.entries(socialMedia).map(([key, value]) => {
                      const Icon = sosmed[key];
                      return (
                        <a
                          key={key}
                          href={value.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={key}
                          className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 hover:bg-[#113F67] hover:border-[#113F67] group transition-all duration-200"
                        >
                          {Icon ? (
                            <Icon className="w-4 h-4 text-[#113F67] group-hover:text-white transition-colors" />
                          ) : (
                            <span className="text-xs font-medium text-[#113F67] group-hover:text-white">{key.slice(0, 2)}</span>
                          )}
                        </a>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Google Maps */}
            <div className="lg:col-span-5">
              {isSettingLoading || isSettingFetching ? (
                <div className="w-full h-40 sm:h-48 lg:h-full lg:min-h-[220px] bg-gray-200 rounded-xl animate-pulse" />
              ) : isSettingError && !isSettingFetching ? (
                <div className="w-full h-40 sm:h-48 lg:h-full lg:min-h-[220px] bg-gray-50 rounded-xl flex items-center justify-center">
                  <Refetch refetch={refetchSetting} />
                </div>
              ) : mapsEmbedUrl ? (
                <div className="w-full h-40 sm:h-48 lg:h-full lg:min-h-[220px] rounded-xl overflow-hidden border border-gray-200 shadow-sm relative group">
                  <iframe
                    src={mapsEmbedUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    title="Lokasi di Google Maps"
                  />
                  {/* Open in Google Maps overlay */}
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-md text-xs font-medium text-gray-700 hover:bg-white hover:text-[#113F67] transition-all opacity-0 group-hover:opacity-100"
                  >
                    <FaLocationDot className="w-3 h-3" />
                    Buka di Google Maps
                  </a>
                </div>
              ) : (
                <div className="w-full h-40 sm:h-48 lg:h-full lg:min-h-[220px] bg-gray-50 rounded-xl flex flex-col items-center justify-center gap-2 border border-gray-200">
                  <FaLocationDot className="w-8 h-8 text-gray-300" />
                  <p className="text-sm text-gray-400 italic">[Koordinat lokasi belum diatur]</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-gray-200 bg-gray-50">
        <div className="w-full flex justify-center">
          <div className="w-full px-5 sm:px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl py-4">
            <span className="block text-xs sm:text-sm text-center text-gray-500">
              © {new Date().getFullYear()}{" "}
              <a href="https://muaraenimkab.go.id/" className="hover:underline hover:text-[#113F67] transition-colors">
                Pemerintah Kabupaten Muara Enim
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/** Reusable contact row */
function ContactItem({ icon, content }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5">{icon}</div>
      <div className="min-w-0 flex-1">{content}</div>
    </div>
  );
}


/** Loading skeleton for contact */
function ContactSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="flex items-center gap-2.5">
        <div className="w-4 h-4 bg-gray-200 rounded" />
        <div className="h-4 w-48 bg-gray-200 rounded" />
      </div>
      <div className="flex items-center gap-2.5">
        <div className="w-4 h-4 bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>
      <div className="flex items-center gap-2.5">
        <div className="w-4 h-4 bg-gray-200 rounded" />
        <div className="h-4 w-40 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

/** Loading skeleton for social media */
function SocialSkeleton() {
  return (
    <div className="flex gap-2 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-9 h-9 bg-gray-200 rounded-lg" />
      ))}
    </div>
  );
}

export default FooterApp;