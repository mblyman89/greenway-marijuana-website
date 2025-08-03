import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  LoyaltyMember, 
  LoyaltyTier, 
  LoyaltyTierConfig, 
  LoyaltyTransaction,
  LoyaltyReward,
  LoyaltyRedemption
} from '../types/Loyalty';
import { 
  mockLoyaltyMembers, 
  getLoyaltyTierByPoints, 
  calculatePointsEarned,
  getLoyaltyTransactionsByMemberId,
  getLoyaltyRedemptionsByMemberId,
  getAvailableRewardsForMember,
  mockLoyaltyRewards
} from '../data/mockLoyalty';

interface LoyaltyContextType {
  member: LoyaltyMember | null;
  isLoading: boolean;
  error: string | null;
  tier: LoyaltyTierConfig | null;
  transactions: LoyaltyTransaction[];
  redemptions: LoyaltyRedemption[];
  availableRewards: LoyaltyReward[];
  allRewards: LoyaltyReward[];
  login: (userId: string) => Promise<boolean>;
  logout: () => void;
  redeemReward: (rewardId: string) => Promise<boolean>;
  calculatePointsForPurchase: (amount: number) => number;
  getProgressToNextTier: () => { current: number; next: number; percentage: number; nextTier: LoyaltyTierConfig | null };
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (context === undefined) {
    throw new Error('useLoyalty must be used within a LoyaltyProvider');
  }
  return context;
};

interface LoyaltyProviderProps {
  children: ReactNode;
}

export const LoyaltyProvider: React.FC<LoyaltyProviderProps> = ({ children }) => {
  const [member, setMember] = useState<LoyaltyMember | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tier, setTier] = useState<LoyaltyTierConfig | null>(null);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [redemptions, setRedemptions] = useState<LoyaltyRedemption[]>([]);
  const [availableRewards, setAvailableRewards] = useState<LoyaltyReward[]>([]);

  // Load member data from localStorage on initial render
  useEffect(() => {
    const savedMember = localStorage.getItem('loyaltyMember');
    if (savedMember) {
      try {
        const parsedMember = JSON.parse(savedMember) as LoyaltyMember;
        setMember(parsedMember);
        
        // Load related data
        const memberTier = getLoyaltyTierByPoints(parsedMember.points);
        setTier(memberTier);
        
        const memberTransactions = getLoyaltyTransactionsByMemberId(parsedMember.id);
        setTransactions(memberTransactions);
        
        const memberRedemptions = getLoyaltyRedemptionsByMemberId(parsedMember.id);
        setRedemptions(memberRedemptions);
        
        const memberAvailableRewards = getAvailableRewardsForMember(parsedMember);
        setAvailableRewards(memberAvailableRewards);
      } catch (error) {
        console.error('Failed to parse loyalty member from localStorage:', error);
        setError('Failed to load loyalty data');
      }
    }
  }, []);

  // Login with user ID
  const login = async (userId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const foundMember = mockLoyaltyMembers.find(m => m.userId === userId);
      
      if (!foundMember) {
        setError('Member not found');
        setIsLoading(false);
        return false;
      }
      
      // Set member data
      setMember(foundMember);
      localStorage.setItem('loyaltyMember', JSON.stringify(foundMember));
      
      // Load related data
      const memberTier = getLoyaltyTierByPoints(foundMember.points);
      setTier(memberTier);
      
      const memberTransactions = getLoyaltyTransactionsByMemberId(foundMember.id);
      setTransactions(memberTransactions);
      
      const memberRedemptions = getLoyaltyRedemptionsByMemberId(foundMember.id);
      setRedemptions(memberRedemptions);
      
      const memberAvailableRewards = getAvailableRewardsForMember(foundMember);
      setAvailableRewards(memberAvailableRewards);
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login');
      setIsLoading(false);
      return false;
    }
  };

  // Logout
  const logout = () => {
    setMember(null);
    setTier(null);
    setTransactions([]);
    setRedemptions([]);
    setAvailableRewards([]);
    localStorage.removeItem('loyaltyMember');
  };

  // Redeem a reward
  const redeemReward = async (rewardId: string): Promise<boolean> => {
    if (!member) {
      setError('You must be logged in to redeem rewards');
      return false;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Find the reward
      const reward = mockLoyaltyRewards.find(r => r.id === rewardId);
      
      if (!reward) {
        setError('Reward not found');
        setIsLoading(false);
        return false;
      }
      
      // Check if member has enough points
      if (member.points < reward.pointsCost) {
        setError('Not enough points to redeem this reward');
        setIsLoading(false);
        return false;
      }
      
      // Check if member meets minimum tier requirement
      if (reward.minimumTier && tier) {
        const tierIndex = mockLoyaltyMembers.findIndex(m => m.tier === tier.tier);
        const requiredTierIndex = mockLoyaltyMembers.findIndex(m => m.tier === reward.minimumTier);
        
        if (tierIndex < requiredTierIndex) {
          setError(`This reward is only available to ${reward.minimumTier} members and above`);
          setIsLoading(false);
          return false;
        }
      }
      
      // In a real app, this would be an API call to redeem the reward
      // For now, we'll just update the local state
      
      // Create a new redemption
      const newRedemption: LoyaltyRedemption = {
        id: `redemption-${Date.now()}`,
        memberId: member.id,
        rewardId: reward.id,
        pointsUsed: reward.pointsCost,
        redeemedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        isUsed: false,
        code: `REWARD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      };
      
      // Create a new transaction
      const newTransaction: LoyaltyTransaction = {
        id: `transaction-${Date.now()}`,
        memberId: member.id,
        type: 'redemption',
        points: -reward.pointsCost,
        description: `Redemption: ${reward.name}`,
        rewardId: reward.id,
        createdAt: new Date().toISOString()
      };
      
      // Update member points
      const updatedMember = {
        ...member,
        points: member.points - reward.pointsCost,
        lastActivity: new Date().toISOString()
      };
      
      // Update state
      setMember(updatedMember);
      setTransactions([...transactions, newTransaction]);
      setRedemptions([...redemptions, newRedemption]);
      
      // Update localStorage
      localStorage.setItem('loyaltyMember', JSON.stringify(updatedMember));
      
      // Update tier and available rewards
      const updatedTier = getLoyaltyTierByPoints(updatedMember.points);
      setTier(updatedTier);
      
      const updatedAvailableRewards = getAvailableRewardsForMember(updatedMember);
      setAvailableRewards(updatedAvailableRewards);
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Error redeeming reward:', error);
      setError('Failed to redeem reward');
      setIsLoading(false);
      return false;
    }
  };

  // Calculate points for a purchase
  const calculatePointsForPurchase = (amount: number): number => {
    if (!member || !tier) {
      return 0;
    }
    
    return calculatePointsEarned(amount, tier);
  };

  // Get progress to next tier
  const getProgressToNextTier = () => {
    if (!member || !tier) {
      return { current: 0, next: 0, percentage: 0, nextTier: null };
    }
    
    // Find the next tier
    const tiers = mockLoyaltyMembers.map(m => m.tier).sort();
    const currentTierIndex = tiers.indexOf(tier.tier);
    
    // If already at the highest tier
    if (currentTierIndex === tiers.length - 1) {
      return { 
        current: member.points, 
        next: tier.minPoints, 
        percentage: 100, 
        nextTier: null 
      };
    }
    
    const nextTier = getLoyaltyTierByPoints(tier.minPoints + 1);
    const percentage = Math.min(100, Math.floor((member.points - tier.minPoints) / (nextTier.minPoints - tier.minPoints) * 100));
    
    return {
      current: member.points,
      next: nextTier.minPoints,
      percentage,
      nextTier
    };
  };

  const value = {
    member,
    isLoading,
    error,
    tier,
    transactions,
    redemptions,
    availableRewards,
    allRewards: mockLoyaltyRewards,
    login,
    logout,
    redeemReward,
    calculatePointsForPurchase,
    getProgressToNextTier
  };

  return <LoyaltyContext.Provider value={value}>{children}</LoyaltyContext.Provider>;
};

export default LoyaltyContext;