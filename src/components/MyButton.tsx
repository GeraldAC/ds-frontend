import { Button } from "@chakra-ui/react";

interface Props {
  onClick: () => void;
  label: string;
}

const MyButton = ({ onClick, label }: Props) => {
  return (
    <Button colorScheme="teal" onClick={onClick}>
      {label}
    </Button>
  );
};

export default MyButton;
