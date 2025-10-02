import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from "./ArticleDetail.module.css";

export default function ArticleDetails() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    // id がまだ無い瞬間（初回レンダー直後など）をケア
    if (!id) return;
    const fetcher = async () => {
      try {
        setError(null);

        const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);

        if (!res.ok) {
          // 404 等のとき
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        const one = data.post; 


        setPost(one);
      } catch (e) {
        setError(e.message || '取得に失敗しました');
        setPost(null);
      }
    };

    fetcher();
  }, [id]); // ⑤ id が変わったら取り直す

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric' });

  // エラーメッセージ
  if (error) {
    return <p>記事が見つかりません（{error}）</p>;
  }

  // まだデータが来ていない時の表示
  if (!post) {
    return <p>読み込み中...</p>;
  }


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