import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, Check, GraduationCap, Users, Clock, Award } from 'lucide-react';
import { toast } from 'sonner';

const trainingSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  courseType: z.string().min(1, 'Please select a course'),
  experience: z.string().min(1, 'Please select your experience level'),
  message: z.string().optional(),
  policyAccepted: z.boolean().refine((val) => val === true, 'You must accept the policy'),
});

type TrainingFormData = z.infer<typeof trainingSchema>;

const trainingCourses = [
  {
    title: 'Beginner Foundations',
    duration: '4 Weeks',
    students: '1-on-1',
    description: 'Perfect for those new to makeup artistry. Learn the fundamentals of color theory, skin preparation, and basic application techniques.',
    features: ['Skin prep & primer application', 'Foundation matching & blending', 'Basic eye makeup techniques', 'Lip application & contouring basics'],
    icon: GraduationCap,
  },
  {
    title: 'Bridal Masterclass',
    duration: '6 Weeks',
    students: 'Small Group',
    description: 'Specialize in bridal makeup with advanced techniques for long-lasting, photogenic looks that photograph beautifully.',
    features: ['Bridal consultation process', 'Long-wear techniques', 'Photography-ready makeup', 'Veil-friendly styling'],
    icon: Award,
  },
  {
    title: 'Editorial & Fashion',
    duration: '8 Weeks',
    students: '1-on-1',
    description: 'Master high-fashion and editorial looks for runway, print, and creative projects. Push boundaries and develop your artistic voice.',
    features: ['Avant-garde techniques', 'Color theory advanced', 'Editorial styling', 'Portfolio building'],
    icon: Users,
  },
  {
    title: 'Business of Beauty',
    duration: '3 Weeks',
    students: 'Group',
    description: 'Turn your passion into profit. Learn pricing, client management, social media marketing, and building a sustainable beauty business.',
    features: ['Pricing strategies', 'Client management', 'Social media marketing', 'Brand building'],
    icon: Clock,
  },
];

const trainingPolicies = [
  {
    title: 'Registration Fee',
    content: 'A non-refundable registration fee of 20% is required to secure your spot in the training program. This fee will be deducted from your total course cost.',
  },
  {
    title: 'Cancellation Policy',
    content: 'Cancellations made less than 7 days before course start date will result in forfeiture of the registration fee. Earlier cancellations may receive a full refund or transfer to a future session.',
  },
  {
    title: 'Attendance',
    content: 'Regular attendance is required to complete the course. Missing more than 2 sessions may result in additional fees to catch up or course restart.',
  },
  {
    title: 'Materials',
    content: 'All training materials and practice products are provided. Students are encouraged to bring their own professional kit for personalized guidance.',
  },
];

const experienceLevels = [
  'Complete Beginner',
  'Some Experience (Self-taught)',
  'Trained (1-2 years)',
  'Professional (3+ years)',
];

const Training = () => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TrainingFormData>({
    resolver: zodResolver(trainingSchema),
    defaultValues: {
      policyAccepted: false,
    },
  });

  const policyAccepted = watch('policyAccepted');

  const onSubmit = (data: TrainingFormData) => {
    console.log('Training enrollment:', data);
    setIsSubmitted(true);
    toast.success('Enrollment request submitted successfully!');
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto text-center glass rounded-3xl p-12 border border-border"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-semibold text-text-light mb-4">
              Enrollment Submitted!
            </h2>
            <p className="text-text-light/70 text-[15px]">
              Thank you for your interest in our training programs. We'll contact you within 48 hours with course details and next steps.
            </p>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-text-light mb-4">
              Training Programs
            </h1>
            <p className="text-muted-foreground text-[15px] max-w-xl mx-auto">
              Master the art of makeup with personalized training programs designed to elevate your skills from beginner to professional.
            </p>
          </motion.div>

          {/* Course Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {trainingCourses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 30, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="group border border-border rounded-2xl p-8 hover:border-gold/50 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <course.icon className="w-7 h-7 text-gold" />
                  </div>
                  <div className="text-right">
                    <span className="text-gold text-[13px] font-medium block">
                      {course.duration}
                    </span>
                    <span className="text-muted-foreground text-[13px]">
                      {course.students}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-text-light mb-3">
                  {course.title}
                </h3>
                <p className="text-text-light/60 text-[15px] mb-6 leading-relaxed">
                  {course.description}
                </p>

                <div className="space-y-2">
                  {course.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                      <span className="text-text-light/70 text-[14px]">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Form Section */}
      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-text-light mb-4">
              Enroll Now
            </h2>
            <p className="text-muted-foreground text-[15px]">
              Start your journey to becoming a professional makeup artist
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="border border-border rounded-2xl p-8 md:p-10"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-text-light text-[15px] mb-2 block">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  {...register('fullName')}
                  className="h-14 bg-muted border-border text-text-light text-[15px] rounded-xl"
                  placeholder="Your full name"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-[13px] mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-text-light text-[15px] mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="h-14 bg-muted border-border text-text-light text-[15px] rounded-xl"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-[13px] mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-text-light text-[15px] mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className="h-14 bg-muted border-border text-text-light text-[15px] rounded-xl"
                    placeholder="+234 xxx xxx xxxx"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-[13px] mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Course Type */}
              <div>
                <Label className="text-text-light text-[15px] mb-2 block">
                  Course Interest
                </Label>
                <Select onValueChange={(value) => setValue('courseType', value)}>
                  <SelectTrigger className="h-14 bg-muted border-border text-text-light text-[15px] rounded-xl">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary border-border">
                    {trainingCourses.map((course) => (
                      <SelectItem
                        key={course.title}
                        value={course.title}
                        className="text-text-light text-[15px]"
                      >
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.courseType && (
                  <p className="text-red-400 text-[13px] mt-1">{errors.courseType.message}</p>
                )}
              </div>

              {/* Experience Level */}
              <div>
                <Label className="text-text-light text-[15px] mb-2 block">
                  Experience Level
                </Label>
                <Select onValueChange={(value) => setValue('experience', value)}>
                  <SelectTrigger className="h-14 bg-muted border-border text-text-light text-[15px] rounded-xl">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary border-border">
                    {experienceLevels.map((level) => (
                      <SelectItem
                        key={level}
                        value={level}
                        className="text-text-light text-[15px]"
                      >
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.experience && (
                  <p className="text-red-400 text-[13px] mt-1">{errors.experience.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-text-light text-[15px] mb-2 block">
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  {...register('message')}
                  className="min-h-[120px] bg-muted border-border text-text-light text-[15px] rounded-xl resize-none"
                  placeholder="Tell us about your goals and what you hope to achieve..."
                />
              </div>

              {/* Policy Section */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsPolicyOpen(!isPolicyOpen)}
                  className="w-full flex items-center justify-between p-4 bg-muted rounded-xl border border-border hover:border-gold/50 transition-colors"
                >
                  <span className="text-text-light text-[15px] font-medium">
                    Training Policies
                  </span>
                  <motion.div
                    animate={{ rotate: isPolicyOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gold" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isPolicyOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 p-6 bg-secondary/50 rounded-xl border border-border space-y-4">
                        {trainingPolicies.map((policy, index) => (
                          <motion.div
                            key={policy.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <h4 className="text-gold text-[15px] font-medium mb-1">
                              {policy.title}
                            </h4>
                            <p className="text-text-light/70 text-[14px] leading-relaxed">
                              {policy.content}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accept Policy Checkbox */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="policyAccepted"
                  checked={policyAccepted}
                  onCheckedChange={(checked) => setValue('policyAccepted', checked as boolean)}
                  className="mt-1 border-border data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                />
                <Label
                  htmlFor="policyAccepted"
                  className="text-text-light/80 text-[14px] cursor-pointer leading-relaxed"
                >
                  I have read and agree to the training policies
                </Label>
              </div>
              {errors.policyAccepted && (
                <p className="text-red-400 text-[13px]">{errors.policyAccepted.message}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!policyAccepted}
                className="w-full h-14 bg-gold hover:bg-gold/90 text-white text-[15px] font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Enrollment
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Training;
