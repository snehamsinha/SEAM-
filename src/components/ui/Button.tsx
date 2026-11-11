import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

type Props = ComponentProps<typeof Link> & { variant?: 'primary' | 'secondary' }
export function Button({ variant = 'primary', className = '', ...props }: Props) {
  return <Link className={`button button--${variant} ${className}`} {...props} />
}
