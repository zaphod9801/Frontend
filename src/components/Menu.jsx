import {
    Icon, Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { BiMenu, BiHomeAlt, BiBasket, BiCylinder, BiUser, BiExit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

export function MenuH() {

    let navigate = useNavigate()
    const exit = () => {

        localStorage.removeItem('token');
        navigate('/');

    };

    return (

        <Menu >
            <MenuButton
                as={Button}
                variant='solid'
                colorScheme='green'
                m={2}
                pb={2}
                size='lg'
            >
                <Icon as={BiMenu} w={10} h={10} mt={4} />
            </MenuButton>
            <MenuList bgColor="orange.100" color="green" h="450px">
                <Link to={'/inicio'}>
                    <MenuItem icon={<BiHomeAlt />} >
                        Inicio
                    </MenuItem>
                </Link>
                <Link to={'/productos'}>
                    <MenuItem icon={<BiBasket />} >
                        Productos
                    </MenuItem>
                </Link>
                <Link to={'/canecas'}>
                    <MenuItem icon={<BiCylinder />} >
                        Canecas
                    </MenuItem>
                </Link>
                <Link to={'/perfil'}>
                    <MenuItem icon={<BiUser />} >
                        Perfil
                    </MenuItem>
                </Link>

                <MenuItem mt={60}>
                    <Button colorScheme='red' variant='outline' leftIcon={<BiExit />} onClick={exit}
                    > Cerrar Sesión  </Button>
                </MenuItem>
            </MenuList>
        </Menu>
    )

}