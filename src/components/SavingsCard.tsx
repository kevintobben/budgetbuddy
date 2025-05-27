import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trash2, Pencil } from "lucide-react";

interface SavingsCardProps {
  title: string;
  amount: number;
  goal: number;
  onDelete: () => void;
  onEdit: () => void;
}

const SavingsCard: React.FC<SavingsCardProps> = ({
  title,
  amount,
  goal,
  onDelete,
  onEdit,
}) => {
  const percentage = Math.min(100, (amount / goal) * 100);

  return (
    <Card className="w-[225px] relative">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-sm">{title}</CardTitle>
        <button onClick={onEdit} title="Bewerken">
          <Pencil className="w-4 h-4 text-gray-500 hover:text-blue-500" />
        </button>
        <button onClick={onDelete} title="Verwijder">
          <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Huidig bedrag</p>
          <p className="text-lg font-semibold text-black">
            € {amount.toLocaleString("nl-NL")}
          </p>
        </div>
        <p className="text-sm text-gray-500">Doel: € {goal.toLocaleString("nl-NL")}</p>
        <Progress value={percentage} className="h-2" />
      </CardContent>
    </Card>
  );
};

export default SavingsCard;
