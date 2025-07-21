import { NavBar } from "../nav-bar/nav.component";
import WidgetCard from "../widget-card/widget";
import { Responsive, WidthProvider } from "react-grid-layout";
import Graph from "@assets/backgrounds/graph-paper.svg";
import homeScreenData from "../../mock-data/getHomeScreenData.json";
import { useEffect, useState } from "react";
import { PageTransissionWrapper } from "../transissions/page-transission";
import { Element, Link } from "react-scroll";
import FloatingActionButton from "./floating-action";

//useContext
//useEffect
//useReducer
//useState

//intial data that sends the payload for all widgets, can move this to service and make it remember user prefernces.
const data = { ...homeScreenData };
const ResponsiveGridLayout = WidthProvider(Responsive);

function Home() {
  const [homeData, setHomeData] = useState(data);
  const [rowHeight, setRowHeight] = useState(200);
  //may be move effect at widget level to get their own data of all widgets that get displayed, get user data
  useEffect(() => {
    //make the calls and get the data.
  }, [homeData]);
  //based on priority sort home widgets.
  const handleWidthChange = (
    containerWidth: number,
    margin: [number, number],
    cols: number,
    containerPadding: [number, number]
  ) => {
    console.log("margin", margin);
    console.log("padding", containerPadding);
    const newWidth = containerWidth / cols;
    setRowHeight(newWidth);
  };

  return (
    <PageTransissionWrapper>
      <div className="h-auto">
        <div className="h-full flex flex-col align-middle justify-center">
          {/* top will drop on click of profile, will have profile info
           */}
          <div
            //fix svgs
            className="h-screen bg-primary dark:bg-secondary"
            style={{ backgroundImage: "Graph" }}
          ></div>

          <div className="h-screen  bg-black/45 flex  flex-col  sm:flex-row ">
            <div className="p-4 mt-auto mb-auto w-full flex gap-1  overflow-auto flex-col  sm:flex-row sm:h-150 ">
              <div className="flex-1/2 border-4  bg-background/80">
                <p>for niw list of todos:</p>
                <ul>
                  <li>use this to have a card and display info</li>
                  <li>
                    for form implementation plan a trip collect user info, habit
                    builder survey
                  </li>
                  <li>
                    create a feature which can store task widgets it creates
                    task widgets which are movable actionable and i create using
                    aform
                  </li>
                </ul>
              </div>
              <div className="flex-1/2  border-4 overflow-auto bg-background/80 rounded-2xl ">
                <ResponsiveGridLayout
                  className="layout w-full h-full gap-1"
                  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                  cols={{ lg: 6, md: 8, sm: 8, xs: 8, xxs: 4 }}
                  margin={[2, 2]}
                  containerPadding={[2, 2]}
                  onWidthChange={handleWidthChange}
                  rowHeight={rowHeight}
                  isResizable={false}
                  useCSSTransforms={true}
                  resizeHandles={["se", "ne", "nw", "sw"]}
                  compactType="vertical"
                >
                  {homeData.Data.map((eachWidget, index) => {
                    return (
                      <div
                        key={index}
                        data-grid={eachWidget.gridPos}
                        className="overflow-auto rounded-2xl border-3 rounded-2xl shadow-sm"
                      >
                        <WidgetCard {...eachWidget} />
                      </div>
                    );
                  })}
                </ResponsiveGridLayout>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="h-screen w-full border-4 ">
            <h1>quick notes, current working project</h1>
            <h1>quick chat and messenger for this notes</h1>
            <h1>
              using mcps, to read inoput scrappy one also and convert them to
              certain bullet points? few fixed options make into todos, rewrite,
              or custom prompt, have a search option effect
            </h1>
            <h1>step2 Content keep display flex for 3 colmn layout</h1>
            <h1>
              step3 Content grid layout for static widgets mini and to colmn
              block for future updates
            </h1>
          </div>
          {/* onclick of the button, we just scroll down or up to the clicked widget screen.
          add the screen dynamically based on widget data,
          by default have few fixed screens, like quick notes?
          todos, 
           */}
          <FloatingActionButton homeData={homeData.Data} />
          {homeData.Data.map((widget) => {
            if (widget?.hasPage) {
              return (
                <Element
                  name={widget.name}
                  className="h-screen w-full border-4 "
                >
                  <h1>{widget.name}</h1>
                </Element>
              );
            }
          })}
        </div>
      </div>
    </PageTransissionWrapper>
  );
}
export default Home;
