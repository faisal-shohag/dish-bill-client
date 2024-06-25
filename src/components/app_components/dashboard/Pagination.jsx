import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrev = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
  
    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };
  
    return (
      <div className="grid grid-cols-3 items-center">
        <Button size="sm" variant="outline" onClick={handlePrev} disabled={currentPage === 1}>
         <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <span className="text-center">{currentPage} of {totalPages} </span>
        <Button size="sm" variant="outline" onClick={handleNext} disabled={currentPage === totalPages}>
         Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  export default Pagination;