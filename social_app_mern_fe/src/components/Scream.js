import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import ThemeLight from "../ThemeLight";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import DeleteScream from "./DeleteScream";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";

const styles = theme => ({
    ...theme.spreadit
});

//TODO like unlike 08.26
export class Scream extends Component {
    constructor() {
        super();
        this.state = {
            theme: ThemeLight
        };
    }

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            scream: {
                body,
                createdAt,
                userImage,
                userHandle,
                screamId,
                postImage
            },
            user: {
                authenticated,
                credentials: { handle }
            }
        } = this.props;

        const deleteButton =
            authenticated && userHandle == handle ? (
                <DeleteScream screamId={screamId} />
            ) : null;
        return (
            <Card className={classes.card} raised>
                <CardContent className={classes.content}>
                    <div className={classes.title}>
                        <Avatar
                            alt="Profile Picture"
                            src={userImage}
                            className={classes.image}
                        />
                        <Typography
                            variant="h5"
                            component={Link}
                            to={`/users/${userHandle}`}
                            color="primary"
                            className={classes.titleContent}
                        >
                            {userHandle}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="secondary"
                            className={classes.titleDate}
                        >
                            &middot; {dayjs(createdAt).fromNow()}
                        </Typography>
                        {deleteButton}
                    </div>
                    {postImage ? (
                        <Fragment>
                            <Typography variant="body1">{body}</Typography>
                            <img src={postImage} className={classes.square} />
                        </Fragment>
                    ) : (
                        <Avatar variant="square" className={classes.square}>
                            {body}
                        </Avatar>
                    )}
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {})(withStyles(styles)(Scream));
