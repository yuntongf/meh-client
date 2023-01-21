
import {useSelector} from 'react-redux';
import Tag from './Tag';
import { RootState } from '../../store/configureStore';

interface TagsProps {
    tags: string []
}

const Tags = ({tags}: TagsProps) => {
  return (
    <>{tags &&
      <div className='col-5'>
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