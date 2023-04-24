import { HeroList } from '../components'

export const MarvelPage = () => {
    const publisherList = 'Marvel Comics'

    return (
        <>
            <h1>{publisherList}</h1>
            <hr />

            <HeroList publisher={publisherList} />
        </>
    )
}
