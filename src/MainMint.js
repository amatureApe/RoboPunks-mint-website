import { useState } from 'react'
import { ethers, BigNumber } from 'ethers'
import roboPunksNFT from './RoboPunksNFT.json'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'

const roboPunksNFTAddress = '0x76B9c713B3dE80214904FC2e303dbe5c553a8eDb'

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1)
    const isConnected = Boolean(accounts[0])

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(
                roboPunksNFTAddress,
                roboPunksNFT.abi,
                signer
            )
            try {
                const response = await contract.mint(BigNumber.from(mintAmount))
                console.log('response', response)
            } catch (err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return
        setMintAmount(mintAmount - 1)
    }

    const handleIncrement = () => {
        if (mintAmount >= 3) return
        setMintAmount(mintAmount + 1)
    }

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">RoboPunks</Text>
                    <Text
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                    >
                        It's 2078. Can the RoboPunks NFT save the humans from rampant NFT speculation? Mint RoboPunks to find out.
                    </Text>
                </div>
                {isConnected ? (
                    <div>
                        <Flex align="center" justify="center">
                            <Button
                                onClick={handleDecrement}
                                bg="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                            >
                                -
                            </Button>
                            <Input
                                readOnly
                                fontFamily="inherit"
                                width="100px"
                                height="40px"
                                textAlign="center"
                                pl="19px"
                                mt="10px"
                                type="number"
                                value={mintAmount}
                            />
                            <Button
                                onClick={handleIncrement}
                                bg="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                            >
                                +
                            </Button>
                        </Flex>
                        <Button
                            onClick={handleMint}
                            bg="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                        >
                            Mint Now
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Text
                            mt="70px"
                            fontSize="30px"
                            letterSpacing="-5.5%"
                            fontFamily="VT323"
                            textShadow="0 3px #000000"
                        >
                            You must connect to mint.
                        </Text>
                    </div>
                )}
            </Box>
        </Flex>
    )
}

export default MainMint