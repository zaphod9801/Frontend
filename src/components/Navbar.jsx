import {
    Icon, Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Flex,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react'
import { BiMenu, BiHomeAlt, BiBasket, BiCylinder, BiUser, BiExit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react"
import "./Navbar.css";

export function Navbar() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = React.useState('left')

    let navigate = useNavigate()
    const exit = () => {

        localStorage.removeItem('token');
        navigate('/');

    };

    

    return (
        
        <>
     
     <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Button colorScheme='green' onClick={onOpen}>
        <Icon as={BiMenu} w={10} h={14} mt={1} />
        </Button>
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Nimu</DrawerHeader>
            <DrawerBody>

            <div class="collapse navbar-collapse">
                    <ul class="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                        <li class="nav-item">
                        <Link to={'/inicio'}>  <a class="nav-link pl-0" href="#">Link</a></Link>
                        </li>
                        <li> <a href="#"><i class="fa fa-diamond"></i> <span class="nav-label">Layouts</span></a> </li>
                        <li class="nav-item">
                            <a class="nav-link pl-0" href="#">Link</a>
                        </li>
                    </ul>
                </div>

             <Link to={'/inicio'}>
                    Inicio
                 </Link>
                 <Link to={'/productos'}>
                   
                         Productos
                    
                 </Link>
                 <Link to={'/canecas'}>
                  
                         Canecas
                     
                </Link>
                <Link to={'/perfil'}>
                    
                         Perfil
                  
                 </Link>

            
            </DrawerBody>
            <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' variant='outline' leftIcon={<BiExit />} onClick={exit}
                    > Cerrar Sesión  </Button>
          </DrawerFooter>
          </DrawerContent>
        </Drawer>
        </Flex>
      </>

    );

}