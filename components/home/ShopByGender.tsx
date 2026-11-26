"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ShopByGenderProps {
  onSelectGender?: (gender: 'men' | 'women' | 'kids') => void;
  activeGender?: string[];
  activeCategory?: string;
  onExploreShop?: () => void;
  onSelectCategory?: (category: string) => void;
}

export const ShopByGender: React.FC<ShopByGenderProps> = ({
  onSelectGender,
  onExploreShop,
  onSelectCategory
}) => {
  const router = useRouter();
  const [selectedPill, setSelectedPill] = useState<'all' | 'men' | 'women'>('all');

  const handlePillClick = (pill: 'all' | 'men' | 'women') => {
    setSelectedPill(pill);
    if (pill === 'men' && onSelectGender) {
      // Keep state locally, or filter on click
    }
  };

  const handleCardClick = (categoryKey: string, extraParam?: string) => {
    let url = `/shop?category=${categoryKey}`;
    if (selectedPill !== 'all') {
      url += `&gender=${selectedPill}`;
    }
    if (extraParam) {
      url += `&${extraParam}`;
    }

    if (onSelectCategory && selectedPill === 'all' && !extraParam) {
      onSelectCategory(categoryKey);
    } else {
      router.push(url);
    }
  };

  return (
    <section 
      id="shop-by-category-section" 
      className="relative py-6 sm:py-8 md:py-10 overflow-hidden border-b border-[#C8B09C]"
      style={{
        background: 'linear-gradient(135deg, #F5E2D3 0%, #E9D3BE 35%, #DCC3AD 70%, #C8A68D 100%)'
      }}
    >
      <div className="max-w-[1280px] mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        
        {/* Horizontal Scroll Wrapper on small screens to preserve perfect proportions */}
        <div className="overflow-x-auto scrollbar-none pb-2">
          <div className="relative w-full min-w-[620px] sm:min-w-0 aspect-[1024/352] rounded-[24px] sm:rounded-[32px] overflow-hidden select-none drop-shadow-[0_12px_32px_rgba(42,30,23,0.08)]">
            
            {/* Master Showcase Banner Image */}
            <Image
              src="/images/category-bento/shop_by_category_banner_2x.png"
              alt="Shop by Category - Sunglasses, Eyeglasses, Smart Glasses, Computer Glasses, Polarized, Reading Glasses"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />

            {/* ======================================================== */}
            {/* PILL SWITCHER CLICKABLE ZONES & ACTIVE OVERLAYS          */}
            {/* ======================================================== */}
            
            {/* ALL Pill */}
            <button
              type="button"
              onClick={() => handlePillClick('all')}
              style={{ left: '39.5%', width: '5.6%', top: '15.0%', height: '8.5%' }}
              className="absolute z-20 rounded-full focus:outline-none cursor-pointer"
              title="Filter by All"
              aria-label="Filter All Categories"
            />

            {/* MEN Pill */}
            <button
              type="button"
              onClick={() => handlePillClick('men')}
              style={{ left: '45.3%', width: '5.6%', top: '15.0%', height: '8.5%' }}
              className="absolute z-20 rounded-full focus:outline-none cursor-pointer"
              title="Filter for Men"
              aria-label="Filter Categories for Men"
            />
            {selectedPill === 'men' && (
              <div
                style={{ left: '45.3%', width: '5.6%', top: '15.0%', height: '8.5%' }}
                className="absolute z-10 pointer-events-none bg-white text-[#2A1E17] font-semibold text-[10px] sm:text-xs md:text-sm rounded-full shadow-md flex items-center justify-center transition-all duration-200"
              >
                Men
              </div>
            )}

            {/* WOMEN Pill */}
            <button
              type="button"
              onClick={() => handlePillClick('women')}
              style={{ left: '51.1%', width: '6.8%', top: '15.0%', height: '8.5%' }}
              className="absolute z-20 rounded-full focus:outline-none cursor-pointer"
              title="Filter for Women"
              aria-label="Filter Categories for Women"
            />
            {selectedPill === 'women' && (
              <div
                style={{ left: '51.1%', width: '6.8%', top: '15.0%', height: '8.5%' }}
                className="absolute z-10 pointer-events-none bg-white text-[#2A1E17] font-semibold text-[10px] sm:text-xs md:text-sm rounded-full shadow-md flex items-center justify-center transition-all duration-200"
              >
                Women
              </div>
            )}

            {/* ======================================================== */}
            {/* 6 CATEGORY CARDS INTERACTIVE CLICK ZONES & HOVER RINGS   */}
            {/* ======================================================== */}

            {/* Card 1: Sunglasses */}
            <button
              type="button"
              onClick={() => handleCardClick('sunglasses')}
              style={{ left: '4.5%', width: '22.5%', top: '26.5%', height: '61.5%' }}
              className="group absolute z-20 rounded-[20px] sm:rounded-[26px] focus:outline-none cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#C86A28]/40 hover:bg-black/[0.02]"
              title="Shop Sunglasses"
              aria-label="Shop Sunglasses"
            />

            {/* Card 2: Eyeglasses */}
            <button
              type="button"
              onClick={() => handleCardClick('eyeglasses')}
              style={{ left: '27.2%', width: '22.5%', top: '26.5%', height: '61.5%' }}
              className="group absolute z-20 rounded-[20px] sm:rounded-[26px] focus:outline-none cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#C86A28]/40 hover:bg-black/[0.02]"
              title="Shop Eyeglasses"
              aria-label="Shop Eyeglasses"
            />

            {/* Card 3: Smart Glasses */}
            <button
              type="button"
              onClick={() => handleCardClick('meta-smart')}
              style={{ left: '50.1%', width: '23.4%', top: '26.5%', height: '30.0%' }}
              className="group absolute z-20 rounded-[18px] sm:rounded-[22px] focus:outline-none cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#C86A28]/40 hover:bg-black/[0.02]"
              title="Shop Smart Glasses"
              aria-label="Shop Smart Glasses"
            />

            {/* Card 4: Computer Glasses */}
            <button
              type="button"
              onClick={() => handleCardClick('eyeglasses')}
              style={{ left: '50.1%', width: '23.4%', top: '58.0%', height: '30.0%' }}
              className="group absolute z-20 rounded-[18px] sm:rounded-[22px] focus:outline-none cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#C86A28]/40 hover:bg-black/[0.02]"
              title="Shop Computer Glasses"
              aria-label="Shop Computer Glasses"
            />

            {/* Card 5: Polarized Sunglasses */}
            <button
              type="button"
              onClick={() => handleCardClick('sunglasses', 'shape=aviator')}
              style={{ left: '74.0%', width: '21.8%', top: '26.5%', height: '30.0%' }}
              className="group absolute z-20 rounded-[18px] sm:rounded-[22px] focus:outline-none cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#C86A28]/40 hover:bg-black/[0.02]"
              title="Shop Polarized Sunglasses"
              aria-label="Shop Polarized Sunglasses"
            />

            {/* Card 6: Reading Glasses */}
            <button
              type="button"
              onClick={() => handleCardClick('eyeglasses')}
              style={{ left: '74.0%', width: '21.8%', top: '58.0%', height: '30.0%' }}
              className="group absolute z-20 rounded-[18px] sm:rounded-[22px] focus:outline-none cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#C86A28]/40 hover:bg-black/[0.02]"
              title="Shop Reading Glasses"
              aria-label="Shop Reading Glasses"
            />

          </div>
        </div>

      </div>
    </section>
  );
};
