import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IArticle, RootState } from "../../store/configureStore";

interface ArticleProps {
    article: IArticle
}

const labelStyle= {
}

const Article = ({article}: ArticleProps) => {
    let keywords : string[] = [];

    // only show labels that are of length less than 8 to improve UI
    try {
        keywords = article.keywords.filter(k => k.length < 9);
    } catch {}

    return (
        <div className="list-group-item">  
            {article &&
                <>
                    <h5> {article.creator} </h5>
                    <div> {article.title} </div>
                    <div className="row-cols-4 mt-2 mb-1"> 
                        {article.keywords && keywords.map((keyword) => 
                            <div key={keyword} className="btn btn-sm btn-outline-primary me-1" style={labelStyle}>
                                <small>{keyword}</small>
                            </div>
                        )}
                    </div>
                    <p> {article.pubDate} {article.country[0]}</p>
                </>}
        </div>
    )
}

export default Article;