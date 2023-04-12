import { Outlet } from "react-router-dom";
import { CNAppBar } from "./CNAppBar";
import { Toolbar } from "@mui/material";

function Root() {
  return (
    <>
      <CNAppBar />
      <Toolbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default Root;
