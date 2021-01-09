import { useColorMode, Switch } from "@chakra-ui/react";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode("light");
  const isDark = colorMode === "dark";
  return (
    <Switch
      position="fixed"
      top="1rem"
      right="1rem"
      color="green"
      value="light"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );
};
