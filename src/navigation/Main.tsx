import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Topics } from "../pages/Topics";
import { About } from "../pages/About";
import { Faq } from "../pages/Faq";
import { NuclearPage } from "../pages/NuclearPage";
import { SocietyPage } from "../pages/SocietyPage";
import { RenewablePage } from "../pages/RenewablePage";
import { SecretLogin } from "../pages/SecretLogin";
import { History } from "../pages/History";
import { EnergyinDepth } from "../pages/EnergyInDepth";
import { Reactors } from "../pages/Reactors";

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
        <Route path="/nuclearenergy" element={<NuclearPage />} />
        <Route path="/society" element={<SocietyPage />} />
        <Route path="/renewableenergy" element={<RenewablePage />} />
        <Route path="/energyindepth" element={<EnergyinDepth />} />
        <Route path="/reactors" element={<Reactors />} />
      </Routes>
    </Box>
  );
};

export default Main;
