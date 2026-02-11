import React from 'react';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  Home,
  Scissors,
  TrendingUp,
  Droplets,
  Music,
  BookOpen,
  Heart,
  Users,
  Sparkles,
  AlertTriangle,
  Target,
  HandHeart
} from 'lucide-react';

// --- Hero Section ---
function Hero() {
  return (
    <section className="relative min-h-screen flex items-end pb-16 md:pb-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="Van Gujjar community in Himalayan forests"
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
            <a href="/communities" className="hover:text-white transition-colors">
              Communities
            </a>
            <span>/</span>
            <span className="text-white/60">Van Gujjar</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-2">
            Van Gujjar
          </h1>
          <p className="font-serif text-2xl md:text-3xl text-[#99302A] italic mb-6">
            Guardians of the Forest
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 text-white/90">
            <MapPin size={18} className="text-[#99302A]" />
            <span className="text-sm md:text-base">
              Uttarakhand, Himachal Pradesh
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Introduction Section ---
function Introduction() {
  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg md:text-xl lg:text-2xl text-[#E3E1DB] leading-relaxed font-light">
          The Van Gujjar are a pastoral community deeply connected to the Himalayan forests, practicing
          transhumance - seasonal migration between lowland winter settlements and high-altitude
          summer pastures.
        </p>
      </div>
    </section>
  );
}

// --- Timeline Section ---
const timelineEvents = [
  {
    year: '1200s',
    title: 'Migration to India',
    description: 'Arrival from Afghanistan region',
    side: 'left',
  },
  {
    year: '1800s',
    title: 'Forest Settlements',
    description: 'Established in Shivalik forests',
    side: 'right',
  },
  {
    year: '1982',
    title: 'National Park Creation',
    description: 'Rajaji NP formed - eviction begins',
    side: 'left',
  },
  {
    year: '2006',
    title: 'Forest Rights Act',
    description: 'Legal recognition of forest dwelling',
    side: 'right',
  },
  {
    year: '2024',
    title: 'Ongoing Struggle',
    description: 'Fighting for land & grazing rights',
    side: 'left',
  },
];

function Timeline() {
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
                className={`relative flex items-start gap-8 md:gap-0 ${
                  event.side === 'right'
                    ? 'md:flex-row-reverse'
                    : ''
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#99302A] rounded-full md:-translate-x-1/2 mt-2 ring-4 ring-[#1a1a1a]" />

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
                    <span className="text-[#99302A] font-serif text-2xl md:text-3xl font-bold">
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

// --- Lifestyle Section ---
const settlementData = [
  { label: 'Forest Camps (Summer)', value: 45, color: '#99302A' },
  { label: 'Lowland Huts (Winter)', value: 40, color: '#D4763A' },
  { label: 'Rehabilitation Sites', value: 15, color: '#C9A962' },
];

const livestockData = [
  { animal: 'Buffalo', count: '40-50 per family', product: 'Milk production' },
  { animal: 'Cows', count: '10-15 per family', product: 'Dairy & religious' },
  { animal: 'Goats', count: '15-20 per family', product: 'Meat & wool' },
];

function Lifestyle() {
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
                    Twice annually
                  </p>
                </div>
                <div>
                  <span className="text-[#E3E1DB]/70">Distance:</span>
                  <p className="text-[#E3E1DB] font-medium">
                    50-150 km vertical migration
                  </p>
                </div>
                <div>
                  <span className="text-[#E3E1DB]/70">Primary Reason:</span>
                  <p className="text-[#E3E1DB] font-medium">
                    Seasonal grazing patterns
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Livestock Management */}
          <div>
            <h3 className="text-sm font-medium text-[#E3E1DB]/70 uppercase tracking-wider mb-6">
              Livestock Management
            </h3>
            <div className="space-y-4">
              {livestockData.map((item) => (
                <div
                  key={item.animal}
                  className="flex items-center gap-4 p-4 bg-[#262626] rounded-lg border border-[#E3E1DB]/20"
                >
                  <div className="w-12 h-12 bg-[#99302A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">
                      {item.animal === 'Buffalo' && '🐃'}
                      {item.animal === 'Cows' && '🐄'}
                      {item.animal === 'Goats' && '🐐'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#E3E1DB]">{item.animal}</h4>
                    <p className="text-sm text-[#E3E1DB]/70">{item.count}</p>
                    <p className="text-xs text-[#99302A]">{item.product}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Craft Section ---
const traditionalSkills = [
  { name: 'Dairy Production', value: 95, label: 'Primary income' },
  { name: 'Herbal Medicine', value: 75, label: 'Traditional healing' },
  { name: 'Forest Knowledge', value: 90, label: 'Ecological services' },
  { name: 'Basketry', value: 60, label: 'Supplementary' },
];

function Craft() {
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

        {/* Traditional Skills & Market Viability */}
        <div className="mb-16">
          <h3 className="text-sm font-medium text-[#E3E1DB]/70 uppercase tracking-wider mb-6">
            Traditional Skills & Market Viability
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {traditionalSkills.map((skill) => (
              <div key={skill.name} className="bg-[#262626] rounded-lg p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#E3E1DB] font-medium">{skill.name}</span>
                  <span className="text-[#99302A] font-bold">{skill.value}%</span>
                </div>
                <div className="h-3 bg-[#1a1a1a] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#99302A] to-[#D4763A] rounded-full transition-all duration-1000"
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
                <span className="text-xs text-[#E3E1DB]/70">{skill.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#99302A] rounded-lg p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={20} className="text-[#C9A962]" />
              <span className="text-sm text-white/80">Average Monthly Income</span>
            </div>
            <p className="font-serif text-3xl md:text-4xl font-bold">
              ₹8,000-15,000
              <span className="text-lg font-normal text-white/70">/month</span>
            </p>
          </div>

          <div className="bg-[#262626] border border-[#E3E1DB]/20 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <Droplets size={20} className="text-[#99302A]" />
              <span className="text-sm text-[#E3E1DB]/70">Daily Milk Production</span>
            </div>
            <p className="font-serif text-3xl md:text-4xl font-bold text-[#E3E1DB]">
              15-25 <span className="text-lg font-normal text-[#E3E1DB]/70">liters/day</span>
            </p>
          </div>

          <div className="bg-[#262626] border border-[#E3E1DB]/20 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={20} className="text-[#99302A]" />
              <span className="text-sm text-[#E3E1DB]/70">Market Trend</span>
            </div>
            <p className="font-serif text-3xl md:text-4xl font-bold text-[#E3E1DB]">
              Growing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Culture Section ---
const cultureItems = [
  {
    icon: BookOpen,
    title: 'Language',
    description: 'Gujari (Indo-Aryan)',
  },
  {
    icon: Heart,
    title: 'Religion',
    description: 'Islam (Sunni)',
  },
  {
    icon: Music,
    title: 'Music',
    description: 'Sufi folk songs & drumming',
  },
  {
    icon: Users,
    title: 'Marriage',
    description: 'Community endogamy, dowry practices',
  },
];

const festivals = ['Eid-ul-Fitr', 'Eid-ul-Adha', 'Shab-e-Barat'];

function Culture() {
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
          <div className="bg-[#262626] rounded-lg p-8 border border-[#E3E1DB]/20">
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
              Religious celebrations are observed with traditional fervor, bringing
              together extended family members and strengthening community bonds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Gender Roles Section ---
const genderData = [
  { category: 'Livestock Care', men: 60, women: 40 },
  { category: 'Milk Processing', men: 20, women: 80 },
  { category: 'Forest Collection', men: 30, women: 70 },
  { category: 'Market Sales', men: 75, women: 25 },
  { category: 'Education', men: 55, women: 45 },
];

function GenderRoles() {
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

// --- Challenges Section ---
const challenges = [
  { name: 'Forest Evictions', description: 'Displacement from ancestral lands', severity: 95 },
  { name: 'Legal Recognition', description: 'Contested land rights', severity: 90 },
  { name: 'Education Access', description: 'No schools in migration areas', severity: 85 },
  { name: 'Conservation Conflict', description: 'Grazing restrictions', severity: 80 },
  { name: 'Climate Change', description: 'Unpredictable migration patterns', severity: 70 },
];

function Challenges() {
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
              className="bg-[#262626] rounded-lg p-6 border border-[#E3E1DB]/20"
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
                          challenge.severity > 90
                            ? '#D4763A'
                            : challenge.severity > 75
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

// --- Aspirations Section ---
const aspirations = [
  { name: 'Forest Rights', percentage: 98 },
  { name: 'Permanent Land', percentage: 90 },
  { name: 'Mobile Education', percentage: 85 },
  { name: 'Healthcare Access', percentage: 88 },
  { name: 'Fair Milk Prices', percentage: 82 },
  { name: 'Political Voice', percentage: 75 },
];

function CircularProgress({
  percentage,
  name,
}: {
  percentage: number;
  name: string;
}) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28 md:w-32 md:h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#262626"
            strokeWidth="6"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#99302A"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold text-[#E3E1DB]">
            {percentage}%
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm text-[#E3E1DB]/80 text-center max-w-[140px]">
        {name}
      </p>
    </div>
  );
}

function Aspirations() {
  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <Target className="text-[#C9A962]" size={24} />
          <h2 className="font-serif text-2xl md:text-3xl text-[#E3E1DB] font-semibold">
            Community Aspirations
          </h2>
        </div>

        {/* Aspirations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {aspirations.map((aspiration) => (
            <CircularProgress
              key={aspiration.name}
              percentage={aspiration.percentage}
              name={aspiration.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- CTA Section ---
function CTA() {
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
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#99302A] rounded-lg font-medium hover:bg-[#E3E1DB] transition-colors">
            <BookOpen size={20} />
            Explore Research
          </button>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-white border-2 border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
            <HandHeart size={20} />
            Collaborate With Us
          </button>
        </div>
      </div>
    </section>
  );
}

// --- Main Page Component ---
export default function VanGujjarPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      <Hero />
      <Introduction />
      <Timeline />
      <Lifestyle />
      <Craft />
      <Culture />
      <GenderRoles />
      <Challenges />
      <Aspirations />
      <CTA />
    </main>
  );
}
