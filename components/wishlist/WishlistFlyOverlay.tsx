"use client";

import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Star, Tag, Zap } from "lucide-react";

export interface WishlistFlyData {
  id: string;
  name: string;
  brand?: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  rating?: number;
}

export interface WishlistFlyOverlayRef {
  trigger: (cardElement: HTMLElement, product: WishlistFlyData) => void;
}

interface ActiveFlight {
  instanceId: string;
  product: WishlistFlyData;
  cardRect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  deltaX: number;
  deltaY: number;
  arcLift: number;
}

function CardVisualPreview({ product }: { product: WishlistFlyData }) {
  const fallbackImg = "/images/clean_frame_1.png";
  const displayImage = product.image || fallbackImg;
  const originalPriceDisplay = product.originalPrice || Math.round((product.price || 5000) * 1.18);
  const discountPercent = 15;

  return (
    <div className="w-full h-full bg-white border border-[#EBE6DF] rounded-[16px] p-4 flex flex-col justify-between select-none shadow-lg relative">
      {/* Top Floating Action: Wishlist Heart */}
      <div className="absolute top-3.5 right-3.5 z-20 flex items-center">
        <div className="w-8 h-8 rounded-full bg-[#C86A28] text-white border border-[#E5E7EB] flex items-center justify-center shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-white text-white" />
        </div>
      </div>

      {/* Product Image Area */}
      <div className="w-full h-36 sm:h-40 shrink-0 flex items-center justify-center p-2 relative overflow-hidden mb-2 bg-transparent">
        <img
          src={displayImage}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div>
          {product.brand ? (
            <h4 className="font-sans font-black text-[12px] leading-tight tracking-[0.5px] uppercase text-[#111827]">
              {product.brand}
            </h4>
          ) : (
            <div className="h-4" />
          )}

          <h3 className="font-sans font-medium text-[12px] leading-snug text-[#111827] line-clamp-2 mt-0.5">
            {product.name}
          </h3>
        </div>

        {/* Size & Rating */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280] font-sans">
          <span>Size: M</span>
          <span className="text-[#D1D5DB]">|</span>
          <div className="flex items-center gap-1 text-[#D97706] font-bold text-[11px]">
            <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
            <span>{product.rating ? product.rating.toFixed(1) : "5.0"}</span>
          </div>
        </div>

        {/* Pricing */}
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

        {/* Sale & Promo Status */}
        <div className="border-t border-[#F3F4F6] pt-2 mt-1.5 flex items-center gap-1.5 text-[11px] text-[#1F2937] font-sans">
          <Zap className="w-3.5 h-3.5 text-[#EA580C] fill-[#EA580C] shrink-0" />
          <span className="font-medium text-[#374151]">on sale price applied!</span>
        </div>
      </div>
    </div>
  );
}

export const WishlistFlyOverlay = forwardRef<WishlistFlyOverlayRef, {}>(function WishlistFlyOverlay(
  _props,
  ref
) {
  const [flights, setFlights] = useState<ActiveFlight[]>([]);

  const removeFlight = useCallback((instanceId: string) => {
    setFlights((prev) => prev.filter((f) => f.instanceId !== instanceId));
  }, []);

  const trigger = useCallback(
    (cardElement: HTMLElement, product: WishlistFlyData) => {
      if (typeof window === "undefined" || !cardElement) return;

      // Respect WCAG reduced motion preferences
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.dispatchEvent(new CustomEvent("precision:wishlist-catch"));
        return;
      }

      const cardRect = cardElement.getBoundingClientRect();
      if (cardRect.width === 0 || cardRect.height === 0) return;

      // Find the destination Wishlist button in the sticky header
      const desktopBtn = document.getElementById("header-wishlist-btn-desktop");
      const mobileBtn = document.getElementById("header-wishlist-btn-mobile");
      let targetEl: HTMLElement | null = null;

      if (desktopBtn && window.getComputedStyle(desktopBtn).display !== "none") {
        targetEl = desktopBtn;
      } else if (mobileBtn && window.getComputedStyle(mobileBtn).display !== "none") {
        targetEl = mobileBtn;
      } else {
        targetEl = document.querySelector('[data-wishlist-target="true"]');
      }

      const targetRect = targetEl
        ? targetEl.getBoundingClientRect()
        : {
            top: 24,
            left: window.innerWidth - 90,
            width: 32,
            height: 32,
          };

      const startX = cardRect.left;
      const startY = cardRect.top;
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      const deltaX = targetCenterX - (startX + cardRect.width / 2);
      const deltaY = targetCenterY - (startY + cardRect.height / 2);

      // Arc trajectory: smooth gentle lift above the direct path
      const arcLift = -40;

      const newFlight: ActiveFlight = {
        instanceId: `flight_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        product,
        cardRect: {
          top: cardRect.top,
          left: cardRect.left,
          width: cardRect.width,
          height: cardRect.height,
        },
        deltaX,
        deltaY,
        arcLift,
      };

      setFlights((prev) => [...prev, newFlight]);
    },
    []
  );

  useImperativeHandle(ref, () => ({ trigger }), [trigger]);

  if (flights.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {flights.map((flight) => {
          const halfHeight = flight.cardRect.height / 2;

          return (
            <motion.div
              key={flight.instanceId}
              className="absolute pointer-events-none"
              style={{
                top: flight.cardRect.top,
                left: flight.cardRect.left,
                width: flight.cardRect.width,
                height: flight.cardRect.height,
                perspective: 1200,
                transformStyle: "preserve-3d",
              }}
              initial={{
                x: 0,
                y: 0,
                scale: 1,
                rotateZ: 0,
                rotateY: 0,
                opacity: 1,
              }}
              animate={{
                // Stage 1: Card folds in place with luxurious 3D depth (0s - 0.49s)
                // Stage 2: Folded card glides smoothly in a graceful curved arc right into the header favorites bag (0.49s - 1.40s)
                x: [
                  0,
                  0,
                  flight.deltaX * 0.28,
                  flight.deltaX * 0.65,
                  flight.deltaX * 0.92,
                  flight.deltaX,
                ],
                y: [
                  0,
                  0,
                  flight.deltaY * 0.32 + flight.arcLift,
                  flight.deltaY * 0.68 + flight.arcLift * 0.4,
                  flight.deltaY * 0.93,
                  flight.deltaY,
                ],
                scale: [1, 0.98, 0.75, 0.46, 0.18, 0.04],
                rotateZ: [0, 2, -10, 8, -2, 0],
                rotateY: [0, -10, 14, -6, 2, 0],
                opacity: [1, 1, 1, 1, 0.92, 0],
              }}
              transition={{
                duration: 1.4,
                times: [0, 0.35, 0.55, 0.75, 0.9, 1],
                ease: [0.25, 1, 0.35, 1],
              }}
              onAnimationComplete={() => {
                // Trigger the catch impact feedback on the header's favorites bag
                window.dispatchEvent(new CustomEvent("precision:wishlist-catch"));
                removeFlight(flight.instanceId);
              }}
            >
              <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                {/* Top Half of Card (Stationary anchor of the fold) */}
                <div
                  className="absolute top-0 left-0 w-full overflow-hidden rounded-t-[16px] bg-white border border-[#EBE6DF] shadow-xl"
                  style={{ height: halfHeight }}
                >
                  <div style={{ width: flight.cardRect.width, height: flight.cardRect.height }}>
                    <CardVisualPreview product={flight.product} />
                  </div>
                </div>

                {/* Bottom Half of Card (Folds upward onto the top half in 3D) */}
                <motion.div
                  className="absolute left-0 w-full overflow-hidden rounded-b-[16px] bg-white border border-[#EBE6DF] shadow-2xl origin-top"
                  style={{
                    top: halfHeight,
                    height: halfHeight,
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: -172 }}
                  transition={{
                    duration: 0.48,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                >
                  {/* Shifted inner content so it seamlessly aligns with the top half */}
                  <div
                    style={{
                      width: flight.cardRect.width,
                      height: flight.cardRect.height,
                      marginTop: -halfHeight,
                    }}
                  >
                    <CardVisualPreview product={flight.product} />
                  </div>

                  {/* 3D Paper Shadow Overlay: Darkens realistically as the card folds */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.65 }}
                    transition={{ duration: 0.48, ease: "easeInOut" }}
                  />
                </motion.div>

                {/* Golden/Luxury Crease line highlighting the folding seam */}
                <motion.div
                  className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C86A28]/80 to-transparent pointer-events-none z-10"
                  style={{ top: halfHeight - 1 }}
                  initial={{ opacity: 0, scaleX: 0.4 }}
                  animate={{ opacity: [0, 1, 0.8], scaleX: [0.4, 1, 0.9] }}
                  transition={{ duration: 0.48, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
});
