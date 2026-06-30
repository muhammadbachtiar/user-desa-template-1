import { useState } from 'react';
import Icons from '../../atoms/icons/icon';
import { Link } from 'react-router-dom';
import useSetting from '../../hooks/settings/useSettings';
import useFeatureFlags from '../../hooks/settings/useFeatureFlags';
import Refetch from '../../atoms/refetch';
import { Modal, ModalHeader, ModalBody } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';

function filterServicesByFeatures(services, features) {
  const isLinkMatch = (link, target) => {
    if (!link) return false;
    const normalizedLink = link.startsWith('/') ? link : `/${link}`;
    return normalizedLink === target;
  };

  return services
    .map((item) => {
      if (item.child && Array.isArray(item.child) && item.child.length > 0) {
        const filteredChildren = filterServicesByFeatures(item.child, features);
        return { ...item, child: filteredChildren };
      }
      return item;
    })
    .filter((item) => {
      if (isLinkMatch(item.link, "/tour") && !features.tour) return false;
      if (isLinkMatch(item.link, "/press-release") && !features.pressRelease) return false;
      if (item.child && Array.isArray(item.child) && item.child.length === 0 && !item.link) {
        return false;
      }
      return true;
    });
}

// ─── Animation Variants ───
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' },
  }),
};

// ─── Desktop Service Card ───
function DesktopServiceCard({ item, onClick, index = 0 }) {
  const IconComponent = Icons[item?.icon] ?? Icons.FaQuestion;
  const hasImage = !!item.image;
  const hasChildren = Array.isArray(item.child) && item.child.length > 0;
  const linkUrl = item.link || '/';

  const cardContent = (
    <div className="w-full h-full flex flex-col items-center justify-start flex-1 p-3 md:py-6 md:px-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm group-hover:bg-[#113F67] group-hover:text-white group-focus:bg-[#113F67] group-focus:text-white group-hover:scale-105 group-hover:-translate-y-1 transition-all transform duration-300 ease-in-out">
      {/* Icon / Image */}
      <div className="flex items-center justify-center mb-2 h-10 w-10 md:h-16 md:w-16 flex-shrink-0">
        {hasImage ? (
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <IconComponent className="w-6 h-6 md:w-14 md:h-14 text-[#226597] group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500 transition-colors" />
        )}
      </div>

      {/* Title */}
      <span className="text-xs text-[#226597] md:max-w-36 line-clamp-2 mb-1 md:text-sm text-center md:font-bold md:tracking-tighter md:text-gray-900 group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500 transition-colors">
        {item?.title}
      </span>

      {/* Description (desktop only) */}
      <div className="hidden md:block w-full px-1 mt-1">
        <p
          className="text-[11px] text-gray-500 text-center leading-snug group-hover:text-white/70 group-focus:text-white/70 transition-colors"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.description || `Informasi tentang ${item.title}`}
        </p>
      </div>
    </div>
  );

  const wrapper = (children) => (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full md:w-48 flex"
    >
      {children}
    </motion.div>
  );

  // Has children → open modal
  if (hasChildren) {
    return wrapper(
      <button
        type="button"
        onClick={() => onClick?.(item)}
        className="group focus:outline-none w-full h-full flex flex-col bg-transparent text-left"
      >
        {cardContent}
      </button>
    );
  }

  // External link
  if (linkUrl.startsWith('http')) {
    return wrapper(
      <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="group w-full h-full flex flex-col">
        {cardContent}
      </a>
    );
  }

  // Internal link
  return wrapper(
    <Link to={linkUrl} className="group w-full h-full flex flex-col">
      {cardContent}
    </Link>
  );
}

// ─── Mobile Bottom Bar Item ───
function MobileBarItem({ item, onClick }) {
  const IconComponent = Icons[item?.icon] ?? Icons.FaQuestion;
  const hasImage = !!item.image;
  const hasChildren = Array.isArray(item.child) && item.child.length > 0;
  const linkUrl = item.link || '/';

  const content = (
    <div className="group flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1.5 px-1">
      <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
        {hasImage ? (
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <IconComponent className="w-4 h-4 text-[#226597] group-hover:text-[#113F67] transition-colors" />
        )}
      </div>
      <span className="text-[10px] text-[#226597] text-center line-clamp-1 leading-tight max-w-[56px] font-medium">
        {item?.title}
      </span>
    </div>
  );

  if (hasChildren) {
    return (
      <button type="button" onClick={() => onClick?.(item)} className="focus:outline-none bg-white">
        {content}
      </button>
    );
  }

  if (linkUrl.startsWith('http')) {
    return <a href={linkUrl} target="_blank" rel="noopener noreferrer">{content}</a>;
  }

  return <Link to={linkUrl}>{content}</Link>;
}

// ─── Modal Child Card ───
function ModalChildCard({ item, index = 0 }) {
  const IconComponent = Icons[item?.icon] ?? Icons.FaQuestion;
  const hasImage = !!item.image;
  const linkUrl = item.link || '/';

  const cardContent = (
    <div className="group flex flex-col items-center justify-start gap-1.5 p-3 rounded-xl hover:bg-[#113F67] transition-all duration-200 cursor-pointer w-full h-full min-h-[100px]">
      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
        {hasImage ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#226597] group-hover:text-white transition-colors" />
        )}
      </div>
      <span className="text-xs font-semibold text-gray-800 text-center line-clamp-2 leading-tight max-w-[120px] group-hover:text-white transition-colors">
        {item.title}
      </span>
      {item.description && (
        <span className="text-[10px] text-gray-500 text-center line-clamp-2 leading-snug max-w-[130px] group-hover:text-white/70 transition-colors">
          {item.description}
        </span>
      )}
    </div>
  );

  const wrapper = (children) => (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {children}
    </motion.div>
  );

  if (linkUrl.startsWith('http')) {
    return wrapper(
      <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="w-full">{cardContent}</a>
    );
  }

  return wrapper(
    <Link to={linkUrl} className="w-full">{cardContent}</Link>
  );
}

// ─── Main Component ───
const App = () => {
  const [selectedService, setSelectedService] = useState(null);

  const { data, isLoading, isError, isFetching, refetch } = useSetting(`service-${import.meta.env.VITE_VILLAGE_ID}`, {});
  const { data: appSetting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`app-${import.meta.env.VITE_VILLAGE_ID}`, {});
  const { isSectionEnabled, pressRelease } = useFeatureFlags();

  const featureFlags = {
    tour: isSectionEnabled("tour"),
    pressRelease: pressRelease,
  };

  const rawServices = (Array.isArray(data?.value) ? data.value : []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const services = filterServicesByFeatures(rawServices, featureFlags);

  const handleOpenModal = (item) => setSelectedService(item);
  const handleCloseModal = () => setSelectedService(null);

  const showSkeleton = isLoading || (!data || !(Array.isArray(data?.value) && data?.value.length > 0)) && isFetching;
  const showEmpty = !isError && !isFetching && services.length === 0;
  const showError = isError && !isFetching;

  return (
    <>
      <section className="fixed block bottom-0 left-0 z-10 md:z-0 max-w-full w-full h-20 bg-white border-t dark:bg-gray-700 dark:border-gray-600 md:static md:grid md:grid-cols-8 md:gap-2 md:max-w-none md:w-auto md:h-auto md:bg-transparent md:border-0">

        {/* ─── Header (desktop only) ─── */}
        <div className="hidden md:flex flex-col col-span-8 gap-2 mb-4 justify-items-center items-center">
          {isSettingLoading ? (
            <div className="flex animate-pulse space-x-3">
              <div className="flex flex-col justify-center items-center align-middle gap-y-6">
                <div className="h-8 w-32 rounded"></div>
                <div className="h-4 w-36 rounded"></div>
              </div>
            </div>
          ) : isSettingError && !isSettingFetching ? (
            <Refetch refetch={refetchSetting} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center gap-1"
            >
              <h2 className="self-center align-baseline text-xl sm:text-2xl leading-tight tracking-tighter font-semibold uppercase text-black line-clamp-2 text-center max-w-3xl">
                {appSetting?.value?.title ?? "[Judul layanan belum diatur]"}
              </h2>
              <p className="self-center align-baseline text-sm sm:text-base font-normal italic text-[#DDA853] line-clamp-2 text-center max-w-2xl">
                {appSetting?.value?.subTitle ?? "[Sub judul layanan belum diatur]"}
              </p>
            </motion.div>
          )}
        </div>

        {/* ─── Mobile Bottom Bar ─── */}
        <div
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="flex md:hidden overflow-x-auto h-full w-full font-medium"
        >
          <div className="flex flex-col min-w-full w-fit h-full justify-between">
            <div className="flex flex-row items-center justify-start xs:justify-center min-w-full w-fit gap-3 px-10 pb-1 flex-1">
              {showSkeleton ? (
                <div className="flex w-full justify-center animate-pulse space-x-2 py-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-14 h-11 rounded-md flex-shrink-0"></div>
                  ))}
                </div>
              ) : showError ? (
                <Refetch refetch={refetch} />
              ) : showEmpty ? (
                <p className="text-gray-500 text-center text-xs w-full py-2">Layanan tidak tersedia</p>
              ) : (
                services.map((item) => (
                  <MobileBarItem
                    key={item.id ?? item.title}
                    item={item}
                    onClick={handleOpenModal}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* ─── Desktop Grid ─── */}
        <div className="hidden h-fit md:flex col-span-8 pt-2 px-1 flex-wrap justify-center items-stretch w-full font-medium gap-4">
          {showSkeleton ? (
            <div className="flex w-full animate-pulse space-x-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col mx-2 rounded-md w-full h-56 w-56"></div>
              ))}
            </div>
          ) : showError ? (
            <Refetch refetch={refetch} />
          ) : showEmpty ? (
            <div className="flex justify-center w-full space-x-3">
              <p className="text-black flex text-center items-center text-md dark:text-gray-400">Layanan tidak tersedia</p>
            </div>
          ) : (
            services.map((item, i) => (
              <DesktopServiceCard
                key={item.id ?? item.title}
                item={item}
                onClick={handleOpenModal}
                index={i}
              />
            ))
          )}
        </div>
      </section>

      {/* ─── Sub-service Modal ─── */}
      <Modal
        show={!!selectedService}
        onClose={handleCloseModal}
        size="3xl"
        dismissible
      >
        <ModalHeader>
          <div className="flex items-center gap-3">
            {selectedService?.image ? (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              (() => {
                const Icon = Icons[selectedService?.icon] ?? Icons.FaQuestion;
                return (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#226597]" />
                  </div>
                );
              })()
            )}
            <div className="min-w-0 flex-1">
              <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                {selectedService?.title}
              </span>
              {selectedService?.description && (
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                  {selectedService.description}
                </p>
              )}
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <AnimatePresence>
              {selectedService?.child?.map((child, i) => (
                <ModalChildCard key={child.id ?? child.title} item={child} index={i} />
              ))}
            </AnimatePresence>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default App;
