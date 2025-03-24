'use client'
import Image from 'next/image'
import { MouseEvent, useEffect, useState } from 'react'
import PreviousButton from './PreviousButton'
import NextButton from './NextButton'
import DismissButton from './DismissButton'
import Loader from './Loader'
import { PhotoData } from '../PhotoGrid'

export default function Lightbox({
  photo,
  mouseEvent,
  container,
  onClick,
  onLeftClicked,
  onRightClicked,
}: {
  photo: PhotoData
  mouseEvent: MouseEvent | null
  container: HTMLDivElement | null
  onClick: () => void
  onLeftClicked: (event: MouseEvent) => void
  onRightClicked: (event: MouseEvent) => void
}) {
  const [parallaxOffsetX, setParallaxOffsetX] = useState<number>(0)
  const [parallaxOffsetY, setParallaxOffsetY] = useState<number>(0)

  const [rotationX, setRotationX] = useState<number>(0)
  const [rotationY, setRotationY] = useState<number>(0)

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (window.innerWidth < 768) {
      setParallaxOffsetX(0)
      setParallaxOffsetY(0)
      setRotationX(0)
      setRotationY(0)
    } else {
      if (mouseEvent && container) {
        // Parallax
        const percentageLeftToRight =
          Math.round((mouseEvent.pageX / window.innerWidth) * 100) / 100
        const percentageTopToBottom =
          Math.round(
            ((mouseEvent.pageY - window.scrollY) / window.innerHeight) * 100
          ) / 100
        const parallaxOffsetX = percentageLeftToRight * 2 - 1
        const parallaxOffsetY = percentageTopToBottom * 2 - 1
        setParallaxOffsetX(parallaxOffsetX)
        setParallaxOffsetY(parallaxOffsetY)
      }
      if (mouseEvent && mouseEvent.target) {
        // Card rotation
        const offsetX = mouseEvent.pageX
        const offsetY = mouseEvent.pageY - window.scrollY
        const percentageLeftToRight = (offsetX / window.innerWidth) * 2 - 1
        const percentageTopToBottom = (offsetY / window.innerHeight) * 2 - 1
        setRotationX(percentageLeftToRight * 5)
        setRotationY(percentageTopToBottom * 5)
      }
    }
  }, [mouseEvent, container])

  return (
    <div
      className="fixed w-full h-full top-0 left-0 flex justify-center items-center"
      onClick={onClick}
    >
      <span
        className={`absolute flex justify-center items-center drop-shadow-lg cursor-pointer min-h-20 min-w-20`}
        style={
          {
            transform: `translate(${parallaxOffsetX * 10}%, ${
              parallaxOffsetY * 10
            }%) perspective(1000px) rotate3d(0, 1, 0, ${rotationX}deg) rotate3d(1, 0, 0, ${-rotationY}deg)`,
          } as React.CSSProperties
        }
      >
        <Image
          className="w-full h-full max-w-[80vw] max-h-[80vh] object-contain bg-transparent border-8 border-white"
          src={photo.src}
          width={1000}
          height={1000}
          alt={photo.alt}
          onLoad={() => setLoading(false)}
          placeholder={'empty'}
        />
        {loading && <Loader />}
        {!loading && (
          <>
            <PreviousButton onClick={onLeftClicked} />
            <DismissButton onClick={onClick} />
            <NextButton onClick={onRightClicked} />
          </>
        )}
      </span>
    </div>
  )
}
