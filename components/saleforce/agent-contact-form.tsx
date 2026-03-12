import { Grid } from '@chakra-ui/react'
import { StringOrTemplateHeader } from '@tanstack/react-table'
import React from 'react'
import { InputFloatingLabel } from 'st-peter-ui'

interface AgentContactFormProps {
    email: string,
    mobileNumber: string,
    landlineNumber: string
}

const AgentContactForm = (props: AgentContactFormProps) => {
    const { email, mobileNumber, landlineNumber, ...rest} = props;
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="2">
        <InputFloatingLabel label="Email" value={email} />
        <InputFloatingLabel label="Mobile Number" value={mobileNumber} />
        <InputFloatingLabel label="Landline Number" value={landlineNumber} />
    </Grid>
  )
}

export default AgentContactForm