import HeadLine from '../components/HeadLine'
import Box from '@mui/material/Box';
import TextInput from '../components/InputFields/TextInput';
const AddEmployee = () => {
    return (
        <Box>
         <HeadLine text={"Add New Employee"}/>
         <form>
         <TextInput
              label={"First Name"}
              
     />
         <TextInput
              label={"Middle Name"}
     />
         <TextInput
              label={"Last Name"}
     />
         <TextInput
              label={"Email"}

     />
         <TextInput
              label={"Password"}
     />
         <TextInput
              label={"Gender"}
     />
         </form>
        </Box>
    );
};

export default AddEmployee;