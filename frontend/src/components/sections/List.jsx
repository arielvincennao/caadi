export default function List({
  text,
  className = ""
}) {
  return (
    <ul
      className={`flex items-center gap-4 ${className}`}
      role="group"
    >
        
      <li className="text-gray-800 leading-snug">
        {text}
      </li>

    </ul>
  );
}
