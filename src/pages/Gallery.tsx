import { useState } from 'react'
import { Heart, MessageCircle } from 'lucide-react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'

import bmw1 from '../assets/BMWIMG1.png'
import bmw2 from '../assets/BMWIMG2.png'
import bmw3 from '../assets/BMWIMG3.png'
import bmw4 from '../assets/BMWIMG4.png'
import bmw5 from '../assets/BMWIMG5.png'
import bmw6 from '../assets/BMWIMG6.png'
import bmw7 from '../assets/BMWIMG7.png'
import bmw8 from '../assets/BMWIMG8.png'

const galleryImages = [
  {
    id: 1,
    image: bmw1,
    caption: 'Front profile - BMW M135i',
  },
  {
    id: 2,
    image: bmw2,
    caption: 'Side stance - performance hatch',
  },
  {
    id: 3,
    image: bmw3,
    caption: 'Rear angle - M Sport styling',
  },
  {
    id: 4,
    image: bmw4,
    caption: 'Interior detail and cockpit view',
  },
  {
    id: 5,
    image: bmw5,
    caption: 'Wheel and brake detail',
  },
  {
    id: 6,
    image: bmw6,
    caption: 'Exterior condition record',
  },
  {
    id: 7,
    image: bmw7,
    caption: 'Verified vehicle gallery image',
  },
  {
    id: 8,
    image: bmw8,
    caption: 'Interior comfort and technology',
  }
]

function Gallery() {
  const [likedImages, setLikedImages] = useState<number[]>([])
  const [comments, setComments] = useState<Record<number, string>>({})

  function toggleLike(id: number) {
    setLikedImages((current) =>
      current.includes(id)
        ? current.filter((imageId) => imageId !== id)
        : [...current, id]
    )
  }

  function updateComment(id: number, value: string) {
    setComments((current) => ({
      ...current,
      [id]: value,
    }))
  }

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">
            GALLERY
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            VEHICLE GALLERY
          </h1>

          <p className="theme-muted mt-2 text-sm">
            View, like and comment on verified BMW M135i vehicle images.
          </p>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 px-5">
          {galleryImages.map((item) => {
            const isLiked = likedImages.includes(item.id)

            return (
              <article
                key={item.id}
                className="theme-card overflow-hidden rounded-3xl"
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  className="h-64 w-full object-cover"
                />

                <div className="p-4">
                  <p className="font-semibold">
                    {item.caption}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => toggleLike(item.id)}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isLiked
                          ? 'bg-red-500 text-white'
                          : 'theme-card-secondary'
                      }`}
                    >
                      <Heart
                        size={18}
                        fill={isLiked ? 'white' : 'none'}
                      />
                      {isLiked ? 'Liked' : 'Like'}
                    </button>

                    <div className="theme-card-secondary flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                      <MessageCircle size={18} />
                      Comment
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
                      <p className="theme-subtle text-xs">
                        YOUR COMMENT
                      </p>

                      <p className="mt-1 text-sm">
                        {comments[item.id]}
                      </p>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

export default Gallery