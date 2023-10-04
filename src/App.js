import logo from './logo.svg';
import './App.css';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';

import {yupResolver} from "@hookform/resolvers/yup"

import * as yup from "yup"


const schema = yup.object({
  firstName : yup.string().required(),
  age: yup.number().positive().integer().required()
}).required();

function App() {

  const fetchTodos = async({pageParams = 1}) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${pageParams}`)

    if (res.ok) {
      const result = await res.json();
      return result;
    }
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: fetchTodos,
    getNextPageParam: (lastPage, pages) =>{
      // console.log('lastpage', lastPage);

      return lastPage.id + 1;
    },
  })

  console.log(process.env.REACT_APP_P_VALUE)

  const {register, handleSubmit, watch, control, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => console.log(data);

  console.log(errors);

  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      <button onClick={() => fetchNextPage()}>Click</button>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <p>{errors.firstName?.message}</p>
      <p>develop branch feature</p>
        
      <input {...register("age")} />
      <p>{errors.age?.message}</p>
      <input type='submit'/>
      </form>
      <p>VALUE: {process.env.REACT_APP_P_VALUE}</p>
      <p>stash fix/app_text test</p>
      </header>
    </div>
  );
}

export default App;
