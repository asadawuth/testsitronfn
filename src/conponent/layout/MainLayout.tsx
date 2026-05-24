import { Outlet } from "react-router-dom";
import Header from "./Header";

function InnerLayout() {
  return (
    <>
      <Header />
      <main className="">
        <Outlet />
      </main>
    </>
  );
}

export default function MainLayout() {
  return <InnerLayout />;
}
