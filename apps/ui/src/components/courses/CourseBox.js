import {
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogContent,
    DialogContentText,
    TextField,
    IconButton,
    DialogTitle,
    Snackbar,
    DialogActions,
    Switch,
    FormGroup,
    FormControlLabel
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import React from 'react';
import { APICreateCode } from '../../api';

/**
 * @param {Object} course
 *
 */
export function CourseBox(props) {
    const linkPrefix = window.location.host + "/share?code="

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [code, setCode] = React.useState('bas');
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [editorSharecode, setEditorSharecode] = React.useState(true);
    const menuOpen = Boolean(anchorEl);
    const menuClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const menuClose = () => { setAnchorEl(null); }
    const dialogClose = () => { setDialogOpen(false); }
    
    const toggleSharecodeEditor = async function(event) {
        setEditorSharecode(event.target.checked);
        let response = await APICreateCode({ courseids: [props.course.id,], userid: localStorage.getItem('userid'), editor: event.target.checked });
        setCode(response);
    }

    const copyCode = () => {
        navigator.clipboard.writeText(linkPrefix + code);
        setSnackbarOpen(true);
    }
    return (
        <>
            <Card elevation={1}>
                <CardContent
                    style={{ backgroundColor: props.course.colour }}
                >
                    <Typography
                        variant="h4"
                        component="div"
                        color="textOnColour.main"
                    >
                        {props.course.name}
                    </Typography>
                    <Typography color="textOnColour.main">
                        {props.course.credits} credits
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container justifyContent="flex-end">
                        <Button id="menu-button"
                            aria-controls={menuOpen ? 'menu-button' : undefined}
                            aria-haspopup="true"
                            aria-expanded={menuOpen ? 'true' : undefined}
                            onClick={menuClick}
                            variant="filled">
                            <MoreVertIcon />
                        </Button>
                        <Menu anchorEl={anchorEl} anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={menuOpen} onClose={menuClose} MenuListProps={{ 'aria-labelledby': 'menu-button' }}>
                            <MenuItem onClick={async () => {
                                // Generate share code here
                                // TODO: configure sharecode editor
                                let response = await APICreateCode({ courseids: [props.course.id,], userid: localStorage.getItem('userid'), editor: true });
                                setCode(response);
                                setDialogOpen(true);
                                menuClose();
                            }}>
                                <ListItemIcon><ShareOutlinedIcon /></ListItemIcon>
                                <ListItemText>Share</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                props.deleteCourseCallback({
                                    id: props.course.id,
                                });
                                menuClose();
                            }}>
                                <ListItemIcon><DeleteIcon color="error" /></ListItemIcon>
                                <ListItemText><Typography color="error">Delete</Typography></ListItemText>
                            </MenuItem>
                        </Menu>
                    </Grid>
                </CardActions>
            </Card>
            <Dialog
                open={dialogOpen}
                onClose={dialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <IconButton
                        aria-label="close"
                        onClick={dialogClose}
                        sx={{
                            position: 'absolute',
                            right: 4,
                            top: 4,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{marginTop: '16px'}}>
                    <DialogContentText id="alert-dialog-description">
                        Share <b>{props.course.name}</b> with others by giving them this link:
                    </DialogContentText>
                    <TextField value={linkPrefix + code} onChange={console.log} style={{ width: '100%', marginTop: '8px' }} InputProps={{ endAdornment: <Button variant="filled" onClick={copyCode}><ContentCopyIcon /></Button> }} />
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={editorSharecode} onChange={toggleSharecodeEditor} color="success" />} label="Allow others to edit this course" />
                    </FormGroup>
                </DialogContent>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                message="Link copied"
                onClose={() => setSnackbarOpen(false)}
            />
        </>
    );
}
