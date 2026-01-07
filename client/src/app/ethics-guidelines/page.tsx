// src/app/ethics-guidelines/page.tsx
import { ShieldCheck, EyeOff, Scale, ScrollText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EthicsPage() {
  const guidelines = [
    {
      icon: ShieldCheck,
      title: "Informed Consent",
      desc: "Prior to any recording or interview, participants are briefed in their native language about the research goals and their right to withdraw at any time."
    },
    {
      icon: EyeOff,
      title: "Anonymization",
      desc: "Sensitive field data, specifically involving legal status or internal community conflicts, is strictly anonymized to prevent any real-world harm."
    },
    {
      icon: Scale,
      title: "Benefit Sharing",
      desc: "We ensure that research findings are shared back with the community, and any commercial use of craft imagery is strictly regulated."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#99302A] text-white border-none">Institutional Protocol</Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a] mb-6">Ethics & Privacy Guidelines</h1>
          <p className="text-[#1a1a1a]/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Our research framework is built on the principle of 'Dignity over Documentation'. 
            We follow strict anthropological ethics to protect marginalized voices.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Core Principles Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {guidelines.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-[#E3E1DB] shadow-sm">
                <item.icon className="w-8 h-8 text-[#99302A] mb-4" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Detailed Text Block */}
          <div className="bg-white p-8 md:p-12 rounded-2xl border border-[#E3E1DB] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <ScrollText className="w-6 h-6 text-[#99302A]" />
              <h2 className="text-2xl font-serif font-bold">Research Governance</h2>
            </div>
            
            <div className="prose prose-slate max-w-none text-[#1a1a1a]/80 space-y-4">
              <p>
                As an aspiring Full-Stack Developer and researcher, ensuring data integrity is paramount. 
                The <strong>Ethnography Research Documentation Project</strong> operates under the following 
                governance structure:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Visual Ethics:</strong> Faces of minors are blurred unless explicit parental consent is provided.</li>
                <li><strong>Data Sovereignty:</strong> Communities retain the right to request the removal of specific oral histories from the public archive.</li>
                <li><strong>Safe Storage:</strong> Raw field notes are stored in encrypted MongoDB instances, accessible only by verified faculty members.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}