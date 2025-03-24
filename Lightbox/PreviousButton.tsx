import { MouseEvent } from 'react'

export default function PreviousButton({
  onClick,
}: {
  onClick: (event: MouseEvent) => void
}) {
  return (
    <span
      aria-hidden
      role="button"
      onClick={onClick}
      className="group absolute -left-24 w-48 h-full flex flex-col justify-center items-start transition-all opacity-50 hover:opacity-100"
    >
      <span className="absolute right-12 sm:-right-24 top-0 w-12 sm:w-48 h-full sm:group-hover:bg-black sm:group-hover:bg-opacity-10" />
      <span className="absolute left-28 sm:left-12 sm:group-hover:left-[8.5rem] transition-all">
        <svg
          className="w-4 h-4"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 100 0 L 20 50 L 100 100 Z"
            stroke="black"
            strokeWidth="8px"
            fill="white"
          />
        </svg>
      </span>
    </span>
  )
}
