import React from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "textarea";
  placeholder?: string;
  options?: { value: string; label: string }[];
  step?: string;
  className?: string;
  fullWidth?: boolean;
}

interface FormModalProps<T extends Record<string, unknown>> {
  title: string;
  fields: FormField[];
  value: T;
  onChange: (value: T) => void;
  onSubmit: () => void;
  submitLabel?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gridLayout?: boolean;
}

export function FormModal<T extends Record<string, unknown>>({
  title,
  fields,
  value,
  onChange,
  onSubmit,
  submitLabel = "Toevoegen",
  open,
  onOpenChange,
  gridLayout = false,
}: FormModalProps<T>) {
  // Track raw input values for number fields
  const [rawInputs, setRawInputs] = React.useState<Record<string, string>>({});

  const handleChange = (fieldName: string, fieldValue: unknown) => {
    const newValue = { ...value, [fieldName]: fieldValue };

    // Auto-calculate amountInvested wanneer pricePerUnit of unitsReceived verandert
    if (
      (fieldName === "pricePerUnit" || fieldName === "unitsReceived") &&
      "pricePerUnit" in newValue &&
      "unitsReceived" in newValue
    ) {
      const price = Number(newValue.pricePerUnit) || 0;
      const units = Number(newValue.unitsReceived) || 0;
      onChange({
        ...newValue,
        amountInvested: parseFloat((price * units).toFixed(2)),
      } as T);
      return;
    }

    onChange(newValue as T);
  };

  const handleNumberChange = (fieldName: string, rawValue: string) => {
    // Store the raw input value
    setRawInputs((prev) => ({ ...prev, [fieldName]: rawValue }));

    // Only try to parse and update if there's actually a value
    // This allows typing "0" or "," as first characters
    if (rawValue.trim() === "" || rawValue === "0" || rawValue === ",") {
      // For empty inputs or just zero/comma, set to 0 or keep raw value for display
      handleChange(fieldName, 0);
      return;
    }

    // Normalize commas to dots for parsing
    const normalizedValue = rawValue.replace(",", ".");

    // Parse the value, but only if it's a valid number
    if (/^-?\d*\.?\d*$/.test(normalizedValue)) {
      const parsedValue = parseFloat(normalizedValue);
      if (!isNaN(parsedValue)) {
        handleChange(fieldName, parsedValue);
      }
    }
  };

  const renderField = (field: FormField) => {
    const fieldValue = value[field.name];
    const displayValue = fieldValue === 0 ? "" : fieldValue;

    switch (field.type) {
      case "text":
        return (
          <Input
            placeholder={field.placeholder}
            value={
              typeof fieldValue === "string" || typeof fieldValue === "number"
                ? fieldValue
                : ""
            }
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={field.className}
          />
        );
      case "number":
        // Use the raw input value if available, otherwise format the stored value
        { const rawValue = rawInputs[field.name];
        const displayVal =
          rawValue !== undefined
            ? rawValue
            : typeof displayValue === "number"
            ? displayValue.toString().replace(".", ",")
            : "";

        return (
          <Input
            placeholder={field.placeholder}
            value={displayVal}
            onChange={(e) => handleNumberChange(field.name, e.target.value)}
            type="text"
            inputMode="decimal"
            step={field.step || "0.01"}
            className={field.className}
          />
        ); }
      case "date":
        return (
          <Input
            placeholder={field.placeholder}
            type="date"
            value={typeof fieldValue === "string" ? fieldValue : ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={field.className}
          />
        );
      case "select":
        return (
          <Select
            value={typeof fieldValue === "string" ? fieldValue : ""}
            onValueChange={(newValue) => handleChange(field.name, newValue)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder}
            value={typeof fieldValue === "string" ? fieldValue : ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={`border rounded px-3 py-2 text-sm w-full ${
              field.className || ""
            }`}
          />
        );
      default:
        return null;
    }
  };

  // Reset raw inputs when dialog opens/closes
  React.useEffect(() => {
    setRawInputs({});
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full w-12 h-12 p-0 shadow-lg fixed bottom-6 right-6 z-50"
          title="Toevoegen"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div
          className={
            gridLayout
              ? "grid grid-cols-1 md:grid-cols-2 gap-3"
              : "space-y-3"
          }
        >
          {fields.map((field) => (
            <div
              key={field.name}
              className={gridLayout && field.fullWidth ? "col-span-2" : ""}
            >
              {renderField(field)}
            </div>
          ))}
          <Button
            onClick={onSubmit}
            className={`w-full ${gridLayout ? "col-span-2" : ""}`}
          >
            {submitLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Een simpelere versie die de dialog state beheert
export function AddItemModal<T extends Record<string, unknown>>({
  title,
  fields,
  initialValue,
  onSubmit,
  submitLabel,
  gridLayout,
}: Omit<FormModalProps<T>, "value" | "onChange" | "open" | "onOpenChange"> & {
  initialValue: T;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<T>(initialValue);

  const handleSubmit = () => {
    onSubmit();
    setOpen(false);
  };

  React.useEffect(() => {
    if (!open) {
      // Reset form wanneer de modal sluit
      setValue(initialValue);
    }
  }, [open, initialValue]);

  return (
    <FormModal
      title={title}
      fields={fields}
      value={value}
      onChange={setValue}
      onSubmit={handleSubmit}
      submitLabel={submitLabel}
      open={open}
      onOpenChange={setOpen}
      gridLayout={gridLayout}
    />
  );
}