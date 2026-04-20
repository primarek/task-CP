import * as SwitchPrimitive from '@radix-ui/react-switch'

interface SwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  ariaLabel: string
  className?: string
  thumbClassName?: string
}

const defaultRootClassName =
  'relative h-5 w-10 rounded-full border border-neutral-500 bg-transparent outline-none transition'
const defaultThumbClassName =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white transition-transform duration-200 will-change-transform data-[state=checked]:translate-x-[20px]'

const Switch = ({
  checked,
  onCheckedChange,
  ariaLabel,
  className = defaultRootClassName,
  thumbClassName = defaultThumbClassName,
}: SwitchProps) => {
  return (
    <SwitchPrimitive.Root
      className={className}
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-label={ariaLabel}
    >
      <SwitchPrimitive.Thumb className={thumbClassName} />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
