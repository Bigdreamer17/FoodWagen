"use client";

import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <footer className="food-footer bg-footer-dark text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Column */}
          <div>
            <h3
              className="mb-4"
              style={{
                fontFamily: "var(--font-source-sans)",
                fontWeight: 700,
                fontSize: "18.7px",
                lineHeight: "120%",
                letterSpacing: "0%",
                color: "#FFFFFF",
              }}
            >
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  style={{
                    fontFamily: "var(--font-source-sans)",
                    fontWeight: 400,
                    fontSize: "15.3px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#F5F5F5",
                  }}
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  style={{
                    fontFamily: "var(--font-source-sans)",
                    fontWeight: 400,
                    fontSize: "15.3px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#F5F5F5",
                  }}
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  style={{
                    fontFamily: "var(--font-source-sans)",
                    fontWeight: 400,
                    fontSize: "15.3px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#F5F5F5",
                  }}
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  style={{
                    fontFamily: "var(--font-source-sans)",
                    fontWeight: 400,
                    fontSize: "15.3px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#F5F5F5",
                  }}
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3
              className="mb-4"
              style={{
                fontFamily: "var(--font-source-sans)",
                fontWeight: 700,
                fontSize: "18.7px",
                lineHeight: "120%",
                letterSpacing: "0%",
                color: "#FFFFFF",
              }}
            >
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  style={{
                    fontFamily: "var(--font-source-sans)",
                    fontWeight: 400,
                    fontSize: "15.3px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#F5F5F5",
                  }}
                >
                  Help & Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  style={{
                    fontFamily: "var(--font-source-sans)",
                    fontWeight: 400,
                    fontSize: "15.3px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#F5F5F5",
                  }}
                >
                  Partner with us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  style={{
                    fontFamily: "var(--font-source-sans)",
                    fontWeight: 400,
                    fontSize: "15.3px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#F5F5F5",
                  }}
                >
                  Ride with us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3
              className="mb-4"
              style={{
                fontFamily: "var(--font-source-sans)",
                fontWeight: 700,
                fontSize: "18.7px",
                lineHeight: "120%",
                letterSpacing: "0%",
                color: "#FFFFFF",
              }}
            >
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  style={{
                    fontFamily: "var(--font-source-sans)",
                    fontWeight: 400,
                    fontSize: "15.3px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#F5F5F5",
                  }}
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  style={{
                    fontFamily: "var(--font-source-sans)",
                    fontWeight: 400,
                    fontSize: "15.3px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#F5F5F5",
                  }}
                >
                  Refund & Cancellation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  style={{
                    fontFamily: "var(--font-source-sans)",
                    fontWeight: 400,
                    fontSize: "15.3px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#F5F5F5",
                  }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  style={{
                    fontFamily: "var(--font-source-sans)",
                    fontWeight: 400,
                    fontSize: "15.3px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#F5F5F5",
                  }}
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3
              className="mb-4 uppercase"
              style={{
                fontFamily: "var(--font-source-sans)",
                fontWeight: 700,
                fontSize: "15.3px",
                lineHeight: "120%",
                letterSpacing: "0%",
                color: "#F5F5F5",
                opacity: 0.6,
              }}
            >
              Follow us
            </h3>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-medium hover:text-white transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-medium hover:text-white transition-colors"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-medium hover:text-white transition-colors"
              >
                <FaTwitter size={24} />
              </a>
            </div>

            <p
              className="mb-3"
              style={{
                fontFamily: "var(--font-open-sans)",
                fontWeight: 700,
                fontSize: "15.3px",
                lineHeight: "140%",
                letterSpacing: "0%",
                color: "#BBBBBB",
              }}
            >
              Receive exclusive offers in your mailbox
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div
                className="relative"
                style={{ flex: "1 1 250px", minWidth: "250px" }}
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FiMail size={20} color="#9CA3AF" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  style={{
                    backgroundColor: "rgba(156, 163, 175, 0.2)",
                    border: "1px solid rgba(156, 163, 175, 0.3)",
                    paddingTop: "6.8px",
                    paddingBottom: "6.8px",
                    paddingLeft: "40.8px",
                    paddingRight: "13.6px",
                    height: "51px",
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                className="font-medium transition-colors text-white"
                style={{
                  background:
                    "linear-gradient(90deg, #FFBA26 0%, #FF9A0E 100%)",
                  borderRadius: "6.8px",
                  paddingTop: "13.6px",
                  paddingRight: "20.4px",
                  paddingBottom: "13.6px",
                  paddingLeft: "20.4px",
                  width: "113px",
                  height: "51px",
                  gap: "8.5px",
                  boxShadow:
                    "0px 11.9px 27.2px 0px rgba(255, 178, 14, 0.29), 0px 4.25px 6.8px 0px rgba(222, 151, 0, 0.24)",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-medium/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-medium text-sm">
            All rights Reserved © Your Company, 2025
          </p>
          <div className="flex items-center gap-1" style={{ color: "#F5F5F5" }}>
            <span
              style={{
                fontFamily: "var(--font-exo-2)",
                fontWeight: 400,
                fontSize: "12.75px",
                lineHeight: "120%",
                letterSpacing: "0%",
              }}
            >
              Made with
            </span>
            <span
              style={{
                fontFamily: "Font Awesome 5 Free",
                fontWeight: 900,
                fontSize: "13px",
                lineHeight: "120%",
                letterSpacing: "0%",
              }}
            >
              ♥
            </span>
            <span
              style={{
                fontFamily: "var(--font-exo-2)",
                fontWeight: 400,
                fontSize: "12.75px",
                lineHeight: "120%",
                letterSpacing: "0%",
              }}
            >
              by
            </span>
            <span
              style={{
                fontFamily: "var(--font-open-sans)",
                fontWeight: 700,
                fontSize: "12.75px",
                lineHeight: "120%",
                letterSpacing: "0%",
              }}
            >
              Themewagon
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
