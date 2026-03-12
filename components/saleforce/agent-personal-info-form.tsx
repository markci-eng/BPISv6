import { Grid } from '@chakra-ui/react'
import { InputFloatingLabel } from 'st-peter-ui'

interface AgentPersonalInfoFormProps {
    dateOfBirth: string,
    placeOfBirth: string,
    nationality: string,
    naturalizationDate: string,
    gender: string, 
    civilStatus: string,
    height: string,
    weight: string
}

const AgentPersonalInfoForm = (props: AgentPersonalInfoFormProps) => {
    const { dateOfBirth, placeOfBirth, nationality, naturalizationDate, gender, civilStatus, height, weight, ...rest } = props;

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="2">
        <InputFloatingLabel label="Date of Birth" value={dateOfBirth} />
        <InputFloatingLabel label="Place of Birth" value={placeOfBirth} />
        <InputFloatingLabel label="Nationality" value={nationality} />
        <InputFloatingLabel label="Naturalization Date" value={naturalizationDate} />
        <InputFloatingLabel label="Gender" value={gender} />
        <InputFloatingLabel label="Civil Status" value={civilStatus} />
        <InputFloatingLabel label="Height" value={height} />
        <InputFloatingLabel label="Weight" value={weight} />
    </Grid>
  )
}

export default AgentPersonalInfoForm