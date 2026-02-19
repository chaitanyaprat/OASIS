import { get } from "../api/services/getData.service";

export const queryRegistry = {
  // to get the active user session if not available, null
  signIn: {
    queryFn: () => get("/src/mock-data/login.json"),
    queryKey: ["login"],
  },
  // to get the active user session if not available, null
  signOut: {
    queryFn: () => get("/src/mock-data/logout.json"),
    queryKey: ["logout"],
  },
  signUp: {
    queryFn: () => get("/src/mock-data/register.json"),
    queryKey: ["register"],
  },

  todos: {
    queryFn: () => get("/src/mock-data/todoLists.json"),
    queryKey: ["todos"],
  },
  weather: {
    queryFn: () => get("/src/mock-data/weatherdata.json"),
    queryKey: ["weather"],
  },
  gallery: {
    queryFn: () => get("/src/mock-data/photoGallaery.json"),
    queryKey: ["gallery"],
  },
};

export type QueryKeys = keyof typeof queryRegistry;
