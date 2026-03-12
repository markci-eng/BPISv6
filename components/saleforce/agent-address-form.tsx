import { Grid } from '@chakra-ui/react';
import React from 'react'
import { InputFloatingLabel } from 'st-peter-ui';

interface AgentAddressFormProps {
    lotNumber?: string,
    street: string,
    barangay: string,
    district?: string,
    city: string,
    province: string,
    zipCode: string
}

const AgentAddressForm = (props: AgentAddressFormProps) => {
    const {
        lotNumber, street, barangay, district,
        city, province, zipCode, ...rest
    } = props;

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <InputFloatingLabel label="Lot/Bldg/Unit No." value={lotNumber} />
        <InputFloatingLabel label="Street" value={street} />
        <InputFloatingLabel label="Barangay" value={barangay} />
        <InputFloatingLabel label="District" value={district} />
        <InputFloatingLabel label="City" value={city} />
        <InputFloatingLabel label="Province" value={province} />
        <InputFloatingLabel label="Zip Code" value={zipCode} />
    </Grid>
  )
}

export default AgentAddressForm