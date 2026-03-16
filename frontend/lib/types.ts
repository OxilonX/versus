export interface ProfileUser {
  id: string;
  name: string | null;
  image: string | null;
  createdAt: string;
}

export interface ProfileStats {
  challengesCount: number;
  likesCount: number;
  votesCount: number;
}

export interface ProfileChallenge {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  isLiked: boolean;
  likesCount: number;
  userVotedItemId: string | null;
  user: {
    image: string | null;
    name: string;
  };
  items: {
    itemId: string;
    item: {
      id: string;
      name: string;
      imageUrl: string;
    };
    _count: {
      votes: number;
    };
  }[];
  stats: {
    item1Percent: number;
    item2Percent: number;
    totalVotes: number;
  };
}

export interface UserProfileData {
  user: ProfileUser;
  stats: ProfileStats;
  createdChallenges: ProfileChallenge[];
  votedChallenges: ProfileChallenge[];
}