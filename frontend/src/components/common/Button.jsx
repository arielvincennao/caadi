import { useNavigate } from "react-router-dom";

function Button({ children, className, onClick, href }) {

  const handleClick = () => {


    if (href) {
      window.open(href, "_blank"); // abre link externo
      return;
    }

    // if (onClick) {
    //   console.log("asdad");
    //   onClick();            // acción normal
    // }
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;

// el button no funciona del todo bien porque el texto rebalsa
