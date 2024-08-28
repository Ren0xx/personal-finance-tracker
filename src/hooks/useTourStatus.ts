import { useLocalStorage } from "usehooks-ts";

const useTourStatus = () => {
  const [tourCompleted, setValue] = useLocalStorage<boolean>(
    "tourCompleted",
    false,
  );
  const setTourCompleted= () => {
    setValue(true);
  }
  return { tourCompleted, setTourCompleted };
};

export default useTourStatus;
