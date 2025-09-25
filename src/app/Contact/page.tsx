'use client';

import { useState, useEffect } from 'react';
import { generateTimeSlots, getMinDate, getMaxDate } from '@/utils/meetingUtils';
import Image from 'next/image';
import telephoneLaptopImage from '@/images/businessman-talking-phone.jpg';
import { useI18n } from '@/contexts/I18nContext';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { useNavigation } from '@/hooks/useNavigation';

interface ContactFormData {
  name: string;
  email: string;
  meetingDate: string;
  meetingTime: string;
  industry: string;
  description: string;
}

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Real Estate',
  'Transportation',
  'Energy',
  'Agriculture',
  'Other'
];

export default function ContactPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    meetingDate: '',
    meetingTime: '',
    industry: '',
    description: ''
  });
  const { handleNavigation } = useNavigation();

  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    // Generate time slots locally
    setTimeSlots(generateTimeSlots());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

             if (response.ok) {
         // Show success popup
         setShowSuccessPopup(true);
         // Reset form
         setFormData({
           name: '',
           email: '',
           meetingDate: '',
           meetingTime: '',
           industry: '',
           description: ''
         });
       } else {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to send meeting request. Please try again.'
        });
      }
    } catch {
      setMessage({
        type: 'error',
        text: 'Network error. Please check your connection and try again.'
      });
         } finally {
       setIsLoading(false);
     }
   };

   const closeSuccessPopup = () => {
     setShowSuccessPopup(false);
   };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar onNavigate={handleNavigation} />
      
      {/* Hero Section */}
      <div className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-r from-primary/80 to-primary-hover/80 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={telephoneLaptopImage}
            alt="Modern workspace with telephone and laptop"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent"></div>
        <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-primary-foreground max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">{t('contactPage.heroTitle')}</h1>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80">
              {t('contactPage.heroSubtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information and Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20">
        <div className="bg-surface rounded-2xl shadow-2xl overflow-hidden border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Column - Contact Information */}
            <div className="bg-muted p-6 sm:p-8 lg:p-12">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">{t('contactPage.getInTouchTitle')}</h2>
                <p className="text-muted-foreground text-base sm:text-lg">
                  {t('contactPage.getInTouchSubtitle')}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
                <div className="flex items-start space-x-3 sm:space-x-4 pb-3 sm:pb-4 border-b border-primary">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1 sm:mb-2">{t('contactPage.headOffice')}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">{t('footer.address')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 pb-3 sm:pb-4 border-b border-primary">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1 sm:mb-2">{t('contactPage.emailUs')}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base break-all">Wissem@rkhamiconsultinggroup.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 pb-3 sm:pb-4 border-b border-primary">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1 sm:mb-2">{t('contactPage.callUs')}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">Phone: +216 54064053</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-foreground text-base sm:text-lg mb-3 sm:mb-4">{t('contactPage.followSocial')}</h3>
                <div className="flex space-x-2 sm:space-x-3">
                  {/* Instagram */}
                  <a href="https://www.instagram.com/rkhami_consulting_group/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors" aria-label="Instagram" title="Instagram">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  
                  {/* Facebook */}
                  <a href="https://www.facebook.com/p/Rkhami-Consulting-Group-61579115070882/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors" aria-label="Facebook" title="Facebook">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
                  {/* LinkedIn */}
                  <a href="https://tn.linkedin.com/in/rkhami-consulting-group-10ab92378" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors" aria-label="LinkedIn" title="LinkedIn">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  
                  {/* WhatsApp */}
                  <a href="https://wa.me/21654064053" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors" aria-label="WhatsApp" title="WhatsApp">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="p-6 sm:p-8 lg:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">{t('contactPage.formTitle')}</h2>
              
                             <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                 <div className="space-y-1">
                   <p className="text-xs sm:text-sm text-muted-foreground">{t('contactPage.formIntro')}</p>
                 </div>
                                 {/* Name and Email */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      {t('contactPage.labels.companyName')}
                    </label>
                                         <input
                       type="text"
                       id="name"
                       name="name"
                       value={formData.name}
                       onChange={handleInputChange}
                       required
                       className="w-full px-4 py-3 bg-transparent border-b-2 border-primary focus:border-primary transition-colors text-foreground placeholder-muted-foreground"
                       placeholder={t('contactPage.placeholders.companyName')}
                     />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      {t('contactPage.labels.emailAddress')}
                    </label>
                                         <input
                       type="email"
                       id="email"
                       name="email"
                       value={formData.email}
                       onChange={handleInputChange}
                       required
                       className="w-full px-4 py-3 bg-transparent border-b-2 border-primary focus:border-primary transition-colors text-foreground placeholder-muted-foreground"
                       placeholder={t('contactPage.placeholders.emailAddress')}
                     />
                  </div>
                </div>

                                 {/* Meeting Date and Time */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="meetingDate" className="block text-sm font-medium text-foreground mb-2">
                      {t('contactPage.labels.meetingDate')}
                    </label>
                                         <input
                       type="date"
                       id="meetingDate"
                       name="meetingDate"
                       value={formData.meetingDate}
                       onChange={handleInputChange}
                       required
                       min={getMinDate()}
                       max={getMaxDate()}
                       className="w-full px-4 py-3 bg-transparent border-b-2 border-primary focus:border-primary transition-colors text-foreground"
                     />
                    <p className="text-xs text-muted-foreground mt-1">
                      {t('contactPage.helpers.availableMonths')}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="meetingTime" className="block text-sm font-medium text-foreground mb-2">
                      {t('contactPage.labels.meetingTime')}
                    </label>
                                         <select
                       id="meetingTime"
                       name="meetingTime"
                       value={formData.meetingTime}
                       onChange={handleInputChange}
                       required
                       className="w-full px-4 py-3 bg-transparent border-b-2 border-primary focus:border-primary transition-colors text-foreground"
                     >
                      <option value="">{t('contactPage.placeholders.timeSlot')}</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">
                      30-minute slots between 9:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>

                {/* Industry */}
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-foreground mb-2">
                    {t('contactPage.labels.industry')}
                  </label>
                                     <select
                     id="industry"
                     name="industry"
                     value={formData.industry}
                     onChange={handleInputChange}
                     required
                     className="w-full px-4 py-3 bg-transparent border-b-2 border-primary focus:border-primary transition-colors text-foreground"
                   >
                    <option value="">{t('contactPage.placeholders.industry')}</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                    {t('contactPage.labels.description')}
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-transparent border-b-2 border-border focus:border-primary transition-colors text-foreground placeholder-muted-foreground"
                    placeholder={t('contactPage.placeholders.description')}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('contactPage.helpers.descriptionHelp')}
                  </p>
                </div>

                                 {/* Error Message Display */}
                 {message && message.type === 'error' && (
                   <div className="p-4 rounded-lg bg-accent/20 text-accent-foreground border border-accent/30">
                     {message.text}
                   </div>
                 )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-lg transition-all duration-200 ${
                    isLoading
                      ? 'bg-muted-foreground cursor-not-allowed'
                      : 'hover:bg-primary-hover hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('contactPage.submitting')}
                    </div>
                  ) : (
                    t('contactPage.submit')
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing between content and footer */}
      <div className="mt-12 sm:mt-16 lg:mt-20 mb-6 sm:mb-10"></div>

             {/* Footer */}
       <Footer />

       {/* Success Popup Modal */}
       {showSuccessPopup && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <div className="bg-surface rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl border border-border">
             {/* Success Icon */}
             <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-highlight/20 rounded-full flex items-center justify-center mb-4 sm:mb-6">
               <svg className="w-6 h-6 sm:w-8 sm:h-8 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
               </svg>
             </div>
             
             {/* Success Message */}
             <div className="text-center mb-4 sm:mb-6">
               <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                 {t('contactPage.success.title')}
               </h3>
               <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                 {t('contactPage.success.description')}
               </p>
             </div>
             
             {/* Action Button */}
             <button
               onClick={closeSuccessPopup}
               className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
             >
               {t('contactPage.success.button')}
             </button>
           </div>
         </div>
       )}
     </div>
   );
 }

