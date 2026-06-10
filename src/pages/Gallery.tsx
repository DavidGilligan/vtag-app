import { useState } from 'react'
import { Heart, MessageCircle, Share2, X } from 'lucide-react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'

import bmw1 from '../assets/BMWIMG1.jpeg'
import bmw2 from '../assets/BMWIMG2.jpeg'
import bmw3 from '../assets/BMWIMG3.jpeg'
import bmw4 from '../assets/BMWIMG4.jpeg'
import bmw5 from '../assets/BMWIMG5.jpeg'
import bmw6 from '../assets/BMWIMG6.jpeg'
import bmw7 from '../assets/BMWIMG7.jpeg'
import bmw8 from '../assets/BMWIMG8.jpeg'

type GalleryPost = {
  id: number
  images: string[]
  caption: string
  likes: number
  comments: number
}

const galleryImages: GalleryPost[] = [
  {
    id: 1,
    images: [bmw1],
    caption: 'Cheeky wee trip to Glencoe last weekend. What a drive! 😎🏎️',
    likes: 48,
    comments: 7,
  },
  {
    id: 2,
    images: [bmw2],
    caption:
      'Thanks to @A1Detailling for the incredible ceramic coating job - the M135i has never looked better! ✨',
    likes: 63,
    comments: 11,
  },
  {
    id: 3,
    images: [bmw3],
    caption: 'Forrest walks, coming back to this thing is the best part. 🌲🏁',
    likes: 39,
    comments: 5,
  },
  {
    id: 4,
    images: [bmw4],
    caption:
      'Night driving in Dundee. Police have stopped me twice in this already, they love it. 🚓❤️',
    likes: 72,
    comments: 14,
  },
  {
    id: 5,
    images: [bmw5],
    caption: 'Scenic drive down to Blackpool. I only stopped for a few seconds.',
    likes: 56,
    comments: 9,
  },
  {
    id: 6,
    images: [bmw6],
    caption:
      'Great day at the Millport show for the @BMWCARCLUBSCOTLAND meet! Always a pleasure to see so many beautiful cars and chat with fellow enthusiasts. 🏎️☀️',
    likes: 34,
    comments: 4,
  },
  {
    id: 7,
    images: [bmw7, bmw8],
    caption:
      'Skrrt! Thanks to @KnockhillCircuit for the amazing track day experience. The M135i handled like a dream 🔥',
    likes: 81,
    comments: 16,
  },
]

function Gallery() {
  const [likedImages, setLikedImages] = useState<number[]>([])
  const [comments, setComments] = useState<Record<number, string>>({})
  const [selectedPost, setSelectedPost] = useState<GalleryPost | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [shareMessage, setShareMessage] = useState('')

  const [commentCounts, setCommentCounts] = useState<Record<number, number>>(
    () =>
      galleryImages.reduce((counts, item) => {
        counts[item.id] = item.comments
        return counts
      }, {} as Record<number, number>)
  )

  function toggleLike(id: number) {
    setLikedImages((current) =>
      current.includes(id)
        ? current.filter((imageId) => imageId !== id)
        : [...current, id]
    )
  }

  function updateComment(id: number, value: string) {
    const hadComment = Boolean(comments[id]?.trim())
    const hasComment = Boolean(value.trim())

    setComments((current) => ({
      ...current,
      [id]: value,
    }))

    if (!hadComment && hasComment) {
      setCommentCounts((current) => ({
        ...current,
        [id]: current[id] + 1,
      }))
    }

    if (hadComment && !hasComment) {
      setCommentCounts((current) => ({
        ...current,
        [id]: current[id] - 1,
      }))
    }
  }

  function openPost(post: GalleryPost) {
    setSelectedPost(post)
    setActiveImageIndex(0)
    setShareMessage('')
  }

  function changeImage(index: number) {
    setActiveImageIndex(index)
  }

  async function handleShare(post: GalleryPost) {
    const shareText = `Check out this V-TAG post: ${post.caption}`

    if (navigator.share) {
      await navigator.share({
        title: 'V-TAG Gallery Post',
        text: shareText,
      })
    } else {
      await navigator.clipboard.writeText(shareText)
      setShareMessage('Post copied to clipboard')
    }
  }

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        <section className="px-5 pt-2">
          <p className="theme-subtle text-xs tracking-widest">GALLERY</p>

          <h1 className="mt-1 text-3xl font-bold">VEHICLE GALLERY</h1>

          <p className="theme-muted mt-2 text-sm">
            View, like and comment on verified BMW M135i vehicle images.
          </p>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 px-5">
          {galleryImages.map((item) => {
            const isLiked = likedImages.includes(item.id)
            const likeCount = isLiked ? item.likes + 1 : item.likes
            const commentCount = commentCounts[item.id]

            return (
              <article
                key={item.id}
                className="theme-card overflow-hidden rounded-3xl"
              >
                <button
                  onClick={() => openPost(item)}
                  className="block w-full text-left"
                >
                  <img
                    src={item.images[0]}
                    alt={item.caption}
                    className="h-64 w-full object-cover"
                  />
                </button>

                {item.images.length > 1 && (
                  <div className="mt-3 flex justify-center gap-2">
                    {item.images.map((image, index) => (
                      <span
                        key={image}
                        className={`h-2 w-2 rounded-full bg-current ${
                          index === 0 ? 'opacity-100' : 'opacity-30'
                        }`}
                      />
                    ))}
                  </div>
                )}

                <div className="p-4">
                  <p className="font-semibold">{item.caption}</p>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => toggleLike(item.id)}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isLiked
                          ? 'bg-red-500 text-white'
                          : 'theme-card-secondary'
                      }`}
                    >
                      <Heart size={18} fill={isLiked ? 'white' : 'none'} />
                      {likeCount}
                    </button>

                    <div className="theme-card-secondary flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                      <MessageCircle size={18} />
                      {commentCount}
                    </div>
                  </div>

                  <textarea
                    value={comments[item.id] || ''}
                    onChange={(event) =>
                      updateComment(item.id, event.target.value)
                    }
                    placeholder="Add a comment..."
                    className="theme-card-secondary mt-4 min-h-20 w-full resize-none rounded-2xl p-3 text-sm outline-none"
                  />

                  {comments[item.id] && (
                    <div className="theme-card-secondary mt-3 rounded-2xl p-3">
                      <p className="theme-subtle text-xs">YOUR COMMENT</p>

                      <p className="mt-1 text-sm">{comments[item.id]}</p>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </section>

        {selectedPost && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="theme-card max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl">
              <div className="flex items-center justify-between p-4">
                <p className="font-bold">Gallery Post</p>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="theme-card-secondary rounded-full p-2"
                >
                  <X size={22} />
                </button>
              </div>

              <img
                src={selectedPost.images[activeImageIndex]}
                alt={selectedPost.caption}
                className="max-h-[520px] w-full object-contain"
              />

              {selectedPost.images.length > 1 && (
                <div className="mt-4 flex justify-center gap-3">
                  {selectedPost.images.map((image, index) => (
                    <button
                      key={image}
                      onClick={() => changeImage(index)}
                      className={`h-3 w-3 rounded-full bg-current transition ${
                        activeImageIndex === index ? 'opacity-100' : 'opacity-30'
                      }`}
                    />
                  ))}
                </div>
              )}

              <div className="p-5">
                <p className="font-semibold">{selectedPost.caption}</p>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleLike(selectedPost.id)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      likedImages.includes(selectedPost.id)
                        ? 'bg-red-500 text-white'
                        : 'theme-card-secondary'
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={
                        likedImages.includes(selectedPost.id) ? 'white' : 'none'
                      }
                    />
                    {likedImages.includes(selectedPost.id)
                      ? selectedPost.likes + 1
                      : selectedPost.likes}
                  </button>

                  <div className="theme-card-secondary flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                    <MessageCircle size={18} />
                    {commentCounts[selectedPost.id]}
                  </div>

                  <button
                    onClick={() => handleShare(selectedPost)}
                    className="theme-card-secondary flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                  >
                    <Share2 size={18} />
                    Share
                  </button>
                </div>

                {shareMessage && (
                  <p className="theme-muted mt-3 text-sm">
                    {shareMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <BottomNav />
      </main>
    </AppShell>
  )
}

export default Gallery