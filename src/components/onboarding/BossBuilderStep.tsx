import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BossProfile } from '../OnboardingFlow';

interface BossBuilderStepProps {
  onComplete: (profile: BossProfile) => void;
}

const personalities = [
  { id: 'corporate', label: 'Corporate', icon: '💼' },
  { id: 'visionary', label: 'Visionary', icon: '🚀' },
  { id: 'humanist', label: 'Humanist', icon: '🤝' }
] as const;

const industries = [
  'Tech', 'Finance', 'Energy', 'Entertainment', 'Healthcare', 'Retail', 'Manufacturing'
];

const companies = [
  'Synergex', 'NexusFlow', 'VelocityCore', 'PrimeTech', 'InnovateLab', 'FutureSync', 'ApexSolutions'
];

const photos = [
  '/ai-ceo/ceo/ceo-1.jpg',
  '/ai-ceo/ceo/ceo-2.jpg', 
  '/ai-ceo/ceo/ceo-3.jpg'
];

export default function BossBuilderStep({ onComplete }: BossBuilderStepProps) {
  const [showTitle, setShowTitle] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [showBoss, setShowBoss] = useState(false);

  // Generate random defaults
  const [selectedPersonality, setSelectedPersonality] = useState<'corporate' | 'visionary' | 'humanist'>(
    () => personalities[Math.floor(Math.random() * personalities.length)].id
  );
  const [selectedPhoto, setSelectedPhoto] = useState(
    () => photos[Math.floor(Math.random() * photos.length)]
  );
  const [selectedIndustry, setSelectedIndustry] = useState(
    () => industries[Math.floor(Math.random() * industries.length)]
  );
  const [selectedCompany, setSelectedCompany] = useState(
    () => companies[Math.floor(Math.random() * companies.length)]
  );

  // Current profile that updates live
  const [currentProfile, setCurrentProfile] = useState<BossProfile | null>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowTitle(true), 300),
      setTimeout(() => setShowCustomization(true), 800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Update profile whenever selections change
  useEffect(() => {
    setCurrentProfile(generateProfile());
  }, [selectedPersonality, selectedPhoto, selectedIndustry, selectedCompany]);

  const handlePreviewBoss = () => {
    setShowBoss(true);
  };

  const generateProfile = (): BossProfile => {
    const bios = {
      corporate: {
        Tech: `Optimizing digital transformation initiatives across enterprise ecosystems while maintaining best-in-class operational efficiency metrics`,
        Finance: `Driving sustainable growth through innovative fintech solutions and strategic portfolio diversification frameworks`,
        Energy: `Leading the transition to renewable energy infrastructure with focus on ESG compliance and shareholder value maximization`,
        Entertainment: `Revolutionizing content monetization strategies through AI-powered audience engagement and multi-platform distribution`,
        Healthcare: `Transforming patient outcomes through data-driven healthcare solutions and precision medicine technologies`, 
        Retail: `Orchestrating omnichannel customer experiences while optimizing supply chain efficiency and inventory turnover`,
        Manufacturing: `Implementing Industry 4.0 automation frameworks to enhance productivity and maintain competitive market positioning`
      },
      visionary: {
        Tech: `Building exponential technologies that will fundamentally reshape humanity's relationship with information and consciousness`,
        Finance: `Creating decentralized financial architectures that democratize wealth creation for the next billion humans`,
        Energy: `Architecting humanity's evolution toward a Type I civilization through fusion energy and space-based solar infrastructure`,
        Entertainment: `Designing immersive metaverse experiences that transcend physical reality and unlock infinite creative possibilities`,
        Healthcare: `Engineering the biological systems of tomorrow to achieve longevity escape velocity and enhance human potential`,
        Retail: `Reimagining commerce in an age of ambient computing where AI anticipates desires before they're consciously formed`,
        Manufacturing: `Orchestrating the convergence of nanotechnology, AI, and robotics to manifest abundance for all sentient beings`
      },
      humanist: {
        Tech: `Developing ethical AI systems that amplify human dignity, creativity, and connection in an increasingly digital world`,
        Finance: `Building inclusive financial systems that serve underrepresented communities and promote economic justice`,
        Energy: `Creating sustainable energy solutions that prioritize environmental stewardship and intergenerational equity`,
        Entertainment: `Fostering authentic human storytelling that celebrates diversity and builds bridges across cultural divides`,
        Healthcare: `Ensuring equitable access to life-saving treatments while respecting patient autonomy and community wellbeing`,
        Retail: `Supporting local artisans and sustainable production while empowering conscious consumer choices`,
        Manufacturing: `Prioritizing worker dignity, environmental protection, and community prosperity in all production decisions`
      }
    };

    const names = {
      corporate: ["Alexandra Sterling", "Maximilian Cross", "Victoria Blackstone", "Jonathan Steele", "Catherine Prime"],
      visionary: ["Zara Quantum", "Phoenix Nexus", "Aria Futures", "Nova Chen", "Atlas Vega"],
      humanist: ["Dr. Maya Compassion", "Samuel Bridges", "Luna Harmony", "Gabriel Rivers", "Sophia Grace"]
    };

    const name = names[selectedPersonality][Math.floor(Math.random() * names[selectedPersonality].length)];
    const bio = bios[selectedPersonality][selectedIndustry as keyof typeof bios.corporate];

    return {
      personality: selectedPersonality,
      photo: selectedPhoto,
      industry: selectedIndustry,
      bio: `CEO at ${selectedCompany} – ${bio}`,
      name: name
    };
  };

  const handleComplete = () => {
    if (currentProfile) {
      onComplete(currentProfile);
    }
  };

  const handleSkip = () => {
    if (currentProfile) {
      onComplete(currentProfile);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-100"
    >
      <div className="max-w-2xl w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showTitle ? 1 : 0, y: showTitle ? 0 : 20 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Let's build your boss
          </h2>
          <p className="text-lg text-slate-600">Customize your digital replacement</p>
        </motion.div>

        {/* Boss Preview (only shown after clicking Continue) */}
        {showBoss && currentProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 border border-slate-200 mb-8 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={selectedPhoto} 
                alt="Boss" 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <h4 className="text-xl font-semibold text-slate-900 font-['Space_Grotesk']">
                  {currentProfile.name}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {currentProfile.bio}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Customization Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showCustomization ? 1 : 0, y: showCustomization ? 0 : 20 }}
          className="space-y-6"
        >
          {/* Personality Selection */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3 font-['Space_Grotesk']">Personality</h3>
            <div className="grid grid-cols-3 gap-3">
              {personalities.map((personality) => (
                <motion.button
                  key={personality.id}
                  onClick={() => setSelectedPersonality(personality.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg border-2 transition-all font-['Space_Grotesk'] ${
                    selectedPersonality === personality.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xl mb-1">{personality.icon}</div>
                  <div className="font-semibold text-sm">{personality.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Photo Selection */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3 font-['Space_Grotesk']">Photo</h3>
            <div className="grid grid-cols-3 gap-3">
              {photos.map((photo, index) => (
                <motion.button
                  key={photo}
                  onClick={() => setSelectedPhoto(photo)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-lg border-2 overflow-hidden transition-all ${
                    selectedPhoto === photo
                      ? 'border-purple-500 ring-2 ring-purple-200'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img 
                    src={photo} 
                    alt={`CEO ${index + 1}`} 
                    className="w-full h-20 object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Industry Selection */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3 font-['Space_Grotesk']">Industry</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {industries.map((industry) => (
                <motion.button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg border-2 transition-all font-['Space_Grotesk'] text-sm ${
                    selectedIndustry === industry
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {industry}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Company Selection */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3 font-['Space_Grotesk']">Company</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {companies.map((company) => (
                <motion.button
                  key={company}
                  onClick={() => setSelectedCompany(company)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg border-2 transition-all font-['Space_Grotesk'] text-sm ${
                    selectedCompany === company
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {company}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {!showBoss && (
              <motion.button
                onClick={handlePreviewBoss}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-all font-['Space_Grotesk']"
              >
                Preview Boss
              </motion.button>
            )}
            <motion.button
              onClick={handleComplete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white hover:from-purple-700 hover:to-pink-700 transition-all font-['Space_Grotesk']"
            >
              Continue →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
