'use client'

import { useEffect } from 'react'

export function FormValidationFocus() {
  useEffect(() => {
    const handleInvalid = (event: Event) => {
      const field = event.target
      if (!(field instanceof HTMLElement)) return
      field.setAttribute('aria-invalid', 'true')
      window.setTimeout(() => {
        field.scrollIntoView({ behavior: 'smooth', block: 'center' })
        field.focus({ preventScroll: true })
      }, 0)
    }

    const handleInput = (event: Event) => {
      const field = event.target
      if (field instanceof HTMLElement && field.getAttribute('aria-invalid') === 'true') {
        field.removeAttribute('aria-invalid')
      }
    }

    document.addEventListener('invalid', handleInvalid, true)
    document.addEventListener('input', handleInput, true)
    return () => {
      document.removeEventListener('invalid', handleInvalid, true)
      document.removeEventListener('input', handleInput, true)
    }
  }, [])

  return null
}
