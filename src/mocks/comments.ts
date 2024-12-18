import { Comment } from '../types/comment';

export const mockComment: Comment = {
  id: '1',
  date: '2024-12-04',
  user: {
    name: 'John Doe',
    avatarUrl: '/path/to/avatar.jpg',
    isPro: true,
  },
  comment: 'This is a test comment.',
  rating: 4,
};
