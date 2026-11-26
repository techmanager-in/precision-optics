"use client";

import React, { memo, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, Star, Tag, Zap } from "lucide-react";
import { Product } from "@/types";
import { useWishlist } from "@/context/WishlistContext";
import { formatProductName } from "@/lib/utils";

interface HomeProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
}

export const HomeProductCard = memo(function HomeProductCard({
  product,
  onSelectProduct,
}: HomeProductCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const { isWishlisted, toggleWishlist, triggerFlyAnimation } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const [isPoppingHeart, setIsPoppingHeart] = useState(false);
  const [isCardFolding, setIsCardFolding] = useState(false);

  // Calculate discount percentage if originalPrice exists
  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 15; // default fallback matching Figma

  const originalPriceDisplay = product.originalPrice || Math.round(product.price * 1.18);

  // Fallback-safe image state
  const fallbackImg = "/images/products/figma_cartier_blue_rimless.png";
  const initialImg = product.images?.[0] || fallbackImg;
  const [imgSrc, setImgSrc] = useState<string>(initialImg);

  useEffect(() => {
    setImgSrc(product.images?.[0] || fallbackImg);
  }, [product.images]);

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!wishlisted) {
      setIsCardFolding(true);
      setIsPoppingHeart(true);
      setTimeout(() => setIsCardFolding(false), 520);
      setTimeout(() => setIsPoppingHeart(false), 650);

      if (cardRef.current && triggerFlyAnimation) {
        triggerFlyAnimation(cardRef.current, {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          originalPrice: product.originalPrice,
          image: imgSrc,
          rating: product.rating,
        });
      }
    }

    toggleWishlist(product.id, product.name);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className={`w-[232px] sm:w-[244px] shrink-0 min-h-[390px] bg-white border border-[#EBE6DF] rounded-[16px] p-4 flex flex-col justify-between relative group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 select-none ${
        isCardFolding ? "scale-[0.98] ring-1 ring-[#C86A28]/40 shadow-inner" : ""
      }`}
    >
      {/* Wishlist Heart Button */}
      <button
        onClick={handleHeartClick}
        className={`absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-[#C86A28] hover:text-white border border-[#E5E7EB] backdrop-blur-xs flex items-center justify-center transition-all duration-200 focus:outline-none shadow-2xs cursor-pointer ${
          isPoppingHeart ? "scale-125 bg-[#C86A28] text-white" : ""
        }`}
        aria-label="Add to wishlist"
      >
        <Heart
          className={`w-3.5 h-3.5 transition-all duration-200 ${
            wishlisted || isPoppingHeart
              ? "fill-[#C86A28] text-[#C86A28] group-hover:fill-white group-hover:text-white"
              : "text-[#6B7280] group-hover:text-white"
          } ${isPoppingHeart ? "scale-110" : ""}`}
        />
      </button>

      {/* Product Image Area - Fixed Aspect Ratio and Size */}
      <Link
        href={`/product/${product.id}`}
        className="w-full h-36 sm:h-40 shrink-0 flex items-center justify-center p-2 relative overflow-hidden mb-2 bg-transparent block"
      >
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc(fallbackImg)}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </Link>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between space-y-2">
        {/* Brand Name & Subtitle */}
        <div>
          {product.brand ? (
            <h4 className="font-sans font-black text-[12px] leading-tight tracking-[0.5px] uppercase text-[#111827]">
              {product.brand}
            </h4>
          ) : (
            <div className="h-3" />
          )}

          {/* Product Name */}
          <Link href={`/product/${product.id}`} className="block">
            <h3
              className="font-sans font-medium text-[12px] leading-snug text-[#111827] line-clamp-2 mt-1 hover:text-[#C86A28] transition-colors"
              title={product.name}
            >
              {formatProductName(product.name, product.brand)}
            </h3>
          </Link>
        </div>

        {/* Size and Rating row */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280] font-sans">
          <span>Size: M</span>
          <span className="text-[#D1D5DB]">|</span>
          <div className="flex items-center gap-1 text-[#D97706] font-bold text-[11px]">
            <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
            <span>{product.rating ? product.rating.toFixed(1) : "5.0"}</span>
          </div>
        </div>

        {/* Pricing Row */}
        <div className="pt-0.5 space-y-0.5">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-sans font-bold text-[16px] text-[#111827]">
              ₹ {(product.price || 0).toLocaleString("en-IN")}
            </span>
            <span className="font-sans font-normal text-[11px] text-[#6B7280]">
              including lenses
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-sans">
            <span className="text-[#9CA3AF] line-through">
              ₹ {(originalPriceDisplay || 0).toLocaleString("en-IN")}
            </span>
            <span className="text-[#0284C7] font-bold text-[11px]">
              ({discountPercent}% OFF)
            </span>
          </div>
        </div>

        {/* Sale Tag Bar */}
        <div className="border-t border-[#F3F4F6] pt-2 mt-1.5 flex items-center gap-1.5 text-[11px] text-[#1F2937] font-sans">
          {product.isOnSale || product.brand?.toLowerCase() === "cartier" ? (
            <>
              <Tag className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
              <span className="font-bold text-[#111827]">2 Offers Available</span>
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 text-[#EA580C] fill-[#EA580C] shrink-0" />
              <span className="font-medium text-[#374151]">on sale price applied!</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
