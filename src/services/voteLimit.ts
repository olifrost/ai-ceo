
const STORAGE_KEY = 'ceo_votes_used';
const MAX_VOTES = 3;

export interface VoteStatus {
  votesUsed: number;
  remainingVotes: number;
  hasVotesLeft: boolean;
}

export const getVoteStatus = (): VoteStatus => {
  const votesUsed = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  const remainingVotes = Math.max(0, MAX_VOTES - votesUsed);
  
  return {
    votesUsed,
    remainingVotes,
    hasVotesLeft: remainingVotes > 0
  };
};

export const useVote = (): boolean => {
  const status = getVoteStatus();
  
  if (!status.hasVotesLeft) {
    return false;
  }
  
  const newVotesUsed = status.votesUsed + 1;
  localStorage.setItem(STORAGE_KEY, newVotesUsed.toString());
  
  return true;
};

export const addVotes = (count: number = 1): void => {
  const currentVotesUsed = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  const newVotesUsed = Math.max(0, currentVotesUsed - count);
  localStorage.setItem(STORAGE_KEY, newVotesUsed.toString());
};

export const resetVotes = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// Share functionality
export const shareApp = async (): Promise<boolean> => {
  const shareData = {
    title: 'CEO Replacement Leaderboard',
    text: 'Vote for which CEOs should be replaced by AI first!',
    url: window.location.href
  };

  // Check if Web Share API is supported
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (error) {
      console.log('Share was cancelled or failed');
      return false;
    }
  } else {
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard');
      return false;
    }
  }
};

// Email templates
export const generateCEOEmail = (ceoName: string, userMessage?: string): string => {
  const defaultMessage = `Dear ${ceoName},

I recently came across the CEO Replacement Leaderboard, where you're currently ranked among the CEOs that people think should be replaced by AI.

While this might seem alarming, I see it as an opportunity for reflection and improvement. The future of leadership lies in embracing technology while maintaining the human touch that makes great leaders irreplaceable.

${userMessage || 'I believe you have the potential to evolve your leadership style and prove that human CEOs can adapt and thrive in an AI-driven world.'}

Best regards,
A concerned stakeholder`;

  return defaultMessage;
};

export const createMailtoLink = (email: string, subject: string, body: string): string => {
  const params = new URLSearchParams({
    subject,
    body
  });
  
  return `mailto:${email}?${params.toString()}`;
};