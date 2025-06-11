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
  const handleChange = (fieldName: string, fieldValue: unknown) => {
    onChange({ ...value, [fieldName]: fieldValue });
  };

  const handleNumberChange = (fieldName: string, rawValue: string) => {
    const parsedValue = parseFloat(rawValue.replace(",", "."));
    handleChange(fieldName, parsedValue);
  };

  const renderField = (field: FormField) => {
    const fieldValue = value[field.name];
    const displayValue = fieldValue === 0 ? "" : fieldValue;

    switch (field.type) {
      case "text":
        return (
          <Input
            placeholder={field.placeholder}
            value={typeof fieldValue === "string" || typeof fieldValue === "number" ? fieldValue : ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={field.className}
          />
        );
      case "number":
        return (
          <Input
            placeholder={field.placeholder}
            value={typeof displayValue === "number" ? displayValue : ""}
            onChange={(e) => handleNumberChange(field.name, e.target.value)}
            type="number"
            step={field.step || "0.01"}
            className={field.className}
          />
        );
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
            className={`border rounded px-3 py-2 text-sm w-full ${field.className || ""}`}
          />
        );
      default:
        return null;
    }
  };

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
        <div className={gridLayout ? "grid grid-cols-1 md:grid-cols-2 gap-3" : "space-y-3"}>
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

// A simpler version that includes the dialog state management
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
      // Reset form when closing
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