import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold">
            About This Platform
          </h1>
          <p className="text-[#E3E1DB]/80 text-lg">
            Why we document, how we document, and what it means
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Purpose */}
          <div>
            <h2 className="text-[#1a1a1a] mb-6 text-2xl font-semibold">
              Why This Platform Exists
            </h2>
            <div className="space-y-4 text-[#1a1a1a]/80 leading-relaxed text-lg">
              <p>
                Not every history is written in textbooks. Some histories live in people — in their hands, their homes, their songs, their struggles, and their survival.
              </p>
              <p>
                This platform exists to document, preserve, and present the lived experiences of India's culturally rich yet socially marginalized communities. Communities like the Gadia Lohar, Bhoksa, Jaunsar, Banjara, and Van Gujjar carry centuries of heritage, craft, and knowledge — yet their narratives rarely reach mainstream spaces.
              </p>
              <p>
                Through rigorous ethnographic research, visual documentation, and respectful storytelling, we aim to create a digital archive that honours their dignity, preserves their stories, and challenges the erasure of marginalized voices from our collective memory.
              </p>
            </div>
          </div>

          {/* What Makes It Different */}
          <div className="bg-[#E3E1DB]/50 p-8 md:p-12 ">
            <h2 className="text-[#1a1a1a] mb-6 text-2xl font-semibold">
              What Makes This Different
            </h2>
            <div className="space-y-3 text-[#1a1a1a]/80">
              <div className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2 flex-shrink-0"></div>
                <p><strong>Ethnographic Rigor:</strong> Our documentation is grounded in field research, participant observation, and deep cultural engagement — not superficial tourism.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2 flex-shrink-0"></div>
                <p><strong>Dignity Over Pity:</strong> We reject poverty porn and exoticization. Our approach centers respect, agency, and the full humanity of the communities we document.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2 flex-shrink-0"></div>
                <p><strong>Multidimensional Stories:</strong> We present communities not as victims or curiosities, but as complex societies with histories, aspirations, challenges, and wisdom.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2 flex-shrink-0"></div>
                <p><strong>Visual + Narrative:</strong> We combine documentary film, photography, and written ethnography to create rich, accessible storytelling.</p>
              </div>
            </div>
          </div>

          {/* Research Ethics */}
          <div>
            <h2 className="text-[#1a1a1a] mb-6 text-2xl font-semibold">
              Our Research Ethics
            </h2>
            <div className="space-y-4 text-[#1a1a1a]/80 leading-relaxed">
              <p>
                All research is conducted with informed consent, cultural sensitivity, and a commitment to do no harm. We prioritize:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex gap-3">
                  <span className="text-[#99302A]">•</span>
                  <span><strong>Consent and Autonomy:</strong> Community members participate voluntarily and have control over how they are represented.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#99302A]">•</span>
                  <span><strong>Respect for Privacy:</strong> Sensitive information is protected. Personal identities are disclosed only with explicit permission.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#99302A]">•</span>
                  <span><strong>Cultural Sensitivity:</strong> We recognize and honor the cultural protocols, beliefs, and values of the communities we engage with.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#99302A]">•</span>
                  <span><strong>Reciprocity:</strong> We believe research should benefit communities, not just researchers. We explore ways to support livelihoods, education, and visibility.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#99302A]">•</span>
                  <span><strong>Long-term Engagement:</strong> This is not extractive research. We invest time, build relationships, and maintain ongoing engagement.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Methodology */}
          <div className="bg-white p-8 md:p-12 border-l-4 border-[#99302A]  shadow-sm">
            <h2 className="text-[#1a1a1a] mb-6 text-2xl font-semibold">
              Research Methodology
            </h2>
            <div className="space-y-4 text-[#1a1a1a]/80">
              <p>
                Our ethnographic approach combines multiple qualitative research methods:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="text-[#1a1a1a] mb-2 font-semibold">Participant Observation</h4>
                  <p className="text-sm">Immersive fieldwork to understand daily lives, routines, and cultural practices</p>
                </div>
                <div>
                  <h4 className="text-[#1a1a1a] mb-2 font-semibold">In-Depth Interviews</h4>
                  <p className="text-sm">Conversations that honor individual experiences and diverse perspectives within communities</p>
                </div>
                <div>
                  <h4 className="text-[#1a1a1a] mb-2 font-semibold">Visual Documentation</h4>
                  <p className="text-sm">Photography and videography that captures authentic moments with respect and consent</p>
                </div>
                <div>
                  <h4 className="text-[#1a1a1a] mb-2 font-semibold">Documentary Filmmaking</h4>
                  <p className="text-sm">Long-form narratives that provide deeper context and emotional connection</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team & Credits */}
          <div>
            <h2 className="text-[#1a1a1a] mb-6 text-2xl font-semibold">
              Credits & Acknowledgments
            </h2>
            <div className="space-y-4 text-[#1a1a1a]/80 leading-relaxed">
              <p>
                This platform represents months of fieldwork, collaboration, and learning. We extend our deepest gratitude to:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex gap-3">
                  <span className="text-[#99302A]">•</span>
                  <span>The communities who opened their lives and shared their stories with trust and generosity</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#99302A]">•</span>
                  <span>Local guides, interpreters, and cultural mediators who facilitated our understanding</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#99302A]">•</span>
                  <span>Academic advisors and ethnographic researchers who guided our methodology</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#99302A]">•</span>
                  <span>NGOs and grassroots organizations working with these communities</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#99302A]/5 p-8 text-sm text-[#1a1a1a]/70 leading-relaxed border border-[#99302A]/20 ">
            <p className="mb-3">
              <strong className="text-[#1a1a1a]">Important Note:</strong>
            </p>
            <p>
              This platform is designed for educational, research, and awareness purposes. It is not intended for the collection of personally identifiable information (PII) or sensitive data. All content has been created with respect for community dignity and with appropriate consent.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-16 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl italic mb-6 font-serif">
            "We are not preserving stories. We are preserving dignity."
          </p>
          <p className="text-sm text-[#E3E1DB]/70">
            Preserving stories today, so history doesn't lose them tomorrow.
          </p>
        </div>
      </section>
    </div>
  );
}