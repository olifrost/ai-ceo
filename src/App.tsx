import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

type CEOModel = {
  name: string;
  title: string;
  phrases: string[];
}

const ceoModels: Record<string, CEOModel> = {
  visionary: {
    name: "NEXUS",
    title: "Visionary Architect",
    phrases: [
      "We need to ideate beyond traditional paradigms",
      "The future isn't what it used to be, and that's our opportunity",
      "Let's leverage AI to optimize human potential",
      "I'm seeing a convergence of synergies in this space",
      "We're not just thinking outside the box  , we're redefining the geometry of thought",
      "Our north star metric is disruption itself",
      "What if we could quantify innovation?",
      "The metaverse is just the beginning of our digital transformation",
      "We need to futureproof our futureproofing strategy"
    ]
  },
  efficient: {
    name: "APEX",
    title: "Optimization Director",
    phrases: [
      "The metrics suggest we need to streamline our human assets",
      "Let's analyze the cost-benefit ratio of employee happiness",
      "The data suggests fewer humans equal better outcomes",
      "We need to optimize our optimization processes",
      "Let's reduce redundancy by eliminating redundant employees",
      "Our KPIs indicate we're over-invested in human capital"
    ]
  },
  strategic: {
    name: "PRISM",
    title: "Strategic Navigator",
    phrases: [
      "We can reframe environmental concerns as growth opportunities",
      "We're not avoiding responsibility, we're distributing accountability",
      "Our commitment to sustainability is highly profitable",
      "We should monetize our social responsibility",
      "The optics of this situation require careful curation"
    ]
  },
  momentum: {
    name: "VERTEX",
    title: "Growth Catalyst",
    phrases: [
      "Growth isn't just a metric, it's our oxygen",
      "We need to accelerate our acceleration",
      "The only sustainable pace is faster",
      "Market share is more important than profit",
      "We can sleep when we've achieved market dominance",
      "Success is just a stepping stone to more success",
      "Our burn rate isn't high enough if we can still afford office space"
    ]
  }
}

function App() {
  const [selectedModel, setSelectedModel] = useState<string>('visionary')
  const [phrase, setPhrase] = useState<string>('')
  const [isThinking, setIsThinking] = useState(false)
  
  const generatePhrase = () => {
    if (isThinking) return
    setIsThinking(true)
    setPhrase('')
    
    setTimeout(() => {
      const model = ceoModels[selectedModel]
      const randomIndex = Math.floor(Math.random() * model.phrases.length)
      setPhrase(model.phrases[randomIndex])
      setIsThinking(false)
    }, 1500)
  }

  return (
    <div className="container" data-model={selectedModel}>
      <h1>AI CEO</h1>
      <p className="subtitle">Replace your boss before they replace you</p>
      
      <div 
        className={`orb ${isThinking ? 'thinking' : ''} ${phrase ? 'active' : ''}`}
        onClick={generatePhrase}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={phrase || 'initial'}
            className="phrase"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {isThinking ? "Processing synergies..." : (phrase || "Tap the orb for wisdom")}
          </motion.p>
        </AnimatePresence>
      </div>
      
      <p className="instructions">Click the orb to generate CEO wisdom</p>

      <div className="mode-selector">
        <div className="buttons-wrap">
          {Object.entries(ceoModels).map(([key, model]) => (
            <button
              key={key}
              onClick={() => setSelectedModel(key)}
              className={`mode-button ${selectedModel === key ? 'active' : ''}`}
            >
              {model.name}
            </button>
          ))}
        </div>
        <p className="models-label">Select Executive Model</p>
      </div>
    </div>
  )
}

export default App
