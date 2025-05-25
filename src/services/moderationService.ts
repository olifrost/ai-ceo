import { 
  collection, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  doc, 
  orderBy,
  limit 
} from 'firebase/firestore';
import { db } from '../firebase';

const APPROVAL_THRESHOLD = 5; // CEOs need 5 votes to be approved

export const moderateCEOs = async () => {
  try {
    // Get all unapproved CEOs with enough votes
    const unapprovedQuery = query(
      collection(db, 'ceos'),
      where('approved', '==', false),
      where('votes', '>=', APPROVAL_THRESHOLD)
    );
    
    const querySnapshot = await getDocs(unapprovedQuery);
    
    // Approve CEOs that meet the threshold
    const approvalPromises = querySnapshot.docs.map(async (docSnapshot) => {
      const ceoRef = doc(db, 'ceos', docSnapshot.id);
      await updateDoc(ceoRef, { approved: true });
    });
    
    await Promise.all(approvalPromises);
    
    console.log(`Approved ${querySnapshot.docs.length} CEOs`);
  } catch (error) {
    console.error('Error moderating CEOs:', error);
  }
};

export const getTopCEOs = async (limitCount: number = 50) => {
  try {
    const q = query(
      collection(db, 'ceos'),
      where('approved', '==', true),
      orderBy('votes', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      submittedAt: doc.data().submittedAt?.toDate() || new Date()
    }));
  } catch (error) {
    console.error('Error getting top CEOs:', error);
    return [];
  }
};

// Basic content moderation
export const isContentAppropriate = (text: string): boolean => {
  const inappropriateWords = [
    // Add basic profanity filter - keeping it minimal for this demo
    'spam', 'test123', 'asdf'
  ];
  
  const lowerText = text.toLowerCase();
  return !inappropriateWords.some(word => lowerText.includes(word));
};

// Auto-moderate new submissions
export const autoModerateCEO = async (name: string, company: string): Promise<boolean> => {
  // Check for appropriate content
  if (!isContentAppropriate(name) || !isContentAppropriate(company)) {
    return false;
  }
  
  // Check for duplicate submissions
  const duplicateQuery = query(
    collection(db, 'ceos'),
    where('name', '==', name.trim()),
    where('company', '==', company.trim())
  );
  
  const duplicateSnapshot = await getDocs(duplicateQuery);
  if (!duplicateSnapshot.empty) {
    return false; // Duplicate found
  }
  
  return true; // Passed auto-moderation
};
