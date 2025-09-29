import { createBrowserRouter } from "react-router-dom";
import Header from "./Header";
import Articles from "./Articles";  
import ArticleDetail from "./ArticleDetail";


const routeLink = createBrowserRouter([
  {
    element: <Header />,              // 親：共通レイアウト（header/footer固定）
    children: [
      { index: true, element: <Articles /> },     // "/" 一覧（App）
      { path: "articles/:id", element: <ArticleDetail /> }, // ★ 動的ルート
    ],
  },
]);

export default routeLink;