import { useParams, Link } from 'react-router-dom';
import { posts } from './data/posts';
import styles from "./App.module.css";

export default function ArticleDetails() {

  const { id } = useParams();


  const postId = Number(id);
  const post = posts.find(p => p.id === postId);

 
  if (!post) {
    return (<p>記事が見つかりません</p>);
  }


  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric' });

  return (
    <div className={styles.article}>
      <img className={styles.picture} src={post.thumbnailUrl}/>
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
      <div className={styles.detailContent}>
        <p className={styles.title}>{post.title}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}