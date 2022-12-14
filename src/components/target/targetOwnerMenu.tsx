import { TriangleDownIcon } from "@chakra-ui/icons";
import { MenuButton, Menu, MenuItem, MenuList } from "@chakra-ui/react";

type Props = {
  handleEdit?: () => void;
  handleDelete?: () => void;
};

const TargetOwnerMenu = ({ handleEdit, handleDelete }: Props): JSX.Element => {
  return (
    <Menu>
      <MenuButton type="button" aria-label="targetOwnerMenu">
        <TriangleDownIcon />
      </MenuButton>
      <MenuList>
        {handleEdit && <MenuItem onClick={handleEdit}>๐ ๆ็ดใใใ</MenuItem>}
        {handleDelete && <MenuItem onClick={handleDelete}>โ ๆถใ</MenuItem>}
      </MenuList>
    </Menu>
  );
};

export default TargetOwnerMenu;
