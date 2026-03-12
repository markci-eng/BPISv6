import { Grid } from '@chakra-ui/react'
import React from 'react'
import { InputFloatingLabel } from 'st-peter-ui'

interface AgentNameFormProps{
    firstName: string,
    middleName?: string,
    lastName: string,
    suffix?: string
}

const AgentNameForm = (props: AgentNameFormProps) => {
    const { firstName, middleName, lastName, suffix, ...rest } = props;
  return (
    <Grid gap={4} templateColumns="repeat(2, 1fr)">
        <InputFloatingLabel label="Last Name" value={lastName} />
        <InputFloatingLabel label="First Name" value={firstName} />
        <InputFloatingLabel label="Middle Name" value={middleName} />
        <InputFloatingLabel label="Suffix" value={suffix} />
    </Grid>
  )
}

export default AgentNameForm