import { MouseEvent } from 'react'

export default function NextButton({
  onClick,
}: {
  onClick: (event: MouseEvent) => void
}) {
  return (
    <span
      aria-hidden
      role="button"
      onClick={onClick}
      className="group absolute -right-24 w-48 h-full flex flex-col justify-center items-end transition-all opacity-50 hover:opacity-100"
    >
      <span className="absolute left-12 sm:-left-24 top-0 w-12 sm:w-48 h-full sm:group-hover:bg-black sm:group-hover:bg-opacity-10" />
      <span className="absolute right-28 sm:right-12 sm:group-hover:right-[8.5rem] transition-all">
        <svg
          className="w-4 h-4"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 0 L 80 50 L 0 100 Z"
            stroke="black"
            strokeWidth="8px"
            fill="white"
          />
        </svg>
      </span>
    </span>
  )
}
