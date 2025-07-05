import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Props = {
  handleEdit?: () => void;
  handleDelete?: () => void;
};

const TargetOwnerMenu = ({ handleEdit, handleDelete }: Props): JSX.Element => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="sm" aria-label="targetOwnerMenu">
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {handleEdit && (
          <DropdownMenuItem onClick={handleEdit}>
            🖊 手直しする
          </DropdownMenuItem>
        )}
        {handleDelete && (
          <DropdownMenuItem onClick={handleDelete}>❌ 消す</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TargetOwnerMenu;
