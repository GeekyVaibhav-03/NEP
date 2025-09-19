import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SecurityIcon from "@mui/icons-material/Security";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    // Animate footer on scroll
    gsap.from(footerRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        end: "top 50%",
        scrub: false,
      },
    });

    // Animate footer links
    gsap.from(".footer-link", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: linksRef.current,
        start: "top 85%",
        end: "top 50%",
        scrub: false,
      },
    });

    // 3D hover effects for social icons
    gsap.utils.toArray(".social-icon").forEach((icon) => {
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          rotationY: 360,
          scale: 1.2,
          duration: 0.6,
          ease: "power2.out",
        });
      });

      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          rotationY: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
        `,
      }}
    >
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative p-3 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl shadow-2xl">
                <CalendarMonthIcon className="text-white text-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-xl blur-lg opacity-50" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  NEP Timetable
                </h3>
                <p className="text-slate-400 text-sm">Smart Scheduling</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              Revolutionizing academic scheduling with AI-powered solutions,
              real-time analytics, and seamless collaboration tools for modern
              institutions.
            </p>

            {/* Social Icons with 3D effects */}
            <div className="flex gap-4">
              <a
                href="#"
                className="social-icon group p-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300"
              >
                <TwitterIcon className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
              </a>
              <a
                href="#"
                className="social-icon group p-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <LinkedInIcon className="text-slate-400 group-hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="#"
                className="social-icon group p-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <GitHubIcon className="text-slate-400 group-hover:text-purple-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div ref={linksRef} className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <RocketLaunchIcon className="text-indigo-400" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/problems", label: "Problem Solving" },
                { to: "/generator", label: "Timetable Generator" },
                { to: "/admin", label: "Admin Dashboard" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="footer-link group inline-flex items-center gap-2 text-slate-300 hover:text-indigo-400 transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="w-1 h-1 bg-slate-500 rounded-full group-hover:bg-indigo-400 group-hover:scale-150 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <AutoAwesomeIcon className="text-cyan-400" />
              Features
            </h4>
            <ul className="space-y-3">
              {[
                "AI-Powered Scheduling",
                "Real-time Analytics",
                "Multi-user Collaboration",
                "Cloud Synchronization",
                "Advanced Reporting",
                "Mobile Responsive",
              ].map((feature, index) => (
                <li key={index}>
                  <div className="footer-link group inline-flex items-center gap-2 text-slate-300">
                    <TrendingUpIcon
                      fontSize="small"
                      className="text-green-400 group-hover:scale-110 transition-transform duration-300"
                    />
                    {feature}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <SecurityIcon className="text-green-400" />
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="footer-link group flex items-center gap-3 text-slate-300">
                <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-indigo-500/20 transition-colors duration-300">
                  <EmailIcon fontSize="small" className="text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Email</div>
                  <div>support@neptimetable.com</div>
                </div>
              </div>

              <div className="footer-link group flex items-center gap-3 text-slate-300">
                <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-green-500/20 transition-colors duration-300">
                  <PhoneIcon fontSize="small" className="text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Phone</div>
                  <div>+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="footer-link group flex items-center gap-3 text-slate-300">
                <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-purple-500/20 transition-colors duration-300">
                  <LocationOnIcon
                    fontSize="small"
                    className="text-purple-400"
                  />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Address</div>
                  <div>123 Education St, Tech City</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="footer-link bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-slate-700/30">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Latest Features
            </h4>
            <p className="text-slate-300 mb-6">
              Get notified about new features, updates, and educational insights
              delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-link border-t border-slate-700/50 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-center lg:text-left">
              <p>© 2025 NEP Timetable. All rights reserved.</p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-slate-400 hover:text-indigo-400 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-slate-400 hover:text-indigo-400 transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-slate-400 hover:text-indigo-400 transition-colors duration-300"
              >
                Cookie Policy
              </Link>
              <Link
                to="/support"
                className="text-slate-400 hover:text-indigo-400 transition-colors duration-300"
              >
                Support
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            className="group p-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white rounded-full shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-110"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <RocketLaunchIcon className="text-xl group-hover:rotate-12 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
