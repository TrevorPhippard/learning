interface PostActionsProps {
  onCommentClick?: () => void
}

export function PostActions({ onCommentClick }: PostActionsProps) {
  return (
    <div className="border-t text-sm text-gray-600 flex justify-between">
      <div className="flex items-center gap-4">
        <button className="p-3 hover:text-primary hover:bg-gray-50 transition cursor-pointer">
          Like
        </button>
        <button
          className="p-3 hover:text-primary hover:bg-gray-50 transition cursor-pointer"
          onClick={onCommentClick}
        >
          Comment
        </button>
        <button className="p-3 hover:text-primary hover:bg-gray-50 transition cursor-pointer">
          Share
        </button>
      </div>
      <button className="p-3 hover:text-primary hover:bg-gray-50 transition cursor-pointer">
        Repost
      </button>
    </div>
  )
}
