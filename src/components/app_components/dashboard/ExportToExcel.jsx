import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { writeFile, utils } from "xlsx";

const ExportToExcel = ({ data, fileName }) => {
  const exportToExcel = () => {
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    writeFile(workbook, fileName +".xlsx" || "data.xlsx");
  };

  return <Button onClick={exportToExcel}>Export to Excel</Button>;
};

ExportToExcel.propTypes = {
  data: PropTypes.array.isRequired,
  fileName: PropTypes.string,
};

export default ExportToExcel;
