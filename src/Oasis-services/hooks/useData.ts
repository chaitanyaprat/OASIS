//create useQueries for various widgets, homescreen and all data handling with wrappers,

import { useQuery } from "@tanstack/react-query";
import { getHomeData } from "../api/services/getData.service";
import {
  WidgetData,
  WidgetType,
} from "@/Oasis-components/widget-card/widget.interface";
// get user location, prompt him for current location, and save permissions handled by os.
//but using navigator geolocation can get long and lats
export function getWidgetData(widgetData: WidgetData, keys: string[]) {
  switch (widgetData.type as WidgetType) {
    case WidgetType.Clock: {
      //handle clock
      return {
        queryKey: [...keys],
        queryFn: () => Promise.resolve({}),
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 10,
        enabled: false,
        initialData: {},
      };
      break;
    }
    case WidgetType.Todos: {
      return {
        queryKey: [...keys],
        queryFn: getHomeData,
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 10,
        enabled: true,
        url: "/src/mock-data/todoLists.json",
      };

      break;
    }
    // case WidgetType.Game: {
    //   //handle game
    //   break;
    // }
    case WidgetType.Weather: {
      return {
        queryKey: [...keys],
        queryFn: getHomeData,
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 10,
        enabled: true,
        url: "/src/mock-data/weatherdata.json",
      };
    }
    case WidgetType.Gallery: {
      return {
        queryKey: [...keys],
        queryFn: getHomeData,
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 10,
        enabled: true,
        url: "/src/mock-data/photoGallaery.json",
      };
    }
    // case WidgetType.Journal: {
    //   //handle Journal
    //   break;
    // }
    // case WidgetType.Research: {
    //   //handle research assistance
    //   break;
    // }
    default:
      return {
        queryKey: [...keys],
        queryFn: () => Promise.resolve({}),
        staleTime: 0,
        initialData: {},
        enabled: false,
        url: "",
      };
  }
}

//using staletime allow sto fectch cahce data, then it goes to cache time
//here can fetch data in background

export function useGetWidgetData(
  keys: string[],
  widgetData: WidgetData
  //   queryConfigs?: Record<string, string>
) {
  const { queryKey, queryFn, staleTime, gcTime, initialData, enabled, url } =
    getWidgetData(widgetData, keys);

  return useQuery({
    queryKey,
    queryFn: () =>
      queryFn(url ?? "", {
        params: {
          query: "Mason",
        },
      }),
    staleTime,
    gcTime: gcTime,
    initialData: initialData,
    enabled,
  });
}

// navigator.geolocation.getCurrentPosition(
//     (position) =>
//         `${position.coords.latitude},${position.coords.longitude}`
//     ),
