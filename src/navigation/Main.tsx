import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/HomePage";
import { Topics } from "../pages/TopicsPage";
import { About } from "../pages/AboutPage";
import { Faq } from "../pages/FaqPage";
import { SecretLogin } from "../pages/SecretLoginPage";
import { History } from "../pages/HistoryPage";
import { EnergyinDepth } from "../pages/EnergyInDepthPage";
import {
    Availability,
    Accidents,
    Capacity,
    Generation,
    Nuclear,
    Price,
    Reactors,
    Trade,
    Uranium,
    Waste,
} from "../pages/topics/nuclear";
import {
    Society,
    EconomicsAndFinance,
    JusticeAndEquity,
    Policy,
    Population,
    WellBeing,
} from "../pages/topics/society";
import {
    BioEnergy,
    GeothermalEnergy,
    HydropowerEnergy,
    OceanEnergy,
    Renewable,
    SolarEnergy,
    WindEnergy,
} from "../pages/topics/renewable";

export const Main = () => {
    return (
        <Box flexGrow={1} width="100%">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/topics" element={<Topics />} />
                <Route path="/history" element={<History />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/secret" element={<SecretLogin />} />
                <Route path="/nuclear" element={<Nuclear />} />
                <Route
                    path="/nuclear/availability"
                    element={<Availability />}
                />
                <Route path="/nuclear/accidents" element={<Accidents />} />
                <Route path="/nuclear/capacity" element={<Capacity />} />
                <Route path="/nuclear/generation" element={<Generation />} />
                <Route path="/nuclear/price" element={<Price />} />
                <Route path="/nuclear/reactors" element={<Reactors />} />
                <Route path="/nuclear/trade" element={<Trade />} />
                <Route path="/nuclear/uranium" element={<Uranium />} />
                <Route path="/society" element={<Society />} />

                <Route path="/society/wellbeing" element={<WellBeing />} />
                <Route path="/society/policy" element={<Policy />} />
                <Route path="/society/population" element={<Population />} />
                <Route
                    path="/society/justiceandequity"
                    element={<JusticeAndEquity />}
                />
                <Route
                    path="/society/economicsandfinance"
                    element={<EconomicsAndFinance />}
                />
                <Route path="/renewableenergy" element={<Renewable />} />
                <Route
                    path="/renewableenergy/solarenergy"
                    element={<SolarEnergy />}
                />
                <Route
                    path="/renewableenergy/windenergy"
                    element={<WindEnergy />}
                />
                <Route
                    path="/renewableenergy/hydropowerenergy"
                    element={<HydropowerEnergy />}
                />
                <Route
                    path="/renewableenergy/geothermalenergy"
                    element={<GeothermalEnergy />}
                />
                <Route
                    path="/renewableenergy/bioenergyenergy"
                    element={<BioEnergy />}
                />
                <Route
                    path="/renewableenergy/oceanenergy"
                    element={<OceanEnergy />}
                />

                <Route path="/energyindepth" element={<EnergyinDepth />} />
            </Routes>
        </Box>
    );
};

export default Main;
