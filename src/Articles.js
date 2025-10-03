import styles from "./App.module.css";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Articles() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);   // 読み込み中
  const [error, setError] = useState(null);           // エラー文言保持

  const formatDate = (iso) =>
   new Date(iso).toLocaleDateString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric' });

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {

    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(
          "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts",

        );

        if (!res.ok) {
          // 一覧APIなら404はレアですが、念のため全ての非2xxをエラー扱い
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        // APIの形に合わせて安全に取り出す（data.postsが無い場合もnull合体で空配列に）
        setPosts(data.posts);
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message || "一覧の取得に失敗しました");
          setPosts([]); // 失敗時はからに
        }
      } finally {
        setIsLoading(false);
      }
    })();

  }, []);


  // ① 読み込み中
  if (isLoading) {
    return <p className={styles.loading}>読み込み中...</p>;
  }

  // ② エラー
  if (error) {
    return (
      <div className={styles.errorBox}>
        <p>エラーが発生しました（{error}）</p>
        {/* 簡易リトライ */}
        <button onClick={() => window.location.reload()}>再読み込み</button>
      </div>
    );
  }

  // ③ 空（0件）
  if (!posts || posts.length === 0) {
    return <p>記事がありません。</p>;
  }
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