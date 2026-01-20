"use client";

import React from 'react';
import { Mail, Users, Building, GraduationCap, Video } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#E3E1DB]">
      
      {/* Header */}
      <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold font-serif">
            Collaborate With Us
          </h1>
          <p className="text-[#E3E1DB]/80 text-lg font-light">
            For partnerships, research collaboration, and meaningful engagement
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Introduction Text */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-[#1a1a1a]/80 leading-relaxed text-lg">
              We welcome collaboration with organizations and individuals committed to preserving cultural 
              heritage, supporting marginalized communities, and advancing ethical ethnographic research.
            </p>
          </div>

          {/* Cards Grid - 2x2 */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            
            {/* Card 1: NGOs */}
            <div className="bg-white p-8 border-l-4 border-[#99302A] shadow-sm hover:shadow-md transition-all -sm">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 -full bg-[#99302A]/10 flex items-center justify-center flex-shrink-0 text-[#99302A]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[#1a1a1a] mb-2 text-xl font-bold font-serif">NGOs & Grassroots</h3>
                  <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                    If you work directly with these or similar communities and are interested in collaborative documentation, advocacy, or program development.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Academic */}
            <div className="bg-white p-8 border-l-4 border-[#99302A] shadow-sm hover:shadow-md transition-all -sm">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 -full bg-[#99302A]/10 flex items-center justify-center flex-shrink-0 text-[#99302A]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[#1a1a1a] mb-2 text-xl font-bold font-serif">Academic Researchers</h3>
                  <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                    Universities and research institutions interested in ethnographic collaboration, joint publications, or accessing research materials for academic purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Government - Fixed Title */}
            <div className="bg-white p-8 border-l-4 border-[#99302A] shadow-sm hover:shadow-md transition-all -sm">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 -full bg-[#99302A]/10 flex items-center justify-center flex-shrink-0 text-[#99302A]">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[#1a1a1a] mb-2 text-xl font-bold font-serif">Government & Policy Makers</h3>
                  <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                    Government departments working on tribal welfare, cultural preservation, livelihood development, or inclusive policy design.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: Media */}
            <div className="bg-white p-8 border-l-4 border-[#99302A] shadow-sm hover:shadow-md transition-all -sm">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 -full bg-[#99302A]/10 flex items-center justify-center flex-shrink-0 text-[#99302A]">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[#1a1a1a] mb-2 text-xl font-bold font-serif">Media & Documentarians</h3>
                  <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                    Filmmakers, journalists, and content creators committed to ethical storytelling and authentic representation of marginalized communities.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Get In Touch Section */}
          <div className="text-center mb-20">
            <h2 className="text-[#1a1a1a] mb-6 text-2xl font-bold font-serif">Get In Touch</h2>
            <p className="text-[#1a1a1a]/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              We carefully consider each collaboration opportunity to ensure alignment with our values of dignity, respect, and meaningful impact.
            </p>
            <div className="inline-flex items-center gap-3 bg-white px-8 py-4 shadow-sm border border-[#1a1a1a]/10 hover:border-[#99302A]/50 transition-all ">
              <Mail className="w-5 h-5 text-[#99302A]" />
              <a href="mailto:contact@unheardindia.org" className="text-[#1a1a1a] font-medium hover:text-[#99302A] transition-colors">
                patodesign@dituniversity.edu.in
              </a>
            </div>
            <p className="text-xs text-[#1a1a1a]/50 mt-4 italic">
              Please include details about your organization and how you envision working together.
            </p>
          </div>

          {/* Collaboration Principles - Fixed Bullets to Squares */}
          <div className="bg-white p-10  shadow-sm border-l-4 border-[#99302A]">
            <h3 className="text-[#1a1a1a] mb-6 text-xl font-bold font-serif">Our Collaboration Principles</h3>
            <ul className="space-y-4 text-sm text-[#1a1a1a]/80">
              <li className="flex gap-4 items-start">
                <div className="w-2 h-2 bg-[#99302A] mt-2 flex-shrink-0 rotate-45"></div>
                <span>All collaborations must center community benefit and dignity</span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-2 h-2 bg-[#99302A] mt-2 flex-shrink-0 rotate-45"></div>
                <span>We do not support extractive research or exploitative documentation</span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-2 h-2 bg-[#99302A] mt-2 flex-shrink-0 rotate-45"></div>
                <span>Commercial use of content requires explicit permission and benefit-sharing agreements</span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-2 h-2 bg-[#99302A] mt-2 flex-shrink-0 rotate-45"></div>
                <span>We prioritize long-term engagement over one-time interventions</span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-2 h-2 bg-[#99302A] mt-2 flex-shrink-0 rotate-45"></div>
                <span>Transparency, ethical practice, and mutual respect are non-negotiable</span>
              </li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}