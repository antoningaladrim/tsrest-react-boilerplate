import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { tsr } from '@/lib/apiClient';
import { queryKeys } from '@/lib/queryKeys';
import { useCompletionModel } from '@/stores';

export const ModelSelector = () => {
  const { data: models } = tsr.model.findAll.useQuery({
    queryKey: queryKeys.models.list(),
  });

  const { model, setModel } = useCompletionModel();

  return (
    <div className="flex w-full justify-end">
      <Select defaultValue={model} onValueChange={setModel}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {models?.body.length ? (
              models?.body.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.id}
                </SelectItem>
              ))
            ) : (
              <SelectLabel>No model available</SelectLabel>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
