import { createProfile } from './profileFactory'
import type { Role, User } from '../types/user'

const mockUser = {
  ...createProfile({
    skills: true,
    portfolioItems: true,
    experiences: true,
    education: true,
    certifications: true,
    reviews: true,
    socialLinks: true,
  }),

  email: 'mockuser@example.com',
  passwordHash: 'hashedpassword',
  username: 'mockuser',
  role: 'user' as Role,
  createdAt: new Date(),
}

const mockUser1 = {
  ...createProfile({
    skills: true,
    portfolioItems: true,
    experiences: true,
    education: true,
    certifications: true,
    reviews: true,
    socialLinks: true,
  }),

  email: 'mockuser1@example.com',
  passwordHash: 'hashedpassword1',
  username: 'mockuser1',
  role: 'user' as Role,
  createdAt: new Date(),
}

const mockUser2 = {
  ...createProfile({
    skills: true,
    portfolioItems: true,
    experiences: true,
    education: true,
    certifications: true,
    reviews: true,
    socialLinks: true,
  }),

  email: 'mockuser1@example.com',
  passwordHash: 'hashedpassword1',
  username: 'mockuser1',
  role: 'user' as Role,
  createdAt: new Date(),
}

const mockUser3 = {
  ...createProfile({
    skills: true,
    portfolioItems: true,
    experiences: true,
    education: true,
    certifications: true,
    reviews: true,
    socialLinks: true,
  }),

  email: 'mockuser1@example.com',
  passwordHash: 'hashedpassword1',
  username: 'mockuser1',
  role: 'user' as Role,
  createdAt: new Date(),
}

const mockProfileResponse = {
  user: {
    id: '123',
    fullName: 'Cara Delevingne',
    avatarUrl: 'https://avatars.githubusercontent.com/u/286848',
    title: 'Cat Enthusiast',
    createdAt: '2020-01-01T00:00:00.000Z',
    profile: {
      bio: 'Passionate about feline friends and their well-being.',
      location: 'London, UK',
      website: 'https://caradelevingne.com',
      coverUrl: 'https://example.com/cover.jpg',
      skills: ['Cat Care', 'Animal Rescue', 'Veterinary Knowledge'],
      data: { pronouns: 'she/her', lookingFor: 'cat lovers' },
    },
  },
  profile: mockUser3,
  posts: [
    {
      id: 'post1',
      userId: '123',
      text: 'Loving my new cat!',
      content: 'Just adopted a cute kitten from the shelter.',
      media: ['https://example.com/cat1.jpg'],
      likes: 0,
      createdAt: '2020-01-01T00:00:00.000Z',
      updatedAt: null,
    },
    {
      id: 'post1',
      userId: '123',
      text: 'Loving my new cat!',
      content: 'Just adopted a cute kitten from the shelter.',
      media: ['https://example.com/cat1.jpg'],
      likes: 0,
      createdAt: '2020-01-01T00:00:00.000Z',
      updatedAt: null,
    },
    {
      id: 'post1',
      userId: '123',
      text: 'Loving my new cat!',
      content: 'Just adopted a cute kitten from the shelter.',
      media: ['https://example.com/cat1.jpg'],
      likes: 0,
      createdAt: '2020-01-01T00:00:00.000Z',
      updatedAt: null,
    },
  ],
  postsCount: 0,
  connectionsCount: 0,
}

const suggestions: Array<User> = [mockUser1, mockUser2, mockUser3]

export { suggestions, mockUser, mockProfileResponse }
