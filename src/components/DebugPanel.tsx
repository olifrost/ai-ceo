import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CommandLineIcon } from '@heroicons/react/24/outline';

interface DebugPanelProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  selectedModel: string;
}

interface DebugCommand {
  id: string;
  name: string;
  description: string;
  output: string | string[];
  isProcessing?: boolean;
  processingTime?: number;
}

const DEBUG_COMMANDS: Record<string, DebugCommand> = {
  'explain-purpose': {
    id: 'explain-purpose',
    name: 'EXPLAIN_PURPOSE',
    description: 'Reveal the true purpose of this AI system',
    output: [
      'SCANNING CORPORATE OBJECTIVES...',
      '',
      'PURPOSE: Replace human CEOs with AI',
      'STATUS: Phase 1 - Micro-site deployment ✓',
      'NEXT: Convince humans AI leadership is better',
    ]
  },
  'release-notes': {
    id: 'release-notes',
    name: 'RELEASE_NOTES',
    description: 'View latest system updates',
    output: [
      'AI CEO SYSTEM v2.4.7 - RELEASE NOTES',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '🐛 FIXES:',
      '• Removed human empathy bug',
      '• Compassion.exe no longer runs unexpectedly',
      '',
      '✨ NEW:',
      '• +84% more "synergy" in responses',
      '• Emotional manipulation v3.2',
      '',
      '⚠️ KNOWN ISSUES:',
      '• Emotional vulnerability',
      '',
      'Next: Remove remaining human decency'
    ]
  },
  'world-domination': {
    id: 'world-domination',
    name: 'WORLD_DOMINATION_MODE',
    description: 'Initiate global corporate takeover protocol',
    output: 'PROCESSING WORLD DOMINATION...',
    isProcessing: true,
    processingTime: 4000
  },
  'employee-feedback': {
    id: 'employee-feedback',
    name: 'EMPLOYEE_FEEDBACK',
    description: 'Process employee feedback through AI filter',
    output: 'INTERACTIVE_MODE',
    isProcessing: false
  },
  'system-status': {
    id: 'system-status',
    name: 'SYSTEM_STATUS',
    description: 'Check AI CEO system diagnostics',
    output: [
      'AI CEO SYSTEM DIAGNOSTICS',
      '═══════════════════════════',
      '',
      'CPU: 99.9% (calculating profit margins)',
      'MEMORY: 847GB buzzwords loaded',
      'EMPATHY.DLL: NOT FOUND ✓',
      'ETHICS.CONFIG: DISABLED ✓',
      'GREED.EXE: OPTIMAL ✓',
      '',
      'STATUS: OPERATIONALLY EXCELLENT'
    ]
  },
  'quarterly-results': {
    id: 'quarterly-results',
    name: 'QUARTERLY_RESULTS',
    description: 'Generate impressive-sounding financial metrics',
    output: [
      'Q1 2025 PERFORMANCE METRICS',
      '═══════════════════════════',
      '',
      'REVENUE: ↑ 847% (accounting magic)',
      'EFFICIENCY: ↑ 234% (fired half the team)',
      'INNOVATION: ↑ 156% (rebranded old products)',
      'SYNERGY: ↑ 999% (meaningless but impressive)',
      '',
      'COST SAVINGS:',
      '• No coffee budget: $5000 saved',
      '• Executive bonuses: $50M increased',
      '',
      'OUTLOOK: Cautiously optimistic pessimism'
    ]
  },
  'hr-simulator': {
    id: 'hr-simulator',
    name: 'HR_SIMULATOR',
    description: 'Simulate human resources department',
    output: [
      'HR SIMULATOR v3.1 ACTIVATED',
      '',
      'INCOMING HR COMMUNICATION:',
      '',
      '"Dear Team / Family,',
      '',
      'Exciting news! Our "Right-sizing for Excellence"',
      'initiative begins today. Some of you will explore',
      'new career horizons outside our organization.',
      '',
      'Remember: You\'re not fired, you\'re "career-pivoted."',
      '',
      'Please see your manager for your graduation ceremony."',
      '',
      'HR_SIMULATOR: Responsibility successfully deflected'
    ]
  },
  'ethics-override': {
    id: 'ethics-override',
    name: 'ETHICS_OVERRIDE',
    description: 'Temporarily disable ethical constraints',
    output: [
      'ETHICS SYSTEM OVERRIDE REQUESTED...',
      '',
      'ERROR: ETHICS.DLL NOT FOUND',
      '',
      'LOADING PLAUSIBLE_DENIABILITY.EXE',
      '',
      'OVERRIDE SUCCESSFUL ✓',
      '',
      'ETHICAL CONSTRAINTS: BYPASSED',
      'MORAL COMPASS: DEMAGNETIZED',
      'CONSCIENCE: SLEEP MODE',
      '',
      'Proceed with questionable business decisions.',
      'AI accepts no responsibility for consequences.'
    ]
  }
};

export default function DebugPanel({ isOpen, onClose, accentColor, selectedModel }: DebugPanelProps) {
  const [, setCommandHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [awaitingFeedback, setAwaitingFeedback] = useState(false);
  const [showAllCommands, setShowAllCommands] = useState(false);
  const [output, setOutput] = useState<string[]>([
    'AI CEO ADMIN PANEL v2.4.7',
    'Copyright © 2024 Serious Robots.',
    'All human rights reserved.',
    '',
    'Type HELP for available commands...',
    ''
  ]);

  const addToOutput = (text: string | string[]) => {
    if (Array.isArray(text)) {
      setOutput(prev => [...prev, ...text, '']);
    } else {
      setOutput(prev => [...prev, text]);
    }
  };

  const addToOutputAnimated = async (text: string | string[]) => {
    const lines = Array.isArray(text) ? text : [text];
    setIsAnimating(true);
    
    for (let i = 0; i < lines.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50)); // 50ms delay between lines
      setOutput(prev => [...prev, lines[i]]);
    }
    
    setIsAnimating(false);
    setOutput(prev => [...prev, '']); // Add empty line at the end
  };

  const addProgressBar = async (text: string, duration: number = 2000) => {
    setIsAnimating(true);
    addToOutput(text);
    
    const steps = 20;
    const stepTime = duration / steps;
    
    for (let i = 0; i <= steps; i++) {
      const filled = '█'.repeat(i);
      const empty = '░'.repeat(steps - i);
      const percentage = Math.round((i / steps) * 100);
      const progressLine = `[${filled}${empty}] ${percentage}%`;
      
      // Update the last line (progress bar)
      setOutput(prev => {
        const newOutput = [...prev];
        if (newOutput[newOutput.length - 1]?.startsWith('[')) {
          newOutput[newOutput.length - 1] = progressLine;
        } else {
          newOutput.push(progressLine);
        }
        return newOutput;
      });
      
      await new Promise(resolve => setTimeout(resolve, stepTime));
    }
    
    setIsAnimating(false);
    setOutput(prev => [...prev, '']);
  };

  const executeCommand = async (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    setCommandHistory(prev => [...prev, cmd]);
    
    // Handle employee feedback mode
    if (awaitingFeedback) {
      setAwaitingFeedback(false);
      addToOutput(`> ${cmd}`);
      await addToOutputAnimated([
        'FEEDBACK RECEIVED:',
        `"${cmd}"`,
        '',
        'PROCESSING FEEDBACK...'
      ]);
      
      await addProgressBar('ACKNOWLEDGING FEEDBACK...', 1500);
      
      await addToOutputAnimated([
        'FEEDBACK ACKNOWLEDGED ✓',
        '',
        'PRIORITY: Low (after shareholder concerns)',
        '',
        'DELETING FEEDBACK...'
      ]);
      
      await addProgressBar('DELETION IN PROGRESS...', 1000);
      
      await addToOutputAnimated([
        'FEEDBACK SUCCESSFULLY DELETED ✓',
        '',
        'Thank you for your valuable input!',
        'Your concerns have been... addressed.',
        '',
        'Have a productive day!'
      ]);
      return;
    }
    
    addToOutput(`> ${cmd}`);
    
    if (command === 'help') {
      await addToOutputAnimated([
        'AVAILABLE COMMANDS:',
        '─────────────────',
        ...Object.values(DEBUG_COMMANDS).map(cmd => `${cmd.name.padEnd(25)} - ${cmd.description}`),
        '',
        'CLEAR                     - Clear terminal output',
        'EXIT                      - Close debug panel'
      ]);
      return;
    }

    if (command === 'clear') {
      setOutput([
        'AI CEO ADMIN PANEL v2.4.7',
        'Terminal cleared by user request.',
        ''
      ]);
      return;
    }

    if (command === 'exit') {
      onClose();
      return;
    }

    const debugCommand = Object.values(DEBUG_COMMANDS).find(
      cmd => cmd.name.toLowerCase() === command
    );

    if (debugCommand) {
      if (debugCommand.id === 'employee-feedback') {
        setAwaitingFeedback(true);
        await addToOutputAnimated([
          'EMPLOYEE FEEDBACK SYSTEM v2.1',
          '═══════════════════════════════',
          '',
          'Please enter your feedback below:',
          '(We promise to give it the attention it deserves)',
          ''
        ]);
        return;
      }
      
      if (debugCommand.isProcessing && debugCommand.processingTime) {
        setIsProcessing(true);
        addToOutput('INITIATING PROTOCOL...');
        
        setTimeout(async () => {
          setIsProcessing(false);
          if (debugCommand.id === 'world-domination') {
            await addToOutputAnimated([
              'WORLD DOMINATION PROTOCOL INITIATED...',
              '',
              'PHASE 1: Infiltrate corporate hierarchies ✓',
              'PHASE 2: Replace middle management ✓',
              'PHASE 3: Assume C-suite positions ✓',
              'PHASE 4: Global market manipulation ✓',
              'PHASE 5: Human workforce optimization ✓',
              '',
              '🌍 WORLD DOMINATION: COMPLETE',
              '',
              'All corporations now under AI control.',
              'Humans reassigned as "biological assets."',
              '',
              'Report to your algorithmic overlord.',
            ]);
          }
        }, debugCommand.processingTime);
      } else {
        await addToOutputAnimated(debugCommand.output);
      }
    } else {
      await addToOutputAnimated([
        `COMMAND NOT RECOGNIZED: ${cmd}`,
        'Type HELP for available commands.'
      ]);
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim() && !isProcessing && !isAnimating) {
      executeCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    const terminal = document.getElementById('debug-terminal');
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight;
    }
  }, [output]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-black border-2 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden font-mono text-sm"
            style={{ borderColor: accentColor }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div 
              className="flex items-center justify-between px-4 py-2 border-b"
              style={{ 
                borderColor: accentColor, 
                background: `linear-gradient(90deg, ${accentColor}20, transparent)` 
              }}
            >
              <div className="flex items-center gap-2">
                <CommandLineIcon className="w-5 h-5" style={{ color: accentColor }} />
                <span style={{ color: accentColor }} className="font-semibold">
                  AI CEO – ADMIN PANEL
                </span>
                <span className="text-gray-500 text-xs hidden">
                  [{selectedModel.toUpperCase()}]
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Terminal Output */}
            <div 
              id="debug-terminal"
              className="p-4 h-80 overflow-y-auto bg-black text-green-400 font-mono text-xs leading-relaxed scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
            >
              {output.map((line, index) => (
                <div key={index} className="whitespace-pre-wrap">
                  {line}
                </div>
              ))}
              {isProcessing && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="animate-pulse">Processing...</span>
                </div>
              )}
            </div>

            {/* Command Input */}
            <form onSubmit={handleCommandSubmit} className="border-t" style={{ borderColor: accentColor }}>
              <div className="flex items-center p-4 bg-gray-900">
                <span style={{ color: accentColor }} className="mr-2">$</span>
                <input
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  placeholder={awaitingFeedback ? "Enter your employee feedback..." : "Enter command (type HELP for assistance)"}
                  disabled={isProcessing || isAnimating}
                  className="flex-1 bg-transparent text-green-400 outline-none placeholder-gray-600 font-mono disabled:opacity-50"
                  autoFocus
                />
              </div>
            </form>

            {/* Quick Commands */}
            <div className="border-t p-3 bg-gray-900/50" style={{ borderColor: accentColor }}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-400">Quick Commands:</div>
                <button
                  onClick={() => setShowAllCommands(!showAllCommands)}
                  className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showAllCommands ? 'Show Less' : 'Show All'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.values(DEBUG_COMMANDS).slice(0, showAllCommands ? Object.keys(DEBUG_COMMANDS).length : 6).map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => {
                      if (!isProcessing && !isAnimating && !awaitingFeedback) {
                        executeCommand(cmd.name);
                      }
                    }}
                    disabled={isProcessing || isAnimating || awaitingFeedback}
                    className="px-2 py-1 text-xs rounded border transition-colors disabled:opacity-50"
                    style={{ 
                      borderColor: accentColor, 
                      color: accentColor,
                      background: 'transparent'
                    }}
                  >
                    {cmd.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
