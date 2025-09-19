import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ArticleIcon from "@mui/icons-material/Article";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import BugReportIcon from "@mui/icons-material/BugReport";
import FeedbackIcon from "@mui/icons-material/Feedback";
import BookIcon from "@mui/icons-material/Book";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import QuizIcon from "@mui/icons-material/Quiz";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CloudIcon from "@mui/icons-material/Cloud";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import ApiIcon from "@mui/icons-material/Api";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";

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

    // Floating elements animation
    gsap.to(".footer-float", {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.5,
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="footer-float absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-full blur-xl"></div>
        <div className="footer-float absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-xl"></div>
        <div className="footer-float absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-xl"></div>
        <div className="footer-float absolute bottom-32 right-1/3 w-28 h-28 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div
          ref={linksRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16"
        >
          {/* Company Info */}
          <div className="lg:col-span-2 footer-link">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative p-3 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl shadow-lg">
                <CalendarMonthIcon className="text-white text-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-xl blur-lg opacity-50"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  NEP Timetable
                </h3>
                <p className="text-slate-400 text-sm">
                  AI-Powered Education Platform
                </p>
              </div>
            </div>

            <p className="text-slate-300 mb-6 leading-relaxed">
              Revolutionizing educational scheduling with cutting-edge AI
              technology. Our platform empowers institutions to create optimal
              timetables that enhance learning outcomes and operational
              efficiency.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2 bg-slate-700/50 rounded-lg">
                  <EmailIcon fontSize="small" />
                </div>
                <span>contact@neptimetable.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2 bg-slate-700/50 rounded-lg">
                  <PhoneIcon fontSize="small" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2 bg-slate-700/50 rounded-lg">
                  <LocationOnIcon fontSize="small" />
                </div>
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Platform Features */}
          <div className="footer-link">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <AutoAwesomeIcon className="text-indigo-400" />
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/generator"
                  className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <CalendarMonthIcon fontSize="small" />
                  AI Timetable Generator
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <DashboardIcon fontSize="small" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <AnalyticsIcon fontSize="small" />
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  to="/problems"
                  className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <BugReportIcon fontSize="small" />
                  Problem Solving
                </Link>
              </li>
              <li>
                <Link
                  to="/faculty"
                  className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <SchoolIcon fontSize="small" />
                  Faculty Portal
                </Link>
              </li>
              <li>
                <Link
                  to="/student"
                  className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <PersonIcon fontSize="small" />
                  Student Portal
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <AdminPanelSettingsIcon fontSize="small" />
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div className="footer-link">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <SupportAgentIcon className="text-cyan-400" />
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/docs"
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <BookIcon fontSize="small" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/tutorials"
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <VideoLibraryIcon fontSize="small" />
                  Video Tutorials
                </Link>
              </li>
              <li>
                <Link
                  to="/api"
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <ApiIcon fontSize="small" />
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  to="/integrations"
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <IntegrationInstructionsIcon fontSize="small" />
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <HelpOutlineIcon fontSize="small" />
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <QuizIcon fontSize="small" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <GroupsIcon fontSize="small" />
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-link">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <BusinessIcon className="text-purple-400" />
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-slate-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <ArticleIcon fontSize="small" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-slate-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <WorkIcon fontSize="small" />
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-slate-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <ArticleIcon fontSize="small" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="text-slate-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <ArticleIcon fontSize="small" />
                  Press Kit
                </Link>
              </li>
              <li>
                <Link
                  to="/partners"
                  className="text-slate-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <GroupsIcon fontSize="small" />
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <EmailIcon fontSize="small" />
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/feedback"
                  className="text-slate-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <FeedbackIcon fontSize="small" />
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="footer-link border-t border-slate-700/50 pt-12 mb-12">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-white mb-4">
              Why Choose NEP Timetable?
            </h4>
            <p className="text-slate-300 max-w-3xl mx-auto">
              Experience the future of educational scheduling with our
              comprehensive AI-powered platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="inline-flex p-4 bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <AutoAwesomeIcon className="text-indigo-400 text-2xl" />
              </div>
              <h5 className="font-semibold text-white mb-2">AI-Powered</h5>
              <p className="text-slate-400 text-sm">
                Advanced machine learning algorithms for optimal scheduling
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <SecurityIcon className="text-green-400 text-2xl" />
              </div>
              <h5 className="font-semibold text-white mb-2">
                Secure & Reliable
              </h5>
              <p className="text-slate-400 text-sm">
                Enterprise-grade security with 99.9% uptime guarantee
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <MobileScreenShareIcon className="text-purple-400 text-2xl" />
              </div>
              <h5 className="font-semibold text-white mb-2">
                Mobile Responsive
              </h5>
              <p className="text-slate-400 text-sm">
                Access your timetables anywhere, anytime on any device
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex p-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <CloudIcon className="text-orange-400 text-2xl" />
              </div>
              <h5 className="font-semibold text-white mb-2">Cloud-Based</h5>
              <p className="text-slate-400 text-sm">
                Automatic backups and seamless collaboration features
              </p>
            </div>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="footer-link border-t border-slate-700/50 pt-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Social Media */}
            <div className="text-center lg:text-left">
              <h4 className="text-xl font-bold text-white mb-6">
                Connect With Us
              </h4>
              <div className="flex justify-center lg:justify-start gap-4 mb-6">
                <a
                  href="#"
                  className="group p-3 bg-slate-700/50 hover:bg-indigo-600 rounded-xl transition-all duration-300 transform hover:scale-110"
                >
                  <TwitterIcon className="text-slate-300 group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="group p-3 bg-slate-700/50 hover:bg-blue-600 rounded-xl transition-all duration-300 transform hover:scale-110"
                >
                  <FacebookIcon className="text-slate-300 group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="group p-3 bg-slate-700/50 hover:bg-pink-600 rounded-xl transition-all duration-300 transform hover:scale-110"
                >
                  <InstagramIcon className="text-slate-300 group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="group p-3 bg-slate-700/50 hover:bg-blue-700 rounded-xl transition-all duration-300 transform hover:scale-110"
                >
                  <LinkedInIcon className="text-slate-300 group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="group p-3 bg-slate-700/50 hover:bg-gray-800 rounded-xl transition-all duration-300 transform hover:scale-110"
                >
                  <GitHubIcon className="text-slate-300 group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="group p-3 bg-slate-700/50 hover:bg-red-600 rounded-xl transition-all duration-300 transform hover:scale-110"
                >
                  <YouTubeIcon className="text-slate-300 group-hover:text-white" />
                </a>
              </div>
              <p className="text-slate-400">
                Follow us for updates, tips, and educational insights
              </p>
            </div>

            {/* Newsletter */}
            <div className="text-center lg:text-right">
              <h4 className="text-xl font-bold text-white mb-4">
                Stay Updated
              </h4>
              <p className="text-slate-300 mb-6">
                Get notified about new features, updates, and educational
                insights
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:ml-auto lg:mr-0">
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
        </div>

        {/* Bottom Bar */}
        <div className="footer-link border-t border-slate-700/50 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-slate-400 text-center lg:text-left">
              <p className="mb-2">© 2025 NEP Timetable. All rights reserved.</p>
              <p className="text-sm">
                Made with ❤️ for the future of education
              </p>
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
                24/7 Support
              </Link>
              <Link
                to="/status"
                className="text-slate-400 hover:text-indigo-400 transition-colors duration-300"
              >
                System Status
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            className="group p-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white rounded-full shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-110"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Back to top"
          >
            <RocketLaunchIcon className="text-xl group-hover:rotate-12 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
