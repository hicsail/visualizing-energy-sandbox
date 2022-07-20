import { NavItem, Topic } from "../types/types";

const emptyText = {
    type: "paragraph",
    children: [
        {
            text: "",
        },
    ],
};

export const TOPICS_LIST: Array<Topic> = [
    {
        title: "Nuclear Energy",
        href: "/nuclear",
        initialValue: "",
        storageId: "",
        children: [
            {
                title: "Reactors",
                href: "/nuclear/reactors",
                initialValue: "",
                storageId: "reactors323",
            },
            {
                title: "Capacity",
                href: "/nuclear/capacity",
                initialValue: "",
                storageId: "capacity2332",
            },
            {
                title: "Generation",
                href: "/nuclear/generation",
                initialValue: "",
                storageId: "generation32323",
            },
            {
                title: "Waste",
                href: "/nuclear/waste",
                initialValue: "",
                storageId: "waste32",
            },
            {
                title: "Uranium",
                href: "/nuclear/uranium",
                initialValue: "",
                storageId: "uranium323",
            },
            {
                title: "Price",
                href: "/nuclear/price",
                initialValue: "",
                storageId: "price23",
            },
            {
                title: "Trade",
                href: "/nuclear/trade",
                initialValue: "",
                storageId: "trade323",
            },
            {
                title: "Accidents",
                href: "/nuclear/accidents",
                initialValue: "",
                storageId: "accidents323",
            },
            {
                title: "Availability",
                href: "/nuclear/availability",
                initialValue: "",
                storageId: "availability311",
            },
        ],
    },
    {
        title: "Society",
        href: "/society",
        initialValue: "",
        storageId: "society3231",
        children: [
            {
                title: "Well-Being",
                href: "/society/wellbeing",
                initialValue: "",
                storageId: "wellbeing32321",
            },
            {
                title: "Policy",
                href: "/society/policy",
                initialValue: "",
                storageId: "policy121",
            },
            {
                title: "Population",
                href: "/society/population",
                initialValue: "",
                storageId: "population1211",
            },
            {
                title: "Justice and Equity",
                href: "/society/justiceandequity",

                initialValue: "",
                storageId: "justiceandequity121",
            },
            {
                title: "Economics and Finance",
                href: "/society/economicsandfinance",
                initialValue: "",
                storageId: "economicsandfinance112",
            },
        ],
    },
    {
        title: "Renewable Energy",
        href: "/renewableenergy",
        initialValue: "",
        storageId: "renewableenergy111",
        children: [
            {
                title: "Solar Energy",
                href: "/renewableenergy/solarenergy",
                initialValue: "",
                storageId: "solarenergy1121",
            },
            {
                title: "Wind Energy",
                href: "/renewableenergy/windenergy",
                initialValue: "",
                storageId: "1windenergy122",
            },
            {
                title: "Hydropower Energy",
                href: "/renewableenergy/hydropowerenergy",
                initialValue: "",
                storageId: "hydropowerenergy411",
            },
            {
                title: "Geothermal Energy",
                href: "/renewableenergy/geothermalenergy",
                initialValue: "",
                storageId: "geothermalenergy12334",
            },
            {
                title: "Bioenergy Energy",
                href: "/renewableenergy/bioenergyenergy",
                initialValue: "",
                storageId: "bioenergyenergy32",
            },
            {
                title: "Ocean Energy",
                href: "/renewableenergy/oceanenergy",
                initialValue: "",
                storageId: "oceanenergy1231",
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
