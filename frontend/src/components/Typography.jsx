export function Title({ children, className = "" }) {
    return (
      <h1
        className={`
          font-bold
          text-4xl md:text-6xl 
          leading-tight
          ${className}
        `}
      >
        {children}
      </h1>
    );
  }
  
  export function Subtitle({ children, className = "" }) {
    return (
      <h2
        className={`
          font-semibold
          text-3xl md:text-4xl
          leading-snug
          ${className}
        `}
      >
        {children}
      </h2>
    );
  }
  
  // export function Subtitle2({ children, className = "" }) {
  //   return (
  //     <h3
  //       className={`
  //         font-semibold
  //         text-2xl md:text-3xl
  //         leading-snug
  //         ${className}
  //       `}
  //     >
  //       {children}
  //     </h3>
  //   );
  // }
  
  export function Text({ children, className = "" }) {
    return (
      <p
        className={`

          ${className}
        `}
      >
        {children}
      </p>
    );
  }
  