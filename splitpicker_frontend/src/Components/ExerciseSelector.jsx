import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import ExerciseModalGrid from './ExerciseModalGrid';

const ExerciseSelector = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [nameInput, setNameInput] = useState('');
    const { dayNumber } = props;

    const handleNameChange = (e) => setNameInput(e.target.value)

    return (
        <Box className=' min-w-28'>
            <Button onClick={onOpen}>Add Exercise</Button>
            <Modal isOpen={isOpen} size='full' onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select Exercise</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Tabs>
                            <TabList>
                                <Tab>Preset Exercises</Tab>
                                <Tab>Community Exercises</Tab>
                                <Tab>Create Your Own</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {/* <p>one!</p> */}
                                    <ExerciseModalGrid dayNumber={dayNumber} closeModal={onClose} />
                                </TabPanel>
                                <TabPanel>
                                    <p>two!</p>
                                </TabPanel>
                                <TabPanel>
                                    <FormControl>
                                        <FormLabel>Exercise Name</FormLabel>
                                        <Input type='name' value={nameInput} onChange={handleNameChange} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Description</FormLabel>
                                        <Input type='name' value={nameInput} onChange={handleNameChange} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Machine</FormLabel>
                                        <Input type='name' value={nameInput} onChange={handleNameChange} />
                                    </FormControl>
                                    <Text fontSize='4xl'> Work In Progress. </Text>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ExerciseSelector