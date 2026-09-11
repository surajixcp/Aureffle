"use client";

import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const AUREFFLE_GALLERY_IMAGES = [
  "/assets/gallery/1.jpeg",
  "/assets/gallery/2.jpeg",
  "/assets/gallery/3.jpeg",
  "/assets/gallery/4.jpeg",
  "/assets/gallery/5.jpeg",
  "/assets/gallery/6.jpeg",
  "/assets/gallery/7.jpeg",
  "/assets/gallery/1.jpeg",
  "/assets/gallery/2.jpeg",
  "/assets/gallery/3.jpeg",
  "/assets/gallery/4.jpeg",
  "/assets/gallery/5.jpeg",
  "/assets/gallery/6.jpeg",
  "/assets/gallery/7.jpeg",
];

interface ImageCardProps {
  src: string;
  onLoad?: () => void;
  key?: string;
}

const ImageCard = ({ src, onLoad }: ImageCardProps) => {
  return (
    <div className="w-full h-[220px] sm:h-[320px] md:h-[420px] flex-shrink-0 bg-[#101c34] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.03] cursor-pointer relative will-change-transform backface-hidden preserve-3d group border border-[#c6a252]/20 hover:border-[#ffe600]/60">
      <img
        src={src}
        alt="Aureffle Gallery Creation"
        loading="lazy"
        onLoad={onLoad}
        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export function ThreeDParallaxUnfurlingGallery() {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const loadedCountRef = useRef(0);

  const handleItemLoad = useCallback(() => {
    loadedCountRef.current += 1;
    if (!isReady && loadedCountRef.current >= 1) setIsReady(true);
  }, [isReady]);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const colMedia = useMemo(() => {
    const col1Base = AUREFFLE_GALLERY_IMAGES.filter((_, i) => i % 4 === 0);
    const col2Base = AUREFFLE_GALLERY_IMAGES.filter((_, i) => i % 4 === 1);
    const col3Base = AUREFFLE_GALLERY_IMAGES.filter((_, i) => i % 4 === 2);
    const col4Base = AUREFFLE_GALLERY_IMAGES.filter((_, i) => i % 4 === 3);

    return {
      col1: [...col1Base, ...col1Base],
      col2: [...col2Base, ...col2Base],
      col3: [...col3Base, ...col3Base],
      col4: [...col4Base, ...col4Base],
    };
  }, []);

  // LINKED SCROLL: Tells Framer Motion exactly which div is doing the scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollWrapperRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  // Banner animations
  const bannerWidth = useTransform(smoothProgress, [0, 0.15], ["100vw", "100vw"]);
  const bannerHeight = useTransform(smoothProgress, [0, 0.15], ["100vh", "100vh"]);
  const bannerRadius = useTransform(smoothProgress, [0, 0.15], ["0px", "0px"]);
  const bannerBorderWidth = useTransform(smoothProgress, [0, 0.15], ["0px", "0px"]);

  // 3D Matrix animations
  const rotateY = useTransform(smoothProgress, [0.15, 1], [-45, -8]);
  const rotateX = useTransform(smoothProgress, [0.15, 1], [25, 4]);
  const rotateZ = useTransform(smoothProgress, [0.15, 1], [15, 2]);
  const translateZ = useTransform(smoothProgress, [0.15, 1], [-800, 0]);

  // Track columns parallax animations
  const yCol1 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
  const yCol2 = useTransform(smoothProgress, [0.15, 1], ["-40%", "10%"]);
  const yCol3 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
  const yCol4 = useTransform(smoothProgress, [0.15, 1], ["-30%", "20%"]);

  return (
    <div 
      ref={scrollWrapperRef}
      className="w-full h-screen overflow-y-auto overflow-x-hidden bg-[#050811]"
    >
      <section
        ref={containerRef}
        className="relative w-full h-[550vh] bg-[#050811] text-white font-sans selection:bg-[#c6a252] selection:text-[#080d1a]"
      >
        <div className="sticky top-0 h-screen w-full flex justify-center items-center overflow-hidden">
          <motion.div
            style={{
              width: bannerWidth,
              height: bannerHeight,
              borderRadius: bannerRadius,
              borderWidth: bannerBorderWidth,
              borderColor: "rgba(198, 162, 82, 0.3)",
            }}
            className="relative bg-[#080d1a] overflow-hidden flex items-center justify-center max-w-[1920px] mx-auto will-change-transform backface-hidden preserve-3d"
          >
            <div
              className="absolute inset-0 flex justify-center items-center pointer-events-none"
              style={{ perspective: "1000px" }}
            >
              {/* Ambient Shadow Box Masking */}
              <div className="absolute inset-0 z-20 shadow-[inset_0_100px_150px_-50px_rgba(5,8,17,1),inset_0_-100px_150px_-50px_rgba(5,8,17,1)]" />
              <div className="absolute inset-0 z-20 shadow-[inset_150px_0_150px_-50px_rgba(5,8,17,1),inset_-150px_0_150px_-50px_rgba(5,8,17,1)]" />

              {/* Parallax Image Grid Matrix */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  rotateZ,
                  z: translateZ,
                  transformStyle: "preserve-3d",
                }}
                className="flex gap-4 md:gap-6 justify-center items-center w-[120vw] h-[150vh] origin-center opacity-100 will-change-transform backface-hidden"
              >
                <motion.div style={{ y: yCol1 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col1.map((src, index) => (
                    <ImageCard key={`col1-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>

                <motion.div style={{ y: yCol2 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col2.map((src, index) => (
                    <ImageCard key={`col2-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>

                <motion.div style={{ y: yCol3 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col3.map((src, index) => (
                    <ImageCard key={`col3-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>

                <motion.div style={{ y: yCol4 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col4.map((src, index) => (
                    <ImageCard key={`col4-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ThreeDParallaxUnfurlingGallery;
