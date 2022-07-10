import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';
export default class
  extends Component {



    async componentDidMount() {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=fbcaa7fe1fbf66408921f748a4974708&language=en-US&page=${this.state.currPage}`)  // sending req through link ,    await used to wait until response come, if use await the async also add before componenet did mount [IMP]
      let data = res.data  // getting results
      this.setState({
        movies: [...data.results]
      })
      // console.log(data)
  
  
    }

  render() {
    return (
      <div className='cardbgm d-flex flex-row mb-3 position-relative ' style={{height:'80px'}}>
      <Link to="/" className='nbar'>
      <h1 className=' d-flex align-items-center  mx-5'>Movies app</h1>
      </Link>
      <Link to='/favourites' className='nbar'>
      <h2 className='d-flex align-items-center mt-2'>
      favourites
      </h2>
      </Link>
        
        </div>
      
    )
  }
}
