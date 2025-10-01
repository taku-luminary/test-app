import { posts } from './data/posts';
import styles from "./App.module.css";
import { Link } from 'react-router-dom'; 

function Articles() {
  const formatDate = (iso) =>
   new Date(iso).toLocaleDateString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric' });

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
        


         {/*<div className="card">
          <div className="day">
            <span className="date">2023/9/11</span>
             <div className="categories">
            <div className="category">React</div>
            <div className="category">TypeScript</div>
            </div>
          </div>
          <p className="title">APIで取得した記事タイトル1</p>
          <p className="comment">本文です。</p>
        </div>

          <div className="card">
          <div className="day">
            <span className="date">2023/9/10</span>
             <div className="categories">
            <div className="category">HTML</div>
            <div className="category">CSS</div>
            </div>
          </div>
          <p className="title">APIで取得した記事タイトル1</p>
          <p className="comment">本文です。</p>
        </div>

         <div className="card">
          <div className="day">
            <span className="date">2023/9/9</span>
             <div className="categories">
            <div className="category">JavaScript</div>
            </div>
          </div>
          <p className="title">APIで取得した記事タイトル1</p>
          <p className="comment">本文です。</p>
        </div> */}


    </>

  );
}

export default Articles;