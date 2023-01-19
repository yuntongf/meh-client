
interface TagInterface {
    tag: string
}

const Tag = ({tag} : TagInterface) => {

    return (
        <div>
            <label key={tag} className="btn btn-sm btn-outline-primary me-1" style={{borderRadius: '25px'}}>
                {`${tag}`}
            </label>
        </div>
    )
}

export default Tag;