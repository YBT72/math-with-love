"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import CoursesSection from "@/components/CoursesSection";
import LessonPreviewSection from "@/components/LessonPreviewSection";
import GamificationSection from "@/components/GamificationSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const scrollToCourses = () => {
    document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header onLoginClick={openModal} onRegisterClick={openModal} />
      <main>
        <HeroSection onStartClick={openModal} onCoursesClick={scrollToCourses} />
        <StatsBar />
        <div id="courses">
          <CoursesSection />
        </div>
        <LessonPreviewSection />
        <GamificationSection />
        <CTASection onRegisterClick={openModal} />
      </main>
      <Footer />
      <LoginModal isOpen={modalOpen} onClose={closeModal} />
    </>
  );
}
