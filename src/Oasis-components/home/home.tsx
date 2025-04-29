import NavBar from "../nav-bar/nav.component";
import WidgetCard from "../widget-card/widget";

import homeScreenData from "../../mock-data/getHomeScreenData.json";
import { useEffect, useState } from "react";
//useContext
//useEffect
//useReducer
//useState

//intial data that sends the payload for all widgets, can move this to servcie and make it remember user prefernces.
const data = { ...homeScreenData };
function Home() {
  const [homeData, setHomeData] = useState(data);
  //may be move effect at widget level to get their own data of all widgets that get displayed, get user data
  useEffect(() => {
    //make the calls and get the data.
  }, [homeData]);
  //based on priority sort home widgets.
  return (
    <>
      <div className=" h-screen grid grid-rows-[auto_1fr_auto] ">
        <header className="p-2">
          <NavBar />
        </header>
        <main className="overflow-auto p-2">
          <div className="grid grid-cols-[auto_auto_auto] grid-flow-dense justify-between  content-around gap-x-2 gap-y-4 ">
            {homeData.Data.map((eachWidget, index) => {
              return <WidgetCard key={index} {...eachWidget} />;
            })}
          </div>
        </main>
        <footer className="bg-amber-50 p-4 mt-2 relative rounded-md ">
          <p className="absolute top-[25%] left-[40%]">Footer</p>
        </footer>
      </div>
    </>
  );
}
export default Home;

/**
 * navBar
    widgets 1-1-1
    as amany as needed rows
    footer// sticky with fixed options
    side bar with list of options(3 options)
*/
