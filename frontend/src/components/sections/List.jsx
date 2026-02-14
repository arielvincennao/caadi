export default function List({
  item,
  className = ""
}) {
  return (

      <li className={`ml-4 ${className}`}>
        {item.text}
      </li>
  );
}
