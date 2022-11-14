
import React, { useEffect, useState} from "react";
import PostService from "./API/PostService";
import './App.css';
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/myModal/MyModal";
import { usePosts } from "./hooks/usePosts";




const App=()=>{
  const [posts, setPosts]= useState([]);
  const [filter, setfilter]= useState({sort:'', query:''});
  const [modal, setModal]= useState(false);
  const searchedAndSortedPost = usePosts(posts, filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading]= useState(false);


  useEffect(()=>{
    fetchPosts()
  }, [])

 const createPost= (newPost)=>{
  setPosts([...posts, newPost])
  setModal(false);
 }

 async function fetchPosts(){
  setIsPostsLoading(true);
  const posts = await PostService.getAll();
  setPosts(posts)
  setIsPostsLoading(false)
 }
//Получаем из post дочернего элемента
 const removePost = (post)=>{
     setPosts(posts.filter(p => p.id !== post.id))
 }
 
  return(
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={()=> setModal(true)}>
        Создать пользователя
      </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
        
            <hr style={{margin: '15px 0' }}/>
        <PostFilter filter={filter}
            setFilter={setfilter} 
            />
        {isPostsLoading
           ?<h1>Идет загрузка...</h1>
           :<PostList remove={removePost} posts={searchedAndSortedPost} title="Посты про JS"/>
        }
        
    </div>


  )
};

export default App ;