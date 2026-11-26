"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Phone, MapPin, ChevronUp, Instagram, Facebook, Twitter } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
  onSelectBrand?: (brandId: string) => void;
  onNavigate?: (page: 'home' | 'shop' | 'contact' | 'appointment' | 'wishlist' | 'about' | 'privacy' | 'cart') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onSelectBrand, onNavigate }) => {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const accountLinks = [
    { label: 'Book Clinical Eye Exam', action: () => router.push('/appointment') },
    { label: 'Virtual 3D Try-On Studio', action: () => router.push('/shop') },
    { label: 'Track Order & Lab Status', action: () => router.push('/contact') },
    { label: 'Zeiss Lens Customizer', action: () => router.push('/shop') },
    { label: 'Customer Concierge', action: () => router.push('/contact') },
    { label: 'Our Policies & Guarantee', action: () => router.push('/privacy-policy') },
  ];

  const aboutLinks = [
    { label: 'Our Heritage (Estd. 1969)', action: () => router.push('/about-us') },
    { label: 'Zeiss Diagnostic Laboratory', action: () => router.push('/about-us') },
    { label: 'Clinical Optometry Atelier', action: () => router.push('/about-us') },
    { label: 'Flagship Store & Boutique', action: () => router.push('/contact') },
    { label: 'Privacy Notice', action: () => router.push('/privacy-policy') },
    { label: 'Terms & Conditions', action: () => router.push('/privacy-policy') },
  ];

  const luxuryAtelierLinks = [
    { label: 'Cartier Prestige', brand: 'Cartier' },
    { label: 'Maybach Icons of Luxury', brand: 'Maybach' },
    { label: 'Lindberg Titanium', brand: 'Lindberg' },
    { label: 'Gucci Atelier', brand: 'Gucci' },
    { label: 'GAST Independent', brand: 'GAST' },
    { label: 'Ray-Ban Heritage', brand: 'Ray-Ban' },
  ];

  const eyeglassesLinks = [
    { label: "Men's Optical Frames", category: 'eyeglasses' },
    { label: "Women's Optical Frames", category: 'eyeglasses' },
    { label: 'Rimless & Minimalist', category: 'eyeglasses' },
    { label: 'Titanium Ultra-Light', category: 'eyeglasses' },
    { label: 'Computer & Blue-Light', category: 'eyeglasses' },
    { label: 'Progressive & Single Vision', category: 'eyeglasses' },
  ];

  const sunglassesLinks = [
    { label: "Men's Sunglasses", category: 'sunglasses' },
    { label: "Women's Sunglasses", category: 'sunglasses' },
    { label: 'Polarized Performance', category: 'sunglasses' },
    { label: 'Aviator & Pilot Icons', category: 'sunglasses' },
    { label: 'Geometric & Square Frames', category: 'sunglasses' },
    { label: 'Limited Collector Editions', category: 'sunglasses' },
  ];

  const contactLensesLinks = [
    { label: 'Bausch & Lomb Ultra', category: 'contact-lenses' },
    { label: 'Acuvue Oasys & 1-Day', category: 'contact-lenses' },
    { label: 'CooperVision Biofinity', category: 'contact-lenses' },
    { label: 'Alcon Total 30 / Dailies', category: 'contact-lenses' },
    { label: 'Zeiss Contact Solutions', category: 'contact-lenses' },
    { label: 'Toric & Astigmatism Care', category: 'contact-lenses' },
  ];

  interface LinkItem {
    label: string;
    category?: string;
    brand?: string;
    action?: () => void;
  }

  const handleLinkClick = (item: LinkItem) => {
    if (item.category) {
      if (onSelectCategory) onSelectCategory(item.category);
      router.push(`/shop?category=${item.category}`);
    } else if (item.brand) {
      if (onSelectBrand) onSelectBrand(item.brand);
      router.push(`/shop?brand=${item.brand}`);
    } else if (item.action) {
      item.action();
    }
  };

  return (
    <footer className="bg-[#2A1E17] text-white pt-14 sm:pt-16 pb-12 sm:pb-14 border-t border-[#3D2C22] font-sans relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 6 Column Links Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 text-xs">
          
          {/* Column 1: CLIENT SERVICES */}
          <div>
            <h4 className="font-bold text-[13px] text-[#E59B62] tracking-wider uppercase mb-4 font-serif">
              CLIENT SERVICES
            </h4>
            <ul className="space-y-2.5 text-[#C4B6AA] text-[13px]">
              {accountLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: ABOUT PRECISION OPTICS */}
          <div>
            <h4 className="font-bold text-[13px] text-[#E59B62] tracking-wider uppercase mb-4 font-serif">
              ABOUT ATELIER
            </h4>
            <ul className="space-y-2.5 text-[#C4B6AA] text-[13px]">
              {aboutLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: LUXURY ATELIER */}
          <div>
            <h4 className="font-bold text-[13px] text-[#E59B62] tracking-wider uppercase mb-4 font-serif">
              LUXURY ATELIER
            </h4>
            <ul className="space-y-2.5 text-[#C4B6AA] text-[13px]">
              {luxuryAtelierLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: EYEGLASSES */}
          <div>
            <h4 className="font-bold text-[13px] text-[#E59B62] tracking-wider uppercase mb-4 font-serif">
              EYEGLASSES
            </h4>
            <ul className="space-y-2.5 text-[#C4B6AA] text-[13px]">
              {eyeglassesLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: SUNGLASSES */}
          <div>
            <h4 className="font-bold text-[13px] text-[#E59B62] tracking-wider uppercase mb-4 font-serif">
              SUNGLASSES
            </h4>
            <ul className="space-y-2.5 text-[#C4B6AA] text-[13px]">
              {sunglassesLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 6: CONTACT LENSES */}
          <div>
            <h4 className="font-bold text-[13px] text-[#E59B62] tracking-wider uppercase mb-4 font-serif">
              CONTACT LENSES
            </h4>
            <ul className="space-y-2.5 text-[#C4B6AA] text-[13px]">
              {contactLensesLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Section Divider */}
        <div className="pt-8 border-t border-[#3D2C22] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left: Brand Logo & Verified Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black font-serif tracking-wider uppercase text-white">
                PRECISION
              </span>
              <span className="text-2xl font-extrabold font-sans tracking-tight text-[#C86A28]">
                OPTICS
              </span>
              <span className="text-[11px] font-sans tracking-widest uppercase text-stone-400 ml-1 border-l border-stone-600 pl-2">
                ESTD. 1969
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#C4B6AA]">
              <a href="mailto:concierge@precisionoptics.in" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#C86A28]" />
                <span>concierge@precisionoptics.in</span>
              </a>

              <a href="tel:+919810012345" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[#C86A28]" />
                <span>+91 (0120) 498-1969 / +91 98100 12345</span>
              </a>

              <div className="flex items-center gap-1.5 text-stone-400">
                <MapPin className="w-4 h-4 text-[#C86A28] shrink-0" />
                <span>JMD Arcade, Sector 104, Noida, NCR Delhi 201304</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 font-normal flex items-center gap-3">
              <span>© 1969 - {new Date().getFullYear()} Precision Optics. All Rights Reserved. Clinical Optometry & Luxury Atelier.</span>
              <span>•</span>
              <Link href="/admin" className="hover:text-stone-200 transition-colors">
                Staff Portal
              </Link>
            </p>
          </div>

          {/* Right Area: Social Icons & Scroll Button */}
          <div className="flex items-center gap-6">
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-stone-300 hidden sm:inline-block">
                Follow us on:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#3D2C22] hover:bg-[#C86A28] text-white flex items-center justify-center transition-all border border-[#4E392D]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#3D2C22] hover:bg-[#C86A28] text-white flex items-center justify-center transition-all border border-[#4E392D]"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#3D2C22] hover:bg-[#C86A28] text-white flex items-center justify-center transition-all border border-[#4E392D]"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Scroll to Top Circle Button */}
            <div>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#2A1E17] flex items-center justify-center shadow-lg hover:bg-[#C86A28] hover:text-white transition-all transform hover:scale-105 cursor-pointer"
                aria-label="Scroll to top"
              >
                <ChevronUp className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};
