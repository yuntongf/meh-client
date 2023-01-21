import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IArticle, RootState } from "../../store/configureStore";
import { loadNews } from "../../store/reducers/news";
import Article from "./Article";

const articlesStyle = {
    width: '20%',
    marginRight: '0%',
    maxHeight: 600,
    overflow: 'auto'
}

const Articles = () => {
    const dispatch = useDispatch();
    const articles = useSelector((store : RootState) => store.news.articles);

    useEffect(() => {
        dispatch(loadNews(articles))
    }, [])

    return (
        <ul className="list-group" style={articlesStyle}>
            {articles && articles.map((article : IArticle) => 
                <Article article={article}/>
            )}
        </ul>
    )
}

export default Articles;