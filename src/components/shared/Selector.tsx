import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { memo } from "react";

interface SelectorProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: T[];
  placeholder?: string;
  disabled?: boolean;
  labelMap?: Partial<Record<T, string>>;
}

const Selector = <T extends string>({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  labelMap,
}: SelectorProps<T>) => {
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as T)}
      disabled={disabled}
    >
      <SelectTrigger className="w-full border border-gray-300 rounded-md text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white border-gray-300">
        {options.map((option) => (
          <SelectItem value={option} key={option}>
            {labelMap?.[option] ?? option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default memo(Selector);
