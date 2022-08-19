import { TriangleDownIcon } from "@chakra-ui/icons";
import {
    MenuButton,
    Menu,
    MenuItem,
    MenuList,
  } from "@chakra-ui/react";

  type Props = {
    handleDelete?: () => void;
  };
  
  const TargetOwnerMenu = ({ handleDelete }: Props): JSX.Element => {
    return (
      <Menu>
        <MenuButton
          type="button"
          aria-label="targetOwnerMenu"
        >
          <TriangleDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleDelete}>❌ 削除する</MenuItem>
        </MenuList>
      </Menu>
    );
  };
  
  export default TargetOwnerMenu;
  
