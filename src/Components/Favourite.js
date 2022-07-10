import React, { Component } from 'react'
import { movies } from "./getmovie";
export default class
    extends Component {
    constructor() {
        super();

        this.state = {
            genreids: {
                28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
                27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
            },

            movie: [],
            currgen: 'All Generes',
            genoption:[],
            tmparr:[]
        }
    }

    async componentDidMount() {
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]"); // collecting data from localstorage into olddata
        this.setState({
            movie: [...oldData],
            tmparr: [...oldData]
        })
        
       let tmp=[];

       oldData.forEach((movieobj) => {
        if(!tmp.includes(this.state.genreids[movieobj.genre_ids[0]])){
            tmp.push(this.state.genreids[movieobj.genre_ids[0]])
        }
       });
       tmp.unshift('All Generes')
        this.setState({
            genoption:[...tmp]
        })
    }


    
    update=()=>{
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]"); // collecting data from localstorage into olddata
        this.setState({
            movie: [...oldData]
        })
        console.log(this.state.movie);

    }

    handleDelet = (idd) => {
        this.setState({
            tmparr: this.state.tmparr.filter((movieobj) => {
                return idd != movieobj.id
            })
        })
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]");
        oldData = oldData.filter((movie) => movie.id != idd);
        localStorage.setItem("movies", JSON.stringify(oldData));
    }

    
    handleGenere=(gen)=>{
        
        if(gen!="All Generes"){
            this.update();
            this.setState({
                currgen:gen,
                tmparr:this.state.movie.filter((movieobj)=>{
                    return gen==this.state.genreids[movieobj.genre_ids[0]]
                })
            })
        }
        else{
            let oldData = JSON.parse(localStorage.getItem('movies') || "[]"); // collecting data from localstorage into olddata
            this.setState({
                tmparr:this.state.movie
            })
            this.setState({
                currgen:gen
            })
        }
        console.log(gen);


    }



    render() {

        return (
            <div>
                <>
                    <div className='main'>
                        <div className='row'>
                            <div className='col-3'>
                                <ul class="list-group mt-3">
                                    {
                                        this.state.genoption.map((gen)=>(
                                            this.state.currgen== gen?
                                            <li class="list-group-item bg-primary fw-bold" style={{color:'white'}} onClick={()=>this.handleGenere(gen)}>{gen}</li>:
                                            <li class="list-group-item"  onClick={()=>this.handleGenere(gen)}>{gen}</li>
                                            
                                        ))
                                    }
                                  

                                </ul>
                            </div>
                            <div className='col-9 row p-3'>
                                <div className='row'>
                                    <input className='input-group-text col-6 mx-2' type="text" placeholder='search' />
                                    <input className='input-group-text col-5 mx-2' type="text" />
                                </div>
                                <table class="table" style={{ color: 'white' }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col"></th>
                                            <th scope="col">Genere</th>
                                            <th scope="col">Pupularity</th>
                                            <th scope="col">rating</th>
                                            <th scope="col"></th>

                                        </tr>
                                    </thead>
                                    <tbody className='align-middle'>
                                        {
                                            this.state.tmparr.map((movieobj) => (

                                                <tr style={{ height: '120px' }}>
                                                    <img className='fav-movie-list mt-2' src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} />

                                                    <td className='col'>{movieobj.original_title}</td>
                                                    <td className='col'>
                                                        <>
                                                            <button type="button" class="btn btn-primary m-1">{this.state.genreids[movieobj.genre_ids[0]]}</button>

                                                        </>
                                                    </td>


                                                    <td className='col'>{movieobj.popularity}</td>

                                                    <td >{movieobj.vote_average}*</td>

                                                    <button type="button" class="btn btn-danger bg-danger mt-2" onClick={() => this.handleDelet(movieobj.id)}>Delet</button>

                                                </tr>

                                            ))
                                        }
                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation  ">
                                    <ul class="pagination d-flex justify-content-center">
                                        <li class="page-item">
                                            <a class="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>
                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item">
                                            <a class="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}
