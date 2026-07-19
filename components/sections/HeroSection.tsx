"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { REALSCOUT_AGENT_ENCODED_ID } from "@/lib/realscout";
import RealScoutListings from "@/components/realscout/RealScoutListings";

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  
  const images = [
    "/images/hero/madeira-canyon-henderson-nv-home-exterior-2.jpg",
    "/images/hero/las-vegas-strip-skyline-blue-diamond-hill-nv.jpg",
    "/images/hero/red-rock-canyon-calico-hills-summerlin-nv.jpg",
  ];

  useEffect(() => {
    // Don't animate if user prefers reduced motion
    if (prefersReducedMotion) return;
    
    const intervalId = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [prefersReducedMotion]);

  return (
    <>
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${
              prefersReducedMotion 
                ? '' 
                : 'transition-opacity duration-1000'
            } ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={
                index === 0
                  ? "Madeira Canyon Henderson NV home exterior for sale"
                  : index === 1
                    ? "Las Vegas Strip skyline views from elevated Henderson ridges near Club Madeira"
                    : "Red Rock Canyon Calico Hills near Summerlin Las Vegas Nevada"
              }
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Find Your Dream Home in
          <br />
          <span className="text-blue-400">Las Vegas & Henderson</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
          Expert real estate services with personalized attention. Your trusted partner for buying,
          selling, and investing in Southern Nevada.
        </p>

        {/* RealScout Search Widget */}
        <div className="realscout-wrapper mb-4">
          <div
            dangerouslySetInnerHTML={{
              __html: `<realscout-simple-search agent-encoded-id="${REALSCOUT_AGENT_ENCODED_ID}"></realscout-simple-search>`,
            }}
          />
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/90 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">500+</span>
            <span>Properties Sold</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Since 2008</span>
            <span>Serving Las Vegas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">4.9★</span>
            <span>Average Rating</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 ${
          prefersReducedMotion ? '' : 'animate-bounce'
        }`}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </div>
    {/* Office listings directly below hero */}
    <RealScoutListings />
    </>
  );
}
