import PropTypes from "prop-types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardCard = ({ title, icon, num }) => {
  return (
    <div className="">
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{num}</div>
      </CardContent>
    </Card>
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  num: PropTypes.any,
};

export default DashboardCard;