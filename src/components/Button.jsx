const Button = ({
  fontWeight,
  fontSize,
  textColor,
  btnText,
  width,
  type,
  onClick,
  btnIcon: BtnIcon,
  padding,
  backgroundColor,
  disable,
  cursor,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disable}
      className={` font-${fontWeight} text-${textColor} w-${width} 
              border-r-black focus:outline-none rounded ${padding}  ${backgroundColor}  text-${fontSize} ${cursor}`}
    >
      {BtnIcon && <BtnIcon />}
      {btnText}
    </button>
  );
};

export default Button;
