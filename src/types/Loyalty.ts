/**
 * Loyalty Program Types
 */

/**
 * Loyalty Tier
 */
export enum LoyaltyTier {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum'
}

/**
 * Loyalty Tier Configuration
 */
export interface LoyaltyTierConfig {
  tier: LoyaltyTier;
  name: string;
  minPoints: number;
  pointsMultiplier: number;
  benefits: string[];
  color: string;
}

/**
 * Loyalty Program Member
 */
export interface LoyaltyMember {
  id: string;
  userId: string;
  points: number;
  lifetimePoints: number;
  tier: LoyaltyTier;
  joinDate: string;
  lastActivity: string;
  birthMonth?: number;
  birthDay?: number;
}

/**
 * Loyalty Transaction Type
 */
export enum LoyaltyTransactionType {
  PURCHASE = 'purchase',
  REDEMPTION = 'redemption',
  REFERRAL = 'referral',
  BIRTHDAY = 'birthday',
  PROMOTION = 'promotion',
  ADJUSTMENT = 'adjustment'
}

/**
 * Loyalty Transaction
 */
export interface LoyaltyTransaction {
  id: string;
  memberId: string;
  type: LoyaltyTransactionType;
  points: number;
  description: string;
  orderId?: string;
  rewardId?: string;
  createdAt: string;
}

/**
 * Loyalty Reward
 */
export interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  isActive: boolean;
  minimumTier?: LoyaltyTier;
  expiresAt?: string;
  imageUrl?: string;
  termsAndConditions?: string;
}

/**
 * Loyalty Redemption
 */
export interface LoyaltyRedemption {
  id: string;
  memberId: string;
  rewardId: string;
  pointsUsed: number;
  redeemedAt: string;
  expiresAt?: string;
  isUsed: boolean;
  usedAt?: string;
  code: string;
}

/**
 * Loyalty Program Configuration
 */
export interface LoyaltyProgramConfig {
  pointsPerDollar: number;
  minimumPurchaseAmount: number;
  pointsExpirationMonths: number;
  tiers: LoyaltyTierConfig[];
  birthdayBonusPoints: number;
  referralBonusPoints: number;
}