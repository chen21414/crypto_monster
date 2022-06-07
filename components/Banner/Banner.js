import { Container } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel'

const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./banner2.jpg)",
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    }
}))

const Banner = () => {
  const classes = useStyles()

  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
            <Typography
            variant='h2'
            style={{
                fontWeight: "bold",
                marginBottom: 15,
                fontFamily: "Montserrat",
                color:'white'
            }}
            >
                Crypto Monster
            </Typography>
            <Typography
            variant='subtitle2'
            style={{
                fontWeight: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "Montserrat",
                color:'white'
            }}
            >
                Get all the Info regarding your favorite Crypto Currency
            </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner