import { title } from 'node:process'
import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'

interface AvatarProps {
  user: {
    id?: string
    avatarUrl?: string
    fullName?: string
  }
  alt: string
  size?: number
}

export default function Avatar({ user, alt, size = 40 }: AvatarProps) {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    if (user.id) {
      navigate({ to: '/profile/$userId', params: { userId: user.id } })
    } else {
      console.error('No user ID provided for avatar navigation.')
    }
  }, [user.id, navigate])

  return (
    <div
      className="cursor-pointer rounded-full overflow-hidden"
      style={{ maxWidth: size, maxHeight: size }} // keep both!
      onClick={handleClick}
      title={user.fullName || alt}
    >
      <img
        src={user.avatarUrl}
        alt={alt}
        className="object-cover w-full h-full aspect-square" // ← magic fix
        loading="lazy"
      />
    </div>
  )
}
