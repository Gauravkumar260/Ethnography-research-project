
import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold">
            The School of Design at DIT University
          </h1>
          <p className="text-[#E3E1DB]/80 text-lg leading-relaxed max-w-2xl mx-auto">
            A multidisciplinary creative space where ideas, research, and innovation come together.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Introduction */}
          <div>
            <p className="text-xl text-[#1a1a1a] leading-relaxed mb-8 font-medium">
              The department brings together diverse design domains including:
            </p>

            {/* Programs List */}
            <div className="bg-white p-6 md:p-8 rounded-lg border border-[#E3E1DB] shadow-sm">
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2.5 flex-shrink-0"></div>
                  <div className="text-[#1a1a1a]/80 text-lg">
                    <strong className="text-[#1a1a1a] block mb-1">B.Des in User Experience (UX) (4-year undergraduate program)</strong>
                    Focused on humancentered digital and research-driven design.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2.5 flex-shrink-0"></div>
                  <div className="text-[#1a1a1a]/80 text-lg">
                    <strong className="text-[#1a1a1a] block mb-1">B.Des in Visual Graphics & Animation (VGA) (4-year undergraduate program)</strong>
                    Exploring visual storytelling, branding, and motion.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2.5 flex-shrink-0"></div>
                  <div className="text-[#1a1a1a]/80 text-lg">
                    <strong className="text-[#1a1a1a] block mb-1">B.Des in Interior Design (ID) (4-year undergraduate program)</strong>
                    Shaping functional and experiential spaces.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2.5 flex-shrink-0"></div>
                  <div className="text-[#1a1a1a]/80 text-lg">
                    <strong className="text-[#1a1a1a] block mb-1">B.Des in Product Design (PD) (4-year undergraduate program)</strong>
                    Focusing on innovative product development, materials, manufacturing processes, sustainability, and user-centered physical design solutions.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2.5 flex-shrink-0"></div>
                  <div className="text-[#1a1a1a]/80 text-lg">
                    <strong className="text-[#1a1a1a] block mb-1">M.Des in User Experience (UX) (2-year postgraduate program)</strong>
                    Advancing strategic and research-led design practices.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2.5 flex-shrink-0"></div>
                  <div className="text-[#1a1a1a]/80 text-lg">
                    <strong className="text-[#1a1a1a] block mb-1">Ph.D. in Design</strong>
                    (as per DIT University prescribed duration according to Academic Ordinance) – a doctoral research program contributing to academic and industryoriented research in design.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Philosophy Quote */}
          <div className="bg-[#E3E1DB]/50 p-8 md:p-12 border-l-4 border-[#99302A]">
            <p className="text-[#1a1a1a] text-xl font-medium italic leading-relaxed">
              &quot;At SOD, design is not just about aesthetics; it is about understanding people, contexts, cultures, and systems before creating meaningful solutions.&quot;
            </p>
          </div>

          {/* Ethnographic Research */}
          <div>
            <h2 className="text-[#1a1a1a] mb-6 text-2xl font-semibold">
              Ethnographic Research
            </h2>
            <div className="space-y-4 text-[#1a1a1a]/80 leading-relaxed text-lg">
              <p>
                The ethnographic research showcased on this platform has been conducted by students of the UX Department, where human behavior, lived experiences, and contextual inquiry form the foundation of the design process.
              </p>
              <p>
                Through field immersion, interviews, observation, and documentation, students explore real-world narratives and translate them into actionable insights and impactful design interventions.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#99302A]/5 p-8 text-sm text-[#1a1a1a]/70 leading-relaxed border border-[#99302A]/20 rounded-sm">
            <h3 className="text-[#99302A] mb-4 text-lg font-semibold uppercase tracking-wide">
              Disclaimer
            </h3>
            <div className="space-y-3">
              <p>
                This website showcases academic work developed by students of the School of Design (SOD), DIT University, as part of their coursework and research requirements under faculty supervision.
              </p>
              <p>
                All documentaries, research findings, and visual documentation presented here are created solely for academic and educational purposes. The interpretations, narratives, and representations reflect students’ research-based exploration within a structured academic framework.
              </p>
              <p>
                The content does not represent official institutional statements, endorsements, or policy positions of DIT University. It is intended to document and present student-led academic research and learning outcomes.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Branding */}
      <section className="py-12 px-4 bg-[#1a1a1a] text-[#E3E1DB] border-t border-[#E3E1DB]/10">
        <div className="max-w-4xl mx-auto text-center opacity-60 text-sm font-light">
          School of Design | DIT University
        </div>
      </section>
    </div>
  );
}