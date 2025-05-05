import { Button, Menu } from "@chakra-ui/react";
import { TriangleDownIcon } from "../../element/compat/icons";

type Props = {
  handleEdit?: () => void;
  handleDelete?: () => void;
};

const TargetOwnerMenu = ({
  handleEdit,
  handleDelete,
}: Props): React.ReactElement => {
  return (
    <Menu.Root>
      <Menu.Trigger>
        <Button type="button" aria-label="targetOwnerMenu">
          <TriangleDownIcon />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner />
      <Menu.Content>
        {handleEdit && (
          <Menu.Item onClick={handleEdit} value="edit">
            🖊 手直しする
          </Menu.Item>
        )}
        {handleDelete && (
          <Menu.Item onClick={handleDelete} value="delete">
            ❌ 消す
          </Menu.Item>
        )}
      </Menu.Content>
    </Menu.Root>
  );
};

export default TargetOwnerMenu;
