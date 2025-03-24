'use client'
import Image from 'next/image'
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import Lightbox from './Lightbox/Lightbox'

export type PhotoLibrary = {
  title: string
  photos: PhotoData[]
}

export type PhotoData = {
  src: string
  alt: string
}

export default function PhotoGrid({ library }: { library: PhotoLibrary }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouseEvent, setMouseEvent] = useState<MouseEvent | null>(null)
  const [selectedLibrary, setSelectedLibrary] = useState<PhotoLibrary>(library)
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0)

  const debounce = useRef<boolean | null>(null)

  const advancePhoto = useCallback(
    (places: number = 1) => {
      if (!selectedPhoto) return
      // See here for explanation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
      const newIndex =
        (((currentPhotoIndex + places) % selectedLibrary.photos.length) +
          selectedLibrary.photos.length) %
        selectedLibrary.photos.length
      setCurrentPhotoIndex(newIndex)
      setSelectedPhoto(selectedLibrary.photos[newIndex])
    },
    [currentPhotoIndex, selectedPhoto]
  )

  const dismissLightbox = () => {
    setSelectedPhoto(null)
    setCurrentPhotoIndex(0)
  }

  const handleKeydown = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === 'ArrowLeft') {
        advancePhoto(-1)
      } else if (evt.key === 'ArrowRight') {
        advancePhoto()
      } else if (evt.key === 'Escape') {
        dismissLightbox()
      }
    },
    [advancePhoto]
  )

  useEffect(() => {
    /* eslint-disable-line @typescript-eslint/no-explicit-any */
    const handleMouseMove: any = (evt: MouseEvent) => {
      if (evt && !debounce.current) {
        setMouseEvent(evt)
        debounce.current = true
        // Dampen the event handling to prevent too many updates
        setTimeout(() => {
          debounce.current = null
        }, 5)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [handleKeydown, debounce])

  return (
    <div className="flex flex-wrap" ref={containerRef}>
      {library.photos.map((photo, index) => (
        <Image
          className="w-20 p-1 aspect-[236/360] object-cover cursor-pointer hover:scale-105 transition-transform"
          key={index}
          src={photo.src}
          width={100}
          height={100}
          alt={photo.alt}
          onClick={() => {
            setSelectedPhoto(photo)
            setSelectedLibrary(library)
            setCurrentPhotoIndex(index)
          }}
        />
      ))}
      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          mouseEvent={mouseEvent}
          container={containerRef.current}
          onClick={dismissLightbox}
          onLeftClicked={(event: MouseEvent) => {
            event.stopPropagation()
            advancePhoto(-1)
          }}
          onRightClicked={(event: MouseEvent) => {
            event.stopPropagation()
            advancePhoto()
          }}
        />
      )}
    </div>
  )
}
