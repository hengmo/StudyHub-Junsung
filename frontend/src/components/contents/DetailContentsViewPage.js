import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import {
  withStyles,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Grid,
  Menu,
  MenuItem,
  Snackbar,
} from '@material-ui/core';
import SendMessageDialog from '../MyMessage/SendMessageDialog';
import { AppContext } from '../../contexts/appContext';
import classNames from 'classnames';
import { Group, Place, Update, Category, } from '@material-ui/icons';
import { apiUrl } from '../../helpers/apiClient';
import RequestButton from '../UIElements/RequestButton';

const style = theme => ({
  root: {
    background: '#F7F7F7',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainHeader: {
    width: '100%',
    height: 220,
    marginTop: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
  },
  topContainer: {
    width: '74%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  simpleInformContainer: {
    height: '88%',
    width: '62%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  informTextContainer: {
    marginBottom: 22,
  },
  groupIcon: {
    width: 100,
    height: 50,
    marginBottom: 25,
    color: '#90CAF9',
  },
  leaderBtnContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  userRequestContainer: {
    height: '88%',
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemText: {
    paddingTop: 5,
    fontSize: 15,
    fontWeight: 600,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    margin: 2,
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    width: '74%',
    marginTop: 50,
    marginBottom: 50,
  },
  detailContainer: {
    width: '67%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  detailContent: {
    width: '82%',
    marginBottom: 25,
  },
  avatarIcon: {
    backgroundColor: '#90CAF9',
  },
  naverMap: {
    width: '100%',
    height: 318,
    maxHeight: 350,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    width: '100%',
    height: '97%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class DetailContentsViewPage extends Component {
  static contextType = AppContext;

  state = {
    anchorEl: null,
    anchorParticipantsEle: null,
    messageSendDialogOpen: false,
    sendMessageTo: '',
    sendMessageDialog: null,
  };

  leaderMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  participantMenusOpen = event => {
    this.setState({ anchorParticipantsEle: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ ...this.state, sendMessageTo: '', messageSendDialogOpen: false, anchorEl: null, anchorParticipantsEle: null }, () =>
      this.sendMessageDialog.setToInitialState(),
    );
  };

  handleOpen = index => {
    const { userInfo: { status: loginStatus }, participants, } = this.props;
    const receiver = participants[index].email;
    if (!loginStatus) {
      this.context.actions.snackbarOpenHandler('먼저 로그인 해주세요.', 'warning');
    } else this.setState({ ...this.state, sendMessageTo: receiver, messageSendDialogOpen: true }, this.sendMessageDialog.setToInitialState(receiver));
  };

  userRendering = () => {
    const {
      classes,
      content,
      participants,
      userInfo: { status: loginStatus, email: loginedUserEmail },
      joinStudy,
      leaveStudy,
      deleteStudy,
      buttonLoading,
    } = this.props;

    if (loginStatus) {
      if (content.leader.email === loginedUserEmail) {
        return (
          <RequestButton value="스터디 삭제" buttonLoading={buttonLoading} clickHandler={deleteStudy} />
        );
      } else if (participants.map(user => user.email).includes(loginedUserEmail)) {
        return (
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h6">참여중인 스터디 입니다.</Typography>
            <div className={classes.buttonContainer}>
              <div className={classes.wrapper}>
                <RequestButton value="탈퇴하기" buttonLoading={buttonLoading} clickHandler={leaveStudy} />
              </div>
            </div>
          </div>
        );
      }
      return (
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h6">참여 하시겠습니까?</Typography>
          <div className={classes.buttonContainer}>
            <RequestButton value="참여하기" buttonLoading={buttonLoading} clickHandler={joinStudy} />
          </div>
        </div>
      );
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h6">
          스터디에 참여 하려면
          <br />
          로그인 해주세요.
        </Typography>
      </div>
    );
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  };

  handleButtonClick = () => {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
            });
          }, 2000);
        },
      );
    }
  };

  render() {
    const { classes, content, participants } = this.props;
    const { anchorEl, anchorParticipantsEle, messageSendDialogOpen, sendMessageTo, snackbarOpen } = this.state;
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return (
      <Fragment>
        <div className={classes.root}>
          <div className={classes.mainHeader}>
            <div className={classes.topContainer}>
              <Group className={classes.groupIcon} />
              <div className={classes.simpleInformContainer}>
                <div className={classes.informTextContainer}>
                  <Typography style={{ marginBottom: 13 }}>{new Date(content.createdAt).toLocaleDateString('ko-KR', options)}</Typography>
                  <Typography variant="h4">
                    {content.title.split(' ').map((text, index) => {
                      return (
                        <span key={text}>
                          {`${text} `}
                          {index === 2 && <br />}
                        </span>
                      )
                    })}
                    </Typography>
                </div>
                <div className={classes.leaderBtnContainer}>
                  <Typography style={{ marginRight: 15 }}>주최: {content.leader.name}</Typography>
                </div>
              </div>
              <div className={classes.userRequestContainer}>{this.userRendering()}</div>
            </div>
          </div>
          <div className={classes.mainContainer}>
            <div className={classes.detailContainer}>
              <Card className={classes.detailContent}>
                <CardMedia
                  component="img"
                  alt="coverImg"
                  style={{ width: '100%', height: '48vh', }}
                  src={`${apiUrl}/${content.imageUrl}`}
                />
              </Card>
              <div className={classes.detailContent}>
                <Typography variant="h5" style={{ marginBottom: 15 }}>
                  세부 사항
                </Typography>
                <Typography style={{ width: '88%', fontSize: 18, marginBottom: 25 }} component="p">
                  {`${content.description}`.split('\n').map(str => {
                    return (
                      <span key={str}>
                        {str}
                        <br />
                      </span>
                    );
                  })}
                </Typography>
                <Typography variant="h5" style={{ marginBottom: 15 }}>
                  참석자
                </Typography>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                  <Grid container spacing={16}>
                    <Grid item sm={6} md={4} lg={3}>
                      <Card className={classes.card}>
                        <Button aria-owns={anchorEl ? 'leader-menus' : undefined} aria-haspopup="true" onClick={this.leaderMenuOpen}>
                          <Avatar style={{ width: 73, height: 73, marginTop: 12 }} src={`${apiUrl}/${content.leader.profileImg}`} />
                        </Button>
                        <Menu id="leader-menus" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                          <MenuItem onClick={() => this.handleOpen(content.leader.email)}>쪽지 보내기</MenuItem>
                        </Menu>
                        <CardContent style={{ textAlign: 'center' }}>
                          <Typography gutterBottom fontWeight="fontWeightMedium">
                            {content.leader.name}
                          </Typography>
                          <Typography style={{ fontSize: 15 }}>스터디장</Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    {participants.map((user, index) => (
                      <Grid item key={user.name} sm={6} md={4} lg={3}>
                        <Card className={classes.card}>
                          <Button
                            aria-owns={anchorParticipantsEle ? 'participants-menus' : undefined}
                            aria-haspopup="true"
                            onClick={this.participantMenusOpen}
                          >
                            <Avatar style={{ width: 73, height: 73, marginTop: 12 }} src={`${apiUrl}/${user.profileImg}`} />
                          </Button>
                          <Menu
                            id="participants-menus"
                            anchorEl={anchorParticipantsEle}
                            open={Boolean(anchorParticipantsEle)}
                            onClose={this.handleClose}
                          >
                            <MenuItem onClick={() => this.handleOpen(index)}>쪽지 보내기</MenuItem>
                          </Menu>
                          <CardContent style={{ textAlign: 'center' }}>
                            <Typography gutterBottom fontWeight="fontWeightMedium">
                              {user.name}
                            </Typography>
                            <Typography style={{ fontSize: 15 }}>스터디원</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </div>
            </div>
            <Card style={{ width: '29%', height: '80%', maxWidth: 373, }}>
              <CardContent style={{ padding: 0 }}>
                <List style={{ minWidth: 180 }}>
                  <ListItem>
                    <Avatar className={classes.avatarIcon}>
                      <Update />
                    </Avatar>
                    <ListItemText primary="날짜" secondary={<Typography className={classes.listItemText}>{new Date(content.createdAt).toLocaleDateString('ko-KR', options)}</Typography>} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Avatar className={classes.avatarIcon}>
                      <Place />
                    </Avatar>
                    <ListItemText primary="장소" secondary={<Typography className={classes.listItemText}>{content.studyLocation}</Typography>} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Avatar className={classes.avatarIcon}>
                      <Category />
                    </Avatar>
                    <ListItemText primary="분류" secondary={<Typography className={classes.listItemText}>{`${content.categories}`}</Typography>} />
                  </ListItem>
                </List>
              </CardContent>
              <div id="naverMap" className={classes.naverMap} />
            </Card>
          </div>
        </div>
        <SendMessageDialog
          innerRef={element => (this.sendMessageDialog = element)}
          handleClose={this.handleClose}
          initialRecipientEmail={sendMessageTo}
          open={messageSendDialogOpen}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbarOpen}
          onClose={() => this.handleClose()}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">메시지 전송에 성공했습니다.</span>}
        />
      </Fragment>
    );
  }
}

DetailContentsViewPage.propTypes = {
  classes: propTypes.object.isRequired,
  content: propTypes.object.isRequired,
  participants: propTypes.array.isRequired,
  userInfo: propTypes.object.isRequired,
  joinStudy: propTypes.func.isRequired,
};

export default withStyles(style)(DetailContentsViewPage);
