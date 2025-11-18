import { MembershipBenefits, MembershipTier } from '@/types';

export const MEMBERSHIP_TIERS: MembershipBenefits[] = [
  {
    tier: 'standard',
    name: 'Standard',
    displayName: '标准会员',
    icon: '🎫',
    color: 'from-gray-500 to-slate-500',
    aiModel: 'gemini-1.5-flash',
    discount: 0,
    bookingsRequired: 0,
    benefits: [
      '基础AI助手访问',
      'Gemini 1.5 Flash模型',
      '标准响应速度',
      '基础旅行规划',
      '社区支持',
    ],
  },
  {
    tier: 'silver',
    name: 'Silver Genius',
    displayName: '银卡会员 (Genius Level 1)',
    icon: '🥈',
    color: 'from-slate-400 to-gray-500',
    aiModel: 'gemini-2.0-flash-exp',
    discount: 5,
    bookingsRequired: 5,
    benefits: [
      '5%全站折扣',
      'Gemini 2.0 Flash模型',
      '更快的AI响应',
      '优先客服支持',
      '专属银卡徽章',
      '早鸟优惠通知',
    ],
  },
  {
    tier: 'gold',
    name: 'Gold Genius Plus',
    displayName: '金卡会员 (Genius Level 2)',
    icon: '👑',
    color: 'from-amber-500 to-yellow-500',
    aiModel: 'gemini-1.5-pro',
    discount: 10,
    bookingsRequired: 15,
    benefits: [
      '10%全站折扣',
      'Gemini 1.5 Pro高级模型',
      '最高质量AI回答',
      '15%套餐组合折扣',
      '专属金卡客服',
      '免费行程调整',
      '机场贵宾室优惠',
      '房间免费升级机会',
    ],
  },
];

export function getMembershipByTier(tier: MembershipTier): MembershipBenefits {
  return MEMBERSHIP_TIERS.find(m => m.tier === tier) || MEMBERSHIP_TIERS[0];
}

export function getNextMembershipTier(currentTier: MembershipTier): MembershipBenefits | null {
  const currentIndex = MEMBERSHIP_TIERS.findIndex(m => m.tier === currentTier);
  if (currentIndex === -1 || currentIndex === MEMBERSHIP_TIERS.length - 1) {
    return null; // Already at highest tier
  }
  return MEMBERSHIP_TIERS[currentIndex + 1];
}

export function getProgressToNextTier(bookingsCount: number, currentTier: MembershipTier): {
  nextTier: MembershipBenefits | null;
  progress: number;
  bookingsNeeded: number;
} {
  const nextTier = getNextMembershipTier(currentTier);

  if (!nextTier) {
    return {
      nextTier: null,
      progress: 100,
      bookingsNeeded: 0,
    };
  }

  const currentTierData = getMembershipByTier(currentTier);
  const bookingsSinceLastTier = bookingsCount - currentTierData.bookingsRequired;
  const bookingsForNextTier = nextTier.bookingsRequired - currentTierData.bookingsRequired;
  const progress = Math.min((bookingsSinceLastTier / bookingsForNextTier) * 100, 100);
  const bookingsNeeded = Math.max(0, nextTier.bookingsRequired - bookingsCount);

  return {
    nextTier,
    progress,
    bookingsNeeded,
  };
}
