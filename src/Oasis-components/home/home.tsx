import { NavBar } from "../nav-bar/nav.component";
import WidgetCard from "../widget-card/widget";
import GridLayout, {
  Layout,
  Responsive,
  WidthProvider,
} from "react-grid-layout";

import homeScreenData from "../../mock-data/getHomeScreenData.json";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

//useContext
//useEffect
//useReducer
//useState

//intial data that sends the payload for all widgets, can move this to servcie and make it remember user prefernces.
const data = { ...homeScreenData };
const ResponsiveGridLayout = WidthProvider(Responsive);

// Define layouts per breakpoint
function getLayOutForWidget(): Layout[] {
  return;
}

function Home() {
  const [homeData, setHomeData] = useState(data);
  //may be move effect at widget level to get their own data of all widgets that get displayed, get user data
  useEffect(() => {
    //make the calls and get the data.
  }, [homeData]);
  //based on priority sort home widgets.
  return (
    <>
      <div>
        <div className="h-full flex flex-col align-middle justify-center">
          <NavBar />
          <div className="p-4 flex gap-1  overflow-auto flex-col sm:flex-row sm:h-150 ">
            <div className="flex-1/3 border-4  ">
              <p>for niw list of todos:</p>
              <ul>
                <li>use this to have a card and display info</li>
                <li>
                  for form implementation plan a trip collect user info, habit
                  builder survey
                </li>
              </ul>
            </div>
            <div className="flex-2/3 border-4 overflow-auto bg-card-foreground/80 rounded-2xl ">
              <ResponsiveGridLayout
                className="layout w-full"
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 6, md: 4, sm: 4, xs: 3, xxs: 2 }}
                margin={[12, 12]}
                containerPadding={[12, 12]}
                useCSSTransforms={true}
                compactType="vertical"
              >
                {homeData.Data.map((eachWidget, index) => {
                  return (
                    <div key={index}>
                      <WidgetCard {...eachWidget} />
                    </div>
                  );
                })}
              </ResponsiveGridLayout>
            </div>
          </div>
          <div className="h-300 w-full border-4 ">
            <h1>quick notes, current working project</h1>
            <h1>quick chat and messenger for this notes</h1>
          </div>
          <div className="h-600 w-full border-4 ">
            <h1>step2 Content keep display flex for 3 colmn layout</h1>
          </div>
          <div className="h-600 w-full border-4 ">
            <h1>
              step3 Content grid layout for static widgets mini and to colmn
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
