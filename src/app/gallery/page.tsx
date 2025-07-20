"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sriracha, Share_Tech } from "next/font/google";
import { ChevronLeft, ChevronRight, ArrowLeft, Upload, X } from "lucide-react";

// Configure Google Fonts
const sriracha = Sriracha({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const shareTech = Share_Tech({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Sample photos with Thai blessings
const initialPhotos = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=400&text=Birthday+Photo+1",
    alt: "Birthday Photo 1",
    blessing: "ขอให้มีความสุขมากๆ ในวันเกิดนี้นะคะ 🎂",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=400&text=Birthday+Photo+2",
    alt: "Birthday Photo 2",
    blessing: "ขอให้อายุยืน สุขภาพแข็งแรง และมีแต่ความสุข 🌟",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=400&text=Birthday+Photo+3",
    alt: "Birthday Photo 3",
    blessing: "ขอให้ปีใหม่นี้เป็นปีที่ดีที่สุดในชีวิต 🎉",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=600&width=400&text=Birthday+Photo+4",
    alt: "Birthday Photo 4",
    blessing: "ขอให้ได้ทุกสิ่งที่หวัง และมีความสำเร็จในทุกเรื่อง ✨",
  },
];

export default function GalleryPage() {
  const [photos, setPhotos] = useState(initialPhotos);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [showBlessing, setShowBlessing] = useState(false);
  const [displayedBlessing, setDisplayedBlessing] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto = {
            id: Date.now() + Math.random(),
            src: e.target?.result as string,
            alt: `Uploaded photo ${photos.length + 1}`,
            blessing: "ขอให้มีความสุขและรอยยิ้มตลอดไป 😊",
          };
          setPhotos((prev) => [...prev, newPhoto]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  // Typewriter effect for blessing text
  const typeWriterEffect = (text: string) => {
    setIsTyping(true);
    setDisplayedBlessing("");

    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedBlessing((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 100); // 100ms delay between each character
  };

  // Handle photo click
  const handlePhotoClick = (index: number) => {
    setCurrentPhoto(index);
    setShowBlessing(true);
    typeWriterEffect(photos[index].blessing);
  };

  const nextPhoto = () => {
    const newIndex = (currentPhoto + 1) % photos.length;
    setCurrentPhoto(newIndex);
    if (showBlessing) {
      typeWriterEffect(photos[newIndex].blessing);
    }
  };

  const prevPhoto = () => {
    const newIndex = (currentPhoto - 1 + photos.length) % photos.length;
    setCurrentPhoto(newIndex);
    if (showBlessing) {
      typeWriterEffect(photos[newIndex].blessing);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 py-4 sm:py-8 px-4">
      {/* Background Music */}
      <audio autoPlay loop className="hidden">
        <source src="/gallery-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} className="text-pink-600" />
              <span
                className={`${shareTech.className} text-pink-600 font-bold text-sm sm:text-base`}
              >
                กลับ
              </span>
            </motion.button>
          </Link>

          <motion.h1
            className={`${sriracha.className} text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600 text-center`}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            แกลเลอรี่ภาพ
          </motion.h1>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-lg transition-all duration-300"
          >
            <Upload size={18} />
            <span
              className={`${shareTech.className} font-bold text-sm sm:text-base hidden sm:inline`}
            >
              อัพโหลด
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Main Gallery */}
      <div className="max-w-7xl mx-auto">
        {/* Large Photo Display */}
        <div className="mb-6 sm:mb-8">
          <motion.div
            className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden mx-auto"
            style={{ maxWidth: "900px", aspectRatio: "4/3" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={photos[currentPhoto]?.src || "/placeholder.svg"}
              alt={photos[currentPhoto]?.alt || "Photo"}
              fill
              className="object-cover cursor-pointer"
              priority
              onClick={() => handlePhotoClick(currentPhoto)}
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white"
            >
              <ChevronLeft size={20} className="text-pink-600" />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white"
            >
              <ChevronRight size={20} className="text-pink-600" />
            </button>

            {/* Photo Counter */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full">
              <span className={`${shareTech.className} text-xs sm:text-sm`}>
                {currentPhoto + 1} / {photos.length}
              </span>
            </div>

            {/* Click hint */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-pink-500/80 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full">
              <span className={`${shareTech.className} text-xs sm:text-sm`}>
                คลิกเพื่อดูคำอวยพร
              </span>
            </div>
          </motion.div>
        </div>

        {/* Responsive Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4 mb-6 sm:mb-8">
          {photos.map((photo, index) => (
            <motion.button
              key={photo.id}
              onClick={() => handlePhotoClick(index)}
              className={`relative aspect-square rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
                currentPhoto === index
                  ? "ring-2 sm:ring-4 ring-pink-500 ring-offset-1 sm:ring-offset-2 scale-105"
                  : "hover:scale-105 hover:shadow-xl"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                fill
                className="object-cover"
              />
              {currentPhoto === index && (
                <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-1 sm:p-2">
                    <span className="text-pink-600 text-xs sm:text-sm">✨</span>
                  </div>
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Blessing Display */}
        <AnimatePresence>
          {showBlessing && (
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl text-center relative"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <button
                onClick={() => setShowBlessing(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-pink-100 hover:bg-pink-200 p-1 sm:p-2 rounded-full transition-colors duration-200"
              >
                <X size={16} className="text-pink-600" />
              </button>

              <motion.h2
                className={`${sriracha.className} text-xl sm:text-2xl md:text-3xl font-bold text-pink-600 mb-4 sm:mb-6`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                คำอวยพร
              </motion.h2>

              <div
                className={`${shareTech.className} text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center`}
              >
                <span className="relative">
                  {displayedBlessing}
                  {isTyping && (
                    <motion.span
                      className="inline-block w-0.5 h-5 sm:h-6 bg-pink-500 ml-1"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  )}
                </span>
              </div>

              {/* Decorative elements */}
              <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                {["🎂", "🎉", "🎈", "🌟", "💖"].map((emoji, index) => (
                  <motion.span
                    key={index}
                    className="text-xl sm:text-2xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Birthday Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-lg sm:text-xl md:text-2xl"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y:
                (typeof window !== "undefined" ? window.innerHeight : 800) + 50,
              rotate: 0,
              opacity: 0.7,
            }}
            animate={{
              y: -100,
              rotate: 360,
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 15,
              ease: "linear",
            }}
          >
            {
              ["🎂", "🎉", "🎈", "🌟", "💖", "🎁", "🍰", "🎊"][
                Math.floor(Math.random() * 8)
              ]
            }
          </motion.div>
        ))}
      </div>
    </div>
  );
}
