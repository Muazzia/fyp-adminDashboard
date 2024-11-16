import Header from "../Header/Header";

const Layout = ({ children }) => {
  return <div className="max-w-[1280px] mx-auto ">{children}</div>;
};

export default Layout;

export const LayoutWithHeader = ({ children }) => {
  return (
    <Layout>
      <Header />
      {children}
    </Layout>
  );
};
