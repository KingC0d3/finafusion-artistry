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
import { ChevronDown, Check } from 'lucide-react';
import { toast } from 'sonner';

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  serviceType: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Please select a location'),
  notes: z.string().optional(),
  policyAccepted: z.boolean().refine((val) => val === true, 'You must accept the policy'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const policies = [
  {
    title: 'Booking Fee',
    content: 'A non-refundable booking fee of 30% is required to secure your appointment. This fee will be deducted from your total service cost.',
  },
  {
    title: 'Cancellation Policy',
    content: 'Cancellations made less than 48 hours before your appointment will result in forfeiture of the booking fee. Cancellations made 48+ hours in advance may be rescheduled with no penalty.',
  },
  {
    title: 'Late Arrival',
    content: 'If you arrive more than 15 minutes late, your appointment may be shortened or rescheduled. The full service fee may still apply if the appointment cannot be completed.',
  },
  {
    title: 'No-Show Policy',
    content: 'Failure to show up for your appointment without prior notice will result in a full charge of the service fee and may affect future bookings.',
  },
];

const serviceTypes = [
  'Bridal Makeup',
  'Editorial/Fashion',
  'Event Makeup',
  'Photoshoot',
  'Special Occasion',
  'Natural/Everyday',
];

const locations = [
  { value: 'studio', label: 'Studio (Ikota Villa, Lekki)' },
  { value: 'client', label: 'Client Location' },
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

const BookAppointment = () => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      policyAccepted: false,
    },
  });

  const policyAccepted = watch('policyAccepted');

  const onSubmit = (data: BookingFormData) => {
    console.log('Booking data:', data);
    setIsSubmitted(true);
    toast.success('Booking request submitted successfully!');
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
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
              Booking Confirmed!
            </h2>
            <p className="text-text-light/70 text-[15px]">
              Thank you for your booking request. We'll be in touch within 24 hours to confirm your appointment details.
            </p>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text-light mb-4">
              Book Appointment
            </h1>
            <p className="text-muted-foreground text-[15px]">
              Let's create something beautiful together
            </p>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="border border-border rounded-2xl p-8 md:p-10"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <motion.div custom={0} variants={inputVariants} initial="hidden" animate="visible">
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
              </motion.div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div custom={1} variants={inputVariants} initial="hidden" animate="visible">
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
                </motion.div>

                <motion.div custom={2} variants={inputVariants} initial="hidden" animate="visible">
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
                </motion.div>
              </div>

              {/* Service Type */}
              <motion.div custom={3} variants={inputVariants} initial="hidden" animate="visible">
                <Label className="text-text-light text-[15px] mb-2 block">
                  Service Type
                </Label>
                <Select onValueChange={(value) => setValue('serviceType', value)}>
                  <SelectTrigger className="h-14 bg-muted border-border text-text-light text-[15px] rounded-xl">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary border-border">
                    {serviceTypes.map((service) => (
                      <SelectItem
                        key={service}
                        value={service}
                        className="text-text-light text-[15px]"
                      >
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.serviceType && (
                  <p className="text-red-400 text-[13px] mt-1">{errors.serviceType.message}</p>
                )}
              </motion.div>

              {/* Date & Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div custom={4} variants={inputVariants} initial="hidden" animate="visible">
                  <Label htmlFor="date" className="text-text-light text-[15px] mb-2 block">
                    Preferred Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    {...register('date')}
                    className="h-14 bg-muted border-border text-text-light text-[15px] rounded-xl"
                  />
                  {errors.date && (
                    <p className="text-red-400 text-[13px] mt-1">{errors.date.message}</p>
                  )}
                </motion.div>

                <motion.div custom={5} variants={inputVariants} initial="hidden" animate="visible">
                  <Label className="text-text-light text-[15px] mb-2 block">
                    Preferred Time
                  </Label>
                  <Select onValueChange={(value) => setValue('time', value)}>
                    <SelectTrigger className="h-14 bg-muted border-border text-text-light text-[15px] rounded-xl">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-secondary border-border">
                      {timeSlots.map((time) => (
                        <SelectItem
                          key={time}
                          value={time}
                          className="text-text-light text-[15px]"
                        >
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.time && (
                    <p className="text-red-400 text-[13px] mt-1">{errors.time.message}</p>
                  )}
                </motion.div>
              </div>

              {/* Location */}
              <motion.div custom={6} variants={inputVariants} initial="hidden" animate="visible">
                <Label className="text-text-light text-[15px] mb-2 block">
                  Location
                </Label>
                <Select onValueChange={(value) => setValue('location', value)}>
                  <SelectTrigger className="h-14 bg-muted border-border text-text-light text-[15px] rounded-xl">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary border-border">
                    {locations.map((loc) => (
                      <SelectItem
                        key={loc.value}
                        value={loc.value}
                        className="text-text-light text-[15px]"
                      >
                        {loc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.location && (
                  <p className="text-red-400 text-[13px] mt-1">{errors.location.message}</p>
                )}
              </motion.div>

              {/* Notes */}
              <motion.div custom={7} variants={inputVariants} initial="hidden" animate="visible">
                <Label htmlFor="notes" className="text-text-light text-[15px] mb-2 block">
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  {...register('notes')}
                  className="min-h-[120px] bg-muted border-border text-text-light text-[15px] rounded-xl resize-none"
                  placeholder="Tell us about your vision, reference images, or any special requirements..."
                />
              </motion.div>

              {/* Policy Section */}
              <motion.div custom={8} variants={inputVariants} initial="hidden" animate="visible">
                <button
                  type="button"
                  onClick={() => setIsPolicyOpen(!isPolicyOpen)}
                  className="w-full flex items-center justify-between p-4 bg-muted rounded-xl border border-border hover:border-gold/50 transition-colors"
                >
                  <span className="text-text-light text-[15px] font-medium">
                    Booking Policies
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
                        {policies.map((policy, index) => (
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
              </motion.div>

              {/* Accept Policy Checkbox */}
              <motion.div custom={9} variants={inputVariants} initial="hidden" animate="visible">
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
                    I have read and agree to the booking policies
                  </Label>
                </div>
                {errors.policyAccepted && (
                  <p className="text-red-400 text-[13px] mt-2">{errors.policyAccepted.message}</p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div custom={10} variants={inputVariants} initial="hidden" animate="visible">
                <Button
                  type="submit"
                  disabled={!policyAccepted}
                  className="w-full h-14 bg-gold hover:bg-gold/90 text-white text-[15px] font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Booking Request
                  </motion.span>
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BookAppointment;
