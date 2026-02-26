import { Text } from "../Typography";
import Button from "../common/Button";

export default function BlogCard({ card, className }) {
  const hasDate = Boolean(card.date);

  let formattedDate;
  let formattedTime;

  if (hasDate) {
    const dateObj = new Date(card.date);

    formattedDate = dateObj.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long"
    });

    formattedTime = dateObj.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  return (
    <div
      className={`
        flex flex-col 
        w-full h-full
        border rounded-2xl 
       border-gray-400 
       shadow-sm
        overflow-hidden  
        ${className}
      `}
    >

      <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
      {hasDate && (
        <span className="inline-block px-3 py-1 text-base font-semibold text-black rounded-r-full shadow-sm bg-amber-300 self-start"><Text>
          {formattedDate} · {formattedTime}

        </Text>
        </span>
      )}
      <div className="flex flex-col p-6 flex-1">
        <h4 className="mb-3 text-2xl font-semibold leading-8">{card.title}</h4>

        <Text className="mb-3"> {card.description}</Text>
        {card.phone && (
          <Text className="mb-2">
            Tel: {card.phone}
          </Text>
        )}

        <Button className={"mt-auto"} href={card.ubication} icon={"ubicacion"}>
          Ver ubicación
        </Button>

      </div>
    </div>
  );
}