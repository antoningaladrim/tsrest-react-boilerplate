export const UserPrompt = ({ content }: { content: string }) => (
  <div className="flex justify-end w-full">
    <p className="py-3 px-4 rounded-2xl bg-gradient-to-br from-zinc-600 to-zinc-700 text-gray-50  font-medium">
      {content}
    </p>
  </div>
);
