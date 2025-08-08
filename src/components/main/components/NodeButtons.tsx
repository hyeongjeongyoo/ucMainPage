import { Box, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MotionButton = motion(Button);

interface ButtonPosition {
  x: number;
  y: number;
  alpha: number;
  scale: number;
}

interface NodeButtonsProps {
  buttonPositions: ButtonPosition[];
}

export const NodeButtons = ({ buttonPositions }: NodeButtonsProps) => {
  const buttonTexts = ["About", "Projects", "Skills", "Contact", "Blog"];
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    // 첫 렌더링 후 애니메이션을 활성화하기 위한 딜레이
    const timer = setTimeout(() => {
      setIsInitialRender(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      pointerEvents="none"
    >
      {buttonTexts.map((text, index) => {
        const position = buttonPositions[index] || {
          x: 0,
          y: 0,
          alpha: 0,
          scale: 1,
        };

        return (
          <MotionButton
            key={text}
            position="absolute"
            pointerEvents={position.alpha > 0.3 ? "auto" : "none"}
            initial={isInitialRender ? { scale: 0, opacity: 0 } : false}
            animate={{
              x: position.x - 50,
              y: position.y - 20,
              opacity: position.alpha,
              scale: position.scale,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            whileHover={{
              scale: position.scale * 1.1,
              transition: { duration: 0.2 },
            }}
            variant="ghost"
            size="md"
            color="teal.200"
            _hover={{
              bg: "rgba(129, 230, 217, 0.12)",
              color: "teal.100",
              transform: "translateY(-2px)",
            }}
            style={{
              backdropFilter: "blur(8px)",
            }}
          >
            {text}
          </MotionButton>
        );
      })}
    </Box>
  );
};
