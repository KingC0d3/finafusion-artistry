import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Instagram, MapPin } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560577229-044e148edff8?w=600&h=800&fit=crop"
                  alt="Finafusion Artist"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold rounded-2xl -z-10"
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-text-light mb-6">
                About <span className="text-gold">Finafusion</span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-text-light/80 text-[15px] leading-relaxed mb-6"
              >
                With over 8 years of experience in the beauty industry, I've had the privilege of 
                transforming faces for hundreds of brides, fashion editorials, and special events 
                across Nigeria and beyond.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-text-light/80 text-[15px] leading-relaxed mb-6"
              >
                My philosophy is simple: makeup should enhance your natural beauty, not mask it. 
                Every face tells a story, and my job is to help that story shine through with 
                confidence and elegance.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-text-light/80 text-[15px] leading-relaxed mb-8"
              >
                Trained in both traditional and contemporary techniques, I bring a unique artistic 
                vision to every look I create. Whether it's a soft, romantic bridal glow or a bold 
                editorial statement, I approach each project with passion and precision.
              </motion.p>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <a
                  href="https://twitter.com/finafusion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-light hover:border-gold hover:text-gold transition-colors"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/finafusion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-light hover:border-gold hover:text-gold transition-colors"
                >
                  <Instagram size={20} />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
          >
            {[
              { number: '8+', label: 'Years Experience' },
              { number: '500+', label: 'Happy Brides' },
              { number: '50+', label: 'Editorial Features' },
              { number: '100+', label: 'Students Trained' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-6 border border-border rounded-2xl hover:border-gold/50 transition-colors"
              >
                <span className="text-3xl md:text-4xl font-bold text-gold block mb-2">
                  {stat.number}
                </span>
                <span className="text-text-light/60 text-[14px]">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Studio Location */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-gold" />
              <h2 className="text-2xl md:text-3xl font-semibold text-text-light">
                Studio Location
              </h2>
            </div>
            <p className="text-text-light/70 text-[15px] mb-6">
              Ikota Villa, Lekki, Lagos, Nigeria
            </p>

            {/* Map Embed */}
            <div className="aspect-video rounded-2xl overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7276261667447!2d3.5387!3d6.4432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf70e!2sIkota%20Villa%20Estate!5e0!3m2!1sen!2sng!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Finafusion Studio Location"
              />
            </div>
          </motion.div>

          {/* Philosophy Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-10 md:p-14"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-text-light mb-6 text-center">
              My Philosophy
            </h2>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-text-light/70 text-lg italic leading-relaxed">
                "Beauty is not about perfection—it's about expression. Every brushstroke is an 
                opportunity to reveal the unique essence of who you are. I don't just apply makeup; 
                I create confidence, one face at a time."
              </p>
              <div className="mt-6 w-16 h-0.5 bg-gold mx-auto" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
