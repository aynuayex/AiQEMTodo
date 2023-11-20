
type HeaderProps = {
    text: string;
    bg: string;
    count: number;
  };

const Header = ({ text, bg, count }: HeaderProps) => {
    return (
      <div
        className={`${bg} flex h-12 items-center pl-4 rounded-md text-white text-sm uppercase`}
      >
        {text}
        <div className="ml-2 w-5 h-5 bg-white text-black flex justify-center items-center rounded-full ">
          {count}
        </div>
      </div>
    );
  };

export default Header;