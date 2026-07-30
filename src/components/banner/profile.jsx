import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Refetch from '../../atoms/refetch';
import RichTextContent from '../../atoms/RichTextContent';
import { useDynamicSections } from '../../hooks/settings/useDynamicSections';

export default function Profile() {
  const { sections, isLoading, isError, refetch } = useDynamicSections();
  const [activeTab, setActiveTab] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const tabContainerRef = useRef(null);

  // Set first tab as active when sections load
  useEffect(() => {
    if (sections.length > 0 && !activeTab) {
      setActiveTab(sections[0].config.id);
    }
  }, [sections, activeTab]);

  // Autoplay Carousel dengan Interval 6 Detik & Auto Pause saat hover / touch / focus
  useEffect(() => {
    if (sections.length <= 1 || isPaused || !activeTab) return;

    const interval = setInterval(() => {
      const currentIndex = sections.findIndex((s) => s.config.id === activeTab);
      const nextIndex = (currentIndex + 1) % sections.length;
      setActiveTab(sections[nextIndex].config.id);
    }, 6000);

    return () => clearInterval(interval);
  }, [sections, activeTab, isPaused]);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsPaused(false), 2000);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="relative w-full flex justify-center items-center">
        <div className="max-w-full w-full flex flex-col align-middle justify-center dark:bg-gray-700 dark:border-gray-600 px-4 md:px-6">
          <div className="animate-pulse">
            {/* Tab skeleton */}
            <div className="flex justify-center mb-6">
              <div className="flex gap-3 bg-gray-100 dark:bg-gray-700 rounded-full p-2">
                <div className="h-10 w-28 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
                <div className="h-10 w-24 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
                <div className="h-10 w-20 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
              </div>
            </div>
            {/* Content skeleton */}
            <div className="bg-white dark:bg-gray-700 rounded-2xl min-h-[300px] p-6 md:p-10">
              <div className="space-y-4 max-w-3xl mx-auto">
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-600 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                <div className="h-24 w-full bg-gray-100 dark:bg-gray-600 rounded-lg mt-6"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="relative w-full flex justify-center items-center">
        <div className="max-w-full w-full flex flex-col align-middle justify-center dark:bg-gray-700 dark:border-gray-600">
          <div className="flex min-h-[300px] justify-center items-center">
            <Refetch refetch={refetch} />
          </div>
        </div>
      </section>
    );
  }

  // No sections available
  if (sections.length === 0) return null;

  const activeSection = sections.find((s) => s.config.id === activeTab) || sections[0];
  const rawContent = activeSection?.content?.trim() || '';
  const cleanText = rawContent.replace(/<[^>]*>/g, '').trim();
  const hasContent = cleanText.length > 0 || /<img|<iframe|<video/i.test(rawContent);

  return (
    <section
      className="relative w-full flex justify-center items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={handleTouchEnd}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="max-w-full w-full flex flex-col align-middle justify-center dark:bg-gray-700 dark:border-gray-600">

        {/* ─── Tab Bar ─── */}
        <div className="flex justify-center mb-6">
          <div
            ref={tabContainerRef}
            className="flex gap-3 bg-gray-100 dark:bg-gray-700 rounded-full p-2 overflow-x-auto scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {sections.map((section) => {
              const isActive = activeTab === section.config.id;
              return (
                <button
                  key={section.config.id}
                  id={`profile-tab-${section.config.id}`}
                  onClick={() => handleTabClick(section.config.id)}
                  className={`px-6 py-3 flex flex-none rounded-full text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {section.config.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Content Canvas ─── */}
        <div
          className="bg-white dark:bg-gray-700 rounded-2xl min-h-[300px] max-h-[80vh] overflow-y-auto flex flex-col items-center"
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="w-full px-4 py-4 min-h-[260px] sm:min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full min-h-[260px] sm:min-h-[280px] flex flex-col"
              >
                {hasContent ? (
                  <RichTextContent
                    content={rawContent}
                    className="max-w-none"
                  />
                ) : (
                  <div className="w-full flex-1 flex items-center justify-center min-h-[220px] sm:min-h-[250px] text-gray-400 dark:text-gray-400 text-sm font-medium italic border border-dashed border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 p-6 text-center select-none">
                    Informasi tidak tersedia.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
