export default function List({
  text,
  className = ""
}) {
  return (
    <div
      className={`flex items-center gap-4 ${className}`}
      role="group"
    >
        
      <p className="text-gray-800 leading-snug">
        {text}
      </p>

    </div>
  );
}
