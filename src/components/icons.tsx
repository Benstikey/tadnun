"use client";

import {
  KnifeFork,
  Hotel,
  Stethoscope,
  ShoppingBag,
  Home,
  Transport,
  Local,
  AfferentFour,
  HeadsetOne,
  Finance,
  AreaMap,
  Clipboard,
  WaterLevel,
  TrendingUp,
  ChartHistogram,
  MapRoad,
  CalendarThirtyTwo,
  DataFile,
  Bill,
  Video,
  DocSearch,
  Monitor,
  Instagram,
  Gift,
  Credit,
  EveryUser,
  ShareOne,
  Eyes,
  EditOne,
  LayoutOne,
  CheckOne,
  Navigation,
  Truck,
  MailPackage,
  CategoryManagement,
  Message,
  Compass,
  Star,
  BuildingOne,
  Globe,
  BachelorCap,
} from "@icon-park/react";
import type { ComponentType } from "react";

type IconProps = { size?: number; strokeWidth?: number; className?: string };

export const sectorIconMap: Record<string, ComponentType<IconProps>> = {
  agriculture: AreaMap,
  restaurants: KnifeFork,
  tourism: Hotel,
  healthcare: Stethoscope,
  retail: ShoppingBag,
  education: BachelorCap,
  realestate: Home,
  logistics: Transport,
};

export const expertiseIconMap: Record<string, ComponentType<IconProps>> = {
  local: Local,
  simple: AfferentFour,
  support: HeadsetOne,
  price: Finance,
};

export const solutionIconMap: Record<string, ComponentType<IconProps>> = {
  map: AreaMap,
  clipboard: Clipboard,
  users: EveryUser,
  droplet: WaterLevel,
  "trending-up": TrendingUp,
  calculator: ChartHistogram,
  "map-pin": Local,
  truck: Truck,
  "qr-code": MapRoad,
  monitor: Monitor,
  "pie-chart": ChartHistogram,
  calendar: CalendarThirtyTwo,
  "calendar-check": CalendarThirtyTwo,
  refresh: ShareOne,
  building: BuildingOne,
  "message-circle": Message,
  globe: Globe,
  compass: Compass,
  "file-text": DataFile,
  receipt: Bill,
  video: Video,
  user: EveryUser,
  search: DocSearch,
  "shopping-bag": ShoppingBag,
  instagram: Instagram,
  gift: Gift,
  "credit-card": Credit,
  star: Star,
  "share-2": ShareOne,
  eye: Eyes,
  "pen-tool": EditOne,
  layout: LayoutOne,
  "check-circle": CheckOne,
  "check-square": CheckOne,
  navigation: Navigation,
  package: MailPackage,
  archive: CategoryManagement,
  smartphone: Monitor,
  "play-circle": Video,
  "message-square": Message,
  "graduation-cap": BachelorCap,
};

export function SectorIcon({
  sectorKey,
  size = 24,
  className,
}: {
  sectorKey: string;
  size?: number;
  className?: string;
}) {
  const Icon = sectorIconMap[sectorKey];
  if (!Icon) return null;
  return <Icon size={size} strokeWidth={3} className={className} aria-hidden="true" />;
}

export function ExpertiseIcon({
  itemKey,
  size = 22,
  className,
}: {
  itemKey: string;
  size?: number;
  className?: string;
}) {
  const Icon = expertiseIconMap[itemKey];
  if (!Icon) return null;
  return <Icon size={size} strokeWidth={3} className={className} aria-hidden="true" />;
}

export function SolutionIcon({
  iconKey,
  size = 24,
  className,
}: {
  iconKey: string;
  size?: number;
  className?: string;
}) {
  const Icon = solutionIconMap[iconKey];
  if (!Icon) return null;
  return <Icon size={size} strokeWidth={3} className={className} aria-hidden="true" />;
}
