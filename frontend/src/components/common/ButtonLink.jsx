function ButtonLink({ href }) {
  return (
    <a
      className="main-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
        <p className="main-link">
         Mi Argentina  
        </p>
    </a>
  );
}

//el text puede ser variable.

export default ButtonLink;
