interface TextareaWordCounterProps {
  value: string;
  minChars: number;
  maxChars: number;
}

/** Shared word/character counter — matches placement under the profile overview field. */
const TextareaWordCounter: React.FC<TextareaWordCounterProps> = ({
  value,
  minChars,
  maxChars,
}) => {
  const characterCount = value.length;
  const wordCount = value.trim()
    ? value.trim().split(/\s+/).length
    : 0;

  return (
    <div className="flex justify-between items-center mt-2">
      <div className="text-xs text-gray-500">
        {wordCount} {wordCount === 1 ? "word" : "words"} • {characterCount}{" "}
        {characterCount === 1 ? "character" : "characters"}
      </div>
      <div
        className={`text-xs ${
          characterCount < minChars
            ? "text-black"
            : characterCount > maxChars
              ? "text-red-600"
              : "text-gray-500"
        }`}
      >
        {characterCount} / {maxChars} characters
        {characterCount < minChars && ` (min: ${minChars})`}
      </div>
    </div>
  );
};

export default TextareaWordCounter;
