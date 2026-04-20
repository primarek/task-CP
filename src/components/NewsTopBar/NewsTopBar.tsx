import type { Country, DataMode } from '@/types'

import CountrySelect from './components/CountrySelect'
import ModeSwitch from './components/ModeSwitch'

interface NewsTopBarProps {
  countries: Country[]
  selectedCountryCode: string
  mode: DataMode
  onCountryChange: (countryCode: string) => void
  onModeChange: (mode: DataMode) => void
}

const NewsTopBar = ({
  countries,
  selectedCountryCode,
  mode,
  onCountryChange,
  onModeChange,
}: NewsTopBarProps) => {
  return (
    <header className="bg-neutral-950/80 px-6 py-2">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-4 lg:grid-cols-3">
        <div className="text-sm font-semibold tracking-wide text-neutral-100">CulturePulse</div>

        <div className="flex justify-start lg:justify-center">
          <CountrySelect
            countries={countries}
            selectedCountryCode={selectedCountryCode}
            onCountryChange={onCountryChange}
          />
        </div>

        <div className="flex justify-start lg:justify-end">
          <ModeSwitch mode={mode} onModeChange={onModeChange} />
        </div>
      </div>
    </header>
  )
}

export default NewsTopBar
