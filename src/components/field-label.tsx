import { HelpCircle } from "lucide-react"
import { Label } from "@/components/ui/label"

interface FieldLabelProps {
  label: string
  required?: boolean
  helpIcon?: boolean
  htmlFor?: string
}

export function FieldLabel({ label, required, helpIcon, htmlFor }: FieldLabelProps) {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-black cursor-pointer">
        {label}
      </Label>
      {helpIcon && <HelpCircle className="size-3.5 text-muted-foreground cursor-pointer" />}
      {required && <span className="text-sm font-medium text-destructive">*</span>}
    </div>
  )
}
