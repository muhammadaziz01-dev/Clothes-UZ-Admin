
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

interface navListInterface {
    path: string,
    title :string,
    icon: JSX.Element,
}


const navList:navListInterface[] = [
    {
      path:"/home"  ,
      title:"Category",
      icon: <VolunteerActivismIcon />,
    },
    {
        path:"/home/products"  ,
        title:"Products",
        icon: <DryCleaningIcon />,
    },
    {
        path:"/home/users"  ,
        title:"Users",
        icon: <PeopleAltIcon />,
    },
]

export default navList;