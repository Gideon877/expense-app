import React from 'react'
import { List, ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material'

const ListMenuIcon = ({ list, open, active, setActive}) => {
    return (
        <List>
            {list.map((item, index) => (
                <ListItem key={item.text} disablePadding sx={{ display: 'block' }} onClick={()=>setActive(item.text)}>
                    <ListItemButton
                    selected={active === item.text}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}

export default ListMenuIcon