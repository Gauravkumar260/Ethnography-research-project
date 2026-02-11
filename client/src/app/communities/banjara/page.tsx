'use client';

import React from 'react';
import Image from 'next/image';
import { 
  MapPin, Clock, Users, Briefcase, Heart, 
  AlertTriangle, Target, ChevronRight, Home,
  Music, BookOpen, GraduationCap, Stethoscope,
  TrendingUp, Scissors, DollarSign, Sparkles,
  HandHeart
} from 'lucide-react';

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-end pb-16 md:pb-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=1920&q=80"
          alt="Banjara community"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
            <span className="uppercase tracking-widest font-bold text-[#99302A]">Back to Communities</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-2">
            Banjara
          </h1>
          <p className="font-serif text-2xl md:text-3xl text-[#99302A] italic mb-6">
            Woven in Color
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 text-white/90">
            <MapPin size={18} className="text-[#99302A]" />
            <span className="text-sm md:text-base">
              Pan-India concentrated in Maharashtra, Karnataka, Telangana
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Introduction Section
function IntroductionSection() {
  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg md:text-xl lg:text-2xl text-[#E3E1DB] leading-relaxed font-light font-serif">
          The Banjara (also known as{' '}
          <span className="font-medium text-[#99302A]">Lambadi</span> or{' '}
          <span className="font-medium text-[#99302A]">Gormati</span>) are a
          traditionally nomadic community renowned for their vibrant textile
          crafts, colorful attire, and rich oral traditions.
        </p>
      </div>
    </section>
  );
}

// Timeline Section
function TimelineSection() {
  const timelineEvents = [
    {
      year: '1300s',
      title: 'Historical Records',
      description: 'Mentioned as traveling traders',
      side: 'left',
    },
    {
      year: '1600s',
      title: 'Mughal Era',
      description: 'Transported grain for armies',
      side: 'right',
    },
    {
      year: '1900s',
      title: 'Colonial Period',
      description: 'Labeled as "Criminal Tribes"',
      side: 'left',
    },
    {
      year: '1952',
      title: 'De-notification',
      description: 'Removed from Criminal Tribes Act',
      side: 'right',
    },
    {
      year: '2024',
      title: 'Craft Revival',
      description: 'Global recognition of textile work',
      side: 'left',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12 md:mb-16">
          <Clock className="text-[#99302A]" size={24} />
          <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold">
            History & Origin Timeline
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#99302A]/50 to-transparent md:-translate-x-1/2" />

          {/* Events */}
          <div className="space-y-12 md:space-y-16">
            {timelineEvents.map((event) => (
              <div
                key={event.year}
                className={`relative flex flex-col md:flex-row items-start gap-8 md:gap-0 ${
                  event.side === 'right'
                    ? 'md:flex-row-reverse'
                    : ''
                }`}
              >
                {/* Content */}
                <div
                  className={`pl-12 md:pl-0 md:w-1/2 ${
                    event.side === 'right'
                      ? 'md:pr-12 md:text-right'
                      : 'md:pl-12'
                  }`}
                >
                  <div
                    className={`inline-block bg-[#262626]/40 backdrop-blur-sm rounded-lg px-6 py-4 border border-[#99302A]/20 ${
                      event.side === 'right' ? 'md:text-right' : ''
                    }`}
                  >
                    <span className="text-[#99302A] font-serif text-2xl md:text-3xl font-bold block">
                      {event.year}
                    </span>
                    <h3 className="text-white font-medium mt-1">
                      {event.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-1">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#99302A] rounded-full md:-translate-x-1/2 mt-2 ring-4 ring-[#1a1a1a]" />

                {/* Empty space for the other side */}
                <div className="hidden md:block md:w-1/2" />
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
    { label: 'Tandas (Settlements)', value: 70, color: '#99302A' },
    { label: 'Urban Slums', value: 20, color: '#D4763A' },
    { label: 'Nomadic', value: 10, color: '#C9A962' },
  ];

  const dailyRhythm = [
    { time: '5:00 AM', activity: 'Agricultural work / wage labor' },
    { time: '10:00 AM', activity: 'Women begin embroidery work' },
    { time: '1:00 PM', activity: 'Community meal preparation' },
    { time: '3:00 PM', activity: 'Craft work & market preparation' },
    { time: '7:00 PM', activity: 'Cultural gatherings & music' },
    { time: '9:00 PM', activity: 'Storytelling & family time' },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <Home className="text-[#99302A]" size={24} />
          <h2 className="font-serif text-2xl md:text-3xl text-[#E3E1DB] font-semibold">
            Lifestyle & Settlement Patterns
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Settlement Distribution */}
          <div>
            <h3 className="text-sm font-medium text-[#E3E1DB]/70 uppercase tracking-wider mb-6">
              Settlement Distribution
            </h3>
            <div className="space-y-4">
              {settlementData.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#E3E1DB]">{item.label}</span>
                    <span className="text-[#E3E1DB]/70 font-medium">
                      {item.value}%
                    </span>
                  </div>
                  <div className="h-3 bg-[#262626] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Migration Patterns */}
            <div className="mt-10 p-6 bg-[#262626] rounded-lg border border-[#E3E1DB]/20">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-[#99302A]" />
                <h4 className="font-medium text-[#E3E1DB]">
                  Migration Patterns
                </h4>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-[#E3E1DB]/70">Frequency:</span>
                  <p className="text-[#E3E1DB] font-medium">
                    Mostly settled now
                  </p>
                </div>
                <div>
                  <span className="text-[#E3E1DB]/70">Distance:</span>
                  <p className="text-[#E3E1DB] font-medium">
                    Historical: 500+ km trade routes
                  </p>
                </div>
                <div>
                  <span className="text-[#E3E1DB]/70">Primary Reason:</span>
                  <p className="text-[#E3E1DB] font-medium">
                    Transition to agriculture & craft
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Life Rhythm */}
          <div>
            <h3 className="text-sm font-medium text-[#E3E1DB]/70 uppercase tracking-wider mb-6">
              Daily Life Rhythm
            </h3>
            <div className="space-y-3">
              {dailyRhythm.map((item) => (
                <div
                  key={item.time}
                  className="flex items-start gap-4 p-4 bg-[#262626] rounded-lg border border-[#E3E1DB]/20 hover:shadow-md transition-shadow"
                >
                  <span className="text-[#99302A] font-medium text-sm whitespace-nowrap">
                    {item.time}
                  </span>
                  <span className="text-[#E3E1DB] text-sm">{item.activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Craft Section
function CraftSection() {
  const textileProducts = [
    { name: 'Mirror Work Embroidery', demand: 95, price: '₹500-5,000' },
    { name: 'Banjara Bags', demand: 88, price: '₹800-3,000' },
    { name: 'Wall Hangings', demand: 82, price: '₹1,500-8,000' },
    { name: 'Traditional Dress', demand: 75, price: '₹2,000-10,000' },
    { name: 'Jewelry (Tribal)', demand: 68, price: '₹300-2,000' },
  ];

  const productionSteps = [
    { number: '1', title: 'Base Fabric', description: 'Cotton or silk selection' },
    { number: '2', title: 'Design Mapping', description: 'Traditional geometric patterns' },
    { number: '3', title: 'Mirror Setting', description: 'Shisha embroidery work' },
    { number: '4', title: 'Thread Work', description: 'Colorful embroidery' },
    { number: '5', title: 'Finishing', description: 'Tassels & decorative edges' },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <Scissors className="text-[#99302A]" size={24} />
          <h2 className="font-serif text-2xl md:text-3xl text-[#E3E1DB] font-semibold">
            Craft & Livelihood
          </h2>
        </div>

        {/* Textile Products & Market Demand */}
        <div className="mb-16">
          <h3 className="text-sm font-medium text-[#E3E1DB]/70 uppercase tracking-wider mb-6">
            Textile Products & Market Demand
          </h3>
          <div className="space-y-5">
            {textileProducts.map((product) => (
              <div
                key={product.name}
                className="flex items-center gap-4 md:gap-8"
              >
                <span className="text-[#E3E1DB] text-sm w-40 md:w-48 flex-shrink-0">
                  {product.name}
                </span>
                <div className="flex-1 h-4 bg-[#262626] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#99302A] to-[#D4763A] rounded-full transition-all duration-1000"
                    style={{ width: `${product.demand}%` }}
                  />
                </div>
                <span className="text-[#E3E1DB]/70 text-sm w-24 text-right flex-shrink-0">
                  {product.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Craft Production Process */}
        <div className="mb-16">
          <h3 className="text-sm font-medium text-[#E3E1DB]/70 uppercase tracking-wider mb-8">
            Craft Production Process
          </h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {productionSteps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#99302A] flex items-center justify-center text-white font-serif text-2xl md:text-3xl font-bold mb-3 shadow-lg">
                    {step.number}
                  </div>
                  <h4 className="text-[#E3E1DB] font-medium text-sm text-center">
                    {step.title}
                  </h4>
                  <p className="text-[#E3E1DB]/70 text-xs text-center mt-1 max-w-[120px]">
                    {step.description}
                  </p>
                </div>
                {index < productionSteps.length - 1 && (
                  <div className="hidden md:block w-8 h-px bg-[#E3E1DB]/20 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#99302A] rounded-lg p-6 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={20} className="text-[#E3E1DB]" />
              <span className="text-sm text-white/80">Average Monthly Income</span>
            </div>
            <p className="font-serif text-3xl md:text-4xl font-bold">
              ₹5,000-12,000
              <span className="text-lg font-normal text-white/70">/month</span>
            </p>
          </div>

          <div className="bg-[#262626] border border-[#E3E1DB]/20 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={20} className="text-[#99302A]" />
              <span className="text-sm text-[#E3E1DB]/70">Production Time</span>
            </div>
            <p className="font-serif text-3xl md:text-4xl font-bold text-[#E3E1DB]">
              20-60 <span className="text-lg font-normal text-[#E3E1DB]/70">hours</span>
            </p>
          </div>

          <div className="bg-[#262626] border border-[#E3E1DB]/20 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={20} className="text-[#99302A]" />
              <span className="text-sm text-[#E3E1DB]/70">Market Trend</span>
            </div>
            <p className="font-serif text-3xl md:text-4xl font-bold text-[#E3E1DB]">
              +40% <span className="text-lg font-normal text-[#E3E1DB]/70">online sales</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Culture Section
function CultureSection() {
  const cultureItems = [
    {
      icon: BookOpen,
      title: 'Language',
      description: 'Lambadi/Banjara (Rajasthani roots)',
    },
    {
      icon: Heart,
      title: 'Religion',
      description: 'Hinduism with nature worship',
    },
    {
      icon: Music,
      title: 'Music',
      description: 'Folk songs with dhol & manjira',
    },
    {
      icon: Users,
      title: 'Marriage',
      description: 'Elaborate ceremonies, community participation',
    },
  ];

  const festivals = ['Teej', 'Holi', 'Diwali', 'Navratri'];

  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <Sparkles className="text-[#99302A]" size={24} />
          <h2 className="font-serif text-2xl md:text-3xl text-[#E3E1DB] font-semibold">
            Culture & Identity
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Culture Items Grid */}
          <div className="grid grid-cols-2 gap-4">
            {cultureItems.map((item) => (
              <div
                key={item.title}
                className="bg-[#262626] rounded-lg p-6 border border-[#E3E1DB]/20 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-[#99302A]/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-[#99302A]" />
                </div>
                <h3 className="font-medium text-[#E3E1DB] mb-2">{item.title}</h3>
                <p className="text-sm text-[#E3E1DB]/70">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Major Festivals */}
          <div className="bg-[#262626] rounded-lg p-8 border border-[#E3E1DB]/20 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={20} className="text-[#99302A]" />
              <h3 className="font-medium text-[#E3E1DB]">Major Festivals</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {festivals.map((festival) => (
                <span
                  key={festival}
                  className="px-4 py-2 bg-[#1a1a1a] text-[#99302A] rounded-full text-sm font-medium border border-[#E3E1DB]/20"
                >
                  {festival}
                </span>
              ))}
            </div>
            <p className="text-sm text-[#E3E1DB]/70 mt-6 leading-relaxed">
              Festivals are celebrated with great enthusiasm, featuring traditional
              dances, music, and elaborate feasts that bring the community together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Gender Roles Section
function GenderRolesSection() {
  const genderData = [
    { category: 'Textile Craft', men: 15, women: 85 },
    { category: 'Market Sales', men: 50, women: 50 },
    { category: 'Agriculture', men: 70, women: 30 },
    { category: 'Education', men: 55, women: 45 },
    { category: 'Decision Making', men: 60, women: 40 },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <Users className="text-[#99302A]" size={24} />
          <h2 className="font-serif text-2xl md:text-3xl text-[#E3E1DB] font-semibold">
            Gender Roles & Participation
          </h2>
        </div>

        {/* Gender Comparison Bars */}
        <div className="space-y-8">
          {genderData.map((item) => (
            <div key={item.category}>
              <h3 className="text-sm font-medium text-[#E3E1DB] mb-3">
                {item.category}
              </h3>
              <div className="flex items-center gap-4">
                {/* Men */}
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#E3E1DB]/70">Men</span>
                    <span className="text-[#E3E1DB]/70">{item.men}%</span>
                  </div>
                  <div className="h-4 bg-[#262626] rounded-l-full overflow-hidden">
                    <div
                      className="h-full bg-[#E3E1DB]/70 rounded-l-full transition-all duration-1000"
                      style={{ width: `${item.men}%` }}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-[#E3E1DB]/20" />

                {/* Women */}
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#99302A]">Women</span>
                    <span className="text-[#99302A]">{item.women}%</span>
                  </div>
                  <div className="h-4 bg-[#262626] rounded-r-full overflow-hidden">
                    <div
                      className="h-full bg-[#99302A] rounded-r-full transition-all duration-1000 ml-auto"
                      style={{ width: `${item.women}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Challenges Section
function ChallengesSection() {
  const challenges = [
    { name: 'Market Access', description: 'Middlemen exploitation', severity: 75 },
    { name: 'Education Gap', description: 'Low literacy rates', severity: 70 },
    { name: 'Economic Vulnerability', description: 'Irregular income', severity: 68 },
    { name: 'Loss of Traditional Knowledge', description: 'Youth migration', severity: 65 },
    { name: 'Social Discrimination', description: 'Historical stigma persists', severity: 60 },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <AlertTriangle className="text-[#D4763A]" size={24} />
          <h2 className="font-serif text-2xl md:text-3xl text-[#E3E1DB] font-semibold">
            Key Challenges
          </h2>
        </div>

        {/* Challenges List */}
        <div className="space-y-6">
          {challenges.map((challenge) => (
            <div
              key={challenge.name}
              className="bg-[#262626] rounded-lg p-6 border border-[#E3E1DB]/20 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:w-64 flex-shrink-0">
                  <h3 className="font-medium text-[#E3E1DB]">{challenge.name}</h3>
                  <p className="text-sm text-[#E3E1DB]/70">{challenge.description}</p>
                </div>
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex-1 h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${challenge.severity}%`,
                        backgroundColor:
                          challenge.severity > 70
                            ? '#D4763A'
                            : challenge.severity > 60
                            ? '#C9A962'
                            : '#99302A',
                      }}
                    />
                  </div>
                  <span className="text-[#99302A] font-bold w-12 text-right">
                    {challenge.severity}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Aspirations Section
function AspirationsSection() {
  const aspirations = [
    { name: 'Direct Market Access', percentage: 90 },
    { name: 'Skill Training', percentage: 85 },
    { name: 'Education for Children', percentage: 92 },
    { name: 'Financial Literacy', percentage: 78 },
    { name: 'Healthcare', percentage: 80 },
    { name: 'Craft Heritage Recognition', percentage: 88 },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <Target className="text-[#99302A]" size={24} />
          <h2 className="font-serif text-2xl md:text-3xl text-[#E3E1DB] font-semibold">
            Community Aspirations
          </h2>
        </div>

        {/* Aspirations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {aspirations.map((aspiration) => (
            <div key={aspiration.name} className="flex flex-col items-center">
              <div className="relative w-28 h-28 md:w-32 md:h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#262626"
                    strokeWidth="6"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#99302A"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={(2 * Math.PI * 45) - (aspiration.percentage / 100) * (2 * Math.PI * 45)}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold text-[#E3E1DB]">
                    {aspiration.percentage}%
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm text-[#E3E1DB]/80 text-center max-w-[140px]">
                {aspiration.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-[#99302A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold mb-4">
          Support Research & Documentation
        </h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          These visual narratives are based on rigorous ethnographic fieldwork.
          Learn more about our research methodology, access full datasets, and
          contribute to community-centered documentation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#99302A] rounded-lg font-medium hover:bg-[#E3E1DB] transition-colors shadow-lg">
            <BookOpen size={20} />
            Explore Research
          </button>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-white border-2 border-white rounded-lg font-medium hover:bg-white/10 transition-colors shadow-lg">
            <HandHeart size={20} />
            Collaborate With Us
          </button>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function BanjaraPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      <HeroSection />
      <IntroductionSection />
      <TimelineSection />
      <LifestyleSection />
      <CraftSection />
      <CultureSection />
      <GenderRolesSection />
      <ChallengesSection />
      <AspirationsSection />
      <CTASection />
    </main>
  );
}
