import { Heading, Divider, useTheme } from '@aws-amplify/ui-react';


export default function MyHeading(props){
    const { tokens } = useTheme();
    return(
    <div style = {{ maxWidth: '1200px', margin: '30px auto 0 auto' }}>
        <Heading level = {2} color = {tokens.colors.brand.primary[80]}><i>{props.title}</i></Heading>
        <Divider  border={`${tokens.borderWidths.large} solid ${tokens.colors.brand.primary[80]}`}/>
    </div>
    )
    
}