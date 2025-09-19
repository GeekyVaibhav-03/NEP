import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TimelineIcon from "@mui/icons-material/Timeline";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import CloudIcon from "@mui/icons-material/Cloud";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import InsightsIcon from "@mui/icons-material/Insights";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const { user } = useAuth();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const tl = gsap.timeline();

    // Enhanced Hero animation with 3D effects
    tl.from(".hero-3d-container", {
      opacity: 0,
      scale: 0.8,
      rotationY: 45,
      duration: 1.2,
      ease: "power3.out",
      transformOrigin: "center center",
    })
      .from(
        ".hero-title",
        {
          opacity: 0,
          y: 80,
          rotationX: 90,
          duration: 1,
          ease: "power3.out",
          transformOrigin: "center bottom",
        },
        "-=0.8"
      )
      .from(
        ".hero-subtitle",
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      )
      .from(
        ".hero-buttons",
        {
          opacity: 0,
          y: 40,
          scale: 0.8,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.4"
      );

    // 3D Floating animations
    gsap.to(".floating-icon", {
      y: -20,
      x: 10,
      rotation: 360,
      duration: 4,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.3,
    });

    // Parallax 3D spheres
    gsap.to(".sphere-1", {
      y: -30,
      x: 20,
      rotationY: 360,
      duration: 8,
      ease: "none",
      repeat: -1,
    });

    gsap.to(".sphere-2", {
      y: 25,
      x: -15,
      rotationX: 360,
      duration: 6,
      ease: "none",
      repeat: -1,
    });

    gsap.to(".sphere-3", {
      y: -15,
      x: 30,
      rotation: 360,
      duration: 10,
      ease: "none",
      repeat: -1,
    });

    // ScrollTrigger animations for features
    gsap.utils.toArray(".feature-card").forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 100,
        rotationY: 45,
        scale: 0.8,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 50%",
          scrub: false,
        },
        delay: index * 0.1,
      });
    });

    // 3D tilt effect for cards
    gsap.utils.toArray(".tilt-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          rotationY: 5,
          rotationX: 5,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  if (user) {
    // Redirect authenticated users to their dashboard
    if (user.userType === "faculty") {
      return <Navigate to="/faculty" replace />;
    }
    if (user.userType === "student") {
      return <Navigate to="/student" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-x-hidden"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated 3D Spheres */}
        <div
          className="sphere-1 absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 rounded-full blur-xl"
          style={{
            transform: `translate3d(${mousePosition.x * 20}px, ${
              mousePosition.y * 20
            }px, 0)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="sphere-2 absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-lg"
          style={{
            transform: `translate3d(${mousePosition.x * -15}px, ${
              mousePosition.y * 15
            }px, 0)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="sphere-3 absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-lg"
          style={{
            transform: `translate3d(${mousePosition.x * 25}px, ${
              mousePosition.y * -10
            }px, 0)`,
            transition: "transform 0.3s ease-out",
          }}
        />

        {/* 3D Grid Background */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              transform: `rotateX(60deg) scale(1.5)`,
              transformOrigin: "center center",
            }}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center hero-3d-container">
            {/* Enhanced Floating Icons with 3D effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="floating-icon absolute top-20 left-20 p-4 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl border border-indigo-200/20 dark:border-indigo-800/20"
                style={{
                  transform: `translate3d(${mousePosition.x * 30}px, ${
                    mousePosition.y * 20
                  }px, 0) rotateY(${mousePosition.x * 10}deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <CalendarMonthIcon className="text-indigo-400 dark:text-indigo-300 text-4xl" />
              </div>

              <div
                className="floating-icon absolute top-40 right-32 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl border border-cyan-200/20 dark:border-cyan-800/20"
                style={{
                  transform: `translate3d(${mousePosition.x * -25}px, ${
                    mousePosition.y * 30
                  }px, 0) rotateX(${mousePosition.y * 10}deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <RocketLaunchIcon className="text-cyan-400 dark:text-cyan-300 text-5xl" />
              </div>

              <div
                className="floating-icon absolute bottom-40 left-40 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-purple-200/20 dark:border-purple-800/20"
                style={{
                  transform: `translate3d(${mousePosition.x * 20}px, ${
                    mousePosition.y * -20
                  }px, 0) rotateZ(${mousePosition.x * 5}deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <InsightsIcon className="text-purple-400 dark:text-purple-300 text-3xl" />
              </div>

              <div
                className="floating-icon absolute bottom-32 right-20 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl border border-green-200/20 dark:border-green-800/20"
                style={{
                  transform: `translate3d(${mousePosition.x * -15}px, ${
                    mousePosition.y * 25
                  }px, 0) rotateY(${mousePosition.y * -10}deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <TrendingUpIcon className="text-green-400 dark:text-green-300 text-4xl" />
              </div>
            </div>

            {/* Main Hero Content with 3D Effects */}
            <div className="relative z-10">
              {/* 3D Logo Container */}
              <div
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full mb-8 shadow-2xl relative"
                style={{
                  transform: `rotateY(${mousePosition.x * 10}deg) rotateX(${
                    mousePosition.y * 10
                  }deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full blur-xl opacity-50 animate-pulse" />
                <SchoolIcon className="text-white text-4xl relative z-10" />

                {/* 3D Ring Effect */}
                <div
                  className="absolute inset-0 border-2 border-indigo-300/30 rounded-full"
                  style={{
                    transform: "translateZ(10px)",
                    animation: "spin 10s linear infinite",
                  }}
                />
              </div>

              {/* 3D Title */}
              <h1
                className="hero-title text-6xl md:text-8xl font-bold text-slate-900 dark:text-white mb-8"
                style={{
                  textShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  transform: `perspective(1000px) rotateX(${
                    mousePosition.y * 2
                  }deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <span className="block relative">
                  Smart Timetable
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 blur-2xl -z-10" />
                </span>
                <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent relative">
                  Management
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-cyan-600/30 blur-xl -z-10" />
                </span>
              </h1>

              {/* Enhanced Subtitle */}
              <p
                className="hero-subtitle text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
                style={{
                  transform: `translateZ(20px) rotateX(${
                    mousePosition.y * 1
                  }deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                Revolutionize your academic scheduling with{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent font-semibold">
                  AI-powered timetable generation
                </span>
                , real-time analytics, and seamless collaboration tools.
              </p>

              {/* 3D Enhanced Buttons */}
              <div
                className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center items-center"
                style={{
                  transform: `translateZ(30px)`,
                }}
              >
                <Link
                  to="/signup"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold rounded-full transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-indigo-500/25"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      rotationY: 5,
                      rotationX: -5,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      rotationY: 0,
                      rotationX: 0,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }}
                >
                  {/* 3D Button Face */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-cyan-700 rounded-full"
                    style={{
                      transform: "translateZ(-4px)",
                    }}
                  />

                  <PersonIcon className="text-lg relative z-10" />
                  <span className="relative z-10">Get Started Free</span>
                  <ArrowForwardIcon className="text-lg group-hover:translate-x-2 transition-transform duration-300 relative z-10" />

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                </Link>

                <Link
                  to="/signin"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-full border-2 border-slate-200/50 dark:border-slate-600/50 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      rotationY: -5,
                      rotationX: 5,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      rotationY: 0,
                      rotationX: 0,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }}
                >
                  <LoginIcon className="text-lg" />
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section with 3D Effects */}
      <section
        ref={featuresRef}
        className="py-32 px-4 bg-gradient-to-b from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm relative"
      >
        {/* 3D Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
              `,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2
              className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8"
              style={{
                textShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              Why Choose Our{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Platform?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of academic scheduling with our cutting-edge
              features and immersive 3D interface
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ perspective: "1200px" }}
          >
            {/* Enhanced 3D Feature Cards */}
            <div
              className="feature-card tilt-card group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 hover:border-indigo-300/50 dark:hover:border-indigo-600/50 transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* 3D Card Background */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-cyan-50/50 dark:from-indigo-900/10 dark:to-cyan-900/10 rounded-3xl"
                style={{ transform: "translateZ(-5px)" }}
              />

              {/* Floating Icon Container */}
              <div
                className="relative p-4 bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-2xl w-fit mb-6 group-hover:scale-125 transition-all duration-500 shadow-lg"
                style={{
                  transform: "translateZ(20px)",
                  boxShadow: "0 10px 25px rgba(99, 102, 241, 0.2)",
                }}
              >
                <AutoGraphIcon className="text-indigo-600 dark:text-indigo-400 text-4xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              </div>

              <h3
                className="text-2xl font-bold text-slate-900 dark:text-white mb-4 relative"
                style={{ transform: "translateZ(15px)" }}
              >
                AI-Powered Scheduling
              </h3>

              <p
                className="text-slate-600 dark:text-slate-300 leading-relaxed relative"
                style={{ transform: "translateZ(10px)" }}
              >
                Advanced algorithms automatically generate optimal timetables
                while considering constraints, preferences, and resource
                availability with machine learning optimization.
              </p>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div
              className="feature-card tilt-card group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 hover:border-cyan-300/50 dark:hover:border-cyan-600/50 transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* 3D Card Background */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 dark:from-cyan-900/10 dark:to-blue-900/10 rounded-3xl"
                style={{ transform: "translateZ(-5px)" }}
              />

              <div
                className="relative p-4 bg-gradient-to-r from-cyan-100 to-cyan-200 dark:from-cyan-900/30 dark:to-cyan-800/30 rounded-2xl w-fit mb-6 group-hover:scale-125 transition-all duration-500 shadow-lg"
                style={{
                  transform: "translateZ(20px)",
                  boxShadow: "0 10px 25px rgba(6, 182, 212, 0.2)",
                }}
              >
                <TimelineIcon className="text-cyan-600 dark:text-cyan-400 text-4xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              </div>

              <h3
                className="text-2xl font-bold text-slate-900 dark:text-white mb-4 relative"
                style={{ transform: "translateZ(15px)" }}
              >
                Real-Time Analytics
              </h3>

              <p
                className="text-slate-600 dark:text-slate-300 leading-relaxed relative"
                style={{ transform: "translateZ(10px)" }}
              >
                Monitor faculty workload, room utilization, and schedule
                conflicts with interactive 3D dashboards and detailed reports
                powered by live data streams.
              </p>

              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div
              className="feature-card tilt-card group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 hover:border-green-300/50 dark:hover:border-green-600/50 transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-3xl"
                style={{ transform: "translateZ(-5px)" }}
              />

              <div
                className="relative p-4 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl w-fit mb-6 group-hover:scale-125 transition-all duration-500 shadow-lg"
                style={{
                  transform: "translateZ(20px)",
                  boxShadow: "0 10px 25px rgba(34, 197, 94, 0.2)",
                }}
              >
                <GroupsIcon className="text-green-600 dark:text-green-400 text-4xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              </div>

              <h3
                className="text-2xl font-bold text-slate-900 dark:text-white mb-4 relative"
                style={{ transform: "translateZ(15px)" }}
              >
                Multi-User Collaboration
              </h3>

              <p
                className="text-slate-600 dark:text-slate-300 leading-relaxed relative"
                style={{ transform: "translateZ(10px)" }}
              >
                Immersive dashboards for students, faculty, and administrators
                with role-based access and personalized 3D visualizations.
              </p>

              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div
              className="feature-card tilt-card group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50 transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-3xl"
                style={{ transform: "translateZ(-5px)" }}
              />

              <div
                className="relative p-4 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl w-fit mb-6 group-hover:scale-125 transition-all duration-500 shadow-lg"
                style={{
                  transform: "translateZ(20px)",
                  boxShadow: "0 10px 25px rgba(147, 51, 234, 0.2)",
                }}
              >
                <SpeedIcon className="text-purple-600 dark:text-purple-400 text-4xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              </div>

              <h3
                className="text-2xl font-bold text-slate-900 dark:text-white mb-4 relative"
                style={{ transform: "translateZ(15px)" }}
              >
                Lightning Fast
              </h3>

              <p
                className="text-slate-600 dark:text-slate-300 leading-relaxed relative"
                style={{ transform: "translateZ(10px)" }}
              >
                Generate complex timetables in seconds with GPU-accelerated
                algorithms and cutting-edge infrastructure optimization.
              </p>

              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div
              className="feature-card tilt-card group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 hover:border-orange-300/50 dark:hover:border-orange-600/50 transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/10 dark:to-red-900/10 rounded-3xl"
                style={{ transform: "translateZ(-5px)" }}
              />

              <div
                className="relative p-4 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl w-fit mb-6 group-hover:scale-125 transition-all duration-500 shadow-lg"
                style={{
                  transform: "translateZ(20px)",
                  boxShadow: "0 10px 25px rgba(249, 115, 22, 0.2)",
                }}
              >
                <SecurityIcon className="text-orange-600 dark:text-orange-400 text-4xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              </div>

              <h3
                className="text-2xl font-bold text-slate-900 dark:text-white mb-4 relative"
                style={{ transform: "translateZ(15px)" }}
              >
                Secure & Reliable
              </h3>

              <p
                className="text-slate-600 dark:text-slate-300 leading-relaxed relative"
                style={{ transform: "translateZ(10px)" }}
              >
                Military-grade security with end-to-end encryption,
                quantum-resistant protocols, and 99.99% uptime SLA guarantee.
              </p>

              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div
              className="feature-card tilt-card group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-sky-50/50 dark:from-blue-900/10 dark:to-sky-900/10 rounded-3xl"
                style={{ transform: "translateZ(-5px)" }}
              />

              <div
                className="relative p-4 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl w-fit mb-6 group-hover:scale-125 transition-all duration-500 shadow-lg"
                style={{
                  transform: "translateZ(20px)",
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)",
                }}
              >
                <CloudIcon className="text-blue-600 dark:text-blue-400 text-4xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-sky-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              </div>

              <h3
                className="text-2xl font-bold text-slate-900 dark:text-white mb-4 relative"
                style={{ transform: "translateZ(15px)" }}
              >
                Cloud-Native Platform
              </h3>

              <p
                className="text-slate-600 dark:text-slate-300 leading-relaxed relative"
                style={{ transform: "translateZ(10px)" }}
              >
                Access your timetables anywhere with global CDN, real-time
                synchronization, and offline-first progressive web app support.
              </p>

              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">
                Transform Your Academic Operations
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg mt-1">
                    <CheckCircleIcon className="text-green-600 dark:text-green-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Reduce Scheduling Time by 90%
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      What used to take days now takes minutes with our
                      intelligent automation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg mt-1">
                    <CheckCircleIcon className="text-green-600 dark:text-green-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Eliminate Conflicts
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Smart conflict detection ensures no double bookings or
                      resource overlaps.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg mt-1">
                    <CheckCircleIcon className="text-green-600 dark:text-green-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Improve Satisfaction
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Better schedules lead to happier students, faculty, and
                      administrators.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl p-8 text-white shadow-2xl">
                <div className="text-center">
                  <SchoolIcon className="text-6xl mb-6 opacity-80" />
                  <h3 className="text-2xl font-bold mb-4">
                    Join 500+ Institutions
                  </h3>
                  <p className="text-lg opacity-90 mb-8">
                    Trusted by schools, colleges, and universities worldwide
                  </p>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold">500+</div>
                      <div className="text-sm opacity-80">Institutions</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">50K+</div>
                      <div className="text-sm opacity-80">Students</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">5K+</div>
                      <div className="text-sm opacity-80">Faculty</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-cyan-600"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
            Join thousands of institutions already using our platform to
            streamline their academic operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-slate-50 text-indigo-600 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <PersonIcon className="text-lg" />
              Create Free Account
              <ArrowForwardIcon className="text-lg group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/signin"
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300"
            >
              <LoginIcon className="text-lg" />
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-2xl font-bold text-white mb-4">
            <SchoolIcon className="text-indigo-400" />
            NEP Timetable
          </div>
          <p className="text-slate-400 mb-6">
            Empowering educational institutions with smart scheduling solutions
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <Link to="/problems" className="hover:text-white transition-colors">
              Problem Solving
            </Link>
            <Link
              to="/generator"
              className="hover:text-white transition-colors"
            >
              Generator
            </Link>
            <Link to="/admin" className="hover:text-white transition-colors">
              Admin
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>© 2025 NEP Timetable. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}