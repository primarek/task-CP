import type { DataMode } from '@/types'
import { Switch } from '@/components/ui/Switch'

interface ModeSwitchProps {
  mode: DataMode
  onModeChange: (mode: DataMode) => void
}

const ModeSwitch = ({ mode, onModeChange }: ModeSwitchProps) => {
  return (
    <div className="inline-flex items-center gap-3 text-xs uppercase">
      <span className={mode === 'news' ? 'text-neutral-100' : 'text-neutral-400'}>News</span>
      <Switch
        checked={mode === 'social_media'}
        onCheckedChange={(checked) => onModeChange(checked ? 'social_media' : 'news')}
        ariaLabel="Toggle between News and Social Media mode"
      />
      <span className={mode === 'social_media' ? 'text-neutral-100' : 'text-neutral-400'}>Social Media</span>
    </div>
  )
}

export default ModeSwitch
