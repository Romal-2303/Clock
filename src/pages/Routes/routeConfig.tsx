import StopWatch from "../StopWatch/StopWatch";
import Timer from "../Timer/Timer";
import WorldClock from "../WorldClock/WorldClock";

interface routeConfigType {
  path?: string | undefined;
  component: React.ElementType;
}

export const routes: routeConfigType[] = [
  { path: "/", component: StopWatch },
  { path: "/stopwatch", component: StopWatch },
  { path: "/timers", component: Timer },
  { path: "/worldclock", component: WorldClock },
];
