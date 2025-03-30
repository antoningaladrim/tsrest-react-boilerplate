import ReactMarkdown from 'react-markdown';

export const ChatbotResponse = ({ content }: { content: string }) => (
  <div className="flex justify-start w-full gap-3">
    <div className="w-6 h-6 rounded-full border p-px flex justify-center items-center mt-2">
      <span className="text-gray-200">A</span>
    </div>
    <p className="text-base text-gray-50 font-medium max-w-4xl leading-8">
      <ReactMarkdown children={content} />
    </p>
  </div>
);
