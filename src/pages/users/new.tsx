import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import {
  Avatar,
  Box,
  Button,
  FormErrorMessage,
  Input,
  Stack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import MainFrame from "../../components/mainFrame";
import { PrimaryText, SecondaryText } from "../../element/text";
import { useLoginState } from "../../modules/login/hooks";

type Props = {};

export type PersonalUserWithoutId = {
  name: string;
  iconImageId?: string;
  profile?: string;
  url?: string;
  twitterUserId?: string;
  evalCounts: number;
  signUpAt: Date;
};

const CreateNewUserPage: NextPage<Props> = ({}) => {
  const { user } = useLoginState();
  const [id, setId] = useState(Math.random().toString(32).slice(2));
  const [name, setName] = useState("");
  const [userIconUrl, setUserIconUrl] = useState("");
  const [profile, setProfile] = useState("");

  const isIdError = !/^[0-9a-zA-Z-_]*$/.exec(id);
  const isNameError = name === "";

  useEffect(() => {
    if (user) {
      setName(user.displayName ?? "");
      setUserIconUrl(user.photoURL ?? "");
    }
  }, [user]);
  return (
    <MainFrame>
      <PrimaryText textStyle="h1" mt={4}>
        あと1ステップです！
      </PrimaryText>
      <SecondaryText>プロフィールを入力しましょう</SecondaryText>
      <PrimaryText mt={4}>ユーザアイコン</PrimaryText>
      <Avatar
        w="80px"
        h="80px"
        border="1px solid #EEE"
        backgroundColor="#FFF"
        src={userIconUrl}
      ></Avatar>
      <Box mt={4}>
        <form onSubmit={() => {}}>
          <Stack spacing={2}>
            <FormControl isInvalid={isIdError}>
              <FormLabel>ユーザID</FormLabel>
              <Input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              {!isIdError ? (
                <FormHelperText>ユーザ名を入力してください</FormHelperText>
              ) : (
                <FormErrorMessage>
                  ユーザ名には半角英数字、-、_が使えます
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={isNameError}>
              <FormLabel>ニックネーム</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {!isNameError ? (
                <FormHelperText>ニックネームを入力してください</FormHelperText>
              ) : (
                <FormErrorMessage>ニックネームは必須です</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>紹介プロフィール</FormLabel>
              <Input
                type="text"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
              />
            </FormControl>
          </Stack>
          <Button type="submit" mt={4}>
            これでOK!
          </Button>
        </form>
      </Box>
    </MainFrame>
  );
};

export default CreateNewUserPage;
