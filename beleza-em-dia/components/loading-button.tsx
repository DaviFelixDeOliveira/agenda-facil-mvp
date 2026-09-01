'use client'

import { Loader2 } from 'lucide-react'
import { Button, ButtonProps } from '@/components/ui/button'
import { forwardRef } from 'react'

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
  loadingText?: string
}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading, loadingText, children, disabled, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        className={className}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            {loadingText || 'Carregando...'}
          </>
        ) : (
          children
        )}
      </Button>
    )
  }
)

LoadingButton.displayName = 'LoadingButton'