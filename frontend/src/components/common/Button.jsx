function Button({ className, onClick}) {
  return (
    <button className={className} onClick={onClick}>
      <p>Buton</p>
    </button>
  );
}

//podriamos ponerle un parametro text para modifica el texto que se utiliza en <p> ...! 

export default Button;
