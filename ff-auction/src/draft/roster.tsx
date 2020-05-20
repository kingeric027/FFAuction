import React from 'react';
import { Category, Catalog } from 'ordercloud-javascript-sdk';
import { TableRow, TableCell, Table, Paper, TableBody, Typography, ListItemText, List, makeStyles } from '@material-ui/core';
import SortableTableHead, { TableColumn } from '../common/table/sortableTableHeader';
import { DraftedPlayer } from './playerTable/draftPlayerForm';
import EditPicks from './editPicks';

const useStyles = makeStyles(() => ({
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        }
    }
))

interface RosterProps {
    team: Category,
    league: Catalog
}

const Roster: React.FunctionComponent<RosterProps> = (props) => {
    const {team, league} = props;
    const classes = useStyles();
    
    const headCells: TableColumn[] = [
        {id: 'position', numeric: false, disablePadding: true, label: 'Position'},
        {id: 'name', numeric: false, disablePadding: true, label: 'Name'},
        {id: 'amount', numeric: true, disablePadding: true, label: 'Amount'}
    ]

    const positionSort = (a: any, b: any) => {
        //want qb, rb, wr, te, dst, k
        const positionOrder: any = {
            "QB": 1,
            "RB": 2,
            "WR": 3,
            "TE": 4,
            "DST": 5,
            "K": 6
        };

        if(positionOrder[a.position] < positionOrder[b.position]) {
            return -1;
        } else if(positionOrder[a.position] > positionOrder[b.position]) {
            return 1;
        } 
        return 0;
    }

    return (
        <Paper>
            <div>
                <Typography variant="h6">{team.Name}</Typography>
                {team.xp.Players &&  team.xp.Players.length  && 
                    <EditPicks team={team} league={league}></EditPicks>
                }
                <List dense={true} disablePadding={true} className={classes.flexContainer}>
                    <ListItemText 
                        primary={team.xp.Players.filter((p: DraftedPlayer) => p.position === "QB").length}
                        secondary="QB">    
                    </ListItemText>
                    <ListItemText 
                        primary={team.xp.Players.filter((p: DraftedPlayer) => p.position === "RB").length}
                        secondary="RB">    
                    </ListItemText>
                    <ListItemText 
                        primary={team.xp.Players.filter((p: DraftedPlayer) => p.position === "WR").length}
                        secondary="WR">    
                    </ListItemText>
                    <ListItemText 
                        primary={team.xp.Players.filter((p: DraftedPlayer) => p.position === "TE").length}
                        secondary="TE">    
                    </ListItemText>
                    <ListItemText 
                        primary={team.xp.Players.filter((p: DraftedPlayer) => p.position === "DST").length}
                        secondary="DST">    
                    </ListItemText>
                    <ListItemText 
                        primary={team.xp.Players.filter((p: DraftedPlayer) => p.position === "K").length}
                        secondary="K">    
                    </ListItemText>
                </List>
                <Table stickyHeader
                    size="small"
                    aria-labelledby="tableTitle">
                    <SortableTableHead columns={headCells}></SortableTableHead>
                    <TableBody>
                        {team.xp.Players && team.xp.Players.sort(positionSort).map((player: DraftedPlayer) => (
                            <TableRow tabIndex={-1} key={player.id}>
                                <TableCell>{player.fullName}</TableCell>
                                <TableCell>{player.position}</TableCell>
                                <TableCell>{player.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Paper>
    )
}

export default Roster;