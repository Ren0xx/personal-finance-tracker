import { TourProvider } from "@reactour/tour";
import { steps } from "@/config/tourSteps";

import useTourStatus from "@/hooks/useTourStatus";
export default function TourWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setTourCompleted } = useTourStatus();
  return (
    <TourProvider
      steps={steps}
      scrollSmooth
      showBadge={false}
      beforeClose={() => {
        setTourCompleted();
      }}
    >
      {children}
    </TourProvider>
  );
}
