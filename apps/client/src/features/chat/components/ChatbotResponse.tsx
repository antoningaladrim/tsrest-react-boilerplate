export const ChatbotResponse = ({ content }: { content: string }) => (
  <div className="flex justify-start w-full">
    <p className="text-base text-gray-50 font-medium max-w-5xl leading-8">
      {content}
    </p>
  </div>
);
