"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

export function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="mt-5 flex items-start gap-3 rounded-md border border-primary/30 bg-primary/10 p-4 text-sm text-zinc-200">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <p className="leading-relaxed">
          Ďakujeme! Čoskoro vás budeme kontaktovať.
        </p>
      </div>
    )
  }

  return (
    <form
      className="mt-5 space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
    >
      <input
        type="text"
        required
        placeholder="Vaše meno"
        aria-label="Vaše meno"
        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none"
      />
      <input
        type="tel"
        required
        placeholder="Telefónne číslo"
        aria-label="Telefónne číslo"
        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none"
      />
      <button
        type="submit"
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Odoslať
      </button>
    </form>
  )
}
