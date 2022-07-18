import { NavItem, Topic } from "../types/types";

export const TOPICS_LIST: Array<Topic> = [
  {
    title: "Nuclear Energy",
    href: "/nuclearenergy",
    children: [
      {
        title: "Reactors",
        href: "/reactors",
      },
      {
        title: "Capacity",
        href: "/capacity",
      },
      {
        title: "Generation",
        href: "/generation",
      },
      {
        title: "Waste",
        href: "/waste",
      },
      {
        title: "Uranium",
        href: "/uranium",
      },
      {
        title: "Price",
        href: "/price",
      },
      {
        title: "Trade",
        href: "/trade",
      },
      {
        title: "Accidents",
        href: "/accidents",
      },
      {
        title: "Availability",
        href: "/availability",
      },
    ],
  },
  {
    title: "Society",
    href: "/society",
    children: [
      {
        title: "Well-Being",
        href: "/wellbeing",
      },
      {
        title: "Policy",
        href: "/policy",
      },
      {
        title: "Population",
        href: "/population",
      },
      {
        title: "Justice and Equity",
        href: "/justiceandequity",
      },
      {
        title: "Economics and Finance",
        href: "/economicsandfinance",
      },
    ],
  },
  {
    title: "Renewable Energy",
    href: "/renewableenergy",
    children: [
      {
        title: "Solar Energy",
        href: "/solarenergy",
      },
      {
        title: "Wind Energy",
        href: "/windenergy",
      },
      {
        title: "Hydropower Energy",
        href: "/hydropowerenergy",
      },
      {
        title: "Geothermal Energy",
        href: "/geothermalenergy",
      },
      {
        title: "Bioenergy Energy",
        href: "/bioenergyenergy",
      },
      {
        title: "Ocean Energy",
        href: "/oceanenergy",
      },
    ],
  },
];

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Energy In Depth",
    href: "/energyindepth",
    hash: false,
  },

  {
    label: "Browse by Topic",
    href: "#",
    hash: false,
  },
  {
    label: "History",
    href: "/history",
    hash: false,
  },
  {
    label: "About",
    href: "/about",
    hash: false,
  },
  {
    label: "FAQ",
    href: "/faq",
    hash: false,
  },
];
