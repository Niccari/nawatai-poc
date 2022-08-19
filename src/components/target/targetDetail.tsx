import { Image, Text, Flex, Avatar, Box, Divider, Stack, MenuButton } from "@chakra-ui/react";
import { PrimaryText } from "../../element/text";
import { NamingTargetForView } from "../../models/namingTarget";
import { usePersonalUser } from "../../modules/personalUser/hooks";

type Props = {
  target: NamingTargetForView;
};

const TargetDetail = ({ target }: Props): JSX.Element => {
  const { authorId, title, comment, imageUrl } = target;

  const { user } = usePersonalUser(authorId);
  return (
    <Box>
        <Flex>
            <Image
                src={imageUrl}
                alt={comment}
                w="200px"
                h="200px"
            />
            <Stack flexGrow={1} justifyContent="center">
                <Flex>
                    <PrimaryText textStyle="h2">{title}</PrimaryText>
                    {/* <MenuButton /> */}
                </Flex>
                <PrimaryText>{comment}</PrimaryText>
                <PrimaryText>👍 10 😂 4 ❓１ 😵2</PrimaryText>
                <Flex alignItems="center">
                    <Avatar src={user?.imageUrl}></Avatar>
                    <PrimaryText ml={2}>
                        {user?.name}
                    </PrimaryText>
                </Flex>
            </Stack>
        </Flex>
        <Divider />
    </Box>
  );
};

export default TargetDetail;
