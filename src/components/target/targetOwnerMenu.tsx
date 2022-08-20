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
        <MenuItem onClick={handleEdit}>🖊 手直しする</MenuItem>
        <MenuItem onClick={handleDelete}>❌ 消す</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TargetOwnerMenu;
