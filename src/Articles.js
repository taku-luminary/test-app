import styles from "./App.module.css";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Articles() {
  const formatDate = (iso) =>
   new Date(iso).toLocaleDateString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric' });

  const [posts, setPosts] = useState([])
  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")
      const data = await res.json()
      setPosts(data.posts)
    }

    fetcher()
  }, [])

  return (
  <>
      {posts.map((post) => {
        return (
        <Link to={`/articles/${post.id}`} key={post.id} className={styles.card}>
          <div className={styles.dayCategory}>
            <span>{formatDate(post.createdAt)}</span>

            <div className={styles.categories}>
              {post.categories.map((category, index) => (

                <div  key={index} className={styles.category}>
                  {category}
                </div>
              ))}   
            </div> 
          </div> 
          <p className={styles.title}>{post.title}

          </p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </Link>
            );
        })}
    </>


  );
}

export default Articles;