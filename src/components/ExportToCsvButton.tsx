"use client";

import { Button } from "@/components/ui/button";
import { json2csv } from "json-2-csv";
type Keys = Array<string | RegExp>;

const defaultKeysToExclude: Keys = [new RegExp("id$", "i"), new RegExp("\\.")];
type ExportToCsvButtonProps = {
  data: Array<object>;
  keysToExclude?: Keys;
  title: string;
};
const ExportToCsvButton = ({
  data,
  keysToExclude = defaultKeysToExclude,
  title,
}: ExportToCsvButtonProps) => {
  const handleClick = () => {
    try {
      const csv = json2csv(data, {
        excludeKeys: keysToExclude,
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${title}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button className="w-fit self-center" onClick={handleClick}>
      Export Data to CSV
    </Button>
  );
};

export default ExportToCsvButton;
