
import {useSelector} from 'react-redux';
import Tag from './Tag';
import { RootState } from '../../store/configureStore';

interface TagsProps {
    tags: string []
}

const Tags = ({tags}: TagsProps) => {

  const showCart = useSelector((store : RootState) => store.nav.showCart);
  const current = useSelector((store : RootState) => store.entities.current);

  return (
    <>{tags &&
      <div className={`${current ? 'col-3' : 'col-5'}`}>
        <div className="d-flex">
          {tags.map((tag : string) => (
            <Tag tag={tag}/>
          ))}
        </div>
      </div>}
    </>
    
    )
}

export default Tags;