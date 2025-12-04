import { fullName } from './store'
import type { ClientProfile, ContractorProfile } from '@/types/user'
import { makePostsWithComments, makePostsWithUsers } from '@/data/postFactory'
import { mockProfileResponse, mockUser, suggestions } from '@/data/mockData'

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

const mockPosts = [...makePostsWithUsers(10), ...makePostsWithComments(5)].sort(
  () => Math.random() - 0.5,
)

async function parseRes(res: Response) {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

// POSTS

export async function getPosts() {
  // const res = await fetch(`${BASE}/api/posts`)
  // if (!res.ok) throw new Error((await parseRes(res)) || 'Failed to fetch posts')
  return { results: mockPosts }
  // res.json()
}

export async function addComment(
  postId: string,
  payload: {
    userId: string
    content: string
  },
) {
  // const res = await fetch(`${BASE}/api/posts/${postId}/comments`, {
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/json',
  //   },
  //   body: JSON.stringify(payload),
  // })
  // if (!res.ok) throw new Error((await parseRes(res)) || 'Failed to add comment')
  return {}
  // res.json()
}

export async function createPost(payload: {
  userId: string
  text?: string
  content?: string
  media?: Array<string>
}) {
  // const res = await fetch(`${BASE}/api/posts`, {
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/json',
  //   },
  //   body: JSON.stringify(payload),
  // })
  // if (!res.ok) throw new Error((await parseRes(res)) || 'Failed to create post')
  return {}
  // res.json()
}

export async function getCurrentUser() {
  // const res = await fetch(`${BASE}/api/me`)
  // if (!res.ok) throw new Error('Failed to fetch current user')
  return {
    id: '1',
    avatarUrl:
      'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/0.jpg',
    fullName: 'Dr. Jane Smith',
  }
  // res.json()
}

// NETWORK

export async function getInvitations(userId: string) {
  // const res = await fetch(`${BASE}/api/network/invitations/${userId}`)
  // if (!res.ok) throw new Error(await parseRes(res))
  return [
    {
      id: '',
      avatarUrl:
        'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/12.jpg',
      fullName: 'invitations 1',
      title: 'getInvitations',
    },
    {
      id: '',
      avatarUrl:
        'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/13.jpg',
      fullName: 'invitations 2',
      title: 'getInvitations',
    },
  ]
  // res.json()
}

export async function getSuggestions(userId: string) {
  // const res = await fetch(`${BASE}/api/network/suggestions/${userId}`)
  // if (!res.ok) throw new Error(await parseRes(res))
  return [
    {
      id: '',
      avatarUrl:
        'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/14.jpg',
      fullName: 'maybe ppl 1',
      title: 'getSuggestions',
    },
    {
      id: '',
      avatarUrl:
        'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/15.jpg',
      fullName: 'maybe ppl 2',
      title: 'getSuggestions',
    },
  ]
  // res.json()
}

export async function getConnections(userId: string) {
  // const res = await fetch(`${BASE}/api/network/connections/${userId}`)
  // if (!res.ok) throw new Error(await parseRes(res))
  return [
    {
      id: '',
      avatarUrl:
        'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/10.jpg',
      fullName: 'connected friend 1',
      title: 'getConnections',
    },
    {
      id: '',
      avatarUrl:
        'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/11.jpg',
      fullName: 'connected friend 2',
      title: 'getConnections',
    },
  ]
  // res.json()
}

export async function sendInvite(userId: string) {
  // const res = await fetch(`${BASE}/api/network/invite/${userId}`, {
  // method: 'POST',
  // })
  // if (!res.ok) throw new Error(await parseRes(res))
  return {}
  // res.json()
}

export async function acceptInvite(inviteId: string) {
  // const res = await fetch(`${BASE}/api/network/accept/${inviteId}`, {
  // method: 'POST',
  // })
  // if (!res.ok) throw new Error(await parseRes(res))
  return {}
  // res.json()
}

export async function declineInvite(inviteId: string) {
  // const res = await fetch(`${BASE}/api/network/decline/${inviteId}`, {
  // method: 'POST',
  // })
  // if (!res.ok) throw new Error(await parseRes(res))
  return {}
  // res.json()
}

export async function fetchProfile(username: string) {
  // const res = await fetch(`${BASE}/api/profiles/${username}`)
  // if (!res.ok) throw new Error('Failed to fetch profile')
  return { result: mockProfileResponse }
  // res.json()
}
