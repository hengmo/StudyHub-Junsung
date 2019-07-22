import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import movie from '../../images/main-video.mp4';
import classNames from 'classnames';
import {
  Button,
  Typography,
  withStyles,
} from '@material-ui/core';
import LoadingProgress from '../UIElements/LoadingProgress';
import ContentsCarousel from './ContentsCarousel';

const styles = theme => ({
  heroUnit: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
  },
  textButtonContainer: {
    top: 220,
    position: 'absolute',
    textAlign: 'center',
    [theme.breakpoints.up(1540)]: {
      top: 280,
    },
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  mainContainer: {
    top: -380,
    width: '100%',
    marginBottom: -380,
    background: '#FFFFFF',
    position: 'relative',
    [theme.breakpoints.up(1540)]: {
      top: -500,
      marginBottom: -500,
    },
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
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
});

const TemplateViewPage = props => {
  const { classes, contents, contentsByDistance, loadingCompleted, lat, lng, loginStatus } = props;
  return (
    <>
      {loadingCompleted ? (
        <Fragment>
          <div className={classes.heroUnit}>
            <div className={classes.videoContainer}>
              <video loop autoPlay={true} style={{ width: '100%', zIndex: 0 }}>
                <source type="video/mp4" data-reactid=".0.1.0.0.0" src={movie} />
              </video>
            </div>
            <div className={classes.textButtonContainer}>
              <Typography variant="h4" style={{ color: 'white', fontWeight: 600 }}>
                함께 하는 스터디의 동기부여
              </Typography>
              <Typography variant="h6" style={{ color: 'white' }}>
                손 쉽게 스터디그룹을 만들거나 참여할 수 있습니다.
              </Typography>
              <div className={classes.heroButtons}>
                {loginStatus ? (
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/write?lat=${lat}&lng=${lng}`}
                    color="primary"
                    style={{
                      fontSize: '2.5vh',
                      textDecoration: 'none',
                      width: '260px',
                    }}
                  >
                    스터디 작성하기
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    component={Link}
                    to="/signup"
                    color="primary"
                    style={{
                      fontSize: '2.5vh',
                      textDecoration: 'none',
                      width: '260px',
                    }}
                  >
                    스터디허브 가입하기
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className={classes.mainContainer}>
            <div className={classNames(classes.layout, classes.cardGrid)}>
              <Typography>지금 모집중인 스터디</Typography>
              <ContentsCarousel contents={contents}/>
            </div>
            <div className={classNames(classes.layout, classes.cardGrid)}>
              <Typography>내 주변 스터디</Typography>
              <ContentsCarousel contents={contentsByDistance}/>
            </div>
          </div>
        </Fragment>
      ) : (
        <LoadingProgress />
      )}
    </>
  );
};

TemplateViewPage.propTypes = {
  classes: PropTypes.object.isRequired,
  contents: PropTypes.array.isRequired,
  contentsLatest: PropTypes.array.isRequired,
  contentsByDistance: PropTypes.array.isRequired,
  contentsByViews: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  loadingCompleted: PropTypes.bool.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  loginStatus: PropTypes.bool.isRequired,
};

export default withStyles(styles)(TemplateViewPage);
