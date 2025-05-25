import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, increment, addDoc, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { CEO } from '../types/ceo';
import { autoModerateCEO, moderateCEOs } from '../services/moderationService';
import { Tab } from '@headlessui/react';
import { INDUSTRIES } from '../data/initialCeos';
import OutOfVotesModal from './OutOfVotesModal';
import { useVote } from '../services/voteLimit';

const PRELOADED_CEOS = [
  { name: "Martin Sorrell", company: "S4 Capital" },
  { name: "Elon Musk", company: "Tesla" },
  { name: "Mark Zuckerberg", company: "Meta" },
  { name: "Jeff Bezos", company: "Amazon" },
  { name: "Tim Cook", company: "Apple" },
  { name: "Satya Nadella", company: "Microsoft" },
  { name: "Larry Page", company: "Alphabet" },
  { name: "Sergey Brin", company: "Alphabet" },
  { name: "Larry Ellison", company: "Oracle" },
  { name: "Jensen Huang", company: "NVIDIA" },
  { name: "Reed Hastings", company: "Netflix" },
  { name: "Marc Benioff", company: "Salesforce" },
  { name: "Andy Jassy", company: "Amazon" },
  { name: "Sundar Pichai", company: "Google" },
  { name: "Pat Gelsinger", company: "Intel" },
  { name: "Lisa Su", company: "AMD" },
  { name: "Daniel Ek", company: "Spotify" },
  { name: "Drew Houston", company: "Dropbox" },
  { name: "Brian Chesky", company: "Airbnb" },
  { name: "Dara Khosrowshahi", company: "Uber" },
  { name: "Tony Xu", company: "DoorDash" },
  { name: "Frank Slootman", company: "Snowflake" },
  { name: "Marc Lore", company: "Wonder Group" },
  { name: "Bob Chapek", company: "Disney" },
  { name: "David Zaslav", company: "Warner Bros Discovery" },
  { name: "Darren Woods", company: "ExxonMobil" },
  { name: "Mike Wirth", company: "Chevron" },
  { name: "Ben van Beurden", company: "Shell" },
  { name: "Bernard Looney", company: "BP" },
  { name: "Patrick Pouyanné", company: "TotalEnergies" }
];

interface CEOVotingProps {
  onBack: () => void;
}

export default function CEOVoting({ onBack }: CEOVotingProps) {
  const [ceos, setCeos] = useState<CEO[]>([]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [newCeoName, setNewCeoName] = useState('');
  const [newCeoCompany, setNewCeoCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [votingCeo, setVotingCeo] = useState<string | null>(null);
  const [justVoted, setJustVoted] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [outOfVotes, setOutOfVotes] = useState(false);

  useEffect(() => {
    // Initialize preloaded CEOs if they don't exist
    const initializePreloadedCeos = async () => {
      const ceosRef = collection(db, 'ceos');
      
      for (const ceo of PRELOADED_CEOS) {
        const q = query(ceosRef, where('name', '==', ceo.name), where('company', '==', ceo.company));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          await addDoc(ceosRef, {
            name: ceo.name,
            company: ceo.company,
            votes: Math.floor(Math.random() * 50) + 10, // Random starting votes
            approved: true,
            submittedAt: new Date()
          });
        }
      }
    };

    initializePreloadedCeos();

    // Listen for real-time updates
    const q = query(
      collection(db, 'ceos'),
      where('approved', '==', true),
      orderBy('votes', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ceosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        submittedAt: doc.data().submittedAt?.toDate() || new Date()
      })) as CEO[];
      setCeos(ceosData);
    });

    return () => unsubscribe();
  }, []);

  // Filter CEOs by selected industry
  const filteredCeos = selectedIndustry === 'All'
    ? ceos
    : ceos.filter((ceo) => ceo.industry === selectedIndustry);

  const handleVote = async (ceoId: string) => {
    if (votingCeo) return;
    // Vote limit logic
    if (!useVote()) {
      setOutOfVotes(true);
      return;
    }
    setVotingCeo(ceoId);
    try {
      const ceoRef = doc(db, 'ceos', ceoId);
      await updateDoc(ceoRef, {
        votes: increment(1)
      });
      
      // Show success visual feedback
      setJustVoted(ceoId);
      setTimeout(() => setJustVoted(null), 2000);
      
      // Run moderation check after voting to approve pending CEOs
      moderateCEOs();
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setTimeout(() => setVotingCeo(null), 500);
    }
  };

  const handleSubmitCeo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCeoName.trim() || !newCeoCompany.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Auto-moderate the submission
      const isAppropriate = await autoModerateCEO(newCeoName, newCeoCompany);
      
      if (!isAppropriate) {
        alert('This CEO has already been submitted or contains inappropriate content.');
        setIsSubmitting(false);
        return;
      }
      
      await addDoc(collection(db, 'ceos'), {
        name: newCeoName.trim(),
        company: newCeoCompany.trim(),
        votes: 1, // Start with 1 vote from submitter
        approved: false, // Needs approval through votes
        submittedAt: new Date()
      });
      
      setNewCeoName('');
      setNewCeoCompany('');
      setShowSubmitForm(false);
      
      // Run moderation check
      moderateCEOs();
    } catch (error) {
      console.error('Error submitting CEO:', error);
      alert('Error submitting CEO. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white p-4 overflow-x-hidden" style={{
      background: 'radial-gradient(circle at center, rgba(124, 58, 237, 0.15) 0%, #000000 100%)'
    }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 font-medium"
          >
             Back
          </button>
          </div>
        <div className="flex flex-col items-center mb-8">
          
          <h1 className="text-4xl font-bold font-['Space_Grotesk'] bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
            CEO Replacement Leaderboard
          </h1>
          
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>

        <p className="text-center text-purple-300/80 mb-8 font-['Space_Grotesk']">
          Vote for which CEOs should be replaced by AI first
        </p>

        {/* Industry Tabs */}
        <div className="mb-8">
          <Tab.Group selectedIndex={INDUSTRIES.indexOf(selectedIndustry as any)} onChange={i => setSelectedIndustry(INDUSTRIES[i])}>
            <Tab.List className="flex space-x-2 justify-center">
              {INDUSTRIES.map((industry) => (
                <Tab
                  key={industry}
                  className={({ selected }) =>
                    `px-4 py-2 rounded-full font-semibold font-['Space_Grotesk'] transition-all text-sm focus:outline-none ${
                      selected
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow'
                        : 'bg-gray-800/50 text-purple-300 hover:bg-gray-700/50'
                    }`
                  }
                >
                  {industry}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>

        {/* Submit Form Toggle */}
        <div className="mb-8 text-center"> 
          <button
            onClick={() => setShowSubmitForm(!showSubmitForm)}
            className="bg-gray-800/50 hover:bg-gray-700/50 border border-purple-500/30 px-6 py-3 rounded-lg transition-all backdrop-blur-sm font-['Space_Grotesk'] text-purple-300 hover:text-white hover:border-purple-400/50"
          >
            {showSubmitForm ? 'Cancel' : "Can't find your CEO? Submit one"}
          </button>
        </div>

        {/* Submit Form */}
        <AnimatePresence>
          {showSubmitForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <form onSubmit={handleSubmitCeo} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-purple-500/30">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="CEO Name"
                    value={newCeoName}
                    onChange={(e) => setNewCeoName(e.target.value)}
                    className="bg-gray-800/50 border border-purple-500/30 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 transition-colors font-['Space_Grotesk'] placeholder-gray-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={newCeoCompany}
                    onChange={(e) => setNewCeoCompany(e.target.value)}
                    className="bg-gray-800/50 border border-purple-500/30 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 transition-colors font-['Space_Grotesk'] placeholder-gray-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-purple-800 disabled:to-pink-800 px-6 py-3 rounded-lg transition-all font-['Space_Grotesk'] font-semibold"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit CEO'}
                </button>
                <p className="text-sm text-purple-300/60 mt-2 font-['Space_Grotesk']">
                  Submissions need 5 votes to appear publicly
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CEO Leaderboard */}
        <div className="space-y-3">
          {filteredCeos.map((ceo, index) => (
            <motion.div
              key={ceo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                backgroundColor: justVoted === ceo.id 
                  ? 'rgba(16, 185, 129, 0.2)' 
                  : 'rgba(17, 24, 39, 0.5)'
              }}
              layout
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                backgroundColor: { duration: 1 }
              }}
              className={`bg-gray-900/50 backdrop-blur-sm border rounded-lg p-4 flex items-center justify-between transition-all hover:bg-gray-800/50 ${
                justVoted === ceo.id 
                  ? 'border-green-500/40' 
                  : 'border-purple-500/20 hover:border-purple-400/40'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-purple-300/60 w-12 font-['Space_Grotesk']">
                  #{index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white font-['Space_Grotesk']">{ceo.name}</h3>
                  <p className="text-purple-300/70 font-['Space_Grotesk']">{ceo.company}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <motion.div 
                    className={`text-2xl font-bold font-['Space_Grotesk'] ${
                      justVoted === ceo.id ? 'text-green-400' : 'text-purple-400'
                    }`}
                    animate={{ 
                      scale: justVoted === ceo.id ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {ceo.votes.toLocaleString()}
                  </motion.div>
                  <div className="text-sm text-purple-300/60 font-['Space_Grotesk']">votes</div>
                </div>
                
                <motion.button
                  onClick={() => handleVote(ceo.id)}
                  disabled={votingCeo === ceo.id || justVoted === ceo.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 font-['Space_Grotesk'] font-semibold shadow-lg ${
                    justVoted === ceo.id 
                      ? 'bg-green-600 cursor-default'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-purple-800 disabled:to-pink-800 hover:shadow-purple-500/25'
                  }`}
                >
                  {votingCeo === ceo.id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : justVoted === ceo.id ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-lg">+</span>
                  )}
                  {justVoted === ceo.id ? 'Voted' : 'Vote'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCeos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-6"></div>
            <p className="text-purple-300/70 font-['Space_Grotesk'] text-lg">No CEOs found for this industry.</p>
          </div>
        )}
      </div>
      {/* Out of Votes Modal */}
      <OutOfVotesModal
        isOpen={outOfVotes}
        onClose={() => setOutOfVotes(false)}
        onVotesAdded={() => setOutOfVotes(false)}
        topCeo={filteredCeos[0] ? { name: filteredCeos[0].name, company: filteredCeos[0].company } : null}
      />
    </div>
  );
}
