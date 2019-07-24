import React, { Component } from 'react';
import { withStyles, AppBar, Toolbar, Button, } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Avatar from './Avatar/Avatar';
import { AppContext } from '../../../contexts/appContext';

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: 1,
  },
  appBar: {
    backgroundColor: '#263238',
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    color: '#90CAF9',
    fontSize: 20,
    fontWeight: 500,
    textDecoration: 'none',
  },
  button: {
    fontSize: 18,
    fontWeight: 500,
  },
  toolbar: {
    maxHeight: '64px',
  },
};

class TopAppBar extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      categories: ['영어', '일본어', '중국어', '회화', '취업준비', '면접', '자기소개서', '프로젝트', '코딩 테스트', '전공', '인적성&NCS'],
    }
  }

  render() {
    const { classes, } = this.props;
    const { status: loginStatus } = this.context.state.userInfo;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <div className={classes.grow}>
              <Link className={classes.link} to="/">
                STUDYHUB
              </Link>
            </div>
            <Button className={classes.button} component={Link} to="/contents" style={{ color: '#FFFFFF' }}>
              스터디 찾기
            </Button>
            {loginStatus === false ? (
              <div>
                <Button className={classes.button} component={Link} to="/signup" style={{ color: '#90CAF9' }}>
                  회원가입
                </Button>
                <Button className={classes.button} component={Link} to="/signin" style={{ color: '#FFFFFF' }}>
                  로그인
                </Button>
              </div>
            ) : (
              <Avatar />
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(TopAppBar);
