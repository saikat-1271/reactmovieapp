import { movies } from "./getmovie";



// after pastinf bootstrap css link in public/index.html

import React, { Component } from 'react'

export default class Banner extends Component {
    constructor() {
        super();
        this.state = {
            hover: 0,
            movies: []
        }
    }

    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=fbcaa7fe1fbf66408921f748a4974708&language=en-US&page=${this.state.currPage}`)  // sending req through link ,    await used to wait until response come, if use await the async also add before componenet did mount [IMP]
        let data = res.data  // getting results
        this.setState({
            movies: [...data.results]
        })
        // console.log(data)


    }

    render() {

        let movie= movies.results[0];
        let movie1= movies.results[1];

        return (
            <>
                {
                    movie == '' ?
                        <div className="spinner-grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :

                        <div className="card" style={{ position: 'relative' }} onMouseEnter={() => this.setState({ hover: 1 })} onMouseLeave={() => this.setState({ hover: '' })} >
                            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} className="card-img-top banner-img" />

                            <div className="card-body banner-text" >
                                <h1 className="card-title ">{movie.original_title}</h1>
                                <h5 className="card-text ">{movie.overview}</h5>

                            </div>
                        </div>


                }
            </>
        )
    }
}
