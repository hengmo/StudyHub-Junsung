import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, Card, CardContent, CardMedia, Grid, Typography, CardActionArea, } from '@material-ui/core';
import Dotdotdot from 'react-dotdotdot'
import { apiUrl } from '../../helpers/apiClient';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});

const ContentsListViewPage = props => {
  const { classes, contents } = props;
  return (
    <main className={classes.root}>
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40}>
          {contents.map(content => (
            <Grid item sm={6} md={4} lg={3} key={content.id}>
              <CardActionArea className={classes.actionArea} key={content.id}>
                <Card className={classes.card}>
                  <Link to={`/detail/${content.id}`} style={{ textDecoration: 'none' }}>
                    <CardMedia className={classes.cardMedia} image={`${apiUrl}/${content.imageUrl}`} title="Image title" />
                    <CardContent className={classes.cardContent}>
                      <Typography component={'span'} style={{ fontSize: 24,}}>
                        <Dotdotdot clamp={2}>
                          {`${content.title}`.split(' ').map((text, index) => {
                            return (
                              <span key={text}>
                                {`${text} `}
                                {index === 1 && <br />}
                              </span>
                            )
                          })}
                        </Dotdotdot>
                      </Typography>
                    </CardContent>
                  </Link>
                  <Typography style={{ paddingLeft: 16, paddingBottom: 8, }}>
                    {content.categories[0]}
                  </Typography>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </div>
    </main>
  );
}

ContentsListViewPage.propTypes = {
  classes: PropTypes.object.isRequired,
  contents: PropTypes.array.isRequired,
};

export default withStyles(styles)(ContentsListViewPage);
