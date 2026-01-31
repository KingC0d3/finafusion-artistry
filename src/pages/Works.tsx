import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';

const portfolioImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1560577229-044e148edff8?w=400&h=500&fit=crop', category: 'Bridal', size: 'tall' },
  { id: 2, src: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=400&h=400&fit=crop', category: 'Editorial', size: 'square' },
  { id: 3, src: 'https://images.unsplash.com/photo-1596704017254-9b5e2a025acf?w=500&h=600&fit=crop', category: 'Glam', size: 'tall' },
  { id: 4, src: 'https://images.unsplash.com/photo-1588387332692-89cc30c8f48d?w=400&h=350&fit=crop', category: 'Event', size: 'wide' },
  { id: 5, src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=350&h=450&fit=crop', category: 'Bridal', size: 'tall' },
  { id: 6, src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop', category: 'Editorial', size: 'square' },
  { id: 7, src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=450&h=550&fit=crop', category: 'Glam', size: 'tall' },
  { id: 8, src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop', category: 'Natural', size: 'wide' },
  { id: 9, src: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=380&h=480&fit=crop', category: 'Bridal', size: 'tall' },
  { id: 10, src: 'https://images.unsplash.com/photo-1526045478516-99145907023c?w=400&h=400&fit=crop', category: 'Editorial', size: 'square' },
  { id: 11, src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=420&h=520&fit=crop', category: 'Glam', size: 'tall' },
  { id: 12, src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=350&fit=crop', category: 'Natural', size: 'wide' },
];

const videos = [
  { id: 1, src: 'https://assets.mixkit.co/videos/preview/mixkit-woman-applying-makeup-with-a-brush-4721-large.mp4', title: 'Bridal Prep' },
  { id: 2, src: 'https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-woman-in-a-pool-1259-large.mp4', title: 'Editorial Shoot' },
  { id: 3, src: 'https://assets.mixkit.co/videos/preview/mixkit-womans-feet-walking-on-the-sand-1148-large.mp4', title: 'BTS Look' },
  { id: 4, src: 'https://assets.mixkit.co/videos/preview/mixkit-woman-applying-lipstick-close-up-4686-large.mp4', title: 'Lipstick Application' },
  { id: 5, src: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-4782-large.mp4', title: 'Final Reveal' },
  { id: 6, src: 'https://assets.mixkit.co/videos/preview/mixkit-woman-applying-makeup-with-a-brush-4721-large.mp4', title: 'Contouring' },
];

const Works = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (activeVideo === null) {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= container.scrollWidth / 2) {
          scrollPosition = 0;
        }
        container.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [activeVideo]);

  const handleVideoInteraction = (index: number, isActive: boolean) => {
    const video = videoRefs.current[index];
    if (video) {
      if (isActive) {
        setActiveVideo(index);
        video.play();
      } else {
        setActiveVideo(null);
        video.pause();
      }
    }
  };

  const toggleVideoPlay = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        setActiveVideo(index);
        video.play();
      } else {
        setActiveVideo(null);
        video.pause();
      }
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-text-light mb-4">
              Works
            </h1>
            <p className="text-muted-foreground text-[15px] max-w-xl">
              A curated collection of bridal, editorial, and event makeup artistry. 
              Each look crafted with precision and passion.
            </p>
          </motion.div>

          {/* Portfolio Grid - Masonry-like layout */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {portfolioImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="break-inside-avoid group relative overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: index % 2 === 0 ? 30 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  delay: (index % 4) * 0.1,
                  duration: 0.6,
                  ease: [0.6, 0.01, 0.05, 0.95],
                }}
              >
                <img
                  src={image.src}
                  alt={`Portfolio ${image.category}`}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{
                    height: image.size === 'tall' ? '350px' : image.size === 'wide' ? '200px' : '280px',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div
                    className="absolute bottom-4 left-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    <span className="text-gold text-[13px] uppercase tracking-wider">
                      {image.category}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-text-light mb-4">
              Behind the Scenes
            </h2>
            <p className="text-muted-foreground text-[15px]">
              Watch the magic unfold
            </p>
          </motion.div>
        </div>

        {/* Scrolling Videos Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-6 pl-4">
            {/* Duplicate videos for seamless loop */}
            {[...videos, ...videos].map((video, index) => (
              <motion.div
                key={`${video.id}-${index}`}
                className="relative flex-shrink-0 w-[280px] md:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 6) * 0.1, duration: 0.5 }}
                onMouseEnter={() => handleVideoInteraction(index, true)}
                onMouseLeave={() => handleVideoInteraction(index, false)}
                onClick={() => toggleVideoPlay(index)}
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                />
                
                {/* Pause Button */}
                {activeVideo === index && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoPlay(index);
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-5 h-5"
                    >
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  </motion.button>
                )}

                {/* Overlay Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-text-light text-[15px] font-medium">
                    {video.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Works;
