import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"


interface SavingsCardProps {
  title: string;
  amount: string;
  amountColor?: string;
}

const SavingsCard: React.FC<SavingsCardProps> = ({
  title,
  amount,
  amountColor = "text-black",
}) => {
  return (
    <Card className="w-[225px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-semibold ${amountColor}`}>{amount}</p>
      </CardContent>
      <CardContent>
        <Progress value={50} className="h-2" />
      </CardContent>
    </Card>
  );
};

export default SavingsCard;
