import { Layout } from "react-grid-layout";

export interface WidgetData {
  name: string;
  type: string;
  icon: string;
  background: string;
  gridPos: Layout;
  isFromService: boolean;
  url?: string;
}

export enum WidgetType {
  Clock = "clock",
  Weather = "weather",
  Journal = "journal",
  Countries = "countries",
  Gallery = "gallery",
  Research = "research",
  Game = "game",
  Project = "project",
  Todos = "todos",
  TaskRoulette = "TaskRoulette",
  MyChat = "myChat",
}
