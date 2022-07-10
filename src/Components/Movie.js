import React, { Component } from 'react'
// import { movies } from './getmovie'
import axios from 'axios';

export default class Movie extends Component {

  constructor() {
    super();
   
    this.state = {
      hover: '',
      currPage: 1,
      movies: [],
      favourites:[],
      
    }
  }




  async componentDidMount() {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=fbcaa7fe1fbf66408921f748a4974708&language=en-US&page=${this.state.currPage}`)  // sending req through link ,    await used to wait until response come, if use await the async also add before componenet did mount [IMP]
    let data = res.data  // getting results


    let oldData = JSON.parse(localStorage.getItem('movies') || "[]"); // collecting data from localstorage into olddata
    let temp=oldData.map((movie)=>movie.id); 
    this.setState({
      movies: [...data.results],
      favourites:[...temp]
    })
    // console.log(data)


  }
  changePage=async()=>{  // this function is used to update cards after update the page
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=fbcaa7fe1fbf66408921f748a4974708&language=en-US&page=${this.state.currPage}`)  // sending req through link ,    await used to wait until response come, if use await the async also add before componenet did mount [IMP]
    let data = res.data  // getting results
    this.setState({
      movies: [...data.results]
    })
  }

  handleNext=()=>{
    this.setState({
      currPage:this.state.currPage +1  //curpage updation
    },this.changePage)   // after updation call the fucntion
    
  }
  handlePrev=()=>{
    this.state.currPage>1?
    this.setState({
      currPage:this.state.currPage -1
    },this.changePage):
    this.setState({
      currPage:1
    },this.changePage)


  }

  handleFavourite=(m)=>{
    let oldData = JSON.parse(localStorage.getItem('movies') || "[]"); // collecting data from localstorage into olddata
    if(this.state.favourites.includes(m.id)){       // if button clicked, the movie is in localstorage, then remove it using filter 
        oldData=oldData.filter((movie)=>movie.id!=m.id)
    }
    else{
      oldData.push(m);       // add the movie in olddata
    }
    localStorage.setItem("movies",JSON.stringify(oldData));   // after updation olddata , put this again back in localstorage
    console.log(oldData);
    this.handleFavouritesState();
  }

    handleFavouritesState=()=>{
      let oldData = JSON.parse(localStorage.getItem('movies') || "[]"); // collecting data from localstorage into olddata
      let temp=oldData.map((movie)=>movie.id);  // collecting the id's of movies present in localstorage and put it in fav state defined in constructor

      this.setState({
        favourites:[...temp]
      })
    }





  render() {


    return (

      <>
        {
          this.state.movies.length == 0 ?
            <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div> :

            <div className='position-relative' style={{ height: '6rem' }}>
              <h1 className='position-absolute top-50 start-50 translate-middle mt-2' style={{ color: 'white' }}>Trending</h1>
            </div>

        }
        
        {

          this.state.movies.map((movieobj) => (



            <div className="card d-flex flex-column p-3 float-start my-4 mx-2 cardbgm rounded boxdesign" style={{ width: '20rem' }} onMouseEnter={() => this.setState({ hover: movieobj.id })} onMouseLeave={() => this.setState({ hover: '' })} >
              <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} alt={movieobj.title} className="h-100" />

              <div className="card-body  mt-1 " style={{ position: 'absolute' }}>
                <h4 className="card-title"  >{movieobj.original_title}</h4>
                {

                  this.state.hover == movieobj.id &&
                  <button href="#" onClick={()=>this.handleFavourite(movieobj)} className="btn btn-primary d-flex align-items-end fs-6" style={{ width: '12rem' }}>{this.state.favourites.includes(movieobj.id)?"Remove from":"Add to"} Favourite</button>

                }
              </div>
            </div>
          ))

        }
        
        {
          <div>
            <div className='fixed-bottom page' >
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item" onClick={this.handlePrev}><a class="page-link" href="#">Previous</a></li>
                  <li class="page-item"><a class="page-link" href="#">{this.state.currPage}</a></li>
  
                  <li class="page-item"  onClick={this.handleNext} ><a class="page-link" href="#">Next</a></li>
                </ul>
              </nav>
            </div>
          </div>

        }
      </>


    )
  }
}
