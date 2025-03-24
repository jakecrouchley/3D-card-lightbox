export default function DismissButton({ onClick }: { onClick: () => void }) {
  return (
    <span
      aria-hidden
      role="button"
      onClick={onClick}
      className="group absolute -top-24 h-48 w-full flex flex-col justify-end items-center transition-all opacity-50 hover:opacity-100"
    >
      <span className="absolute left-0 top-12 sm:top-24 h-12 sm:h-48 w-full sm:group-hover:bg-black sm:group-hover:bg-opacity-10" />
      <span className="absolute top-28 sm:top-12 sm:group-hover:top-[8.5rem] transition-all">
        <svg
          className="w-4 h-4"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 20 0 L 50 36 L 80 0 L 100 20 L 64 50 L 100 80 L 80 100 L 50 64 L 20 100 L 0 80 L 36 50 L 0 20 Z"
            stroke="black"
            strokeWidth="8px"
            fill="white"
          />
        </svg>
      </span>
    </span>
  )
}
