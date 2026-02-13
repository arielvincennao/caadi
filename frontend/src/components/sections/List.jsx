export default function List({
  item,
  className = ""
}) {
  return (

      <li className={` ${className}`}>
        {item.text}
      </li>
  );
}
