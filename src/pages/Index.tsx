import { motion, type Transition } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ArrowRight } from 'lucide-react';

const heroImages = [
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=800&fit=crop',
];

const featuredWorks = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1560577229-044e148edff8?w=400&h=500&fit=crop',
    title: 'Bridal Glam',
    category: 'Wedding',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=400&h=600&fit=crop',
    title: 'Editorial Look',
    category: 'Fashion',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1596704017254-9b5e2a025acf?w=400&h=400&fit=crop',
    title: 'Natural Beauty',
    category: 'Everyday',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1588387332692-89cc30c8f48d?w=400&h=550&fit=crop',
    title: 'Bold & Dramatic',
    category: 'Event',
  },
];

const customEase = [0.6, 0.01, 0.05, 0.95] as [number, number, number, number];

const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: customEase,
    } as Transition,
  }),
};

const Index = () => {
  const brandName = 'Finafusion';

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              className="text-left"
            >
              <div className="overflow-hidden mb-6">
                <h1 className="text-5xl md:text-7xl font-bold text-text-light leading-tight">
                  {brandName.split('').map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterAnimation}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </h1>
              </div>

              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-xl md:text-2xl text-muted-foreground mb-8 font-light"
              >
                Makeup as an art form
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="text-[15px] text-text-light/80 mb-10 max-w-md leading-relaxed"
              >
                Transforming faces into masterpieces. From bridal elegance to editorial 
                boldness, every look tells a story of beauty and confidence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.4 }}
              >
                <Link
                  to="/book"
                  className="inline-flex items-center gap-3 bg-gold text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-gold/90 transition-all group"
                >
                  Book an Appointment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Images */}
            <div className="relative h-[500px] md:h-[600px]">
              {heroImages.map((img, index) => (
                <motion.div
                  key={index}
                  className="absolute rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    width: index === 0 ? '60%' : index === 1 ? '50%' : '45%',
                    height: index === 0 ? '70%' : index === 1 ? '55%' : '50%',
                    top: index === 0 ? '0' : index === 1 ? '20%' : '40%',
                    left: index === 0 ? '0' : index === 1 ? '45%' : '10%',
                    zIndex: 3 - index,
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: 0.5 + index * 0.3,
                    duration: 0.8,
                    ease: customEase,
                  }}
                >
                  <img
                    src={img}
                    alt={`Makeup look ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold text-text-light mb-6"
          >
            Where Beauty Meets Art
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[15px] text-text-light/70 leading-relaxed"
          >
            With years of experience in bridal, editorial, and special event makeup, 
            I bring a unique artistic vision to every face I touch. My philosophy is simple: 
            enhance your natural beauty while creating looks that make you feel extraordinary.
          </motion.p>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-text-light mb-4">
              Featured Works
            </h2>
            <p className="text-muted-foreground text-[15px]">
              A glimpse into the artistry
            </p>
          </motion.div>

          {/* Asymmetric Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                className={`relative group overflow-hidden rounded-xl ${
                  index === 0 ? 'col-span-2 row-span-2' : ''
                } ${index === 1 ? 'md:mt-12' : ''} ${index === 3 ? 'md:-mt-8' : ''}`}
                initial={{ opacity: 0, y: 30 + index * 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <div
                  className={`${
                    index === 0 ? 'aspect-[3/4]' : 'aspect-[3/4]'
                  } overflow-hidden`}
                >
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-4 left-4">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="text-gold text-[13px] uppercase tracking-wider"
                    >
                      {work.category}
                    </motion.p>
                    <h3 className="text-text-light text-lg font-medium">
                      {work.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <Link
              to="/works"
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors text-[15px] font-medium"
            >
              View All Works
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-12 md:p-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-text-light mb-6">
              Ready to Transform?
            </h2>
            <p className="text-text-light/70 text-[15px] mb-10 max-w-xl mx-auto">
              Whether it's your wedding day, a special event, or an editorial shoot, 
              let's create something beautiful together.
            </p>
            <Link
              to="/book"
              className="inline-flex items-center gap-3 bg-gold text-white px-10 py-4 rounded-full text-[15px] font-medium hover:bg-gold/90 transition-all group"
            >
              Book Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
