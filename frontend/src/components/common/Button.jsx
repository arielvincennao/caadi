function Button({ className, onClick}) {
  return (
    <button className={className} onClick={onClick}>
      <p>Buton</p>
    </button>
  );
}
//Pasar por parametro la clase .main-button en el ejemplo de los botones del menu

//podriamos ponerle un parametro text para modifica el texto que se utiliza en <p> ...! 

export default Button;
