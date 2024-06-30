const Button = ({
  fontWeight,
  fontSize,
  textColor="white",
  width,
  type,
  onClick,
  btnIcon: BtnIcon,
  padding,
  backgroundColor,
  disable,
  cursor,
 children
}) => {

  return (

    <button
      type={type}
      onClick={onClick}
      disabled={disable}
      style={{
        color:textColor,
      }}
      className={`font-${fontWeight}  w-${width}
           rounded ${padding}  ${backgroundColor}  text-${fontSize} ${cursor}`}
    >
      {BtnIcon && <BtnIcon />}
      {children}
    </button>
  );
};

export default Button;
