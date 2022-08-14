import AppBar from "./appBar";

type Props = {
  children: React.ReactNode;
};

const MainFrame = ({ children }: Props): JSX.Element => {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
};

export default MainFrame;
