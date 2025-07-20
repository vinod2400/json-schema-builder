import React from 'react';
import { useFormContext, useFieldArray, useController } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Field } from '@/types/schema';
import { generateUniqueId } from '@/utils/schemaGenerator';

interface FieldEditorProps {
  fieldPath: string;
  onRemove: () => void;
}

export const FieldEditor: React.FC<FieldEditorProps> = ({ fieldPath, onRemove }) => {
  const { control, register } = useFormContext();

  const { append, remove, fields } = useFieldArray({
    control,
    name: `${fieldPath}.children` as const
  });

  const {
    field: typeField
  } = useController({
    name: `${fieldPath}.type` as const,
    control
  });

  const addChildField = () => {
    const newField: Field = {
      id: generateUniqueId(),
      name: '',
      type: 'string',
      children: []
    };
    append(newField);
  };

  return (
    <div className="border p-4 rounded-md space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Field Name"
          {...register(`${fieldPath}.name` as const)}
        />
        <Input
          placeholder="Field Type"
          {...register(`${fieldPath}.type` as const)}
        />
        <Button type="button" variant="destructive" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {typeField.value === 'object' && (
        <div className="ml-6 mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Nested Fields</span>
            <Button type="button" variant="outline" onClick={addChildField}>
              Add Nested Field
            </Button>
          </div>
          <div className="space-y-2">
            {fields.map((child, index) => (
              <FieldEditor
                key={child.id}
                fieldPath={`${fieldPath}.children.${index}`}
                onRemove={() => remove(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
