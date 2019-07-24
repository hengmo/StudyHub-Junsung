import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemsCarousel from 'react-items-carousel';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  withStyles,
  Avatar,
} from '@material-ui/core';
import { ArrowForward, ArrowBack, } from '@material-ui/icons'
import Dotdotdot from 'react-dotdotdot'
import { apiUrl } from '../../helpers/apiClient';
import { AppContext } from '../../contexts/appContext';

const style = theme => ({
  actionArea: {
    width: '97%',
    padding: 1,
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

class ContentsCarousel extends Component {
  static contextType = AppContext;

  componentWillMount() {
    this.setState({
      activeItemIndex: 0,
    });
  }

  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

  render() {
    const { activeItemIndex, } = this.state;
    const { classes, contents, } = this.props;

    return (
      <ItemsCarousel
        // Carousel configurations
        numberOfCards={4}
        gutter={30}
        showSlither={false}
        firstAndLastGutter={false}
        freeScrolling={false}
        slidesToScroll={4}

        // Active item configurations
        requestToChangeActive={this.changeActiveItem}
        activeItemIndex={activeItemIndex}
        activePosition={'center'}

        chevronWidth={10}
        rightChevron={<Avatar style={{ background: '#90CAF9' }}><ArrowForward /></Avatar>}
        leftChevron={<Avatar style={{ background: '#90CAF9' }}><ArrowBack /></Avatar>}
        outsideChevron={false}
      >
        {contents.filter((content, index) => index < 12).map((content, index) => (
          <CardActionArea className={classes.actionArea} key={content.id}>
            <Card className={classes.card}>
              <Link to={`/detail/${content.id}`} style={{ textDecoration: 'none' }}>
                <CardMedia className={classes.cardMedia} image={`${apiUrl}/${content.imageUrl}`} title={content.title} />
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
        ))}
      </ItemsCarousel>
    );  
  }
}

export default withStyles(style)(ContentsCarousel);