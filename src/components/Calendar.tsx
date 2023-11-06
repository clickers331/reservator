import { Outlet } from "react-router-dom";
//get all data
//filter them out based on their week day (monday, tuesday, wednesday, ...)
//map those to corresponding columns (monday, tuesday, wednesday, ...)

export default function Calendar() {
  return (
    <>
      <Outlet />
    </>
  );
}

//<NavLink
//to={`month/${today.getFullYear()}/${today.getMonth() + 1}`}
//end
//>
//ay
//</NavLink>
//<NavLink to={`week/${getWeekNo(today)}`}>hafta</NavLink>
