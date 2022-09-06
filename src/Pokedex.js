import React, { useEffect } from 'react';
import { AppBar, Toolbar, Grid, Card, CardMedia, CardContent, CircularProgress, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import { useState } from 'react';
import { toFirstCharUppercase } from './constants';

const useStyle = makeStyles({
    pokedexContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px',
    },
    cardMedia: {
        margin: 'auto',
    },
    cardContent: {
        textAlign: 'center',
    },
});



const Pokedex = props => {
    const { history } = props;
    const classes = useStyle();
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState('');

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    }


    useEffect(() => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=50`)
        .then(function(response) {
            const {data} = response;
            const { results } = data;
            const newPokemonData = {};
            results.forEach((pokemon, index) => {
                newPokemonData[index + 1] = {
                   id: index + 1,
                   name: pokemon.name,
                   sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    index + 1
                  }.png`,
                };
            });
            setPokemonData(newPokemonData)
        })
    }, [])
    

const getPokemonCard = (pokemonId) => {
    console.log(pokemonData[`${pokemonId}`]);
    const {id, name, sprite } = pokemonData[pokemonId];

    return(
        <Grid item xs={4} key={pokemonId} >
            <Card onClick = {() => history.push(`/${pokemonId}`)} >
                <CardMedia 
                className={classes.cardMedia}
                image={sprite}
                style={{width: '130px', height: '130px'}}
                />
                <CardContent calssName={classes.cardContent}>
                    <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}


    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <div>
                        <SearchIcon />
                        <TextField 
                            onChange={handleSearchChange}
                            placeholder='pokemon'
                        />
                    </div>
                </Toolbar>
            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).map(
                        (pokemonId) =>
                            pokemonData[pokemonId].name.includes(filter)
                         &&
                            getPokemonCard(pokemonId))}
                    
                </Grid>

            ) : (
                <CircularProgress />
            )}
        </div>
    )
}

export default Pokedex;