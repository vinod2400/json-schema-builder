import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { SchemaBuilder } from '@/components/SchemaBuilder'; // You could rename this file to FieldEditor.tsx if you want
import { SchemaPreview } from '@/components/SchemaPreview';
import { Toaster } from '@/components/ui/toaster';
import { SchemaField } from '@/types/schema';
import { generateJSONSchema } from '@/utils/schemaGenerator';
import { Settings, Eye, Code } from 'lucide-react';

function App() {
  const [fields, setFields] = React.useState<SchemaField[]>([]);
  const schema = React.useMemo(() => {
    console.log('Updated fields:', fields); // Dev debug
    return generateJSONSchema(fields);
  }, [fields]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-5 py-10">
        {/* Top Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="p-2 bg-blue-500 text-white rounded-md">
              <Code className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-semibold text-gray-800">JSON Schema Builder</h1>
          </div>
          <p className="text-gray-600 text-base max-w-xl mx-auto">
            Build your custom JSON schema interactively. Add fields, define types, and preview as you go.
          </p>
        </div>

        {/* Tabs and Card */}
        <Card className="max-w-6xl mx-auto shadow border bg-white">
          <Tabs defaultValue="builder" className="w-full">
            <div className="border-b bg-gray-100">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto p-2 bg-white">
                <TabsTrigger value="builder" className="flex gap-2 items-center data-[state=active]:bg-gray-50 data-[state=active]:shadow">
                  <Settings className="h-4 w-4" />
                  Builder
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex gap-2 items-center data-[state=active]:bg-gray-50 data-[state=active]:shadow">
                  <Eye className="h-4 w-4" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-4">
              <TabsContent value="builder">
                <SchemaBuilder onSchemaChange={setFields} />
              </TabsContent>
              <TabsContent value="preview">
                <SchemaPreview schema={schema} />
              </TabsContent>
            </div>
          </Tabs>
        </Card>

        {/* Footer */}
        <div className="text-center mt-10 text-gray-500 text-xs">
          <p>Crafted with ❤️ for JSON nerds | Supports nested structures & validation</p>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
