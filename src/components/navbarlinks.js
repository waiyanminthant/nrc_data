import { useState } from 'react';
import { Box, NavLink } from '@mantine/core';
import { useRouter } from 'next/router';

const links = [
    { label: 'NRC Checker', url: '/' },
];


export default function NavbarLinks() {
    const [active, setActive] = useState(0);
    
  const router = useRouter()

    const items = links.map((item, index) => (
        <NavLink
            key={item.label}
            active={true}
            label={item.label}
            onClick={() => setActive(index)}
        />
    ));

    return <Box sx={{ width: 220 }}>{items}</Box>;
}