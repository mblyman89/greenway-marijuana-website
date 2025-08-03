import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useLoyalty } from '../context/LoyaltyContext';
import { loyaltyProgramConfig } from '../data/mockLoyalty';
import useResponsive from '../hooks/useResponsive';
import Link from 'next/link';

const LoyaltyPage: React.FC = () => {
  const { 
    member, 
    tier, 
    isLoading, 
    error, 
    transactions, 
    redemptions, 
    availableRewards,
    allRewards,
    login, 
    logout,
    redeemReward,
    getProgressToNextTier
  } = useLoyalty();
  
  const { isMobile, isTablet } = useResponsive();
  const [loginUserId, setLoginUserId] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'rewards' | 'transactions' | 'tiers'>('overview');
  const [isRedeeming, setIsRedeeming] = useState<boolean>(false);
  const [selectedRewardId, setSelectedRewardId] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    
    if (!loginUserId.trim()) {
      setLoginError('Please enter a user ID');
      return;
    }
    
    const success = await login(loginUserId);
    
    if (!success) {
      setLoginError('Invalid user ID. Try "user-1", "user-2", or "user-3"');
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleRedeemReward = async (rewardId: string) => {
    setSelectedRewardId(rewardId);
    setIsRedeeming(true);
    
    const success = await redeemReward(rewardId);
    
    if (success) {
      alert('Reward redeemed successfully!');
    }
    
    setIsRedeeming(false);
    setSelectedRewardId(null);
  };

  const progress = getProgressToNextTier();

  return (
    <Layout title="Loyalty Program - Greenway Marijuana" description="Join our loyalty program and earn rewards for your purchases.">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Loyalty Program</h1>
        
        {!member ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Login Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Member Login</h2>
              
              <form onSubmit={handleLogin}>
                {loginError && (
                  <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
                    {loginError}
                  </div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                    User ID
                  </label>
                  <input
                    type="text"
                    id="userId"
                    value={loginUserId}
                    onChange={(e) => setLoginUserId(e.target.value)}
                    placeholder="Enter your user ID (e.g., user-1)"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">Don't have an account?</p>
                <Link href="/signup">
                  <a className="text-primary font-medium hover:underline">Sign up for our loyalty program</a>
                </Link>
              </div>
            </div>
            
            {/* Program Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Program Benefits</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">How It Works</h3>
                  <p className="text-gray-700">
                    Join our loyalty program to earn points on every purchase. Redeem your points for discounts, free products, and exclusive rewards.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-2">Earning Points</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Earn {loyaltyProgramConfig.pointsPerDollar} point for every $1 spent</li>
                    <li>Earn bonus points on special promotions</li>
                    <li>Get {loyaltyProgramConfig.birthdayBonusPoints} bonus points on your birthday</li>
                    <li>Earn {loyaltyProgramConfig.referralBonusPoints} points for referring a friend</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-2">Membership Tiers</h3>
                  <div className="space-y-4">
                    {loyaltyProgramConfig.tiers.map((tierConfig) => (
                      <div key={tierConfig.tier} className="flex items-center">
                        <div 
                          className="w-6 h-6 rounded-full mr-2" 
                          style={{ backgroundColor: tierConfig.color }}
                        ></div>
                        <div>
                          <span className="font-medium">{tierConfig.name}</span>
                          <span className="text-gray-500 text-sm ml-2">
                            ({tierConfig.minPoints}+ points)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Member Dashboard */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className={`flex ${isMobile ? 'flex-col' : 'justify-between items-center'}`}>
                <div className={`${isMobile ? 'mb-4' : ''}`}>
                  <h2 className="text-2xl font-bold">Welcome Back!</h2>
                  <p className="text-gray-600">
                    Member since {new Date(member.joinDate).toLocaleDateString()}
                  </p>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded font-medium hover:bg-gray-300 transition"
                >
                  Logout
                </button>
              </div>
              
              <div className={`mt-6 flex ${isMobile ? 'flex-col' : 'items-center'} gap-4`}>
                <div className={`${isMobile ? 'w-full' : 'w-1/2'}`}>
                  <div className="flex items-center mb-2">
                    <div 
                      className="w-6 h-6 rounded-full mr-2" 
                      style={{ backgroundColor: tier?.color || '#000' }}
                    ></div>
                    <h3 className="text-lg font-bold">{tier?.name} Member</h3>
                  </div>
                  
                  <div className="mb-2">
                    <span className="font-bold">{member.points}</span> points available
                  </div>
                  
                  {progress.nextTier && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{progress.current} points</span>
                        <span>{progress.next} points needed for {progress.nextTier.name}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${progress.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={`${isMobile ? 'w-full' : 'w-1/2'} bg-gray-100 p-4 rounded-lg`}>
                  <h3 className="font-bold mb-2">Your Benefits</h3>
                  <ul className="text-sm space-y-1">
                    {tier?.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="mb-6">
              <div className={`flex ${isMobile ? 'overflow-x-auto' : ''} border-b border-gray-200`}>
                <button
                  className={`py-2 px-4 font-medium ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`py-2 px-4 font-medium ${activeTab === 'rewards' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('rewards')}
                >
                  Rewards
                </button>
                <button
                  className={`py-2 px-4 font-medium ${activeTab === 'transactions' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('transactions')}
                >
                  History
                </button>
                <button
                  className={`py-2 px-4 font-medium ${activeTab === 'tiers' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('tiers')}
                >
                  Tiers
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Available Points */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-4">Your Points</h3>
                      <div className="flex items-center">
                        <div className="text-4xl font-bold text-primary mr-2">
                          {member.points}
                        </div>
                        <div className="text-gray-600">
                          points available
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-600">
                        Lifetime points earned: {member.lifetimePoints}
                      </div>
                    </div>
                    
                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                      {transactions.length > 0 ? (
                        <div className="space-y-3">
                          {transactions.slice(0, 3).map((transaction) => (
                            <div key={transaction.id} className="flex justify-between border-b border-gray-100 pb-2">
                              <div>
                                <div className="font-medium">{transaction.description}</div>
                                <div className="text-sm text-gray-500">
                                  {new Date(transaction.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                              <div className={`font-bold ${transaction.points > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {transaction.points > 0 ? '+' : ''}{transaction.points}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No recent activity</p>
                      )}
                      <button
                        onClick={() => setActiveTab('transactions')}
                        className="mt-4 text-primary font-medium hover:underline"
                      >
                        View all activity
                      </button>
                    </div>
                  </div>
                  
                  {/* Available Rewards */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Available Rewards</h3>
                      <button
                        onClick={() => setActiveTab('rewards')}
                        className="text-primary font-medium hover:underline"
                      >
                        View all rewards
                      </button>
                    </div>
                    
                    {availableRewards.length > 0 ? (
                      <div className={`grid grid-cols-1 ${isTablet ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
                        {availableRewards.slice(0, 3).map((reward) => (
                          <div key={reward.id} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-bold mb-2">{reward.name}</h4>
                            <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="font-bold text-primary">{reward.pointsCost} points</div>
                              <button
                                onClick={() => handleRedeemReward(reward.id)}
                                disabled={isRedeeming && selectedRewardId === reward.id}
                                className={`bg-primary text-white py-1 px-3 rounded text-sm font-medium hover:bg-primary-dark transition ${
                                  isRedeeming && selectedRewardId === reward.id ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                              >
                                {isRedeeming && selectedRewardId === reward.id ? 'Redeeming...' : 'Redeem'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No rewards available with your current points balance</p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Rewards Tab */}
              {activeTab === 'rewards' && (
                <div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-6">Available Rewards</h3>
                    
                    <div className="mb-6">
                      <div className="flex items-center">
                        <div className="text-2xl font-bold text-primary mr-2">
                          {member.points}
                        </div>
                        <div className="text-gray-600">
                          points available
                        </div>
                      </div>
                    </div>
                    
                    <div className={`grid grid-cols-1 ${isTablet ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
                      {allRewards.map((reward) => {
                        const isAvailable = availableRewards.some(r => r.id === reward.id);
                        const pointsNeeded = reward.pointsCost - member.points;
                        
                        return (
                          <div 
                            key={reward.id} 
                            className={`border rounded-lg p-4 ${isAvailable ? 'border-primary' : 'border-gray-200 opacity-75'}`}
                          >
                            <h4 className="font-bold mb-2">{reward.name}</h4>
                            <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                            
                            {reward.minimumTier && (
                              <div className="text-xs text-gray-500 mb-2">
                                {reward.minimumTier} tier or higher required
                              </div>
                            )}
                            
                            <div className="flex justify-between items-center">
                              <div className="font-bold text-primary">{reward.pointsCost} points</div>
                              
                              {isAvailable ? (
                                <button
                                  onClick={() => handleRedeemReward(reward.id)}
                                  disabled={isRedeeming && selectedRewardId === reward.id}
                                  className={`bg-primary text-white py-1 px-3 rounded text-sm font-medium hover:bg-primary-dark transition ${
                                    isRedeeming && selectedRewardId === reward.id ? 'opacity-50 cursor-not-allowed' : ''
                                  }`}
                                >
                                  {isRedeeming && selectedRewardId === reward.id ? 'Redeeming...' : 'Redeem'}
                                </button>
                              ) : (
                                <div className="text-sm text-gray-500">
                                  {pointsNeeded > 0 ? `Need ${pointsNeeded} more points` : 'Not available for your tier'}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* My Rewards */}
                  {redemptions.length > 0 && (
                    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                      <h3 className="text-xl font-bold mb-6">My Rewards</h3>
                      
                      <div className="space-y-4">
                        {redemptions.map((redemption) => {
                          const reward = allRewards.find(r => r.id === redemption.rewardId);
                          
                          if (!reward) return null;
                          
                          return (
                            <div key={redemption.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-bold">{reward.name}</h4>
                                  <p className="text-sm text-gray-600">{reward.description}</p>
                                  <div className="text-sm mt-2">
                                    <span className="font-medium">Code:</span> {redemption.code}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    Redeemed on {new Date(redemption.redeemedAt).toLocaleDateString()}
                                  </div>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-medium ${
                                  redemption.isUsed ? 'bg-gray-200 text-gray-700' : 'bg-green-100 text-green-800'
                                }`}>
                                  {redemption.isUsed ? 'Used' : 'Available'}
                                </div>
                              </div>
                              
                              {!redemption.isUsed && (
                                <div className="text-xs text-gray-500 mt-2">
                                  Expires on {new Date(redemption.expiresAt || '').toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Transactions Tab */}
              {activeTab === 'transactions' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-6">Point History</h3>
                  
                  {transactions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="py-2 px-4 text-left">Date</th>
                            <th className="py-2 px-4 text-left">Description</th>
                            <th className="py-2 px-4 text-right">Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b border-gray-200">
                              <td className="py-3 px-4">
                                {new Date(transaction.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4">{transaction.description}</td>
                              <td className={`py-3 px-4 text-right font-medium ${
                                transaction.points > 0 ? 'text-green-500' : 'text-red-500'
                              }`}>
                                {transaction.points > 0 ? '+' : ''}{transaction.points}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500">No transaction history available</p>
                  )}
                </div>
              )}
              
              {/* Tiers Tab */}
              {activeTab === 'tiers' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-6">Membership Tiers</h3>
                  
                  <div className="space-y-8">
                    {loyaltyProgramConfig.tiers.map((tierConfig) => {
                      const isCurrentTier = tier?.tier === tierConfig.tier;
                      const isHigherTier = tier && loyaltyProgramConfig.tiers.findIndex(t => t.tier === tier.tier) < 
                                          loyaltyProgramConfig.tiers.findIndex(t => t.tier === tierConfig.tier);
                      
                      return (
                        <div 
                          key={tierConfig.tier} 
                          className={`border rounded-lg p-6 ${
                            isCurrentTier ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center mb-4">
                            <div 
                              className="w-8 h-8 rounded-full mr-3" 
                              style={{ backgroundColor: tierConfig.color }}
                            ></div>
                            <h4 className="text-xl font-bold">{tierConfig.name}</h4>
                            {isCurrentTier && (
                              <span className="ml-3 bg-primary text-white text-xs px-2 py-1 rounded">
                                Current Tier
                              </span>
                            )}
                          </div>
                          
                          <div className="mb-4">
                            <span className="font-medium">{tierConfig.minPoints}+ points required</span>
                          </div>
                          
                          <h5 className="font-medium mb-2">Benefits:</h5>
                          <ul className="space-y-1 mb-4">
                            {tierConfig.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                          
                          {isHigherTier && (
                            <div className="mt-4">
                              <div className="text-sm text-gray-600 mb-2">
                                You need {tierConfig.minPoints - member.points} more points to reach this tier
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-primary h-2.5 rounded-full" 
                                  style={{ 
                                    width: `${Math.min(100, Math.floor(member.points / tierConfig.minPoints * 100))}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LoyaltyPage;