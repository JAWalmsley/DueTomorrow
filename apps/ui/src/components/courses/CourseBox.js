import {
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
    Button
} from '@mui/material';
import React from 'react';

/**
 * @param {Object} course
 *
 */
export class CourseBox extends React.Component {
    render() {
        return (
            <>
                <Card elevation={1}>
                    <CardContent
                        style={{ backgroundColor: this.props.course.colour }}
                    >
                        <Typography
                            variant="h4"
                            component="div"
                            color="textOnColour.main"
                        >
                            {this.props.course.name}
                        </Typography>
                        <Typography color="textOnColour.main">
                            {this.props.course.credits} credits
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent="flex-end">
                            <Button
                                size="large"
                                color="primary"
                                variant="contained"
                                onClick={() => this.props.deleteCourseCallback({
                                    id: this.props.course.id,
                                })}
                            >
                                <Typography variant="button">Delete</Typography>
                            </Button>
                        </Grid>
                    </CardActions>
                </Card>
            </>
        );
    }
}
