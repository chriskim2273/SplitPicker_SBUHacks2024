import { Stack, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Day } from '../Components/Day';
import ScoreBoard from '../Components/ScoreBoard';
import { SplitData } from '../Context/SplitContext';
import Split from '../Components/Split';

const Builder = (props) => {
    const exercises = ["One", "Two", "Three"];
    const { refresh } = props;
    const { loadUserData } = SplitData();
    useEffect(() => {
        console.log(refresh);
        (loadUserData)();
    }, [refresh])
    return (
        <section className="Builder">
            <Text fontSize='4xl' className='my-5'>Choose Your Exercises</Text>
            <Stack className='flex justify-center'>
                <ScoreBoard />
                <Split refresh={refresh} key="split_comp" />
            </Stack>
        </section>
    )
}

export default Builder;