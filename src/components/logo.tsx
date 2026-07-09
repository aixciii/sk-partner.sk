interface LogoProps {
  className?: string
  /** Use light text for dark backgrounds (e.g. footer) */
  inverted?: boolean
}

export function Logo({ className, inverted = false }: LogoProps) {
  return (
    <img
      src={inverted ? "/brand/logo-horizontal-dark.svg" : "/brand/logo-horizontal.svg"}
      alt="SK Partner"
      className={`h-11 w-auto ${className ?? ""}`}
    />
  )
}
