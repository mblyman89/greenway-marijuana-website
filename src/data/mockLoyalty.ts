import { 
  LoyaltyTier, 
  LoyaltyTierConfig, 
  LoyaltyMember, 
  LoyaltyTransaction, 
  LoyaltyTransactionType,
  LoyaltyReward,
  LoyaltyRedemption,
  LoyaltyProgramConfig
} from '../types/Loyalty';

/**
 * Loyalty Program Configuration
 */
export const loyaltyProgramConfig: LoyaltyProgramConfig = {
  pointsPerDollar: 1,
  minimumPurchaseAmount: 10,
  pointsExpirationMonths: 12,
  birthdayBonusPoints: 100,
  referralBonusPoints: 50,
  tiers: [
    {
      tier: LoyaltyTier.BRONZE,
      name: 'Bronze',
      minPoints: 0,
      pointsMultiplier: 1,
      benefits: [
        'Earn 1 point per $1 spent',
        'Access to member-only promotions',
        'Birthday bonus points'
      ],
      color: '#CD7F32'
    },
    {
      tier: LoyaltyTier.SILVER,
      name: 'Silver',
      minPoints: 500,
      pointsMultiplier: 1.25,
      benefits: [
        'Earn 1.25 points per $1 spent',
        'Access to member-only promotions',
        'Birthday bonus points',
        'Early access to new products'
      ],
      color: '#C0C0C0'
    },
    {
      tier: LoyaltyTier.GOLD,
      name: 'Gold',
      minPoints: 1000,
      pointsMultiplier: 1.5,
      benefits: [
        'Earn 1.5 points per $1 spent',
        'Access to member-only promotions',
        'Birthday bonus points',
        'Early access to new products',
        'Exclusive gold member discounts'
      ],
      color: '#FFD700'
    },
    {
      tier: LoyaltyTier.PLATINUM,
      name: 'Platinum',
      minPoints: 2500,
      pointsMultiplier: 2,
      benefits: [
        'Earn 2 points per $1 spent',
        'Access to member-only promotions',
        'Birthday bonus points',
        'Early access to new products',
        'Exclusive platinum member discounts',
        'Priority service',
        'Personalized product recommendations'
      ],
      color: '#E5E4E2'
    }
  ]
};

/**
 * Mock Loyalty Rewards
 */
export const mockLoyaltyRewards: LoyaltyReward[] = [
  {
    id: 'reward-1',
    name: '$5 Off Your Purchase',
    description: 'Get $5 off your next purchase at Greenway Marijuana.',
    pointsCost: 100,
    isActive: true,
    imageUrl: '/images/rewards/discount.jpg'
  },
  {
    id: 'reward-2',
    name: '$10 Off Your Purchase',
    description: 'Get $10 off your next purchase at Greenway Marijuana.',
    pointsCost: 200,
    isActive: true,
    imageUrl: '/images/rewards/discount.jpg'
  },
  {
    id: 'reward-3',
    name: '$20 Off Your Purchase',
    description: 'Get $20 off your next purchase at Greenway Marijuana.',
    pointsCost: 400,
    isActive: true,
    imageUrl: '/images/rewards/discount.jpg'
  },
  {
    id: 'reward-4',
    name: 'Free Pre-Roll',
    description: 'Receive a free pre-roll with your next purchase.',
    pointsCost: 150,
    isActive: true,
    imageUrl: '/images/rewards/pre-roll.jpg'
  },
  {
    id: 'reward-5',
    name: 'Buy One Get One 50% Off',
    description: 'Buy one product and get another of equal or lesser value at 50% off.',
    pointsCost: 300,
    isActive: true,
    imageUrl: '/images/rewards/bogo.jpg'
  },
  {
    id: 'reward-6',
    name: 'Exclusive Gold Member Discount',
    description: '15% off your entire purchase.',
    pointsCost: 500,
    isActive: true,
    minimumTier: LoyaltyTier.GOLD,
    imageUrl: '/images/rewards/gold-discount.jpg'
  },
  {
    id: 'reward-7',
    name: 'Platinum VIP Experience',
    description: 'Personalized shopping experience with one of our budtenders.',
    pointsCost: 1000,
    isActive: true,
    minimumTier: LoyaltyTier.PLATINUM,
    imageUrl: '/images/rewards/vip.jpg'
  }
];

/**
 * Mock Loyalty Members
 */
export const mockLoyaltyMembers: LoyaltyMember[] = [
  {
    id: 'member-1',
    userId: 'user-1',
    points: 750,
    lifetimePoints: 1200,
    tier: LoyaltyTier.SILVER,
    joinDate: '2024-01-15T00:00:00Z',
    lastActivity: '2025-07-20T14:30:00Z',
    birthMonth: 3,
    birthDay: 15
  },
  {
    id: 'member-2',
    userId: 'user-2',
    points: 1500,
    lifetimePoints: 3000,
    tier: LoyaltyTier.GOLD,
    joinDate: '2023-06-10T00:00:00Z',
    lastActivity: '2025-08-01T10:15:00Z',
    birthMonth: 8,
    birthDay: 22
  },
  {
    id: 'member-3',
    userId: 'user-3',
    points: 3200,
    lifetimePoints: 5500,
    tier: LoyaltyTier.PLATINUM,
    joinDate: '2022-11-05T00:00:00Z',
    lastActivity: '2025-07-30T16:45:00Z',
    birthMonth: 11,
    birthDay: 5
  }
];

/**
 * Mock Loyalty Transactions
 */
export const mockLoyaltyTransactions: LoyaltyTransaction[] = [
  {
    id: 'transaction-1',
    memberId: 'member-1',
    type: LoyaltyTransactionType.PURCHASE,
    points: 45,
    description: 'Purchase: Order #12345',
    orderId: 'order-12345',
    createdAt: '2025-07-20T14:30:00Z'
  },
  {
    id: 'transaction-2',
    memberId: 'member-1',
    type: LoyaltyTransactionType.REDEMPTION,
    points: -100,
    description: 'Redemption: $5 Off Your Purchase',
    rewardId: 'reward-1',
    createdAt: '2025-07-10T11:15:00Z'
  },
  {
    id: 'transaction-3',
    memberId: 'member-2',
    type: LoyaltyTransactionType.PURCHASE,
    points: 120,
    description: 'Purchase: Order #12346',
    orderId: 'order-12346',
    createdAt: '2025-08-01T10:15:00Z'
  },
  {
    id: 'transaction-4',
    memberId: 'member-2',
    type: LoyaltyTransactionType.BIRTHDAY,
    points: 100,
    description: 'Birthday Bonus',
    createdAt: '2025-08-22T00:00:00Z'
  },
  {
    id: 'transaction-5',
    memberId: 'member-3',
    type: LoyaltyTransactionType.PURCHASE,
    points: 200,
    description: 'Purchase: Order #12347',
    orderId: 'order-12347',
    createdAt: '2025-07-30T16:45:00Z'
  },
  {
    id: 'transaction-6',
    memberId: 'member-3',
    type: LoyaltyTransactionType.REFERRAL,
    points: 50,
    description: 'Referral: John Smith',
    createdAt: '2025-07-25T09:30:00Z'
  }
];

/**
 * Mock Loyalty Redemptions
 */
export const mockLoyaltyRedemptions: LoyaltyRedemption[] = [
  {
    id: 'redemption-1',
    memberId: 'member-1',
    rewardId: 'reward-1',
    pointsUsed: 100,
    redeemedAt: '2025-07-10T11:15:00Z',
    expiresAt: '2025-08-10T11:15:00Z',
    isUsed: true,
    usedAt: '2025-07-15T13:20:00Z',
    code: 'DISC5-ABC123'
  },
  {
    id: 'redemption-2',
    memberId: 'member-2',
    rewardId: 'reward-4',
    pointsUsed: 150,
    redeemedAt: '2025-07-28T15:45:00Z',
    expiresAt: '2025-08-28T15:45:00Z',
    isUsed: false,
    code: 'PREROLL-DEF456'
  },
  {
    id: 'redemption-3',
    memberId: 'member-3',
    rewardId: 'reward-6',
    pointsUsed: 500,
    redeemedAt: '2025-07-20T10:30:00Z',
    expiresAt: '2025-08-20T10:30:00Z',
    isUsed: true,
    usedAt: '2025-07-30T16:45:00Z',
    code: 'GOLD15-GHI789'
  }
];

/**
 * Get loyalty tier by points
 * @param points Number of points
 * @returns Loyalty tier
 */
export const getLoyaltyTierByPoints = (points: number): LoyaltyTierConfig => {
  const tiers = loyaltyProgramConfig.tiers;
  
  // Sort tiers by minimum points in descending order
  const sortedTiers = [...tiers].sort((a, b) => b.minPoints - a.minPoints);
  
  // Find the first tier where the points are greater than or equal to the minimum
  const tier = sortedTiers.find(tier => points >= tier.minPoints);
  
  // Return the tier or the lowest tier if no match
  return tier || tiers[0];
};

/**
 * Calculate points earned for a purchase
 * @param amount Purchase amount
 * @param tier Loyalty tier
 * @returns Points earned
 */
export const calculatePointsEarned = (amount: number, tier: LoyaltyTierConfig): number => {
  if (amount < loyaltyProgramConfig.minimumPurchaseAmount) {
    return 0;
  }
  
  const basePoints = Math.floor(amount * loyaltyProgramConfig.pointsPerDollar);
  return Math.floor(basePoints * tier.pointsMultiplier);
};

/**
 * Get loyalty member by user ID
 * @param userId User ID
 * @returns Loyalty member or null if not found
 */
export const getLoyaltyMemberByUserId = (userId: string): LoyaltyMember | null => {
  return mockLoyaltyMembers.find(member => member.userId === userId) || null;
};

/**
 * Get loyalty transactions by member ID
 * @param memberId Member ID
 * @returns Array of loyalty transactions
 */
export const getLoyaltyTransactionsByMemberId = (memberId: string): LoyaltyTransaction[] => {
  return mockLoyaltyTransactions.filter(transaction => transaction.memberId === memberId);
};

/**
 * Get loyalty redemptions by member ID
 * @param memberId Member ID
 * @returns Array of loyalty redemptions
 */
export const getLoyaltyRedemptionsByMemberId = (memberId: string): LoyaltyRedemption[] => {
  return mockLoyaltyRedemptions.filter(redemption => redemption.memberId === memberId);
};

/**
 * Get available rewards for a member
 * @param member Loyalty member
 * @returns Array of available rewards
 */
export const getAvailableRewardsForMember = (member: LoyaltyMember): LoyaltyReward[] => {
  const memberTier = getLoyaltyTierByPoints(member.points);
  
  return mockLoyaltyRewards.filter(reward => {
    // Check if reward is active
    if (!reward.isActive) {
      return false;
    }
    
    // Check if member has enough points
    if (reward.pointsCost > member.points) {
      return false;
    }
    
    // Check if member meets minimum tier requirement
    if (reward.minimumTier) {
      const tierIndex = loyaltyProgramConfig.tiers.findIndex(t => t.tier === memberTier.tier);
      const requiredTierIndex = loyaltyProgramConfig.tiers.findIndex(t => t.tier === reward.minimumTier);
      
      if (tierIndex < requiredTierIndex) {
        return false;
      }
    }
    
    return true;
  });
};