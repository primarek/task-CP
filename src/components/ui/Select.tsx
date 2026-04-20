import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDownIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  rootClassName?: string;
  triggerClassName?: string;
  valueClassName?: string;
  iconClassName?: string;
  contentClassName?: string;
  viewportClassName?: string;
  children: ReactNode;
}

interface SelectItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

const defaultTriggerClassName =
  'inline-flex items-center justify-between bg-transparent px-1 py-2 text-xs uppercase text-neutral-100 outline-none';
const defaultContentClassName = 'z-50 overflow-hidden border border-neutral-700 bg-neutral-900 shadow-lg';
const defaultItemClassName =
  'relative flex cursor-pointer select-none items-center px-3 py-2 text-xs text-neutral-100 outline-none data-[highlighted]:bg-neutral-800';
const defaultViewportClassName = 'p-1';
const defaultIconClassName = 'ml-3 text-neutral-300';

const mergeClasses = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ');

const Select = ({
  value,
  onValueChange,
  placeholder = 'Select option',
  ariaLabel = 'Select',
  rootClassName,
  triggerClassName,
  valueClassName,
  iconClassName,
  contentClassName,
  viewportClassName,
  children,
}: SelectProps) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        className={mergeClasses(defaultTriggerClassName, triggerClassName, rootClassName)}
        aria-label={ariaLabel}
      >
        <SelectPrimitive.Value placeholder={placeholder} className={valueClassName} />
        <SelectPrimitive.Icon className={mergeClasses(defaultIconClassName, iconClassName)}>
          <ChevronDownIcon size={14} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={mergeClasses(defaultContentClassName, contentClassName)}
          position="popper"
          sideOffset={6}
        >
          <SelectPrimitive.Viewport className={mergeClasses(defaultViewportClassName, viewportClassName)}>
            {children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

const SelectItem = ({ value, className = defaultItemClassName, children }: SelectItemProps) => {
  return (
    <SelectPrimitive.Item value={value} className={className}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

export { Select, SelectItem };
