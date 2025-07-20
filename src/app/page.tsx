"use client";

import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sriracha, Share_Tech } from "next/font/google";
import { Volume2, VolumeX } from "lucide-react";

// Configure Google Fonts
const sriracha = Sriracha({
  weight: "400",
  subsets: ["latin", "thai"],
  display: "swap",
});

const shareTech = Share_Tech({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Intro messages sequence
const introMessages = [
  "ยินดีที่ได้เจอกัน",
  "นี่คือเว็บไซต์ที่ตั้งใจทำเพื่อคุณคนเดียว",
  "ก่อนอื่นก็…",
  "Happy birthday นะครับ",
  "เรามาดูรูปภาพความทรงจำด้วยกันเถอะ",
];

// Photo gallery data with captions
const photoGallery = [
  {
    id: 1,
    src: "/86650_0.jpg?height=800&width=600&text=Memory+1",
    caption:
      "9 สิงหาคม 2024 \nเป็นวันที่มาช่วยนแก้แลปและเป็นวันที่นิ้งสงสัยด้วยว่าแอบชอบป่าวเนี่ย",
  },
  {
    id: 2,
    src: "/86649_0.jpg?height=800&width=600&text=Memory+2",
    caption: "4 กันยายน 2024\nเป็นวันที่เรานั่งเรียนด้วยกัน",
  },
  {
    id: 3,
    src: "/86648_0.jpg?height=800&width=600&text=Memory+3",
    caption:
      "8 ตุลาคม 2024 \nเป็นวันที่เราจับมือกันครั้งแรกดีใจมากที่ได้จับมือ",
  },
  {
    id: 4,
    src: "/86647_0.jpg?height=800&width=600&text=Memory+4",
    caption: "12 ตุลาคม 2024 \nเป็นวันที่นิ้งเลือกรองเท้าให้",
  },
  {
    id: 5,
    src: "/86646_0.jpg?height=800&width=600&text=Memory+5",
    caption: " 13 ตุลาคม 2024 \nเป็นวันแรกที่เราดูหนังด้วยกัน โรง 1 E7,E8",
  },
  {
    id: 6,
    src: "/86645_0.jpg?height=800&width=600&text=Memory+6",
    caption: "15 ตุลาคม 2024 \nครั้งแรกที่เรานั่งกินบิงชูด้วยกัน",
  },
  {
    id: 7,
    src: "/86644_0.jpg?height=800&width=600&text=Memory+7",
    caption:
      "23 ธันวาคม 2024 \nเป็นวันแรกที่เราไปเที่ยวด้วยกันงาน\nแห่ดาวท่าแร่เจอครูไพบูนด้วย55555",
  },
  {
    id: 8,
    src: "/86643_0.jpg?height=800&width=600&text=Memory+8",
    caption:
      "4 มกราคม 2025 \nเรานั้งกินหมูกระทะด้วยกัน สายตานี้งตอนนั้นน่ารักมาก",
  },
  {
    id: 9,
    src: "/86642_0.jpg?height=800&width=600&text=Memory+9",
    caption:
      "14 กุมภาพันธ์ 2024 \nของขวัญวันวาเลนไทน์ที่นิ้งซื้อให้ น่ารักมากๆ",
  },
  {
    id: 10,
    src: "/86649_0.jpg?height=800&width=600&text=Memory+10",
    caption: "28 สิงหาคม 2025 \n สุขสันต์วันเกิดคนที่ฉันรักมากที่สุด",
  },
];

// Final birthday wishes
const finalWishes = [
  "Habby birthday นะนิ้ง",
  "เติบโตขึ้นอีกแล้ว 1 ปี แก่ขึ้นแล้ว 55555 ",
  "ขอให้ความฝันของนิ้งเป็นจริง ",
  "จะคอยซัพพอร์ตเสมอ",
  "มีความสุขมากๆ ขอให้มีแต่สิ่งดีๆเข้ามาในชีวิต",
  "ดีใจมากๆที่ได้เป็นส่วนหนึ่งของชีวิต ",
  "รักนิ้งนะ",
];

export default function BirthdayPage() {
  // State management
  const [currentStep, setCurrentStep] = useState(0); // 0-4: intro, 5-14: photos, 15: gift form, 16: final wishes
  const [showMessage, setShowMessage] = useState(true);
  const [giftText, setGiftText] = useState("");
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [currentWish, setCurrentWish] = useState(0);
  const [showWishes, setShowWishes] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Refs
  const audioRef = useRef<HTMLAudioElement>(null);

  // useCallback for handleAdvance เพื่อ memoize และใส่ใน dependency array ของ useEffect
  const handleAdvance = useCallback(() => {
    if (currentStep < 4) {
      setShowMessage(false);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setShowMessage(true);
      }, 500);
    } else if (currentStep >= 4 && currentStep < 14) {
      setCurrentStep((prev) => prev + 1);
      if (currentStep === 4 && audioRef.current) {
        audioRef.current
          .play()
          .catch((e) => console.error("Error playing audio:", e));
      }
    } else if (currentStep === 14) {
      setCurrentStep(15);
    }
  }, [currentStep]);

  // Handle gift form submission
  const handleGiftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (giftText.trim()) {
      setShowGiftModal(true);
      setTimeout(() => {
        setShowGiftModal(false);
        setCurrentStep(16);
        setShowWishes(true);
      }, 3000);
    }
  };

  // Handle final wishes animation
  useEffect(() => {
    if (showWishes && currentWish < finalWishes.length) {
      const timer = setTimeout(() => {
        setCurrentWish(currentWish + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showWishes, currentWish]);

  // Handle keyboard navigation with updated dependency array
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (currentStep < 15) {
          handleAdvance();
        } else if (currentStep === 16 && currentWish < finalWishes.length) {
          setCurrentWish((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentStep, handleAdvance, currentWish]);

  // Toggle audio mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Music */}
      <audio ref={audioRef} loop className="hidden" preload="auto">
        <source src="/b.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Audio Control */}
      {currentStep >= 5 && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent handleAdvance from firing
            toggleMute();
          }}
          className="fixed top-4 right-4 z-50 bg-pink-100 hover:bg-pink-200 p-3 rounded-full shadow-lg transition-all duration-300"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? (
            <VolumeX size={20} className="text-pink-600" />
          ) : (
            <Volume2 size={20} className="text-pink-600" />
          )}
        </button>
      )}

      {/* Main Content Container */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        {/* Intro Messages (Steps 0-4) */}
        {currentStep <= 4 && (
          <div className="text-center cursor-pointer" onClick={handleAdvance}>
            <AnimatePresence mode="wait">
              {showMessage && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <h1
                    className={`${
                      currentStep === 3
                        ? shareTech.className
                        : sriracha.className
                    } text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600 leading-tight px-4`}
                  >
                    {introMessages[currentStep]}
                  </h1>
                  {/* The empty p tag below currentStep > 0 is removed as it serves no functional purpose */}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Photo Gallery (Steps 5-14) */}
        {currentStep >= 5 && currentStep <= 14 && (
          <div
            className="text-center cursor-pointer w-full flex flex-col items-center justify-center"
            onClick={handleAdvance}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
              >
                {/* Photo */}
                <div
                  className="relative mx-auto w-full rounded-2xl shadow-2xl overflow-hidden bg-gray-100 flex items-center justify-center"
                  style={{ aspectRatio: "4/3" }}
                >
                  <motion.img
                    src={photoGallery[currentStep - 5]?.src}
                    alt={photoGallery[currentStep - 5]?.caption}
                    className="w-full h-full object-contain"
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/800x600/CCCCCC/000000?text=Image+Error+${
                        currentStep - 4
                      }`;
                    }}
                  />
                </div>

                {/* Caption */}
                <motion.p
                  key={`caption-${currentStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className={`${sriracha.className} text-lg sm:text-xl md:text-2xl text-gray-700 italic px-4 max-w-2xl mx-auto whitespace-pre-line`}
                >
                  {photoGallery[currentStep - 5]?.caption}
                </motion.p>

                {/* Progress indicator */}
                <div className="flex justify-center space-x-2 mt-6">
                  {photoGallery.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index <= currentStep - 5 ? "bg-pink-500" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p
                  className={`${shareTech.className} text-gray-500 text-sm sm:text-base mt-4`}
                >
                  คลิกเพื่อดูรูปต่อไป ({currentStep - 4}/{photoGallery.length})
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Gift Form (Step 15) */}
        {currentStep === 15 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl"
          >
            <h2
              className={`${sriracha.className} text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-8`}
            >
              บอกของขวัญที่อยากได้
            </h2>

            <form onSubmit={handleGiftSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={giftText}
                  onChange={(e) => setGiftText(e.target.value)}
                  placeholder="เขียนของขวัญที่อยากได้..."
                  className={`${shareTech.className} w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:border-pink-500 focus:outline-none text-center text-lg transition-all duration-300`}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className={`${shareTech.className} bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 w-full`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ส่ง
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Final Wishes (Step 16) */}
        {currentStep === 16 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center space-y-6 max-w-2xl mx-auto"
          >
            {finalWishes.slice(0, currentWish).map((wish, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`${sriracha.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-pink-600 leading-relaxed`}
              >
                {wish}
              </motion.p>
            ))}

            {currentWish >= finalWishes.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1,
                  duration: 1,
                  type: "spring",
                  stiffness: 100,
                }}
                className="mt-12"
              >
                <div className="text-6xl sm:text-7xl md:text-8xl mb-4">🎂</div>
                <p
                  className={`${shareTech.className} text-gray-600 text-lg sm:text-xl`}
                >
                  สุขสันต์วันเกิดนะคะ! 💖
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Gift Modal */}
      <AnimatePresence>
        {showGiftModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <div className="text-4xl mb-4">🎁</div>
              <p
                className={`${sriracha.className} text-xl sm:text-2xl text-pink-600 font-bold leading-relaxed`}
              >
                ของขวัญถึงแล้ว!!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hearts Background */}
      {currentStep >= 5 && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300 opacity-60"
              initial={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
                y:
                  (typeof window !== "undefined" ? window.innerHeight : 800) +
                  50,
                scale: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                y: -100,
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 15 + 20,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 20,
                ease: "linear",
              }}
            >
              💖
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
