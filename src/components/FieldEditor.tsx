import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Collapsible,
  CollapsibleContent,
} from "./ui/collapsible";
import { Label } from "./ui/label";
import { useFieldArray, useFormContext } from "react-hook-form";
import { generateUniqueId } from "@/lib/utils";

interface Field {
  id: string;
  name: string;
  type: string;
  children?: Field[];
}

interface FieldEditorProps {
  nestIndex?: number;
  name: string;
}

export const FieldEditor: React.FC<FieldEditorProps> = ({
  nestIndex = 0,
  name,
}) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray<Field>({
    control,
    name,
  });

  const handleAddField = () => {
    const newField: Field = {
      id: generateUniqueId(),
      name: "",
      type: "string",
    };
    append(newField);
  };

  return (
    <div className="space-y-4 ml-4">
      {fields.map((field, index) => {
        const currentName = `${name}.${index}`;
        return (
          <Collapsible key={field.id} defaultOpen>
            <div className="flex items-center space-x-2">
              <Label>Name:</Label>
              <Input {...register(`${currentName}.name`)} />
              <Label>Type:</Label>
              <select {...register(`${currentName}.type`)}>
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="nested">Nested</option>
              </select>
              <Button
                variant="ghost"
                onClick={() => remove(index)}
                type="button"
              >
                <TrashIcon className="w-4 h-4 text-red-500" />
              </Button>
            </div>

            <CollapsibleContent>
              <div className="pl-6">
                {field.type === "nested" && (
                  <FieldEditor name={`${currentName}.children`} nestIndex={nestIndex + 1} />
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}

      <Button type="button" onClick={handleAddField} className="mt-2">
        Add Field
      </Button>
    </div>
  );
};
