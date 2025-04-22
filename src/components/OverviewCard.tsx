import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OverviewCardProps {
  title: string;
  amount: string;
  amountColor?: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  amount,
  amountColor = "text-black",
}) => {
  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-semibold ${amountColor}`}>{amount}</p>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
