import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  handleEdit?: () => void;
  handleDelete?: () => void;
};

const TargetOwnerMenu = ({ handleEdit, handleDelete }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground h-9 px-3"
        aria-label="targetOwnerMenu"
      >
        <ChevronDown size={16} />
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
