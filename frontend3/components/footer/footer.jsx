import React from 'react';
import { Box, Text, GridItem } from '@chakra-ui/react';

const Footer = () => {
    const currentDate = new Date().getFullYear();

    return (
        <GridItem area={'footer'}>
            <Box as="footer" w="100%" h="40px" bg="teal" position="fixed" bottom="0" zIndex="999" p={4} textAlign="center">
                <Text color="white">&copy; {currentDate} Voting Dapp</Text>
            </Box>
        </GridItem>
    );
};

export default Footer;