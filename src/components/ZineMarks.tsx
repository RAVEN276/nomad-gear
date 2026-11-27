export function ZineTape({ position = 'tl' }: { position?: 'tl' | 'tr' }) {
  return (
    <svg
      aria-hidden="true"
      className={`zine-tape zine-tape--${position}`}
      viewBox="0 0 80 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill="currentColor"
        points="4,2 76,0 74,7 79,13 75,21 2,23 6,14 1,8"
        stroke="rgba(20, 18, 16, 0.35)"
        strokeWidth="1"
      />
    </svg>
  )
}

export function ZineStaple() {
  return (
    <svg
      aria-hidden="true"
      className="zine-staple"
      fill="none"
      viewBox="0 0 44 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 14V4h32v10"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="3"
      />
      <circle cx="6" cy="13" fill="currentColor" r="2" />
      <circle cx="38" cy="13" fill="currentColor" r="2" />
    </svg>
  )
}

export function TornEdgeDivider() {
  return (
    <svg
      aria-hidden="true"
      className="torn-divider"
      preserveAspectRatio="none"
      viewBox="0 0 1200 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        fill="none"
        points="0,9 28,3 54,14 82,5 112,13 145,4 176,12 208,3 238,14 274,6 306,12 340,4 374,15 410,6 446,12 482,3 516,14 554,5 590,13 628,4 664,14 702,5 738,12 776,3 812,14 850,6 888,12 924,4 962,15 998,5 1036,13 1072,4 1110,14 1148,5 1180,12 1200,8"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}
