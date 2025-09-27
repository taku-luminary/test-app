import { posts } from './data/posts';
//import PostCard from './components/PostCard';

function App() {

    const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric' });

  return (
    <div className="">
      
      <header>
       <div className="container">
      <div className="blog">Blog</div>
      <div className="contact">お問い合わせ</div>
      </div>
      </header>

      <main className="abc">

        {posts.map((post) => {
          const text = post.content.replace(/<br\s*\/?>/gi, '\n');

          return (
        <div key={post.id} className="card">
          <div className="day">
            <span className="date">{formatDate(post.createdAt)}</span>
            <div className="categories">
            {post.categories.map((category, index) => (
              <div key={index} className="category">
              {category}
            </div>
            ))}   
          </div>
        </div>
        <p className="title">{post.title}</p>
        <p className="comment" style={{ whiteSpace: 'pre-line' }}>
        {text}
        </p>
        </div>
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

      </main>
      <footer></footer>
    </div>

  );
}

export default App;