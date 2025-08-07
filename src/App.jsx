import { BrowserRouter } from "react-router-dom";

import {
  About,
  Achievement,
  Contact,
  Feedbacks,
  Hero,
  Navbar,
  Preloader,
  StarsCanvas,
  Works,
} from "./components";
import EasterEggs from "./components/EasterEggs";
import ElasticCursor from "./components/ElasticCursor";
import FloatingHireMe from "./components/ui/FloatingHireMe";


const App = () => {
  return (
    <Preloader>
      <BrowserRouter>
        <div
          className="relative z-0"
          style={{ backgroundColor: "hsl(222.2 84% 4.9%)" }}
        >
          <ElasticCursor />
          <EasterEggs />
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>
          <StarsCanvas />
          <About />
          <Achievement />

          <Works />
          <Feedbacks />
          <div className="relative z-0">
            <Contact />
          </div>
          <FloatingHireMe />
        </div>
      </BrowserRouter>
    </Preloader>
  );
};

export default App;
