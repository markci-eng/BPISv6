import { Grid } from '@chakra-ui/react';
import React from 'react'
import { InputFloatingLabel } from 'st-peter-ui';

interface AgentEmploymentFormProps {
    employer: string,
    position: string,
    hiredate: string,
    employmentStatus: string,
    nbiNumber: string,
    tinNumber: string,
    sssNumber: string
}

const AgentEmploymentForm = (props: AgentEmploymentFormProps) => {
    const {
        employer, position, hiredate, 
        employmentStatus, nbiNumber, tinNumber, sssNumber,
        ... rest
    } = props;

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <InputFloatingLabel label="Employer" value={employer} />
        <InputFloatingLabel label="Position" value={position} />
        <InputFloatingLabel label="Hire Date" value={hiredate} />
        <InputFloatingLabel label="Employment Status" value={employmentStatus} />
        <InputFloatingLabel label="NBI Number" value={nbiNumber} />
        <InputFloatingLabel label="TIN Number" value={tinNumber} />
        <InputFloatingLabel label="SSS Number" value={sssNumber} />
    </Grid>
  )
  
}

export default AgentEmploymentForm