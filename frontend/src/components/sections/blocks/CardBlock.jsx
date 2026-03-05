import CardSection from "../CardSection";

export default function CardBlock({ block }) {
  return (
    <div className="my-6 flex justify-center">
      <CardSection card={block.data} />
    </div>
  );
}