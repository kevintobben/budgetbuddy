import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OverviewCardProps {
  title: string;
  description: string;
  amount: string;
  amountColor?: string;
  footerText: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  description,
  amount,
  amountColor = "text-black",
  footerText,
}) => {
  return (
    <Card className="w-[600px] p-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-semibold ${amountColor}`}>{amount}</p>
      </CardContent>
      <CardFooter>
        <p>{footerText}</p>
      </CardFooter>
    </Card>
  );
};

export default OverviewCard;
