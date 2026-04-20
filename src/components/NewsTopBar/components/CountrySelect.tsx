import type { Country } from '@/types';
import { Select, SelectItem } from '@/components/ui/Select';

interface CountrySelectProps {
  countries: Country[];
  selectedCountryCode: string;
  onCountryChange: (countryCode: string) => void;
}

const CountrySelect = ({ countries, selectedCountryCode, onCountryChange }: CountrySelectProps) => {
  return (
    <Select
      value={selectedCountryCode}
      onValueChange={onCountryChange}
      placeholder="Select country"
      ariaLabel="Country"
      triggerClassName="min-w-[220px] border-b border-white"
      contentClassName="min-w-[220px]"
    >
      {countries.map((country) => (
        <SelectItem key={country.code} value={country.code}>
          {country.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default CountrySelect;
