'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  MapPin, Clock, Users, Briefcase, Heart, 
  AlertTriangle, Target, ChevronRight, Home,
  Music, BookOpen, GraduationCap, Stethoscope,
  Award, TrendingUp, TreePine
} from 'lucide-react';

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/story-bhoksa.png"
          alt="Bhoksa community"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#1a1a1a]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        <p className="text-[#99302A] text-sm uppercase tracking-widest mb-4 font-bold">Back to Communities</p>
        <h1 className="text-5xl md:text-7xl font-serif text-[#E3E1DB] mb-4">Bhoksa</h1>
        <p className="text-[#99302A] text-xl md:text-2xl mb-6 font-medium">Between Forest and Settlement</p>
        <div className="flex items-center justify-center text-[#E3E1DB]/90 text-sm">
          <MapPin size={16} className="mr-2" />
          <span>Uttarakhand</span>
        </div>
      </div>
    </section>
  );
}

// Introduction Section
function IntroductionSection() {
  return (
    <section className="py-16 px-4 bg-[#1a1a1a]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[#E3E1DB]/90 text-lg leading-relaxed font-serif">
          The Bhoksa are a Scheduled Tribe community primarily residing in the Terai region of Uttarakhand. 
          Traditionally forest dwellers, they have navigated significant socio-economic transitions over the past 
          few decades.
        </p>
      </div>
    </section>
  );
}

// Timeline Section
function TimelineSection() {
  const timelineEvents = [
    { year: '1500s', title: 'Forest Settlement', description: 'Established in Shivalik foothill forests', side: 'left' },
    { year: '1800s', title: 'Colonial Period', description: 'British forest laws restrict access', side: 'right' },
    { year: '1950', title: 'Post-Independence', description: 'Forest conservation policies enacted', side: 'left' },
    { year: '1967', title: 'Scheduled Tribe Status', description: 'Official recognition granted', side: 'right' },
    { year: '2024', title: 'Present Day', description: 'Balancing tradition with modernization', side: 'left' },
  ];

  return (
    <section className="py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-12">
          <Clock className="text-[#99302A] mr-3" size={24} />
          <h2 className="text-2xl font-serif text-[#E3E1DB]">History & Origin Timeline</h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#99302A]/30"></div>

          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center ${event.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`w-full md:w-5/12 ${event.side === 'left' ? 'text-center md:text-right md:pr-8' : 'text-center md:text-left md:pl-8'} mb-4 md:mb-0`}>
                  <div className={`bg-[#262626] p-6 rounded-lg border-l-4 ${event.side === 'left' ? 'border-[#99302A]' : 'border-[#E3E1DB]/20'}`}>
                    <span className="text-[#99302A] text-2xl font-bold block">{event.year}</span>
                    <h3 className="text-[#E3E1DB] font-semibold mt-2">{event.title}</h3>
                    <p className="text-[#E3E1DB]/70 text-sm mt-1">{event.description}</p>
                  </div>
                </div>
                <div className="w-full md:w-2/12 flex justify-center py-2 md:py-0 relative z-10">
                  <div className="w-4 h-4 bg-[#99302A] rounded-full border-4 border-[#1a1a1a] shadow-[0_0_0_4px_rgba(153,48,42,0.2)]"></div>
                </div>
                <div className="w-full md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Lifestyle Section
function LifestyleSection() {
  const settlementData = [
    { label: 'Permanent Villages', value: 75, color: '#99302A' },
    { label: 'Semi-urban Areas', value: 20, color: '#D4763A' },
    { label: 'Forest Proximity', value: 5, color: '#5a8b5a' },
  ];

  const dailyRhythm = [
    { time: '5:00 AM', activity: 'Agricultural & forest activities', icon: TreePine },
    { time: '9:00 AM', activity: 'Traditional craft work (basketry)', icon: Briefcase },
    { time: '12:00 PM', activity: 'Meal & rest period', icon: Users },
    { time: '2:00 PM', activity: 'Wage labor or cultivation', icon: Briefcase },
    { time: '6:00 PM', activity: 'Community gatherings', icon: Users },
    { time: '8:00 PM', activity: 'Cultural activities & storytelling', icon: Music },
  ];

  return (
    <section className="py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-12">
          <Home className="text-[#99302A] mr-3" size={24} />
          <h2 className="text-2xl font-serif text-[#E3E1DB]">Lifestyle & Settlement Patterns</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Settlement Distribution */}
          <div className="bg-[#262626] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-[#E3E1DB] font-semibold mb-6">Settlement Distribution</h3>
            <div className="space-y-4">
              {settlementData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#E3E1DB]/90">{item.label}</span>
                    <span className="text-[#99302A]">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${item.value}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E3E1DB]/20">
              <h4 className="text-[#E3E1DB] font-semibold mb-4">Migration Patterns</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#E3E1DB]/70">Frequency</span>
                  <span className="text-[#E3E1DB]">Seasonal for wage labor</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#E3E1DB]/70">Distance</span>
                  <span className="text-[#E3E1DB]">Within state (50-200 km)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#E3E1DB]/70">Primary Reason</span>
                  <span className="text-[#E3E1DB]">Agricultural work & construction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Life Rhythm */}
          <div className="bg-[#262626] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-[#E3E1DB] font-semibold mb-6">Daily Life Rhythm</h3>
            <div className="space-y-4">
              {dailyRhythm.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 text-[#99302A] font-mono text-sm font-bold">
                      {item.time}
                    </div>
                    <div className="flex-shrink-0">
                      <IconComponent size={18} className="text-[#E3E1DB]/50" />
                    </div>
                    <div className="text-[#E3E1DB]/90 text-sm">{item.activity}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Craft & Livelihood Section
function CraftSection() {
  const skillsData = [
    { label: 'Basketry & Weaving', value: 80, sublabel: 'Proficiency' },
    { label: 'Medicinal Plant Knowledge', value: 85, sublabel: 'Proficiency' },
    { label: 'Agriculture', value: 70, sublabel: 'Primary livelihood' },
    { label: 'Forest Resource Collection', value: 75, sublabel: 'Restricted access' },
  ];

  const processSteps = [
    { step: 1, title: 'Material Collection', desc: 'Bamboo & cane from forests' },
    { step: 2, title: 'Preparation', desc: 'Soaking and splitting' },
    { step: 3, title: 'Weaving', desc: 'Traditional basket patterns' },
    { step: 4, title: 'Finishing', desc: 'Trimming & reinforcement' },
    { step: 5, title: 'Local Sale', desc: 'Weekly markets' },
  ];

  return (
    <section className="py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-12">
          <Briefcase className="text-[#99302A] mr-3" size={24} />
          <h2 className="text-2xl font-serif text-[#E3E1DB]">Craft & Livelihood</h2>
        </div>

        {/* Traditional Skills & Market Viability */}
        <div className="bg-[#262626] p-6 rounded-lg mb-8 shadow-lg">
          <h3 className="text-[#E3E1DB] font-semibold mb-6">Traditional Skills & Market Viability</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {skillsData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#E3E1DB]/90">{item.label}</span>
                  <span className="text-[#99302A]">{item.value}%</span>
                </div>
                <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#99302A] rounded-full transition-all duration-1000"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
                <p className="text-[#E3E1DB]/50 text-xs mt-1">{item.sublabel}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Craft Production Process */}
        <div className="bg-[#262626] p-6 rounded-lg mb-8 shadow-lg">
          <h3 className="text-[#E3E1DB] font-semibold mb-8">Craft Production Process</h3>
          <div className="flex flex-wrap justify-center items-stretch gap-4">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-[#1a1a1a] p-4 rounded-lg text-center w-36 h-full flex flex-col justify-center border border-[#E3E1DB]/20 hover:border-[#99302A] transition-colors">
                  <div className="w-8 h-8 bg-[#99302A] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <span className="text-[#E3E1DB] text-sm font-bold">{step.step}</span>
                  </div>
                  <p className="text-[#E3E1DB] text-sm font-semibold">{step.title}</p>
                  <p className="text-[#E3E1DB]/50 text-xs mt-1">{step.desc}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <ChevronRight className="text-[#99302A] mx-2 hidden md:block" size={20} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Income Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#99302A] p-6 rounded-lg text-center shadow-lg hover:translate-y-[-2px] transition-transform">
            <p className="text-[#E3E1DB]/80 text-sm mb-2 uppercase tracking-wide">Average Monthly Income</p>
            <p className="text-[#E3E1DB] text-2xl font-bold">₹4,000-8,000/month</p>
          </div>
          <div className="bg-[#262626] p-6 rounded-lg text-center border border-[#E3E1DB]/20 shadow-lg hover:translate-y-[-2px] transition-transform">
            <p className="text-[#E3E1DB]/70 text-sm mb-2 uppercase tracking-wide">Forest Dependency</p>
            <p className="text-[#E3E1DB] text-2xl font-bold">40% livelihood reliance</p>
          </div>
          <div className="bg-[#262626] p-6 rounded-lg text-center border border-[#E3E1DB]/20 shadow-lg hover:translate-y-[-2px] transition-transform">
            <p className="text-[#E3E1DB]/70 text-sm mb-2 uppercase tracking-wide">Market Trend</p>
            <p className="text-[#E3E1DB] text-2xl font-bold flex items-center justify-center">
              <TrendingUp size={20} className="text-green-500 mr-2" />
              60% households dependent
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Culture & Identity Section
function CultureSection() {
  const culturalElements = [
    { icon: Music, title: 'Language', desc: 'Bhoksa (Indo-Aryan), Hindi' },
    { icon: BookOpen, title: 'Religion', desc: 'Hinduism with animistic practices' },
    { icon: Music, title: 'Music', desc: 'Folk songs with dhol & damau' },
    { icon: Users, title: 'Marriage', desc: 'Community endogamy, dowry practices' },
  ];

  const festivals = ['Diwali', 'Holi', 'Makar Sankranti', 'Forest Deity Festivals'];

  return (
    <section className="py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-12">
          <Heart className="text-[#99302A] mr-3" size={24} />
          <h2 className="text-2xl font-serif text-[#E3E1DB]">Culture & Identity</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Cultural Elements */}
          <div className="grid grid-cols-2 gap-4">
            {culturalElements.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="bg-[#262626] p-6 rounded-lg text-center shadow-md hover:bg-[#2a2a2a] transition-colors">
                  <div className="w-12 h-12 bg-[#99302A]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconComponent size={24} className="text-[#99302A]" />
                  </div>
                  <p className="text-[#99302A] text-sm mb-1 font-semibold">{item.title}</p>
                  <p className="text-[#E3E1DB] text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Major Festivals */}
          <div className="bg-[#262626] p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-[#99302A] rounded-full flex items-center justify-center mr-3">
                <span className="text-[#E3E1DB] text-lg">🎉</span>
              </div>
              <h3 className="text-[#E3E1DB] font-semibold">Major Festivals</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {festivals.map((festival, index) => (
                <span 
                  key={index} 
                  className="bg-[#99302A]/20 text-[#99302A] px-4 py-2 rounded-full text-sm hover:bg-[#99302A]/30 transition-colors cursor-default"
                >
                  {festival}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Horizontal Bar Chart Component
function HorizontalBarChart({ 
  data, 
  showPercentage = true
}: { 
  data: { label: string; men?: number; women?: number; value?: number; color?: string }[];
  showPercentage?: boolean;
}) {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[#E3E1DB]/90">{item.label}</span>
            {showPercentage && (
              <span className="text-[#E3E1DB]/70">
                {item.men !== undefined && item.women !== undefined 
                  ? `${item.men}% Men / ${item.women}% Women`
                  : `${item.value}%`
                }
              </span>
            )}
          </div>
          <div className="flex h-3 rounded-full overflow-hidden bg-[#1a1a1a]">
            {item.men !== undefined && item.women !== undefined ? (
              <>
                <div 
                  className="bg-[#D4763A] transition-all duration-1000"
                  style={{ width: `${item.men}%` }}
                ></div>
                <div 
                  className="bg-[#99302A] transition-all duration-1000"
                  style={{ width: `${item.women}%` }}
                ></div>
              </>
            ) : (
              <div 
                className="transition-all duration-1000 rounded-full"
                style={{ 
                  width: `${item.value}%`, 
                  backgroundColor: item.color === '#c75b39' ? '#99302A' : item.color 
                }}
              ></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Gender Roles Section
function GenderSection() {
  const genderData = [
    { label: 'Forest Collection', men: 40, women: 60 },
    { label: 'Agriculture', men: 65, women: 35 },
    { label: 'Basketry', men: 55, women: 45 },
    { label: 'Wage Labor', men: 75, women: 25 },
    { label: 'Education', men: 45, women: 30 },
  ];

  return (
    <section className="py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-12">
          <Users className="text-[#99302A] mr-3" size={24} />
          <h2 className="text-2xl font-serif text-[#E3E1DB]">Gender Roles & Participation</h2>
        </div>

        <div className="bg-[#262626] p-6 rounded-lg shadow-lg">
          <div className="flex justify-end mb-4 space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#D4763A] rounded mr-2"></div>
              <span className="text-[#E3E1DB]/90">Men</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#99302A] rounded mr-2"></div>
              <span className="text-[#E3E1DB]/90">Women</span>
            </div>
          </div>
          <HorizontalBarChart data={genderData} />
        </div>
      </div>
    </section>
  );
}

// Key Challenges Section
function ChallengesSection() {
  const challengesData = [
    { label: 'Forest Access Restrictions', value: 85, color: '#99302A' },
    { label: 'Loss of traditional livelihood', value: 80, color: '#99302A' },
    { label: 'Education Quality', value: 75, color: '#99302A' },
    { label: 'Limited higher education access', value: 70, color: '#99302A' },
    { label: 'Economic Opportunities', value: 68, color: '#99302A' },
    { label: 'Dependent on daily wage labor', value: 65, color: '#99302A' },
    { label: 'Traditional Knowledge Loss', value: 60, color: '#99302A' },
    { label: 'Youth disinterest in customs', value: 55, color: '#99302A' },
    { label: 'Healthcare Infrastructure', value: 50, color: '#99302A' },
    { label: 'Limited access to medical facilities', value: 45, color: '#99302A' },
  ];

  return (
    <section className="py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-12">
          <AlertTriangle className="text-[#99302A] mr-3" size={24} />
          <h2 className="text-2xl font-serif text-[#E3E1DB]">Key Challenges</h2>
        </div>

        <div className="bg-[#262626] p-6 rounded-lg shadow-lg">
          <HorizontalBarChart data={challengesData} />
        </div>
      </div>
    </section>
  );
}

// Aspirations Section
function AspirationsSection() {
  const aspirations = [
    { percentage: 88, label: 'Forest Rights Recognition', sublabel: 'Community Priority', icon: TreePine },
    { percentage: 90, label: 'Quality Education', sublabel: 'Community Priority', icon: GraduationCap },
    { percentage: 85, label: 'Stable Employment', sublabel: 'Community Priority', icon: Briefcase },
    { percentage: 82, label: 'Healthcare Access', sublabel: 'Community Priority', icon: Stethoscope },
    { percentage: 75, label: 'Cultural Preservation', sublabel: 'Community Priority', icon: Heart },
    { percentage: 80, label: 'Skill Development', sublabel: 'Community Priority', icon: Award },
  ];

  return (
    <section className="py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-12">
          <Target className="text-[#99302A] mr-3" size={24} />
          <h2 className="text-2xl font-serif text-[#E3E1DB]">Community Aspirations</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {aspirations.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="bg-[#262626] p-6 rounded-lg text-center shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="transform -rotate-90 w-24 h-24">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#3a3a3a"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#99302A"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 - (item.percentage / 100) * 2 * Math.PI * 40}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent size={24} className="text-[#99302A]" />
                  </div>
                </div>
                <p className="text-[#99302A] text-2xl font-bold">{item.percentage}%</p>
                <p className="text-[#E3E1DB] text-sm mt-2 font-semibold">{item.label}</p>
                <p className="text-[#E3E1DB]/50 text-xs mt-1">{item.sublabel}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 px-4 bg-[#99302A]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-serif text-[#E3E1DB] mb-4">Support Research & Documentation</h2>
        <p className="text-[#E3E1DB]/80 mb-8 text-lg">
          These visual narratives are based on rigorous ethnographic fieldwork. Learn more about our research methodology, 
          access full datasets, and contribute to community-centered documentation.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-[#99302A] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Explore Research
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors shadow-lg">
            Collaborate With Us
          </button>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function BhoksaPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      {/* 
        NOTE: Navbar and Footer are handled by the main Layout.
        We are rendering the page content here.
      */}
      <HeroSection />
      <IntroductionSection />
      <TimelineSection />
      <LifestyleSection />
      <CraftSection />
      <CultureSection />
      <GenderSection />
      <ChallengesSection />
      <AspirationsSection />
      <CTASection />
    </main>
  );
}
