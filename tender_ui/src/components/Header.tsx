
// import { Container, Group, Text } from '@mantine/core';
// import { NavLink } from 'react-router-dom';

// const Header = () => {
//   return (
//     <header className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
//       <Container size="xl" className="py-4">
//         <Group  align="center">
//           {/* Logo text */}
//           <Text size="xl" className="text-blue-600">
//             TenderSys
//           </Text>

//           {/* Right-side content */}
//           <Text size="sm" className="text-gray-600">
//             Admin Panel
//           </Text>
//         </Group>

//         <NavLink
//               to="/tender-list"
//               className={({ isActive }) =>
//                 `text-sm font-medium ${
//                   isActive ? 'text-blue-600 underline' : 'text-gray-600'
//                 }`
//               }
//             >
//               View Tenders
//             </NavLink>
//       </Container>
//     </header>
//   );
// };

// export default Header;






import { Container, Group, Text, Button } from '@mantine/core';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
      <Container size="xl" className="py-4">
        <Group align="center" >
          {/* Left: Logo and Panel Title */}
          <Group >
            <Text size="xl"  className="text-blue-600">
              TenderSys
            </Text>
            {/* <Text size="sm" className="text-gray-600">
              Admin Panel
            </Text> */}

            <NavLink to="/">
              <Button size="xs" variant="outline" color="gray">
                Home
              </Button>
            </NavLink>
          </Group>

          {/* Right: Button */}
          <NavLink to="/tender-list" className='absolute right-20'>

            <Button size="xs" variant="outline" color="blue">
              View Tenders
            </Button>
          </NavLink>
        </Group>
      </Container>
    </header>
  );
};

export default Header;



